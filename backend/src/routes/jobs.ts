import express, { Request, Response, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import { protect, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();

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

    const where: any = {};
    
    if (category) {
      where.category = category;
    }
    
    if (skills) {
      where.skills = {
        hasSome: Array.isArray(skills) ? skills : [skills]
      };
    }
    
    if (location) {
      where.location = {
        contains: location as string,
        mode: 'insensitive'
      };
    }
    
    if (budget) {
      where.budget = budget;
    }
    
    if (isRemote !== undefined) {
      where.isRemote = isRemote === 'true';
    }
    
    if (status) {
      where.status = status;
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
                skills: true
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
  body('requirements').isArray().withMessage('Requirements must be an array'),
  body('budget').isIn(['FIXED', 'HOURLY']).withMessage('Budget must be FIXED or HOURLY'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('category').notEmpty().withMessage('Category is required'),
  body('minBudget').optional().isFloat({ min: 0 }).withMessage('Min budget must be a positive number'),
  body('maxBudget').optional().isFloat({ min: 0 }).withMessage('Max budget must be a positive number'),
  body('hourlyRate').optional().isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('duration').optional().notEmpty().withMessage('Duration cannot be empty'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  body('isRemote').optional().isBoolean().withMessage('Is remote must be a boolean')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const job = await prisma.job.create({
      data: {
        ...req.body,
        clientId: req.user!.id
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
  body('minBudget').optional().isFloat({ min: 0 }).withMessage('Min budget must be a positive number'),
  body('maxBudget').optional().isFloat({ min: 0 }).withMessage('Max budget must be a positive number'),
  body('hourlyRate').optional().isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('duration').optional().notEmpty().withMessage('Duration cannot be empty'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  body('isRemote').optional().isBoolean().withMessage('Is remote must be a boolean'),
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

    const updatedJob = await prisma.job.update({
      where: { id: req.params.id },
      data: req.body,
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

    const where: any = { clientId: req.user!.id };
    
    if (status) {
      where.status = status;
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