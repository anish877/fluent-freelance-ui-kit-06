import express, { Request, Response, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import { protect, authorize, AuthRequest } from '../middleware/auth';


const router = express.Router();

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

    if (job.clientId !== req.user!.id) {
      res.status(403).json({ message: 'Not authorized to view proposals for this job' });
      return;
    }

    const proposals = await prisma.proposal.findMany({
      where: { jobId: req.params.jobId },
      include: {
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
            verified: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

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

    const where: Prisma.ProposalWhereInput = { freelancerId: req.user!.id };
    
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
            hourlyRate: true,
            category: true,
            location: true,
            isRemote: true,
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
    const updateData: Prisma.ProposalUpdateInput = {};
    
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