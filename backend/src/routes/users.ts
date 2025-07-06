import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { protect, authorize, AuthRequest } from '../middleware/auth';
import { Prisma } from '@prisma/client';

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
  body('hourlyRate').optional().custom((value) => {
    if (value === undefined || value === null || value === '') return true;
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue) || numValue < 0) {
      throw new Error('Hourly rate must be a positive number');
    }
    return true;
  }).withMessage('Hourly rate must be a positive number'),
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
    console.log('Validation errors:', errors.array());
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
        coverImage: true,
        skills: true,
        topSkills: true,
        serviceOfferings: true,
        hourlyRate: true,
        portfolio: true,
        experience: true,
        education: true,
        workExperience: true,
        workHistory: true,
        employmentHistory: true,
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
        portfolioProjects: true,
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

    // Transform JSON fields to parsed objects
    const transformedUser = {
      ...user,
      skills: typeof user.skills === 'string' ? JSON.parse(user.skills) : user.skills,
      education: typeof user.education === 'string' ? JSON.parse(user.education) : user.education,
      workExperience: typeof user.workExperience === 'string' ? JSON.parse(user.workExperience) : user.workExperience,
      workHistory: typeof user.workHistory === 'string' ? JSON.parse(user.workHistory) : user.workHistory,
      employmentHistory: typeof user.employmentHistory === 'string' ? JSON.parse(user.employmentHistory) : user.employmentHistory,
      languages: typeof user.languages === 'string' ? JSON.parse(user.languages) : user.languages,
      socialLinks: typeof user.socialLinks === 'string' ? JSON.parse(user.socialLinks) : user.socialLinks,
      portfolioItems: typeof user.portfolioItems === 'string' ? JSON.parse(user.portfolioItems) : user.portfolioItems,
      portfolioProjects: typeof user.portfolioProjects === 'string' ? JSON.parse(user.portfolioProjects) : user.portfolioProjects,
      testScores: typeof user.testScores === 'string' ? JSON.parse(user.testScores) : user.testScores,
      communicationPreference: typeof user.communicationPreference === 'string' ? JSON.parse(user.communicationPreference) : user.communicationPreference
    };

    res.json({
      success: true,
      data: transformedUser
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
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().notEmpty().withMessage('Phone cannot be empty'),
  body('country').optional().notEmpty().withMessage('Country cannot be empty'),
  body('city').optional().notEmpty().withMessage('City cannot be empty'),
  body('timezone').optional().notEmpty().withMessage('Timezone cannot be empty'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('overview').optional().custom((value) => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'string' && value.length < 50) {
      throw new Error('Overview must be at least 50 characters when provided');
    }
    return true;
  }).withMessage('Overview must be at least 50 characters when provided'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('topSkills').optional().isArray().withMessage('Top skills must be an array'),
  body('serviceOfferings').optional().isArray().withMessage('Service offerings must be an array'),
  body('hourlyRate').optional().custom((value) => {
    if (value === undefined || value === null || value === '') return true;
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue) || numValue < 0) {
      throw new Error('Hourly rate must be a positive number');
    }
    return true;
  }).withMessage('Hourly rate must be a positive number'),
  body('portfolioProjects').optional().isArray().withMessage('Portfolio projects must be an array'),
  body('workExperience').optional().isArray().withMessage('Work experience must be an array'),
  body('employmentHistory').optional().isArray().withMessage('Employment history must be an array'),
  body('education').optional().isArray().withMessage('Education must be an array'),
  body('certifications').optional().isArray().withMessage('Certifications must be an array'),
  body('languages').optional().isArray().withMessage('Languages must be an array'),
  body('socialLinks').optional().isObject().withMessage('Social links must be an object'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  body('subcategory').optional().notEmpty().withMessage('Subcategory cannot be empty'),
  body('experienceLevel').optional().notEmpty().withMessage('Experience level cannot be empty'),
  body('availability').optional().notEmpty().withMessage('Availability cannot be empty'),
  body('responseTime').optional().notEmpty().withMessage('Response time cannot be empty'),
  body('projectBasedRates').optional().isObject().withMessage('Project based rates must be an object'),
  body('hoursPerWeek').optional().notEmpty().withMessage('Hours per week cannot be empty'),
  body('workingHours').optional().isObject().withMessage('Working hours must be an object'),
  body('workingDays').optional().isArray().withMessage('Working days must be an array'),
  body('minimumProjectBudget').optional().notEmpty().withMessage('Minimum project budget cannot be empty'),
  body('specialRequirements').optional().notEmpty().withMessage('Special requirements cannot be empty'),
  body('coverImage').optional().custom((value) => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    // Only validate URL if a value is actually provided
    if (typeof value === 'string' && value.trim() !== '') {
      try {
        new URL(value);
        return true;
      } catch {
        throw new Error('Cover image must be a valid URL when provided');
      }
    }
    return true;
  }).withMessage('Cover image must be a valid URL when provided'),
  body('hourlyRateRange').optional().notEmpty().withMessage('Hourly rate range cannot be empty'),
  body('availabilityStatus').optional().notEmpty().withMessage('Availability status cannot be empty')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const {
      firstName, lastName, email, phone, country, city, timezone,
      title, overview, avatar, skills, topSkills, serviceOfferings,
      hourlyRate, portfolioProjects, workExperience, employmentHistory,
      education, certifications, languages, socialLinks, category,
      subcategory, experienceLevel, availability, responseTime,
      projectBasedRates, hoursPerWeek, workingHours, workingDays,
      minimumProjectBudget, specialRequirements, coverImage,
      hourlyRateRange, availabilityStatus
    } = req.body;

    console.log('Updating profile with data:', {
      firstName, lastName, email, phone, country, city, timezone,
      title, overview: overview?.substring(0, 100) + '...', // Log first 100 chars
      skills: skills?.length, topSkills: topSkills?.length,
      hourlyRate, portfolioProjects: portfolioProjects?.length,
      workExperience: workExperience?.length, education: education?.length,
      coverImage: coverImage || 'null/empty',
      coverImageType: typeof coverImage,
      coverImageLength: coverImage?.length || 0
    });

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        country,
        city,
        timezone,
        title,
        overview,
        avatar,
        skills,
        topSkills,
        serviceOfferings,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate.toString()) : null,
        portfolioProjects,
        workExperience,
        employmentHistory,
        education,
        certifications,
        languages,
        socialLinks,
        category,
        subcategory,
        experienceLevel,
        availability,
        responseTime,
        projectBasedRates,
        hoursPerWeek,
        workingHours,
        workingDays,
        minimumProjectBudget,
        specialRequirements,
        coverImage,
        hourlyRateRange,
        availabilityStatus
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        country: true,
        city: true,
        timezone: true,
        title: true,
        overview: true,
        avatar: true,
        skills: true,
        topSkills: true,
        serviceOfferings: true,
        hourlyRate: true,
        portfolioProjects: true,
        workExperience: true,
        employmentHistory: true,
        education: true,
        certifications: true,
        languages: true,
        socialLinks: true,
        category: true,
        subcategory: true,
        experienceLevel: true,
        availability: true,
        responseTime: true,
        projectBasedRates: true,
        hoursPerWeek: true,
        workingHours: true,
        workingDays: true,
        minimumProjectBudget: true,
        specialRequirements: true,
        coverImage: true,
        hourlyRateRange: true,
        availabilityStatus: true
      }
    });

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown'
    });
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}) as RequestHandler);

