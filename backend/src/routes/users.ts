import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import { protect, authorize, AuthRequest } from '../middleware/auth';
import { Prisma } from '../../prisma/generated';

const router: Router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Private
router.get('/', protect, (async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, userType, location } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: Prisma.UserWhereInput = {};
    
    if (userType) {
      where.userType = userType as 'FREELANCER' | 'CLIENT';
    }
    
    if (location) {
      where.location = {
        contains: location as string,
        mode: 'insensitive'
      };
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true,
        avatar: true,
        bio: true,
        location: true,
        phone: true,
        skills: true,
        hourlyRate: true,
        portfolio: true,
        experience: true,
        education: true,
        certifications: true,
        companyName: true,
        companySize: true,
        industry: true,
        createdAt: true
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.user.count({ where });

    res.json({
      success: true,
      data: users,
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

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', protect, (async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true,
        avatar: true,
        bio: true,
        location: true,
        phone: true,
        skills: true,
        hourlyRate: true,
        portfolio: true,
        experience: true,
        education: true,
        certifications: true,
        companyName: true,
        companySize: true,
        industry: true,
        createdAt: true,
        _count: {
          select: {
            jobsPosted: true,
            proposals: true,
            reviews: true,
            receivedReviews: true
          }
        }
      }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, [
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  body('phone').optional().notEmpty().withMessage('Phone cannot be empty'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('hourlyRate').optional().isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('portfolio').optional().isURL().withMessage('Portfolio must be a valid URL'),
  body('experience').optional().notEmpty().withMessage('Experience cannot be empty'),
  body('education').optional().notEmpty().withMessage('Education cannot be empty'),
  body('certifications').optional().isArray().withMessage('Certifications must be an array'),
  body('companyName').optional().notEmpty().withMessage('Company name cannot be empty'),
  body('companySize').optional().notEmpty().withMessage('Company size cannot be empty'),
  body('industry').optional().notEmpty().withMessage('Industry cannot be empty')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: req.body,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true,
        avatar: true,
        bio: true,
        location: true,
        phone: true,
        skills: true,
        hourlyRate: true,
        portfolio: true,
        experience: true,
        education: true,
        certifications: true,
        companyName: true,
        companySize: true,
        industry: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get user reviews
// @route   GET /api/users/:id/reviews
// @access  Private
router.get('/:id/reviews', protect, (async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const reviews = await prisma.review.findMany({
      where: { receiverId: req.params.id },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        job: {
          select: {
            id: true,
            title: true
          }
        }
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.review.count({
      where: { receiverId: req.params.id }
    });

    res.json({
      success: true,
      data: reviews,
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