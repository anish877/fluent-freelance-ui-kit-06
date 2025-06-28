import express, { Request, Response, Router, RequestHandler } from 'express';
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
        isOnboarded: true,
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
    const signOptions: SignOptions = { expiresIn: '7d' };
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as Secret,
      signOptions
    );


    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }).json({
      success: true,
      status: 200,
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
    // Check for user with password for verification
    const userWithPassword = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        userType: true,
        isOnboarded: true
      }
    });

    if (!userWithPassword) {
      res.status(404).json({ message: 'User not Found', success: false });
      return;
    }

    // Check password
    const isMatch = await verifyPassword(password, userWithPassword.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials', success: false });
      return;
    }

    // Fetch user data without password for response
    const user = await prisma.user.findUnique({
      where: { id: userWithPassword.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true,
        isOnboarded: true,
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
    const signOptions: SignOptions = { expiresIn: '7d' };
    const token = jwt.sign(
      { id: userWithPassword.id },
      process.env.JWT_SECRET as Secret,
      signOptions
    );


    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }).status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  console.log("hitted")
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true,
        isOnboarded: true,
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
}) as RequestHandler);

router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token').json({
    success: true,
    message: 'Logged out successfully'
  });
});

export default router; 