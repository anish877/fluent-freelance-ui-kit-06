import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
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

// @desc    Get current user's full profile
// @route   GET /api/users/profile/me
// @access  Private
router.get('/profile/me', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
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
        country: true,
        city: true,
        timezone: true,
        title: true,
        overview: true,
        skills: true,
        topSkills: true,
        serviceOfferings: true,
        hourlyRate: true,
        portfolio: true,
        experience: true,
        education: true,
        workExperience: true,
        certifications: true,
        availability: true,
        languages: true,
        socialLinks: true,
        category: true,
        subcategory: true,
        experienceLevel: true,
        totalEarnings: true,
        successRate: true,
        completedJobs: true,
        onTime: true,
        onBudget: true,
        responseTime: true,
        lastActive: true,
        topRatedPlus: true,
        verified: true,
        risingTalent: true,
        portfolioItems: true,
        testScores: true,
        specializations: true,
        memberSince: true,
        profileStrength: true,
        repeatHireRate: true,
        rating: true,
        reviewCount: true,
        createdAt: true,
        updatedAt: true,
        // Client fields (for completeness)
        companyName: true,
        companySize: true,
        industry: true,
        companyWebsite: true,
        companyDescription: true,
        projectTypes: true,
        preferredSkills: true,
        budgetRange: true,
        clientType: true,
        howDidYouHear: true,
        interestedCategories: true,
        urgencyLevel: true,
        preferredWorkingStyle: true,
        communicationPreference: true,
        projectDescription: true,
        paymentPreference: true,
        projectFrequency: true,
        averageProjectDuration: true,
        maxHourlyRate: true,
        totalMonthlyBudget: true
      }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Only allow freelancers to access this profile page
    if (user.userType !== 'FREELANCER') {
      res.status(403).json({ message: 'Only freelancers can access this profile page' });
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

// @desc    Get current user's reviews
// @route   GET /api/users/profile/reviews
// @access  Private
router.get('/profile/reviews', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const reviews = await prisma.review.findMany({
      where: { receiverId: req.user!.id },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            companyName: true
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
      where: { receiverId: req.user!.id }
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

// @desc    Update current user's profile
// @route   PUT /api/users/profile/me
// @access  Private
router.put('/profile/me', protect, [
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('overview').optional().isLength({ min: 50 }).withMessage('Overview must be at least 50 characters'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  body('country').optional().notEmpty().withMessage('Country cannot be empty'),
  body('city').optional().notEmpty().withMessage('City cannot be empty'),
  body('timezone').optional().notEmpty().withMessage('Timezone cannot be empty'),
  body('phone').optional().notEmpty().withMessage('Phone cannot be empty'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('topSkills').optional().isArray().withMessage('Top skills must be an array'),
  body('serviceOfferings').optional().isArray().withMessage('Service offerings must be an array'),
  body('hourlyRate').optional().isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('availability').optional().notEmpty().withMessage('Availability cannot be empty'),
  body('languages').optional().isArray().withMessage('Languages must be an array'),
  body('education').optional().isArray().withMessage('Education must be an array'),
  body('certifications').optional().isArray().withMessage('Certifications must be an array'),
  body('portfolioItems').optional().isArray().withMessage('Portfolio items must be an array'),
  body('socialLinks').optional().isObject().withMessage('Social links must be an object'),
  body('responseTime').optional().notEmpty().withMessage('Response time cannot be empty'),
  body('minimumProjectBudget').optional().notEmpty().withMessage('Minimum project budget cannot be empty'),
  body('specialRequirements').optional().isString().withMessage('Special requirements must be a string')
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
        country: true,
        city: true,
        timezone: true,
        title: true,
        overview: true,
        skills: true,
        topSkills: true,
        serviceOfferings: true,
        hourlyRate: true,
        portfolio: true,
        experience: true,
        education: true,
        workExperience: true,
        certifications: true,
        availability: true,
        languages: true,
        socialLinks: true,
        category: true,
        subcategory: true,
        experienceLevel: true,
        totalEarnings: true,
        successRate: true,
        completedJobs: true,
        onTime: true,
        onBudget: true,
        responseTime: true,
        lastActive: true,
        topRatedPlus: true,
        verified: true,
        risingTalent: true,
        portfolioItems: true,
        testScores: true,
        specializations: true,
        memberSince: true,
        profileStrength: true,
        repeatHireRate: true,
        rating: true,
        reviewCount: true,
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

// @desc    Create sample freelancer profile (for testing)
// @route   POST /api/users/sample-freelancer
// @access  Public
router.post('/sample-freelancer', (async (req: Request, res: Response): Promise<void> => {
  try {
    // Hash password
    const hashPassword = (password: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt(password, salt, 64, (err: Error | null, derivedKey: Buffer) => {
          if (err) reject(err);
          resolve(salt + ':' + derivedKey.toString('hex'));
        });
      });
    };

    const hashedPassword = await hashPassword('password123');

    // Create sample freelancer
    const user = await prisma.user.create({
      data: {
        email: 'alex.thompson@example.com',
        password: hashedPassword,
        firstName: 'Alex',
        lastName: 'Thompson',
        userType: 'FREELANCER',
        isOnboarded: true,
        onboardingStep: 8,
        avatar: '/placeholder.svg',
        title: 'Senior Full-Stack Developer & Technical Consultant',
        overview: 'Passionate full-stack developer with 10+ years of experience building scalable web applications and leading development teams. Specialized in React, Node.js, and cloud architecture. I help startups and enterprises transform their ideas into robust, user-friendly digital solutions.',
        location: 'Austin, Texas, USA',
        country: 'USA',
        city: 'Austin',
        timezone: 'America/Chicago',
        phone: '+1-555-0123',
        skills: [
          { name: 'React', category: 'Frontend', level: 'Expert', yearsOfExperience: 8 },
          { name: 'Node.js', category: 'Backend', level: 'Expert', yearsOfExperience: 8 },
          { name: 'TypeScript', category: 'Language', level: 'Expert', yearsOfExperience: 6 },
          { name: 'Python', category: 'Language', level: 'Advanced', yearsOfExperience: 5 },
          { name: 'AWS', category: 'Cloud', level: 'Expert', yearsOfExperience: 7 },
          { name: 'Docker', category: 'DevOps', level: 'Advanced', yearsOfExperience: 6 },
          { name: 'MongoDB', category: 'Database', level: 'Advanced', yearsOfExperience: 5 },
          { name: 'PostgreSQL', category: 'Database', level: 'Advanced', yearsOfExperience: 5 },
          { name: 'GraphQL', category: 'API', level: 'Advanced', yearsOfExperience: 4 },
          { name: 'REST APIs', category: 'API', level: 'Expert', yearsOfExperience: 8 },
          { name: 'Microservices', category: 'Architecture', level: 'Advanced', yearsOfExperience: 6 },
          { name: 'DevOps', category: 'Infrastructure', level: 'Advanced', yearsOfExperience: 5 },
          { name: 'CI/CD', category: 'Infrastructure', level: 'Advanced', yearsOfExperience: 5 },
          { name: 'Kubernetes', category: 'Infrastructure', level: 'Intermediate', yearsOfExperience: 3 }
        ],
        topSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
        serviceOfferings: ['Web Development', 'Mobile Development', 'API Development', 'Cloud Architecture', 'DevOps'],
        hourlyRate: 95,
        availability: 'Available for new projects',
        languages: [
          { language: 'English', proficiency: 'Native' },
          { language: 'Spanish', proficiency: 'Fluent' },
          { language: 'French', proficiency: 'Conversational' }
        ],
        education: [
          { degree: 'Master of Science in Computer Science', institution: 'University of Texas at Austin', year: '2014-2016' },
          { degree: 'Bachelor of Science in Software Engineering', institution: 'Texas Tech University', year: '2010-2014' }
        ],
        certifications: [
          'AWS Solutions Architect Professional',
          'Google Cloud Professional Developer',
          'Certified Kubernetes Administrator'
        ],
        category: 'web-development',
        subcategory: 'full-stack-development',
        experienceLevel: 'expert',
        totalEarnings: '$185,500',
        successRate: 98,
        completedJobs: 234,
        onTime: 96,
        onBudget: 94,
        responseTime: 'Within 1 hour',
        lastActive: 'Online now',
        topRatedPlus: true,
        verified: true,
        risingTalent: false,
        rating: 4.9,
        reviewCount: 156,
        memberSince: '2020',
        profileStrength: 95,
        repeatHireRate: 87,
        portfolioItems: [
          {
            title: 'E-commerce Platform Redesign',
            description: 'Complete redesign and development of a multi-vendor e-commerce platform serving 100K+ users',
            image: '/placeholder.svg',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            link: 'https://example.com'
          },
          {
            title: 'SaaS Analytics Dashboard',
            description: 'Real-time analytics dashboard for B2B SaaS company with advanced data visualization',
            image: '/placeholder.svg',
            technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
            link: 'https://example.com'
          },
          {
            title: 'Mobile Banking App',
            description: 'Secure mobile banking application with biometric authentication and real-time transactions',
            image: '/placeholder.svg',
            technologies: ['React Native', 'Node.js', 'AWS', 'Docker'],
            link: 'https://example.com'
          }
        ],
        testScores: [
          { name: 'JavaScript', score: 95 },
          { name: 'React', score: 98 },
          { name: 'Node.js', score: 92 },
          { name: 'AWS', score: 89 }
        ],
        specializations: ['Full-Stack Development', 'Cloud Architecture', 'API Design', 'Performance Optimization'],
        socialLinks: {
          linkedin: 'https://linkedin.com/in/alexthompson',
          github: 'https://github.com/alexthompson',
          website: 'https://alexthompson.dev',
          twitter: 'https://twitter.com/alexthompson'
        },
        minimumProjectBudget: '$1000',
        specialRequirements: 'I prefer to work with clients who have clear project requirements and are open to collaboration.'
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true,
        isOnboarded: true
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.status(201).json({
      success: true,
      data: user,
      token
    });
  } catch (error) {
    console.error('Error creating sample freelancer:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

export default router; 