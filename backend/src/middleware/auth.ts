import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  // Get token from cookie instead of header
  token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // Get user from the token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
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
          industry: true
        }
      });

      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized' });
      return;
    }
  }


export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    if (!roles.includes(req.user.userType)) {
      res.status(403).json({ 
        message: `User type ${req.user.userType} is not authorized to access this route` 
      });
      return;
    }

    next();
  };
}; 