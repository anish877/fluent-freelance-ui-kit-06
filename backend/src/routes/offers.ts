import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { protect, AuthRequest } from '../middleware/auth.js';

const router: Router = express.Router();

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

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

    // Process milestones - if no milestones provided, create one with full amount
    let processedMilestones = milestones || [];
    if (!processedMilestones || processedMilestones.length === 0) {
      processedMilestones = [{
        title: 'Project Completion',
        description: 'Full project payment',
        amount: amount,
        dueDate: null
      }];
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
        milestones: processedMilestones,
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
        type: 'OFFER_RECEIVED',
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
        message: `${req.user!.firstName} has accepted your offer`,
        type: 'OFFER_ACCEPTED',
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
        message: `${req.user!.firstName} has declined your offer`,
        type: 'OFFER_REJECTED',
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
        message: `The offer has been withdrawn`,
        type: 'OFFER_WITHDRAWN',
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

// @desc    Create payment for milestone
// @route   POST /api/offers/:id/payments
// @access  Private (Client only)
router.post('/:id/payments', protect, [
  body('milestoneIndex').isInt({ min: 0 }).withMessage('Valid milestone index is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
  body('paymentMethod').optional().isString().withMessage('Payment method must be a string')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const offerId = req.params.id;
    const { milestoneIndex, amount, paymentMethod } = req.body;

    if (req.user!.userType !== 'CLIENT') {
      res.status(403).json({ message: 'Only clients can make payments' });
      return;
    }

    const offer = await prisma.offer.findFirst({
      where: {
        id: offerId,
        clientId: req.user!.id,
        status: 'ACCEPTED'
      },
      include: {
        payments: true
      }
    });

    if (!offer) {
      res.status(404).json({ message: 'Offer not found or not accepted' });
      return;
    }

    // Check if milestone exists
    const milestones = offer.milestones as any[];
    if (!milestones || milestoneIndex >= milestones.length) {
      res.status(400).json({ message: 'Invalid milestone index' });
      return;
    }

    const milestone = milestones[milestoneIndex];
    if (Math.abs(milestone.amount - amount) > 0.01) {
      res.status(400).json({ message: 'Payment amount must match milestone amount' });
      return;
    }

    // Check if payment already exists for this milestone
    const existingPayment = offer.payments.find(p => p.milestoneIndex === milestoneIndex);
    if (existingPayment) {
      res.status(400).json({ message: 'Payment already exists for this milestone' });
      return;
    }

    // Simulate payment processing delay for testing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create payment record with dummy transaction ID
    const payment = await prisma.payment.create({
      data: {
        offerId,
        milestoneIndex,
        amount,
        paymentMethod: paymentMethod || 'Credit Card',
        status: 'COMPLETED',
        transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paidAt: new Date()
      }
    });

    // Create notification for freelancer
    await prisma.notification.create({
      data: {
        title: 'Milestone Payment Received',
        message: `Payment of ${formatCurrency(amount)} has been received for milestone ${milestoneIndex + 1}`,
        type: 'MILESTONE_PAID',
        userId: offer.freelancerId
      }
    });

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Payment processed successfully'
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get payments for offer
// @route   GET /api/offers/:id/payments
// @access  Private
router.get('/:id/payments', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const offerId = req.params.id;

    const offer = await prisma.offer.findFirst({
      where: {
        id: offerId,
        OR: [
          { clientId: req.user!.id },
          { freelancerId: req.user!.id }
        ]
      },
      include: {
        payments: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!offer) {
      res.status(404).json({ message: 'Offer not found or access denied' });
      return;
    }

    res.json({
      success: true,
      data: offer.payments
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Add milestone to accepted offer
// @route   POST /api/offers/:id/milestones
// @access  Private (Client only)
router.post('/:id/milestones', protect, [
  body('title').notEmpty().withMessage('Milestone title is required'),
  body('description').notEmpty().withMessage('Milestone description is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const offerId = req.params.id;
    const { title, description, amount, dueDate } = req.body;

    if (req.user!.userType !== 'CLIENT') {
      res.status(403).json({ message: 'Only clients can add milestones' });
      return;
    }

    const offer = await prisma.offer.findFirst({
      where: {
        id: offerId,
        clientId: req.user!.id,
        status: 'ACCEPTED'
      }
    });

    if (!offer) {
      res.status(404).json({ message: 'Offer not found or not accepted' });
      return;
    }

    // Get current milestones
    const currentMilestones = (offer.milestones as any[]) || [];
    
    // Create new milestone
    const newMilestone = {
      title,
      description,
      amount: parseFloat(amount),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null
    };

    // Add new milestone to the list
    const updatedMilestones = [...currentMilestones, newMilestone];

    // Update offer with new milestones
    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        milestones: updatedMilestones,
        amount: currentMilestones.reduce((sum, m) => sum + m.amount, 0) + newMilestone.amount
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
        title: 'New Milestone Added',
        message: `A new milestone "${title}" has been added to your accepted offer`,
        type: 'OFFER_RECEIVED',
        userId: offer.freelancerId
      }
    });

    res.status(201).json({
      success: true,
      data: updatedOffer,
      message: 'Milestone added successfully'
    });
  } catch (error) {
    console.error('Error adding milestone:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Test payment for milestone (for testing purposes)
// @route   POST /api/offers/:id/test-payment
// @access  Private (Client only)
router.post('/:id/test-payment', protect, [
  body('milestoneIndex').isInt({ min: 0 }).withMessage('Valid milestone index is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const offerId = req.params.id;
    const { milestoneIndex, amount } = req.body;

    if (req.user!.userType !== 'CLIENT') {
      res.status(403).json({ message: 'Only clients can make test payments' });
      return;
    }

    const offer = await prisma.offer.findFirst({
      where: {
        id: offerId,
        clientId: req.user!.id,
        status: 'ACCEPTED'
      },
      include: {
        payments: true
      }
    });

    if (!offer) {
      res.status(404).json({ message: 'Offer not found or not accepted' });
      return;
    }

    // Check if milestone exists
    const milestones = offer.milestones as any[];
    if (!milestones || milestoneIndex >= milestones.length) {
      res.status(400).json({ message: 'Invalid milestone index' });
      return;
    }

    const milestone = milestones[milestoneIndex];
    if (Math.abs(milestone.amount - amount) > 0.01) {
      res.status(400).json({ message: 'Payment amount must match milestone amount' });
      return;
    }

    // Check if payment already exists for this milestone
    const existingPayment = offer.payments.find(p => p.milestoneIndex === milestoneIndex);
    if (existingPayment) {
      res.status(400).json({ message: 'Payment already exists for this milestone' });
      return;
    }

    // Simulate payment processing delay for testing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create test payment record
    const payment = await prisma.payment.create({
      data: {
        offerId,
        milestoneIndex,
        amount,
        paymentMethod: 'Test Payment',
        status: 'COMPLETED',
        transactionId: `TEST_TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paidAt: new Date()
      }
    });

    // Create notification for freelancer
    await prisma.notification.create({
      data: {
        title: 'Test Payment Received',
        message: `Test payment of ${formatCurrency(amount)} has been received for milestone ${milestoneIndex + 1}`,
        type: 'MILESTONE_PAID',
        userId: offer.freelancerId
      }
    });

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Test payment processed successfully'
    });
  } catch (error) {
    console.error('Error processing test payment:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

export default router; 