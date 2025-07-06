import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from "../lib/prisma"
import { User } from '@prisma/client';
// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        location: true,
        phone: true,
        userType: true,
        isOnboarded: true,
        onboardingStep: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    
    if (!user) {

      return done(null, false);
    }
    
    done(null, user);
  } catch (error) {
    console.error('❌ Error deserializing user:', error);
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    
    const email = profile.emails?.[0]?.value;
    const googleId = profile.id;
    
    if (!email) {
      console.log('❌ No email found in Google profile');
      return done(new Error('No email found in Google profile'));
    }

    // Check if user exists with this Google ID
    let user = await prisma.user.findUnique({
      where: { googleId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        location: true,
        phone: true,
        userType: true,
        isOnboarded: true,
        onboardingStep: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (user) {
      return done(null, user);
    }

    // Check if user exists with this email (link accounts)
    user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        location: true,
        phone: true,
        userType: true,
        isOnboarded: true,
        onboardingStep: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (user) {
      // Link the Google account to existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: { 
          googleId,
          avatar: user.avatar || profile.photos?.[0]?.value 
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          avatar: true,
          bio: true,
          location: true,
          phone: true,
          userType: true,
          isOnboarded: true,
          onboardingStep: true,
          createdAt: true,
          updatedAt: true,
        }
      });
      

      return done(null, user);
    }

    // Create new user

    const names = profile.displayName?.split(' ') || [];
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    user = await prisma.user.create({
      data: {
        googleId,
        email,
        firstName,
        lastName,
        avatar: profile.photos?.[0]?.value,
        password: '', // Empty password for OAuth users
        userType: 'FREELANCER', // Default, they can change during onboarding
        isOnboarded: false,
        onboardingStep: 0,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        location: true,
        phone: true,
        userType: true,
        isOnboarded: true,
        onboardingStep: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return done(null, user);

  } catch (error) {
    console.error('❌ Google OAuth error:', error);
    return done(error);
  }
}));

export default passport;