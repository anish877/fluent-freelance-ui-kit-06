import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { protect, AuthRequest } from '../middleware/auth.js';

const router: Router = express.Router();

// @desc    Create offer
// @route   POST /api/offers
// @access  Private (Clients only)
router.post('/', protect, [
  body('conversationId').notEmpty().withMessage('Conversation ID is required'),
  body('freelancerId').notEmpty().withMessage('Freelancer ID is required'),
  body('jobId').notEmpty().withMessage('Job ID is required'),
  body('budgetType').isIn(['FIXED', 'HOURLY']).withMessage('Budget type must be FIXED or HOURLY'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('milestones').optional().isArray().withMessage('Milestones must be an array'),
  body('terms').optional().isString().withMessage('Terms must be a string'),
  body('expiresAt').optional().isISO8601().withMessage('Expires at must be a valid date')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    // Check if user is a client
    if (req.user!.userType !== 'CLIENT') {
      res.status(403).json({ message: 'Only clients can create offers' });
      return;
    }

    const {
      conversationId,
      freelancerId,
      budgetType,
      amount,
      duration,
      milestones,
      terms,
      expiresAt,
      jobId
    } = req.body;

    // Check if conversation exists and user is participant
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          has: req.user!.email
        }
      }
    });

    if (!conversation) {
      res.status(404).json({ message: 'Conversation not found or access denied' });
      return;
    }

    // Check if freelancer exists
    const freelancer = await prisma.user.findUnique({
      where: { id: freelancerId }
    });

    if (!freelancer || freelancer.userType !== 'FREELANCER') {
      res.status(404).json({ message: 'Freelancer not found' });
      return;
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    // Check if there's already a pending offer in this conversation
    const existingOffer = await prisma.offer.findFirst({
      where: {
        conversationId,
        status: 'PENDING'
      }
    });

    if (existingOffer) {
      res.status(400).json({ message: 'There is already a pending offer in this conversation' });
      return;
    }

    // Create offer
    const offer = await prisma.offer.create({
      data: {
        conversationId,
        clientId: req.user!.id,
        freelancerId,
        jobId,
        budgetType,
        amount,
        duration,
        milestones: milestones || [],
        terms: terms || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            companyName: true
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true
          }
        },
        job: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      }
    });

    // Create notification for freelancer
    await prisma.notification.create({
      data: {
        title: 'New Offer Received',
        message: `You've received a new offer: "${job.title}"`,
        type: 'JOB_INVITATION', // Reusing this type for offers
        userId: freelancerId
      }
    });

    res.status(201).json({
      success: true,
      data: offer,
      message: 'Offer created successfully'
    });
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get offers for conversation
// @route   GET /api/offers/conversation/:conversationId
// @access  Private
router.get('/conversation/:conversationId', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const conversationId = req.params.conversationId;

    // Check if user is participant in conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          has: req.user!.email
        }
      }
    });

    if (!conversation) {
      res.status(404).json({ message: 'Conversation not found or access denied' });
      return;
    }

    const offers = await prisma.offer.findMany({
      where: {
        conversationId,
        OR: [
          { clientId: req.user!.id },
          { freelancerId: req.user!.id }
        ]
      },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            companyName: true
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true
          }
        },
        job: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: offers
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get offers for current user
// @route   GET /api/offers/me
// @access  Private
router.get('/me', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    
    if (req.user!.userType === 'CLIENT') {
      where.clientId = req.user!.id;
    } else {
      where.freelancerId = req.user!.id;
    }
    
    if (status) {
      where.status = status as 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'WITHDRAWN';
    }

    const offers = await prisma.offer.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            companyName: true
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true
          }
        },
        job: {
          select: {
            id: true,
            title: true,
            description: true
          }
        },
        conversation: {
          select: {
            id: true,
            projectName: true
          }
        }
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.offer.count({ where });

    res.json({
      success: true,
      data: offers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching user offers:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Accept offer
// @route   PUT /api/offers/:id/accept
// @access  Private (Freelancers only)
router.put('/:id/accept', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const offerId = req.params.id;

    if (req.user!.userType !== 'FREELANCER') {
      res.status(403).json({ message: 'Only freelancers can accept offers' });
      return;
    }

    const offer = await prisma.offer.findFirst({
      where: {
        id: offerId,
        freelancerId: req.user!.id,
        status: 'PENDING'
      },
      include: {
        client: true,
        job: true
      }
    });

    if (!offer) {
      res.status(404).json({ message: 'Offer not found or already processed' });
      return;
    }

    // Check if offer has expired
    if (offer.expiresAt && new Date() > offer.expiresAt) {
      res.status(400).json({ message: 'Offer has expired' });
      return;
    }

    // Update offer status
    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: { status: 'ACCEPTED' },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            companyName: true
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true
          }
        },
        job: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      }
    });

    // Create notification for client
    await prisma.notification.create({
      data: {
        title: 'Offer Accepted',
        message: `${req.user!.firstName} has accepted your offer: "${offer.title}"`,
        type: 'PROPOSAL_ACCEPTED',
        userId: offer.clientId
      }
    });

    res.json({
      success: true,
      data: updatedOffer,
      message: 'Offer accepted successfully'
    });
  } catch (error) {
    console.error('Error accepting offer:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Reject offer
// @route   PUT /api/offers/:id/reject
// @access  Private (Freelancers only)
router.put('/:id/reject', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const offerId = req.params.id;

    if (req.user!.userType !== 'FREELANCER') {
      res.status(403).json({ message: 'Only freelancers can reject offers' });
      return;
    }

    const offer = await prisma.offer.findFirst({
      where: {
        id: offerId,
        freelancerId: req.user!.id,
        status: 'PENDING'
      },
      include: {
        client: true
      }
    });

    if (!offer) {
      res.status(404).json({ message: 'Offer not found or already processed' });
      return;
    }

    // Update offer status
    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: { status: 'REJECTED' },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            companyName: true
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true
          }
        }
      }
    });

    // Create notification for client
    await prisma.notification.create({
      data: {
        title: 'Offer Declined',
        message: `${req.user!.firstName} has declined your offer: "${offer.title}"`,
        type: 'PROPOSAL_REJECTED',
        userId: offer.clientId
      }
    });

    res.json({
      success: true,
      data: updatedOffer,
      message: 'Offer rejected successfully'
    });
  } catch (error) {
    console.error('Error rejecting offer:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Withdraw offer
// @route   PUT /api/offers/:id/withdraw
// @access  Private (Client only)
router.put('/:id/withdraw', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const offerId = req.params.id;

    if (req.user!.userType !== 'CLIENT') {
      res.status(403).json({ message: 'Only clients can withdraw offers' });
      return;
    }

    const offer = await prisma.offer.findFirst({
      where: {
        id: offerId,
        clientId: req.user!.id,
        status: 'PENDING'
      },
      include: {
        freelancer: true
      }
    });

    if (!offer) {
      res.status(404).json({ message: 'Offer not found or already processed' });
      return;
    }

    // Update offer status
    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: { status: 'WITHDRAWN' },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            companyName: true
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true
          }
        }
      }
    });

    // Create notification for freelancer
    await prisma.notification.create({
      data: {
        title: 'Offer Withdrawn',
        message: `The offer "${offer.title}" has been withdrawn`,
        type: 'PROPOSAL_REJECTED',
        userId: offer.freelancerId
      }
    });

    res.json({
      success: true,
      data: updatedOffer,
      message: 'Offer withdrawn successfully'
    });
  } catch (error) {
    console.error('Error withdrawing offer:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

export default router; 