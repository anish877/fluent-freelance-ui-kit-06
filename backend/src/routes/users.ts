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
  body('portfolio').optional().isArray().withMessage('Portfolio must be an array'),
  body('workExperience').optional().isArray().withMessage('Work experience must be an array'),
  body('socialLinks').optional().isObject().withMessage('Social links must be an object'),
  body('responseTime').optional().notEmpty().withMessage('Response time cannot be empty'),
  body('avatar').optional().isString().withMessage('Avatar must be a string'),
  body('coverImage').optional().isString().withMessage('Cover image must be a string')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    console.log('Updating profile for user:', req.user!.id);
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Transform the data to match database field names
    const updateData: Record<string, unknown> = {};
    
    // Basic fields
    if (req.body.firstName !== undefined) updateData.firstName = req.body.firstName;
    if (req.body.lastName !== undefined) updateData.lastName = req.body.lastName;
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.overview !== undefined) updateData.overview = req.body.overview;
    if (req.body.location !== undefined) updateData.location = req.body.location;
    if (req.body.country !== undefined) updateData.country = req.body.country;
    if (req.body.city !== undefined) updateData.city = req.body.city;
    if (req.body.timezone !== undefined) updateData.timezone = req.body.timezone;
    if (req.body.phone !== undefined) updateData.phone = req.body.phone;
    if (req.body.hourlyRate !== undefined) updateData.hourlyRate = req.body.hourlyRate;
    if (req.body.availability !== undefined) updateData.availability = req.body.availability;
    if (req.body.responseTime !== undefined) updateData.responseTime = req.body.responseTime;
    if (req.body.avatar !== undefined) updateData.avatar = req.body.avatar;
    if (req.body.coverImage !== undefined) updateData.coverImage = req.body.coverImage;
    
    // Complex fields
    if (req.body.skills !== undefined) updateData.skills = req.body.skills;
    if (req.body.languages !== undefined) updateData.languages = req.body.languages;
    if (req.body.education !== undefined) updateData.education = req.body.education;
    if (req.body.certifications !== undefined) updateData.certifications = req.body.certifications;
    
    // Handle portfolio mapping - frontend sends 'portfolio' but backend expects 'portfolioProjects'
    if (req.body.portfolio !== undefined) {
      // Transform portfolio items to match backend structure
      const portfolioItems = Array.isArray(req.body.portfolio) ? req.body.portfolio.map((item: Record<string, unknown>) => ({
        title: (item.title as string) || '',
        description: (item.description as string) || '',
        image: (item.image as string) || '/placeholder.svg',
        technologies: Array.isArray(item.technologies) ? (item.technologies as string[]) : [],
        link: (item.link as string) || (item.url as string) || '',
        category: (item.category as string) || 'Web Development'
      })) : [];
      
      updateData.portfolioProjects = portfolioItems;
      console.log('Transformed portfolio items:', portfolioItems);
    }
    
    if (req.body.workExperience !== undefined) updateData.workExperience = req.body.workExperience;
    if (req.body.socialLinks !== undefined) updateData.socialLinks = req.body.socialLinks;

    console.log('Transformed update data:', JSON.stringify(updateData, null, 2));

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: updateData,
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
        portfolioProjects: true,
        testScores: true,
        specializations: true,
        memberSince: true,
        profileStrength: true,
        repeatHireRate: true,
        rating: true,
        reviewCount: true,
        coverImage: true,
        updatedAt: true
      }
    });

    console.log('Profile updated successfully for user:', req.user!.id);

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
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
      languages: Array.isArray(user.languages) ? user.languages : [],
      hourlyRate: user.hourlyRateRange || `$${user.hourlyRate || 0}`,
      availability: user.availabilityStatus || '',
      memberSince: user.memberSince || new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      lastActive: user.lastActive || 'Recently',
      isOnline: user.isOnline || false,
      verified: user.verified || false,
      topRated: user.topRatedPlus || false,
      skills: Array.isArray(user.skills) ? user.skills : [],
      overview: user.overview || '',
      portfolio: Array.isArray(user.portfolioProjects) ? user.portfolioProjects : [],
      workHistory: Array.isArray(user.workHistory) ? user.workHistory : [],
      education: Array.isArray(user.education) ? user.education : [],
      certifications: Array.isArray(user.certifications) ? user.certifications : [],
      employment: Array.isArray(user.employmentHistory) ? user.employmentHistory : []
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

export default router; 