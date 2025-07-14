import express, { Request, Response, Router } from 'express';
import { google } from 'googleapis';
import prisma from '../lib/prisma.js';
import { protect, AuthRequest } from '../middleware/auth.js';
import { generateGoogleOAuthURL } from '../lib/utils/google.js';

const router: Router = express.Router();

// @desc    Create Google Meet link for interview
// @route   POST /api/google-meet/create-meet
// @access  Private
router.post('/create-meet', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { summary, description, startTime, duration } = req.body;
    const userId = req.user!.id;

    // Validate required parameters
    if (!startTime) {
      res.status(400).json({ 
        success: false,
        message: 'Start time is required' 
      });
      return;
    }

    if (!duration || typeof duration !== 'number' || duration <= 0) {
      res.status(400).json({ 
        success: false,
        message: 'Valid duration is required (must be a positive number)' 
      });
      return;
    }

    // Get user with Google tokens
    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      select: {
        id: true,
        accessToken: true,
        refreshToken: true,
        expiresAt: true,
        email: true
      }
    });

    console.log("user", user);

    if (!user?.accessToken) {
      const redirectUrl = generateGoogleOAuthURL(userId);
      
      res.status(200).json({ 
        success: false,
        error: 'Google Calendar not connected',
        needsGoogleAuth: true,
        redirectUrl,
        message: 'Google Calendar access not configured. Please connect your Google account.' 
      });
      return;
    }

    // Create OAuth2 client
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_CALLBACK_URL
    );

    auth.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken || undefined
    });

    // Refresh token if expired and refresh token is available
    if (user.expiresAt && new Date() > user.expiresAt && user.refreshToken) {
      try {
        const { credentials } = await auth.refreshAccessToken();
        
        // Update user's tokens
        await prisma.user.update({
          where: { id: userId },
          data: {
            accessToken: credentials.access_token,
            expiresAt: credentials.expiry_date ? new Date(credentials.expiry_date) : null
          }
        });

        auth.setCredentials({ access_token: credentials.access_token });
      } catch (error) {
        console.error('Error refreshing token:', error);
        const redirectUrl = generateGoogleOAuthURL(userId);
        
        res.status(200).json({ 
          success: false,
          error: 'Google token expired',
          needsGoogleAuth: true,
          redirectUrl,
          message: 'Google token expired. Please reconnect your Google account.' 
        });
        return;
      }
    } else if (user.expiresAt && new Date() > user.expiresAt && !user.refreshToken) {
      // Token expired but no refresh token available
      const redirectUrl = generateGoogleOAuthURL(userId);
      
      res.status(200).json({ 
        success: false,
        error: 'Google token expired and no refresh token available',
        needsGoogleAuth: true,
        redirectUrl,
        message: 'Google token expired and no refresh token available. Please reconnect your Google account.' 
      });
      return;
    }

    // Create calendar event with Google Meet
    const calendar = google.calendar({ version: 'v3', auth });

    // Validate and parse the start time
    const startDateTime = new Date(startTime);
    if (isNaN(startDateTime.getTime())) {
      res.status(400).json({ 
        success: false,
        message: 'Invalid start time provided' 
      });
      return;
    }

    const endDateTime = new Date(startDateTime.getTime() + (duration * 60 * 1000));

    const event = {
      summary: summary || 'Interview',
      description: description || 'Interview meeting',
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'UTC'
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'UTC'
      },
      conferenceData: {
        createRequest: {
          requestId: `interview-${Date.now()}-${userId}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      attendees: [
        { email: user.email }
      ]
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1
    });

    const meetLink = response.data.hangoutLink;

    if (!meetLink) {
      res.status(500).json({ 
        success: false,
        message: 'Failed to create Google Meet link' 
      });
      return;
    }

    res.json({
      success: true,
      meetLink,
      eventId: response.data.id,
      startTime: response.data.start?.dateTime,
      endTime: response.data.end?.dateTime
    });

  } catch (error) {
    console.error('Error creating Google Meet:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create Google Meet link' 
    });
  }
});

// @desc    Get user's Google Calendar status
// @route   GET /api/google-meet/status
// @access  Private
router.get('/status', protect, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        accessToken: true,
        refreshToken: true,
        expiresAt: true
      }
    });

    const isConnected = !!user?.accessToken;
    const isExpired = user?.expiresAt ? new Date() > user.expiresAt : false;

    res.json({
      success: true,
      isConnected,
      isExpired,
      needsReauth: isConnected && isExpired
    });

  } catch (error) {
    console.error('Error checking Google Calendar status:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to check Google Calendar status' 
    });
  }
});

// @desc    Get Google OAuth URL for connecting calendar
// @route   GET /api/google-meet/connect-url
// @access  Private
router.get('/connect-url', protect, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const url = generateGoogleOAuthURL(userId);
    
    res.json({
      success: true,
      url
    });
  } catch (error) {
    console.error('Error generating Google OAuth URL:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to generate Google OAuth URL' 
    });
  }
});

export default router; 