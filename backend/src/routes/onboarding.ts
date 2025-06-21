import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import { protect, AuthRequest } from '../middleware/auth';

const router: Router = express.Router();

// @desc    Get onboarding progress
// @route   GET /api/onboarding/progress
// @access  Private
router.get('/progress', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        userType: true,
        isOnboarded: true,
        onboardingStep: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        bio: true,
        location: true,
        phone: true,
        country: true,
        city: true,
        timezone: true,
        title: true,
        overview: true,
        // Freelancer fields
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
        // Client fields
        companyName: true,
        companySize: true,
        industry: true,
        companyWebsite: true,
        companyDescription: true,
        projectTypes: true,
        preferredSkills: true,
        budgetRange: true,
        clientType: true,
        howDidYouHear: true
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

// @desc    Update user type selection
// @route   PUT /api/onboarding/user-type
// @access  Private
router.put('/user-type', protect, [
  body('userType').isIn(['FREELANCER', 'CLIENT']).withMessage('Invalid user type')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { userType } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        userType,
        onboardingStep: 1
      },
      select: {
        id: true,
        userType: true,
        onboardingStep: true
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

// @desc    Update freelancer basic info
// @route   PUT /api/onboarding/freelancer/basic
// @access  Private
router.put('/freelancer/basic', protect, [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('title').notEmpty().withMessage('Professional title is required'),
  body('overview').isLength({ min: 100 }).withMessage('Overview must be at least 100 characters')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { 
      firstName, lastName, email, phone, country, city, timezone, 
      profilePhoto, title, overview 
    } = req.body;

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
        avatar: profilePhoto,
        title,
        overview,
        userType: 'FREELANCER',
        onboardingStep: 2
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
        avatar: true,
        title: true,
        overview: true,
        userType: true,
        onboardingStep: true
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

// @desc    Update freelancer professional info
// @route   PUT /api/onboarding/freelancer/professional
// @access  Private
router.put('/freelancer/professional', protect, [
  body('category').notEmpty().withMessage('Category is required'),
  body('subcategory').notEmpty().withMessage('Subcategory is required'),
  body('experienceLevel').notEmpty().withMessage('Experience level is required')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { 
      category, subcategory, experienceLevel, workExperience, 
      education, certifications, languages 
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        category,
        subcategory,
        experienceLevel,
        workExperience: workExperience || [],
        education: education || [],
        certifications: certifications || [],
        languages: languages || [],
        onboardingStep: 3
      },
      select: {
        id: true,
        category: true,
        subcategory: true,
        experienceLevel: true,
        workExperience: true,
        education: true,
        certifications: true,
        languages: true,
        onboardingStep: true
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

// @desc    Update freelancer skills and experience
// @route   PUT /api/onboarding/freelancer/skills
// @access  Private
router.put('/freelancer/skills', protect, [
  body('skills').isArray({ min: 1 }).withMessage('At least one skill is required'),
  body('topSkills').isArray({ min: 1 }).withMessage('At least one top skill is required'),
  body('serviceOfferings').isArray({ min: 1 }).withMessage('At least one service offering is required')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { skills, topSkills, serviceOfferings } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        skills,
        topSkills,
        serviceOfferings,
        onboardingStep: 4
      },
      select: {
        id: true,
        skills: true,
        topSkills: true,
        serviceOfferings: true,
        onboardingStep: true
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

// @desc    Update freelancer portfolio
// @route   PUT /api/onboarding/freelancer/portfolio
// @access  Private
router.put('/freelancer/portfolio', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { portfolio, socialLinks } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        portfolio,
        socialLinks,
        onboardingStep: 5
      },
      select: {
        id: true,
        portfolio: true,
        socialLinks: true,
        onboardingStep: true
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

// @desc    Update freelancer rates and availability
// @route   PUT /api/onboarding/freelancer/rates
// @access  Private
router.put('/freelancer/rates', protect, [
  body('hourlyRate').isFloat({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('availability').notEmpty().withMessage('Availability is required')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { hourlyRate, availability } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        hourlyRate,
        availability,
        onboardingStep: 6
      },
      select: {
        id: true,
        hourlyRate: true,
        availability: true,
        onboardingStep: true
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

// @desc    Update freelancer verification
// @route   PUT /api/onboarding/freelancer/verification
// @access  Private
router.put('/freelancer/verification', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // This step is mainly for verification documents and identity verification
    // For now, we'll just mark the step as complete
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        onboardingStep: 7
      },
      select: {
        id: true,
        onboardingStep: true
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

// @desc    Update client basic info
// @route   PUT /api/onboarding/client/basic
// @access  Private
router.put('/client/basic', protect, [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('clientType').notEmpty().withMessage('Client type is required')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { 
      firstName, lastName, email, phone, country, city, timezone, 
      profilePhoto, clientType, howDidYouHear 
    } = req.body;

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
        avatar: profilePhoto,
        clientType,
        howDidYouHear,
        userType: 'CLIENT',
        onboardingStep: 2
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
        avatar: true,
        clientType: true,
        howDidYouHear: true,
        userType: true,
        onboardingStep: true
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

// @desc    Update client company info
// @route   PUT /api/onboarding/client/company
// @access  Private
router.put('/client/company', protect, [
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('companySize').notEmpty().withMessage('Company size is required'),
  body('industry').notEmpty().withMessage('Industry is required')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { 
      companyName, companySize, industry, companyWebsite, companyDescription 
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        companyName,
        companySize,
        industry,
        companyWebsite,
        companyDescription,
        onboardingStep: 3
      },
      select: {
        id: true,
        companyName: true,
        companySize: true,
        industry: true,
        companyWebsite: true,
        companyDescription: true,
        onboardingStep: true
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

// @desc    Update client project needs
// @route   PUT /api/onboarding/client/projects
// @access  Private
router.put('/client/projects', protect, [
  body('projectTypes').isArray({ min: 1 }).withMessage('At least one project type is required'),
  body('preferredSkills').isArray({ min: 1 }).withMessage('At least one preferred skill is required')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { projectTypes, preferredSkills } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        projectTypes,
        preferredSkills,
        onboardingStep: 4
      },
      select: {
        id: true,
        projectTypes: true,
        preferredSkills: true,
        onboardingStep: true
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

// @desc    Update client budget and timeline
// @route   PUT /api/onboarding/client/budget
// @access  Private
router.put('/client/budget', protect, [
  body('budgetRange').notEmpty().withMessage('Budget range is required')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { budgetRange } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        budgetRange,
        onboardingStep: 5
      },
      select: {
        id: true,
        budgetRange: true,
        onboardingStep: true
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

// @desc    Update client verification
// @route   PUT /api/onboarding/client/verification
// @access  Private
router.put('/client/verification', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // This step is mainly for verification documents and identity verification
    // For now, we'll just mark the step as complete
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        onboardingStep: 6
      },
      select: {
        id: true,
        onboardingStep: true
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

// @desc    Complete onboarding
// @route   PUT /api/onboarding/complete
// @access  Private
router.put('/complete', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { userType: true }
    });

    const finalStep = user?.userType === 'FREELANCER' ? 8 : 7;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        isOnboarded: true,
        onboardingStep: finalStep
      },
      select: {
        id: true,
        userType: true,
        isOnboarded: true,
        onboardingStep: true
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

export default router; 