// @desc    Create sample freelancer for testing
// @route   POST /api/users/sample-freelancer
// @access  Public (for testing only)
router.post('/sample-freelancer', (async (req: Request, res: Response): Promise<void> => {
  try {
    const sampleFreelancer = await prisma.user.create({
      data: {
        email: 'sarah.chen@example.com',
        password: '$2b$10$example.hash', // This would be hashed in real app
        firstName: 'Sarah',
        lastName: 'Chen',
        userType: 'FREELANCER',
        isOnboarded: true,
        title: 'Senior Full-Stack Developer',
        overview: 'I am a passionate full-stack developer with over 6 years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies, helping businesses transform their ideas into robust digital solutions.',
        avatar: '/placeholder.svg',
        coverImage: '/placeholder.svg',
        location: 'San Francisco, CA',
        timezone: 'PST (UTC-8)',
        rating: 4.9,
        reviewCount: 147,
        completedJobs: 89,
        totalEarnings: '$185,000+',
        successRate: 98,
        responseTime: '1 hour',
        hourlyRate: 75,
        hourlyRateRange: '$75 - $120',
        availability: 'Available - 30+ hrs/week',
        availabilityStatus: 'Available',
        memberSince: 'March 2020',
        lastActive: '2 hours ago',
        isOnline: true,
        verified: true,
        topRatedPlus: true,
        skills: [
          { name: 'React', level: 'Expert', yearsOfExperience: 5 },
          { name: 'TypeScript', level: 'Expert', yearsOfExperience: 4 },
          { name: 'Node.js', level: 'Expert', yearsOfExperience: 5 },
          { name: 'Python', level: 'Advanced', yearsOfExperience: 6 },
          { name: 'AWS', level: 'Advanced', yearsOfExperience: 3 },
          { name: 'MongoDB', level: 'Advanced', yearsOfExperience: 4 },
          { name: 'GraphQL', level: 'Intermediate', yearsOfExperience: 2 },
          { name: 'Docker', level: 'Intermediate', yearsOfExperience: 2 }
        ],
        languages: [
          { name: 'English', level: 'Native' },
          { name: 'Mandarin', level: 'Native' },
          { name: 'Spanish', level: 'Conversational' }
        ],
        portfolioProjects: [
          {
            id: 1,
            title: 'E-commerce Platform',
            description: 'Modern e-commerce platform built with React and Node.js',
            image: '/placeholder.svg',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            url: 'https://example.com',
            client: 'RetailCorp',
            completion: '2024'
          },
          {
            id: 2,
            title: 'Task Management SaaS',
            description: 'Collaborative task management application with real-time updates',
            image: '/placeholder.svg',
            technologies: ['React', 'TypeScript', 'GraphQL', 'PostgreSQL'],
            url: 'https://example.com',
            client: 'ProductivityPro',
            completion: '2023'
          },
          {
            id: 3,
            title: 'Healthcare Dashboard',
            description: 'Analytics dashboard for healthcare providers',
            image: '/placeholder.svg',
            technologies: ['Vue.js', 'Python', 'D3.js', 'AWS'],
            url: 'https://example.com',
            client: 'MedTech Solutions',
            completion: '2023'
          }
        ],
        workHistory: [
          {
            id: 1,
            title: 'E-commerce Platform Development',
            client: 'TechCorp Solutions',
            clientRating: 5.0,
            budget: '$4,500',
            duration: '3 months',
            completedDate: 'December 2024',
            feedback: 'Sarah delivered an exceptional e-commerce platform that exceeded our expectations. Her code quality is outstanding, and she was very responsive throughout the project. Highly recommended!',
            skills: ['React', 'Node.js', 'MongoDB', 'Stripe API']
          },
          {
            id: 2,
            title: 'SaaS Dashboard Redesign',
            client: 'StartupHub Inc',
            clientRating: 5.0,
            budget: '$3,200',
            duration: '2 months',
            completedDate: 'October 2024',
            feedback: 'Working with Sarah was a pleasure. She understood our requirements perfectly and delivered a beautiful, functional dashboard. The new design has significantly improved our user engagement.',
            skills: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS']
          },
          {
            id: 3,
            title: 'API Development and Integration',
            client: 'DataFlow Systems',
            clientRating: 4.8,
            budget: '$2,800',
            duration: '6 weeks',
            completedDate: 'September 2024',
            feedback: 'Sarah built a robust API that handles our complex data processing needs. Her documentation was excellent and the code is very maintainable.',
            skills: ['Node.js', 'GraphQL', 'PostgreSQL', 'AWS']
          }
        ],
        education: [
          {
            school: 'Stanford University',
            degree: 'Master of Science in Computer Science',
            period: '2016 - 2018',
            description: 'Specialized in software engineering and distributed systems'
          },
          {
            school: 'UC Berkeley',
            degree: 'Bachelor of Science in Computer Science',
            period: '2012 - 2016',
            description: 'Graduated Magna Cum Laude'
          }
        ],
        certifications: [
          'AWS Certified Solutions Architect',
          'Google Cloud Professional Developer',
          'Meta React Developer'
        ],
        employmentHistory: [
          {
            company: 'Tech Innovations Inc',
            position: 'Senior Software Engineer',
            period: '2019 - 2022',
            description: 'Led development of microservices architecture serving 1M+ users'
          },
          {
            company: 'StartupXYZ',
            position: 'Full-Stack Developer',
            period: '2018 - 2019',
            description: 'Built MVP and core features for B2B SaaS platform'
          }
        ],
        category: 'Programming & Tech',
        subcategory: 'Web Development',
        experienceLevel: 'Expert'
      }
    });

    res.json({
      success: true,
      data: {
        id: sampleFreelancer.id,
        message: 'Sample freelancer created successfully'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get freelancer's public profile by ID (for FreelancerProfile page)
// @route   GET /api/users/profile/:id
// @access  Public
router.get('/profile/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        title: true,
        overview: true,
        avatar: true,
        coverImage: true,
        location: true,
        timezone: true,
        rating: true,
        reviewCount: true,
        completedJobs: true,
        totalEarnings: true,
        successRate: true,
        responseTime: true,
        languages: true,
        hourlyRate: true,
        hourlyRateRange: true,
        availability: true,
        availabilityStatus: true,
        memberSince: true,
        lastActive: true,
        isOnline: true,
        verified: true,
        topRatedPlus: true,
        skills: true,
        portfolioProjects: true,
        workHistory: true,
        employmentHistory: true,
        education: true,
        certifications: true,
        socialLinks: true,
        category: true,
        subcategory: true,
        experienceLevel: true,
        createdAt: true,
        _count: {
          select: {
            receivedReviews: true
          }
        }
      }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Transform the data to match FreelancerProfile expectations
    let portfolioProjects = user.portfolioProjects;
    if (typeof portfolioProjects === "string") {
      try {
        portfolioProjects = JSON.parse(portfolioProjects);
      } catch (e) {
        portfolioProjects = [];
      }
    }
    const portfolio = Array.isArray(portfolioProjects) && portfolioProjects.length > 0
      ? portfolioProjects.map((project: any) => ({
          id: project.id || Math.random(),
          title: project.title || '',
          description: project.description || '',
          image: (Array.isArray(project.images) && project.images.length > 0 ? project.images[0] : project.image || '/placeholder.svg'),
          technologies: Array.isArray(project.technologies) ? project.technologies : [],
          url: project.liveUrl || project.sourceUrl || project.url || '',
          client: project.client || '',
          completion: project.completionDate || project.completion || ''
        }))
      : [];
    const transformedUser = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      title: user.title || '',
      avatar: user.avatar || '/placeholder.svg',
      coverImage: user.coverImage || '/placeholder.svg',
      location: user.location || '',
      timezone: user.timezone || '',
      rating: user.rating || 0,
      reviews: user.reviewCount || 0,
      completedJobs: user.completedJobs || 0,
      totalEarned: user.totalEarnings || '$0',
      successRate: user.successRate || 0,
      responseTime: user.responseTime || '',
      languages: Array.isArray(user.languages) ? user.languages.map((lang: any) => ({
        name: lang.language || lang.name || 'Unknown',
        level: lang.proficiency || lang.level || 'Basic'
      })) : [],
      hourlyRate: user.hourlyRateRange || `$${user.hourlyRate || 0}`,
      availability: user.availabilityStatus || user.availability || '',
      memberSince: user.memberSince || new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      lastActive: user.lastActive || 'Recently',
      isOnline: user.isOnline || false,
      verified: user.verified || false,
      topRated: user.topRatedPlus || false,
      skills: Array.isArray(user.skills) ? user.skills.map((skill: any) => ({
        name: skill.name || skill,
        level: skill.level || 'Intermediate',
        yearsOfExperience: skill.yearsOfExperience || 1
      })) : [],
      overview: user.overview || '',
      portfolio,
      workHistory: (() => {
        // Only use workHistory for the work history tab, don't fall back to employmentHistory
        const workData = Array.isArray(user.workHistory) ? user.workHistory : [];
        return workData.map((work: any) => ({
          id: work.id || Math.random(),
          title: work.title || work.position || '',
          client: work.client || work.company || '',
          clientRating: work.clientRating || 5.0,
          budget: work.budget || '',
          duration: work.duration || '',
          completedDate: work.completedDate || work.endDate || '',
          feedback: work.feedback || work.description || '',
          skills: Array.isArray(work.skills) ? work.skills : Array.isArray(work.technologies) ? work.technologies : []
        }));
      })(),
      education: Array.isArray(user.education) && user.education.length > 0 ? user.education.map((edu: any) => ({
        school: edu.school || edu.institution || '',
        degree: edu.degree || '',
        period: edu.period || `${edu.startDate || ''} - ${edu.endDate || ''}`,
        description: edu.description || edu.field || ''
      })) : [],
      certifications: Array.isArray(user.certifications) && user.certifications.length > 0 ? user.certifications.map((cert: any) => 
        typeof cert === 'string' ? cert : {
          name: cert.name || cert,
          issuer: cert.issuer || '',
          date: cert.date || '',
          url: cert.url || ''
        }
      ) : [],
      employment: Array.isArray(user.employmentHistory) && user.employmentHistory.length > 0 ? user.employmentHistory.map((emp: any) => ({
        company: emp.company || '',
        position: emp.position || emp.title || '',
        period: emp.period || `${emp.startDate || ''} - ${emp.endDate || ''}`,
        description: emp.description || ''
      })) : []
    };

    console.log('Original user data:', JSON.stringify(user, null, 2));
    console.log('Transformed user data:', JSON.stringify(transformedUser, null, 2));
    console.log('Portfolio projects:', user.portfolioProjects);
    console.log('Work history:', user.workHistory);
    console.log('Languages:', user.languages);
    console.log('Employment history:', user.employmentHistory);
    console.log('Education:', user.education);
    console.log('Certifications:', user.certifications);
    console.log('Skills:', user.skills);
    console.log('Portfolio projects type:', typeof user.portfolioProjects);
    console.log('Portfolio projects is array:', Array.isArray(user.portfolioProjects));
    console.log('Portfolio projects length:', Array.isArray(user.portfolioProjects) ? user.portfolioProjects.length : 0);
    console.log('Employment history type:', typeof user.employmentHistory);
    console.log('Employment history is array:', Array.isArray(user.employmentHistory));
    console.log('Employment history length:', Array.isArray(user.employmentHistory) ? user.employmentHistory.length : 0);
    console.log('Final portfolio array:', transformedUser.portfolio);
    console.log('Final work history array:', transformedUser.workHistory);
    console.log('Portfolio length check:', Array.isArray(transformedUser.portfolio) ? transformedUser.portfolio.length : 0);
    console.log('Work history length check:', Array.isArray(transformedUser.workHistory) ? transformedUser.workHistory.length : 0);
    console.log('First portfolio item:', Array.isArray(transformedUser.portfolio) && transformedUser.portfolio.length > 0 ? transformedUser.portfolio[0] : null);
    console.log('First work history item:', Array.isArray(transformedUser.workHistory) && transformedUser.workHistory.length > 0 ? transformedUser.workHistory[0] : null);

    res.json({
      success: true,
      data: transformedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Test endpoint to verify data transformation
// @route   GET /api/users/test-profile/:id
// @access  Public (for testing only)
router.get('/test-profile/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        portfolioProjects: true,
        workHistory: true,
        employmentHistory: true,
        languages: true,
        skills: true,
        coverImage: true
      }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Test the transformation logic
    const portfolio = Array.isArray(user.portfolioProjects) && user.portfolioProjects.length > 0 ? user.portfolioProjects.map((project: any) => ({
      id: project.id || Math.random(),
      title: project.title || '',
      description: project.description || '',
      image: (Array.isArray(project.images) && project.images.length > 0 ? project.images[0] : project.image || '/placeholder.svg'),
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      url: project.liveUrl || project.sourceUrl || project.url || '',
      client: project.client || '',
      completion: project.completionDate || project.completion || ''
    })) : [];

    const workHistory = (() => {
      // Only use workHistory for the work history tab, don't fall back to employmentHistory
      const workData = Array.isArray(user.workHistory) ? user.workHistory : [];
      
      return workData.map((work: any) => ({
        id: work.id || Math.random(),
        title: work.title || work.position || '',
        client: work.client || work.company || '',
        clientRating: work.clientRating || 5.0,
        budget: work.budget || '',
        duration: work.duration || '',
        completedDate: work.completedDate || work.endDate || '',
        feedback: work.feedback || work.description || '',
        skills: Array.isArray(work.skills) ? work.skills : Array.isArray(work.technologies) ? work.technologies : []
      }));
    })();

    res.json({
      success: true,
      original: {
        portfolioProjects: user.portfolioProjects,
        workHistory: user.workHistory,
        employmentHistory: user.employmentHistory,
        languages: user.languages,
        skills: user.skills,
        coverImage: user.coverImage
      },
      transformed: {
        portfolio,
        workHistory,
        languages: Array.isArray(user.languages) ? user.languages.map((lang: any) => ({
          name: lang.language || lang.name || 'Unknown',
          level: lang.proficiency || lang.level || 'Basic'
        })) : [],
        skills: Array.isArray(user.skills) ? user.skills.map((skill: any) => ({
          name: skill.name || skill,
          level: skill.level || 'Intermediate',
          yearsOfExperience: skill.yearsOfExperience || 1
        })) : []
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

export default router; 