import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { protect, AuthRequest } from '../middleware/auth.js';


const router: Router = express.Router();

// @desc    Get all freelancers with filters
// @route   GET /api/talent
// @access  Public
router.get('/', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      search, 
      category, 
      availability, 
      rating, 
      hourlyRate,
      location,
      sortBy = 'bestMatch'
    } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {
      userType: 'FREELANCER',
      isOnboarded: true
    };
    
    // Search filter
    if (search) {
      where.OR = [
        {
          firstName: {
            contains: search as string,
            mode: 'insensitive'
          }
        },
        {
          lastName: {
            contains: search as string,
            mode: 'insensitive'
          }
        },
        {
          title: {
            contains: search as string,
            mode: 'insensitive'
          }
        },
        {
          overview: {
            contains: search as string,
            mode: 'insensitive'
          }
        }
      ];
    }
    
    // Category filter
    if (category && category !== 'all') {
      where.category = category as string;
    }
    
    // Availability filter
    if (availability && availability !== 'all') {
      where.availability = availability as string;
    }
    
    // Rating filter
    if (rating && rating !== 'all') {
      const minRating = parseFloat(rating.toString().replace('+', ''));
      where.rating = {
        gte: minRating
      };
    }
    
    // Hourly rate filter
    if (hourlyRate && hourlyRate !== 'all') {
      const [min, max] = hourlyRate.toString().split('-').map(Number);
      if (hourlyRate === '100+') {
        where.hourlyRate = {
          gte: 100
        };
      } else {
        where.hourlyRate = {
          gte: min,
          lte: max
        };
      }
    }
    
    // Location filter
    if (location) {
      where.OR = [
        {
          location: {
            contains: location as string,
            mode: 'insensitive'
          }
        },
        {
          city: {
            contains: location as string,
            mode: 'insensitive'
          }
        },
        {
          country: {
            contains: location as string,
            mode: 'insensitive'
          }
        }
      ];
    }

    // Sort options
    let orderBy: any = {};
    switch (sortBy) {
      case 'highestRated':
        orderBy = { rating: 'desc' };
        break;
      case 'mostReviews':
        orderBy = { reviewCount: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'lowestRate':
        orderBy = { hourlyRate: 'asc' };
        break;
      case 'highestRate':
        orderBy = { hourlyRate: 'desc' };
        break;
      default: // bestMatch
        orderBy = { rating: 'desc' };
    }

    const freelancers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        email: true,
        lastName: true,
        title: true,
        location: true,
        city: true,
        country: true,
        rating: true,
        reviewCount: true,
        hourlyRate: true,
        availability: true,
        skills: true,
        overview: true,
        completedJobs: true,
        totalEarnings: true,
        responseTime: true,
        languages: true,
        avatar: true,
        verified: true,
        topRatedPlus: true,
        risingTalent: true,
        portfolioItems: true,
        lastActive: true,
        successRate: true,
        onTime: true,
        onBudget: true,
        repeatHireRate: true,
        certifications: true,
        education: true,
        specializations: true,
        testScores: true,
        memberSince: true,
        profileStrength: true,
        createdAt: true
      },
      skip,
      take: Number(limit),
      orderBy
    });

    const total = await prisma.user.count({ where });


    // Transform data to match frontend interface
    const transformedFreelancers = freelancers.map(freelancer => ({
      id: freelancer.id,
      name: `${freelancer.firstName} ${freelancer.lastName}`,
      title: freelancer.title || 'Freelancer',
      email: freelancer.email || '',
      location: freelancer.location || `${freelancer.city || ''}, ${freelancer.country || ''}`.replace(/^,\s*/, '').replace(/,\s*$/, ''),
      rating: freelancer.rating || 0,
      reviewCount: freelancer.reviewCount || 0,
      hourlyRate: freelancer.hourlyRate ? `$${freelancer.hourlyRate}` : '$0',
      availability: freelancer.availability as "available" | "busy" | "offline" || "offline",
      skills: Array.isArray(freelancer.skills) ? freelancer.skills.map((s: any) => s.name || s) : [],
      description: freelancer.overview || '',
      completedJobs: freelancer.completedJobs || 0,
      totalEarnings: freelancer.totalEarnings || '$0',
      responseTime: freelancer.responseTime || 'Within 24 hours',
      languages: Array.isArray(freelancer.languages) ? freelancer.languages.map((l: any) => `${l.language} (${l.proficiency})`) : [],
      profilePicture: freelancer.avatar || '/placeholder.svg',
      verified: freelancer.verified || false,
      topRated: freelancer.topRatedPlus || false,
      risingTalent: freelancer.risingTalent || false,
      portfolio: Array.isArray(freelancer.portfolioItems) ? freelancer.portfolioItems.map((item: any) => ({
        title: item.title || '',
        image: item.image || '/placeholder.svg',
        description: item.description || '',
        category: item.category || ''
      })) : [],
      lastActive: freelancer.lastActive || 'Unknown',
      successRate: freelancer.successRate || 0,
      onTime: freelancer.onTime || 0,
      onBudget: freelancer.onBudget || 0,
      repeatHireRate: freelancer.repeatHireRate || 0,
      certifications: Array.isArray(freelancer.certifications) ? freelancer.certifications : [],
      education: Array.isArray(freelancer.education) ? freelancer.education.map((e: any) => `${e.degree} - ${e.institution}`) : [],
      specializations: Array.isArray(freelancer.specializations) ? freelancer.specializations : [],
      testScores: Array.isArray(freelancer.testScores) ? freelancer.testScores : [],
      memberSince: freelancer.memberSince || new Date(freelancer.createdAt).getFullYear().toString(),
      profileStrength: freelancer.profileStrength || 0
    }));

    res.json({
      success: true,
      data: transformedFreelancers,
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

// @desc    Get platform stats
// @route   GET /api/talent/stats
// @access  Public
router.get('/stats', (async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalFreelancers,
      averageRating,
      successRate,
      countriesCount
    ] = await Promise.all([
      prisma.user.count({
        where: {
          userType: 'FREELANCER',
          isOnboarded: true
        }
      }),
      prisma.user.aggregate({
        where: {
          userType: 'FREELANCER',
          isOnboarded: true,
          rating: { not: null }
        },
        _avg: { rating: true }
      }),
      prisma.user.aggregate({
        where: {
          userType: 'FREELANCER',
          isOnboarded: true,
          successRate: { not: null }
        },
        _avg: { successRate: true }
      }),
      prisma.user.groupBy({
        by: ['country'],
        where: {
          userType: 'FREELANCER',
          isOnboarded: true,
          country: { not: null }
        },
        _count: { country: true }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalFreelancers: totalFreelancers.toLocaleString(),
        averageRating: averageRating._avg.rating?.toFixed(1) || '4.9',
        successRate: Math.round(successRate._avg.successRate || 95),
        countriesCount: countriesCount.length
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get categories with counts
// @route   GET /api/talent/categories
// @access  Public
router.get('/categories', (async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.user.groupBy({
      by: ['category'],
      where: {
        userType: 'FREELANCER',
        isOnboarded: true,
        category: { not: null }
      },
      _count: { category: true }
    });

    const categoryMap: { [key: string]: string } = {
      'web-development': 'Web Development',
      'mobile-development': 'Mobile Development',
      'ui-ux-design': 'UI/UX Design',
      'digital-marketing': 'Digital Marketing',
      'data-science': 'Data Science & AI',
      'content-writing': 'Content Writing',
      'graphic-design': 'Graphic Design',
      'video-animation': 'Video & Animation',
      'translation': 'Translation',
      'legal': 'Legal',
      'accounting': 'Accounting',
      'consulting': 'Consulting'
    };

    const transformedCategories = categories.map(cat => ({
      value: cat.category || 'other',
      label: cat.category ? (categoryMap[cat.category] || cat.category) : 'Other',
      count: cat._count.category
    }));

    // Add "All Categories" option
    const totalCount = categories.reduce((sum, cat) => sum + cat._count.category, 0);
    transformedCategories.unshift({
      value: 'all',
      label: 'All Categories',
      count: totalCount
    });

    res.json({
      success: true,
      data: transformedCategories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Save freelancer
// @route   POST /api/talent/save/:freelancerId
// @access  Private
router.post('/save/:freelancerId', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const freelancerId = req.params.freelancerId;

    // Check if freelancer exists
    const freelancer = await prisma.user.findUnique({
      where: { id: freelancerId }
    });

    if (!freelancer || freelancer.userType !== 'FREELANCER') {
      res.status(404).json({ message: 'Freelancer not found' });
      return;
    }

    // Check if already saved
    const existingSave = await prisma.savedFreelancer.findUnique({
      where: {
        userId_freelancerId: {
          userId: req.user!.id,
          freelancerId
        }
      }
    });

    if (existingSave) {
      res.status(400).json({ message: 'Freelancer already saved' });
      return;
    }

    // Save freelancer
    const savedFreelancer = await prisma.savedFreelancer.create({
      data: {
        userId: req.user!.id,
        freelancerId
      }
    });

    res.status(201).json({
      success: true,
      data: savedFreelancer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Remove saved freelancer
// @route   DELETE /api/talent/save/:freelancerId
// @access  Private
router.delete('/save/:freelancerId', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const freelancerId = req.params.freelancerId;

    await prisma.savedFreelancer.delete({
      where: {
        userId_freelancerId: {
          userId: req.user!.id,
          freelancerId
        }
      }
    });

    res.json({
      success: true,
      message: 'Freelancer removed from saved list'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get saved freelancers
// @route   GET /api/talent/saved
// @access  Private
router.get('/saved', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const savedFreelancers = await prisma.savedFreelancer.findMany({
      where: { userId: req.user!.id },
      include: {
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            title: true,
            location: true,
            rating: true,
            reviewCount: true,
            hourlyRate: true,
            availability: true,
            skills: true,
            overview: true,
            completedJobs: true,
            totalEarnings: true,
            responseTime: true,
            languages: true,
            avatar: true,
            verified: true,
            topRatedPlus: true,
            risingTalent: true,
            portfolioItems: true,
            lastActive: true,
            successRate: true,
            onTime: true,
            onBudget: true,
            repeatHireRate: true,
            certifications: true,
            education: true,
            specializations: true,
            testScores: true,
            memberSince: true,
            profileStrength: true,
            createdAt: true
          }
        }
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.savedFreelancer.count({
      where: { userId: req.user!.id }
    });

    // Transform data to match frontend interface
    const transformedFreelancers = savedFreelancers.map(item => {
      const freelancer = item.freelancer;
      return {
        id: freelancer.id,
        name: `${freelancer.firstName} ${freelancer.lastName}`,
        title: freelancer.title || 'Freelancer',
        location: freelancer.location || '',
        rating: freelancer.rating || 0,
        reviewCount: freelancer.reviewCount || 0,
        hourlyRate: freelancer.hourlyRate ? `$${freelancer.hourlyRate}` : '$0',
        availability: freelancer.availability as "available" | "busy" | "offline" || "offline",
        skills: Array.isArray(freelancer.skills) ? freelancer.skills.map((s: any) => s.name || s) : [],
        description: freelancer.overview || '',
        completedJobs: freelancer.completedJobs || 0,
        totalEarnings: freelancer.totalEarnings || '$0',
        responseTime: freelancer.responseTime || 'Within 24 hours',
        languages: Array.isArray(freelancer.languages) ? freelancer.languages.map((l: any) => `${l.language} (${l.proficiency})`) : [],
        profilePicture: freelancer.avatar || '/placeholder.svg',
        verified: freelancer.verified || false,
        topRated: freelancer.topRatedPlus || false,
        risingTalent: freelancer.risingTalent || false,
        portfolio: Array.isArray(freelancer.portfolioItems) ? freelancer.portfolioItems.map((item: any) => ({
          title: item.title || '',
          image: item.image || '/placeholder.svg',
          description: item.description || '',
          category: item.category || ''
        })) : [],
        lastActive: freelancer.lastActive || 'Unknown',
        successRate: freelancer.successRate || 0,
        onTime: freelancer.onTime || 0,
        onBudget: freelancer.onBudget || 0,
        repeatHireRate: freelancer.repeatHireRate || 0,
        certifications: Array.isArray(freelancer.certifications) ? freelancer.certifications : [],
        education: Array.isArray(freelancer.education) ? freelancer.education.map((e: any) => `${e.degree} - ${e.institution}`) : [],
        specializations: Array.isArray(freelancer.specializations) ? freelancer.specializations : [],
        testScores: Array.isArray(freelancer.testScores) ? freelancer.testScores : [],
        memberSince: freelancer.memberSince || new Date(freelancer.createdAt).getFullYear().toString(),
        profileStrength: freelancer.profileStrength || 0
      };
    });

    res.json({
      success: true,
      data: transformedFreelancers,
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

// @desc    Get previously hired freelancers
// @route   GET /api/talent/hired
// @access  Private
router.get('/hired', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Get jobs posted by the user that have accepted proposals
    const hiredJobs = await prisma.job.findMany({
      where: {
        clientId: req.user!.id,
        status: 'IN_PROGRESS'
      },
      include: {
        proposals: {
          where: { status: 'ACCEPTED' },
          include: {
            freelancer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                title: true,
                location: true,
                rating: true,
                reviewCount: true,
                hourlyRate: true,
                availability: true,
                skills: true,
                overview: true,
                completedJobs: true,
                totalEarnings: true,
                responseTime: true,
                languages: true,
                avatar: true,
                verified: true,
                topRatedPlus: true,
                risingTalent: true,
                portfolioItems: true,
                lastActive: true,
                successRate: true,
                onTime: true,
                onBudget: true,
                repeatHireRate: true,
                certifications: true,
                education: true,
                specializations: true,
                testScores: true,
                memberSince: true,
                profileStrength: true,
                createdAt: true
              }
            }
          }
        }
      },
      skip,
      take: Number(limit)
    });

    const hiredFreelancers = hiredJobs.flatMap(job => job.proposals.map(proposal => proposal.freelancer));

    const total = await prisma.job.count({
      where: {
        clientId: req.user!.id,
        status: 'IN_PROGRESS'
      }
    });

    // Transform data to match frontend interface
    const transformedFreelancers = hiredFreelancers.map(freelancer => ({
      id: freelancer.id,
      name: `${freelancer.firstName} ${freelancer.lastName}`,
      title: freelancer.title || 'Freelancer',
      location: freelancer.location || '',
      rating: freelancer.rating || 0,
      reviewCount: freelancer.reviewCount || 0,
      hourlyRate: freelancer.hourlyRate ? `$${freelancer.hourlyRate}` : '$0',
      availability: freelancer.availability as "available" | "busy" | "offline" || "offline",
      skills: Array.isArray(freelancer.skills) ? freelancer.skills.map((s: any) => s.name || s) : [],
      description: freelancer.overview || '',
      completedJobs: freelancer.completedJobs || 0,
      totalEarnings: freelancer.totalEarnings || '$0',
      responseTime: freelancer.responseTime || 'Within 24 hours',
      languages: Array.isArray(freelancer.languages) ? freelancer.languages.map((l: any) => `${l.language} (${l.proficiency})`) : [],
      profilePicture: freelancer.avatar || '/placeholder.svg',
      verified: freelancer.verified || false,
      topRated: freelancer.topRatedPlus || false,
      risingTalent: freelancer.risingTalent || false,
      portfolio: Array.isArray(freelancer.portfolioItems) ? freelancer.portfolioItems.map((item: any) => ({
        title: item.title || '',
        image: item.image || '/placeholder.svg',
        description: item.description || '',
        category: item.category || ''
      })) : [],
      lastActive: freelancer.lastActive || 'Unknown',
      successRate: freelancer.successRate || 0,
      onTime: freelancer.onTime || 0,
      onBudget: freelancer.onBudget || 0,
      repeatHireRate: freelancer.repeatHireRate || 0,
      certifications: Array.isArray(freelancer.certifications) ? freelancer.certifications : [],
      education: Array.isArray(freelancer.education) ? freelancer.education.map((e: any) => `${e.degree} - ${e.institution}`) : [],
      specializations: Array.isArray(freelancer.specializations) ? freelancer.specializations : [],
      testScores: Array.isArray(freelancer.testScores) ? freelancer.testScores : [],
      memberSince: freelancer.memberSince || new Date(freelancer.createdAt).getFullYear().toString(),
      profileStrength: freelancer.profileStrength || 0
    }));

    res.json({
      success: true,
      data: transformedFreelancers,
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