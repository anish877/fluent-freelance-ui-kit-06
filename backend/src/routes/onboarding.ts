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
      education, certifications, languages, employment 
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
        employmentHistory: employment || [],
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
        employmentHistory: true,
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
        portfolioProjects: portfolio || [],
        socialLinks,
        onboardingStep: 5
      },
      select: {
        id: true,
        portfolioProjects: true,
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
    const { 
      hourlyRate, projectBasedRates, availability, hoursPerWeek, 
      workingHours, workingDays, responseTime, minimumProjectBudget, 
      specialRequirements, coverImage, hourlyRateRange, availabilityStatus 
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        hourlyRate: hourlyRate ? parseFloat(hourlyRate.toString()) : null,
        projectBasedRates,
        availability,
        hoursPerWeek,
        workingHours,
        workingDays,
        responseTime,
        minimumProjectBudget,
        specialRequirements,
        coverImage,
        hourlyRateRange,
        availabilityStatus,
        onboardingStep: 6
      },
      select: {
        id: true,
        hourlyRate: true,
        projectBasedRates: true,
        availability: true,
        hoursPerWeek: true,
        workingHours: true,
        workingDays: true,
        responseTime: true,
        minimumProjectBudget: true,
        specialRequirements: true,
        coverImage: true,
        hourlyRateRange: true,
        availabilityStatus: true,
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
    const { 
      phoneNumber, idDocument, addressProof, taxInformation,
      agreedToTerms, agreedToPrivacy, agreedToFees 
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        phone: phoneNumber,
        idDocument,
        addressProof,
        taxInformation,
        phoneVerified: true, // Mark as verified when documents are uploaded
        onboardingStep: 7
      },
      select: {
        id: true,
        phone: true,
        idDocument: true,
        addressProof: true,
        taxInformation: true,
        phoneVerified: true,
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
    const { 
      phoneNumber, agreedToTerms, agreedToPrivacy, agreedToFees 
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        phone: phoneNumber,
        phoneVerified: true, // Mark as verified when verification is completed
        onboardingStep: 6
      },
      select: {
        id: true,
        phone: true,
        phoneVerified: true,
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

// @desc    Complete onboarding with all data from localStorage
// @route   POST /api/onboarding/complete-with-data
// @access  Public (no auth required)
router.post('/complete-with-data', [
  body('userType').isIn(['FREELANCER', 'CLIENT']).withMessage('Invalid user type'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], (async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    console.log('Received onboarding data:', JSON.stringify(req.body, null, 2));
    
    const {
      userType,
      firstName,
      lastName,
      email,
      password,
      phone,
      country,
      city,
      timezone,
      profilePhoto,
      title,
      overview,
      
      // Freelancer specific fields
      category,
      subcategory,
      experienceLevel,
      workExperience,
      education,
      certifications,
      languages,
      skills,
      topSkills,
      serviceOfferings,
      portfolio,
      socialLinks,
      hourlyRate,
      availability,
      
      // Additional freelancer fields
      projectBasedRates,
      hoursPerWeek,
      workingHours,
      workingDays,
      responseTime,
      minimumProjectBudget,
      specialRequirements,
      
      // Client specific fields
      clientType,
      howDidYouHear,
      companyName,
      companySize,
      industry,
      companyWebsite,
      companyDescription,
      projectTypes,
      preferredSkills,
      budgetRange,
      
      // Additional client fields
      interestedCategories,
      urgencyLevel,
      preferredWorkingStyle,
      communicationPreference,
      projectDescription,
      paymentPreference,
      projectFrequency,
      averageProjectDuration,
      maxHourlyRate,
      totalMonthlyBudget
    } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('User already exists:', email);
      res.status(400).json({ message: 'User with this email already exists' });
      return;
    }

    // Hash password using the same method as auth route
    const crypto = require('crypto');
    const hashPassword = (password: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt(password, salt, 64, (err: any, derivedKey: any) => {
          if (err) reject(err);
          resolve(salt + ':' + derivedKey.toString('hex'));
        });
      });
    };
    
    const hashedPassword = await hashPassword(password);
    console.log('Password hashed successfully');

    // Create user with all onboarding data
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        avatar: profilePhoto,
        phone,
        country,
        city,
        timezone,
        title,
        overview,
        userType,
        isOnboarded: true,
        onboardingStep: userType === 'FREELANCER' ? 8 : 7,
        
        // Freelancer fields
        category,
        subcategory,
        experienceLevel,
        workExperience: workExperience || [],
        education: education || [],
        certifications: certifications || [],
        languages: languages || [],
        skills,
        topSkills: topSkills || [],
        serviceOfferings: serviceOfferings || [],
        portfolioProjects: portfolio || [],
        socialLinks,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate.toString()) : null,
        availability,
        
        // Additional freelancer fields
        projectBasedRates,
        hoursPerWeek,
        workingHours,
        workingDays: workingDays || [],
        responseTime,
        minimumProjectBudget,
        specialRequirements,
        
        // Client fields
        clientType,
        howDidYouHear,
        companyName,
        companySize,
        industry,
        companyWebsite,
        companyDescription,
        projectTypes: projectTypes || [],
        preferredSkills: preferredSkills || [],
        budgetRange,
        
        // Additional client fields
        interestedCategories: interestedCategories || [],
        urgencyLevel,
        preferredWorkingStyle,
        communicationPreference: communicationPreference || [],
        projectDescription,
        paymentPreference,
        projectFrequency,
        averageProjectDuration,
        maxHourlyRate,
        totalMonthlyBudget
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true,
        isOnboarded: true,
        onboardingStep: true,
        avatar: true,
        title: true,
        overview: true,
        skills: true,
        hourlyRate: true,
        portfolioProjects: true,
        companyName: true,
        companySize: true,
        industry: true
      }
    });

    console.log('User created successfully:', user.id);

    // Generate JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    console.log('JWT token generated');

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.status(201).json({
      success: true,
      user,
      token
    });
  } catch (error) {
    console.error('Error in complete-with-data:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ message: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}) as RequestHandler);

export default router; 