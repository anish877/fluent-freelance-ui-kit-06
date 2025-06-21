import express, { Request, Response, NextFunction, Router } from 'express';
import crypto from 'crypto';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import { protect, AuthRequest } from '../middleware/auth';

const router: Router = express.Router();

// Helper functions for password hashing
const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ':' + derivedKey.toString('hex'));
    });
  });
};

const verifyPassword = (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('hex'));
    });
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('userType').isIn(['FREELANCER', 'CLIENT']).withMessage('User type must be FREELANCER or CLIENT')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password, firstName, lastName, userType, ...otherFields } = req.body;

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        userType,
        ...otherFields
      },
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
      }
    });

    // Create token
    const signOptions: SignOptions = { expiresIn: process.env.JWT_EXPIRES_IN as any || '7d' };
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as Secret,
      signOptions
    );

    res.status(201).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    // Check for user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Create token
    const signOptions: SignOptions = { expiresIn: process.env.JWT_EXPIRES_IN as any || '7d' };
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as Secret,
      signOptions
    );

    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      phone: user.phone,
      skills: user.skills,
      hourlyRate: user.hourlyRate,
      portfolio: user.portfolio,
      experience: user.experience,
      education: user.education,
      certifications: user.certifications,
      companyName: user.companyName,
      companySize: user.companySize,
      industry: user.industry,
      createdAt: user.createdAt
    };

    res.json({
      success: true,
      token,
      user: userResponse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect as any, (async (req: AuthRequest, res: Response) => {
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
        updatedAt: true
      }
    });

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as any);

export default router; 