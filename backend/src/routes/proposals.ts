import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { protect, authorize, AuthRequest } from '../middleware/auth.js';


const router: Router = express.Router();

// @desc    Get proposals for a job
// @route   GET /api/proposals/job/:jobId
// @access  Private (Job owner only)
router.get('/job/:jobId', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Check if job exists and belongs to user
    const job = await prisma.job.findUnique({
      where: { id: req.params.jobId }
    });

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    // Temporarily commented out for testing
    // if (job.clientId !== req.user!.id) {
    //   res.status(403).json({ message: 'Not authorized to view proposals for this job' });
    //   return;
    // }

    const proposals = await prisma.proposal.findMany({
      where: { jobId: req.params.jobId },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            description: true,
            budget: true,
            minBudget: true,
            maxBudget: true,
            category: true,
            status: true,
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                companyName: true
              }
            }
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            bio: true,
            location: true,
            skills: true,
            hourlyRate: true,
            portfolio: true,
            experience: true,
            education: true,
            certifications: true,
            languages: true,
            topSkills: true,
            experienceLevel: true,
            totalEarnings: true,
            successRate: true,
            completedJobs: true,
            onTime: true,
            responseTime: true,
            lastActive: true,
            topRatedPlus: true,
            verified: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Debug log to check if email is being selected
    console.log("DEBUG: First proposal freelancer email:", proposals[0]?.freelancer?.email);
    console.log("DEBUG: First proposal freelancer object keys:", Object.keys(proposals[0]?.freelancer || {}));

    res.json({
      success: true,
      data: proposals
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Check if freelancer has submitted proposal for a job
// @route   GET /api/proposals/check/:jobId
// @access  Private (Freelancers only)
router.get('/check/:jobId', protect, authorize('FREELANCER'), (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const existingProposal = await prisma.proposal.findFirst({
      where: {
        jobId: req.params.jobId,
        freelancerId: req.user!.id
      },
      select: {
        id: true,
        coverLetter: true,
        bidAmount: true,
        estimatedDuration: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      data: existingProposal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get proposals by freelancer
// @route   GET /api/proposals/freelancer/me
// @access  Private (Freelancers only)
router.get('/freelancer/me', protect, authorize('FREELANCER'), (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { freelancerId: req.user!.id };
    
    if (status) {
      where.status = status as 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
    }

    const proposals = await prisma.proposal.findMany({
      where,
      include: {
        job: {
          select: {
            id: true,
            title: true,
            description: true,
            budget: true,
            minBudget: true,
            maxBudget: true,
            category: true,
            status: true,
            _count: {
              select: {
                proposals: true
              }
            },
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                companyName: true
              }
            }
          }
        }
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.proposal.count({ where });

    res.json({
      success: true,
      data: proposals,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Create proposal
// @route   POST /api/proposals
// @access  Private (Freelancers only)
router.post('/', protect, authorize('FREELANCER'), [
  body('jobId').notEmpty().withMessage('Job ID is required'),
  body('coverLetter').notEmpty().withMessage('Cover letter is required'),
  body('bidAmount').isFloat({ min: 0 }).withMessage('Bid amount must be a positive number'),
  body('bidType').isIn(['FIXED', 'HOURLY']).withMessage('Bid type must be FIXED or HOURLY'),
  body('estimatedDuration').notEmpty().withMessage('Estimated duration is required'),
  body('attachments').optional().isArray().withMessage('Attachments must be an array'),
  body('questionResponses').optional().isArray().withMessage('Question responses must be an array'),
  body('milestones').optional().isArray().withMessage('Milestones must be an array'),
  body('originalBudget').optional().isFloat({ min: 0 }).withMessage('Original budget must be a positive number')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    // Check if job exists and is open
    const job = await prisma.job.findUnique({
      where: { id: req.body.jobId }
    });

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    if (job.status !== 'OPEN') {
      res.status(400).json({ message: 'Job is not open for proposals' });
      return;
    }

    // Enforce bidType matches job.projectType
    if ((job.projectType === 'hourly' && req.body.bidType !== 'HOURLY') ||
        (job.projectType === 'fixed' && req.body.bidType !== 'FIXED')) {
      res.status(400).json({ message: 'Bid type must match job type.' });
      return;
    }

    // Check if user already submitted a proposal for this job
    const existingProposal = await prisma.proposal.findFirst({
      where: {
        jobId: req.body.jobId,
        freelancerId: req.user!.id
      }
    });

    if (existingProposal) {
      res.status(400).json({ message: 'You have already submitted a proposal for this job' });
      return;
    }

    const proposal = await prisma.proposal.create({
      data: {
        jobId: req.body.jobId,
        coverLetter: req.body.coverLetter,
        bidAmount: req.body.bidAmount,
        bidType: req.body.bidType || 'FIXED',
        estimatedDuration: req.body.estimatedDuration,
        attachments: req.body.attachments || [],
        questionResponses: req.body.questionResponses || [],
        milestones: req.body.milestones || [],
        originalBudget: req.body.originalBudget,
        freelancerId: req.user!.id
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                companyName: true
              }
            }
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: proposal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Update proposal status (accept/reject)
// @route   PUT /api/proposals/:id/status
// @access  Private (Job owner only)
router.put('/:id/status', protect, authorize('CLIENT'), [
  body('status').isIn(['ACCEPTED', 'REJECTED']).withMessage('Status must be ACCEPTED or REJECTED')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    // Check if proposal exists
    const proposal = await prisma.proposal.findUnique({
      where: { id: req.params.id },
      include: {
        job: true
      }
    });

    if (!proposal) {
      res.status(404).json({ message: 'Proposal not found' });
      return;
    }

    // Check if user owns the job
    if (proposal.job.clientId !== req.user!.id) {
      res.status(403).json({ message: 'Not authorized to update this proposal' });
      return;
    }

    // Update proposal status
    const updatedProposal = await prisma.proposal.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                companyName: true
              }
            }
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    // If proposal is accepted, update job status
    if (req.body.status === 'ACCEPTED') {
      await prisma.job.update({
        where: { id: proposal.jobId },
        data: { status: 'IN_PROGRESS' }
      });
    }

    res.json({
      success: true,
      data: updatedProposal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Schedule interview for a proposal
// @route   POST /api/proposals/:id/schedule-interview
// @access  Private (Job owner only)
router.post('/:id/schedule-interview', protect, authorize('CLIENT'), [
  body('interviewData').isObject().withMessage('Interview data is required'),
  body('conversationId').isString().withMessage('Conversation ID is required')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { interviewData, conversationId } = req.body;
    const proposalId = req.params.id;

    // Check if proposal exists
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        job: true
      }
    });

    if (!proposal) {
      res.status(404).json({ message: 'Proposal not found' });
      return;
    }

    // Check if user owns the job
    if (proposal.job.clientId !== req.user!.id) {
      res.status(403).json({ message: 'Not authorized to schedule interview for this proposal' });
      return;
    }

    // Check if conversation exists and user is participant
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId }
    });

    if (!conversation) {
      res.status(404).json({ message: 'Conversation not found' });
      return;
    }

    if (!conversation.participants.includes(req.user!.email)) {
      res.status(403).json({ message: 'Access denied to this conversation' });
      return;
    }

    // Check if an interview message already exists in this conversation
    const existingInterviewMessage = await prisma.message.findFirst({
      where: {
        conversationId: conversationId,
        type: 'interview'
      }
    });

    let interviewMessage;

    if (existingInterviewMessage) {
      // Update existing interview message
      interviewMessage = await prisma.message.update({
        where: { id: existingInterviewMessage.id },
        data: {
          content: JSON.stringify(interviewData),
          updatedAt: new Date()
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              userType: true
            }
          }
        }
      });
    } else {
      // Create new interview message
      interviewMessage = await prisma.message.create({
        data: {
          content: JSON.stringify(interviewData),
          senderEmail: req.user!.email,
          receiverEmail: conversation.participants.find(p => p !== req.user!.email) || '',
          conversationId: conversationId,
          type: 'interview'
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              userType: true
            }
          }
        }
      });
    }

    // Update conversation's lastMessage
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageId: interviewMessage.id,
        updatedAt: new Date(),
      },
    });

    // Update proposal with interview data
    await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        interview: interviewData
      }
    });

    res.json({
      success: true,
      data: {
        message: interviewMessage,
        interviewData
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Update proposal (client notes, rating, interview details, etc.)
// @route   PUT /api/proposals/:id
// @access  Private (Job owner only)
router.put('/:id', protect, authorize('CLIENT'), (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Check if proposal exists
    const proposal = await prisma.proposal.findUnique({
      where: { id: req.params.id },
      include: {
        job: true
      }
    });

    if (!proposal) {
      res.status(404).json({ message: 'Proposal not found' });
      return;
    }

    // Check if user owns the job
    if (proposal.job.clientId !== req.user!.id) {
      res.status(403).json({ message: 'Not authorized to update this proposal' });
      return;
    }

    // Update proposal with allowed fields
    const updateData: any = {};
    
    if (req.body.clientNotes !== undefined) {
      updateData.clientNotes = req.body.clientNotes;
    }
    
    if (req.body.rating !== undefined) {
      updateData.rating = req.body.rating;
    }
    
    if (req.body.interview !== undefined) {
      updateData.interview = req.body.interview;
    }
    
    if (req.body.isShortlisted !== undefined) {
      updateData.isShortlisted = req.body.isShortlisted;
    }
    
    if (req.body.clientViewed !== undefined) {
      updateData.clientViewed = req.body.clientViewed;
    }

    const updatedProposal = await prisma.proposal.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        job: {
          select: {
            id: true,
            title: true,
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                companyName: true
              }
            }
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedProposal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Update proposal by freelancer
// @route   PUT /api/proposals/:id/update
// @access  Private (Proposal owner only)
router.put('/:id/update', protect, authorize('FREELANCER'), [
  body('coverLetter').optional().notEmpty().withMessage('Cover letter cannot be empty'),
  body('bidAmount').optional().isFloat({ min: 0 }).withMessage('Bid amount must be a positive number'),
  body('estimatedDuration').optional().notEmpty().withMessage('Estimated duration cannot be empty'),
  body('attachments').optional().isArray().withMessage('Attachments must be an array'),
  body('questionResponses').optional().isArray().withMessage('Question responses must be an array'),
  body('milestones').optional().isArray().withMessage('Milestones must be an array')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    // Check if proposal exists and belongs to user
    const existingProposal = await prisma.proposal.findUnique({
      where: { id: req.params.id }
    });

    if (!existingProposal) {
      res.status(404).json({ message: 'Proposal not found' });
      return;
    }

    if (existingProposal.freelancerId !== req.user!.id) {
      res.status(403).json({ message: 'Not authorized to update this proposal' });
      return;
    }

    if (existingProposal.status !== 'PENDING') {
      res.status(400).json({ message: 'Can only update pending proposals' });
      return;
    }

    // Update proposal
    const updatedProposal = await prisma.proposal.update({
      where: { id: req.params.id },
      data: {
        coverLetter: req.body.coverLetter,
        bidAmount: req.body.bidAmount,
        estimatedDuration: req.body.estimatedDuration,
        attachments: req.body.attachments,
        questionResponses: req.body.questionResponses,
        milestones: req.body.milestones
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                companyName: true
              }
            }
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedProposal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Withdraw proposal
// @route   PUT /api/proposals/:id/withdraw
// @access  Private (Proposal owner only)
router.put('/:id/withdraw', protect, authorize('FREELANCER'), (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Check if proposal exists and belongs to user
    const proposal = await prisma.proposal.findUnique({
      where: { id: req.params.id }
    });

    if (!proposal) {
      res.status(404).json({ message: 'Proposal not found' });
      return;
    }

    if (proposal.freelancerId !== req.user!.id) {
      res.status(403).json({ message: 'Not authorized to withdraw this proposal' });
      return;
    }

    if (proposal.status !== 'PENDING') {
      res.status(400).json({ message: 'Can only withdraw pending proposals' });
      return;
    }

    const updatedProposal = await prisma.proposal.update({
      where: { id: req.params.id },
      data: { status: 'WITHDRAWN' }
    });

    res.json({
      success: true,
      data: updatedProposal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

export default router; 