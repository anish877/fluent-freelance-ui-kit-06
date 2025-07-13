import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { protect, authorize, AuthRequest } from '../middleware/auth.js';
import { Prisma } from '@prisma/client';
const router: Router = express.Router();

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
router.get('/', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      skills, 
      location, 
      budget, 
      isRemote,
      status 
    } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: Prisma.JobWhereInput = {};
    
    if (category) {
      where.category = category as string;
    }
    
    if (skills) {
      where.skills = {
        hasSome: Array.isArray(skills) ? skills as string[] : [skills as string]
      };
    }
    
    if (location) {
      where.location = {
        contains: location as string,
        mode: 'insensitive'
      };
    }
    
    if (budget) {
      where.budget = budget as 'FIXED' | 'HOURLY';
    }
    
    if (isRemote !== undefined) {
      where.isRemote = isRemote === 'true';
    }
    
    if (status) {
      where.status = status as 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            companyName: true,
            location: true
          }
        },
        _count: {
          select: {
            proposals: true
          }
        }
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.job.count({ where });

    res.json({
      success: true,
      data: jobs,
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

// @desc    Get jobs for current client
// @route   GET /api/jobs/client
// @access  Private (Clients only)
router.get('/client', protect, authorize('CLIENT'), (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    const where: Prisma.JobWhereInput = {
      clientId: req.user!.id
    };
    
    if (status) {
      where.status = status as 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    }

    const jobs = await prisma.job.findMany({
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
        _count: {
          select: {
            proposals: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
router.get('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            bio: true,
            location: true,
            companyName: true,
            companySize: true,
            industry: true
          }
        },
        proposals: {
          include: {
            freelancer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                hourlyRate: true,
                location: true,
                skills: true,
                email: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            proposals: true
          }
        }
      }
    });

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Create job
// @route   POST /api/jobs
// @access  Private (Clients only)
router.post('/', protect, authorize('CLIENT'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('experienceLevel').isIn(['entry-level', 'intermediate', 'expert']).withMessage('Experience level must be entry-level, intermediate, or expert'),
  body('projectType').isIn(['hourly', 'fixed']).withMessage('Project type must be hourly or fixed'),
  body('duration').isIn(['one-time', 'short-term', 'ongoing']).withMessage('Duration must be one-time, short-term, or ongoing'),
  body('budgetType').isIn(['hourly', 'fixed']).withMessage('Budget type must be hourly or fixed'),
  body('minBudget').optional().isFloat({ min: 0 }).withMessage('Minimum budget must be a positive number'),
  body('maxBudget').optional().isFloat({ min: 0 }).withMessage('Maximum budget must be a positive number'),
  body('hideBudget').optional().isBoolean().withMessage('Hide budget must be a boolean'),
  body('visibility').isIn(['public', 'invite-only', 'private']).withMessage('Visibility must be public, invite-only, or private'),
  body('attachments').optional().isArray().withMessage('Attachments must be an array of URLs')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const {
      title,
      description,
      category,
      skills,
      experienceLevel,
      projectType,
      duration,
      budgetType,
      minBudget,
      maxBudget,
      hideBudget,
      visibility,
      attachments
    } = req.body;

    // Validate budget based on project type
    if (projectType === 'hourly') {
      if (!minBudget || !maxBudget) {
        res.status(400).json({ message: 'Hourly projects require both minimum and maximum hourly rates' });
        return;
      }
      if (minBudget >= maxBudget) {
        res.status(400).json({ message: 'Minimum hourly rate must be less than maximum hourly rate' });
        return;
      }
    } else if (projectType === 'fixed') {
      if (!minBudget || minBudget <= 0) {
        res.status(400).json({ message: 'Fixed projects require a positive budget amount' });
        return;
      }
    }

    // Convert frontend budget type to backend enum
    const budgetEnum = budgetType === 'fixed' ? 'FIXED' : 'HOURLY';
    
    // Prepare job data
    const jobData: Prisma.JobCreateInput = {
      title,
      description,
      category,
      skills,
      experienceLevel,
      projectType,
      duration,
      budget: budgetEnum,
      minBudget,
      maxBudget,
      hideBudget: hideBudget || false,
      visibility: visibility || 'public',
      attachments: attachments || [], // These are now URLs from Cloudinary
      status: 'OPEN',
      client: {
        connect: { id: req.user!.id }
      }
    };

    const job = await prisma.job.create({
      data: jobData,
      include: {
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
    });

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Job owner only)
router.put('/:id', protect, authorize('CLIENT'), [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('requirements').optional().isArray().withMessage('Requirements must be an array'),
  body('budget').optional().isIn(['FIXED', 'HOURLY']).withMessage('Budget must be FIXED or HOURLY'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  body('subcategory').optional().notEmpty().withMessage('Subcategory cannot be empty'),
  body('projectType').optional().notEmpty().withMessage('Project type cannot be empty'),
  body('experienceLevel').optional().notEmpty().withMessage('Experience level cannot be empty'),
  body('workingHours').optional().notEmpty().withMessage('Working hours cannot be empty'),
  body('timezone').optional().notEmpty().withMessage('Timezone cannot be empty'),
  body('communicationPreferences').optional().isArray().withMessage('Communication preferences must be an array'),
  body('minBudget').optional().isFloat({ min: 0 }).withMessage('Min budget must be a positive number'),
  body('maxBudget').optional().isFloat({ min: 0 }).withMessage('Max budget must be a positive number'),
  body('hourlyRate').optional().isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('duration').optional().notEmpty().withMessage('Duration cannot be empty'),
  body('isRemote').optional().isBoolean().withMessage('Is remote must be a boolean'),
  body('isUrgent').optional().isBoolean().withMessage('Is urgent must be a boolean'),
  body('visibility').optional().isIn(['public', 'private', 'invite-only']).withMessage('Visibility must be public, private, or invite-only'),
  body('applicationDeadline').optional().custom((value) => {
    if (!value) return true;
    // Accept both ISO and YYYY-MM-DD
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Application deadline must be a valid date');
    }
    return true;
  }),
  body('status').optional().isIn(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).withMessage('Invalid status')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    // Check if job exists and belongs to user
    const existingJob = await prisma.job.findUnique({
      where: { id: req.params.id }
    });

    if (!existingJob) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    if (existingJob.clientId !== req.user!.id) {
      res.status(403).json({ message: 'Not authorized to update this job' });
      return;
    }

    // Convert applicationDeadline to Date if present
    const updateData = { ...req.body };
    if (updateData.applicationDeadline) {
      updateData.applicationDeadline = new Date(updateData.applicationDeadline);
    }

    const updatedJob = await prisma.job.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
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
    });

    res.json({
      success: true,
      data: updatedJob
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Job owner only)
router.delete('/:id', protect, authorize('CLIENT'), (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Check if job exists and belongs to user
    const existingJob = await prisma.job.findUnique({
      where: { id: req.params.id }
    });

    if (!existingJob) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    if (existingJob.clientId !== req.user!.id) {
      res.status(403).json({ message: 'Not authorized to delete this job' });
      return;
    }

    await prisma.job.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get jobs by client
// @route   GET /api/jobs/client/me
// @access  Private (Clients only)
router.get('/client/me', protect, authorize('CLIENT'), (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: Prisma.JobWhereInput = { clientId: req.user!.id };
    
    if (status) {
      where.status = status as 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        _count: {
          select: {
            proposals: true
          }
        }
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.job.count({ where });

    res.json({
      success: true,
      data: jobs,
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

export default router; 