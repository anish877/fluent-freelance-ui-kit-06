// utils/jwt.ts
import jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

export interface JWTPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  isOnboarded: boolean;
}

export const generateToken = (user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  isOnboarded: boolean;
}): string => {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType,
    isOnboarded: user.isOnboarded,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
};