import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { protect, AuthRequest } from '../middleware/auth.js';

const router: Router = express.Router();

// @desc    Create job invitation
// @route   POST /api/job-invitations
// @access  Private (Clients only)
router.post('/', protect, [
  body('jobId').notEmpty().withMessage('Job ID is required'),
  body('freelancerEmail').isEmail().withMessage('Valid freelancer email is required'),
  body('message').optional().isString().withMessage('Message must be a string')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { jobId, freelancerEmail, message } = req.body;

    // Check if user is a client
    if (req.user!.userType !== 'CLIENT') {
      res.status(403).json({ message: 'Only clients can send job invitations' });
      return;
    }

    // Check if job exists and belongs to the client
    const job = await prisma.job.findFirst({
      where: { 
        id: jobId,
        clientId: req.user!.id,
        status: 'OPEN'
      }
    });

    if (!job) {
      res.status(404).json({ message: 'Job not found or not accessible' });
      return;
    }

    // Check if freelancer exists
    const freelancer = await prisma.user.findUnique({
      where: { email: freelancerEmail }
    });

    if (!freelancer) {
      res.status(404).json({ message: 'Freelancer not found' });
      return;
    }

    if (freelancer.userType !== 'FREELANCER') {
      res.status(400).json({ message: 'User is not a freelancer' });
      return;
    }

    // Check if invitation already exists
    const existingInvitation = await prisma.jobInvitation.findFirst({
      where: {
        jobId,
        freelancerEmail,
        status: { in: ['PENDING', 'ACCEPTED'] }
      }
    });

    if (existingInvitation) {
      res.status(400).json({ message: 'Job invitation already sent to this freelancer' });
      return;
    }

    // Create job invitation
    const invitation = await prisma.jobInvitation.create({
      data: {
        jobId,
        clientId: req.user!.id,
        freelancerEmail,
        message: message || null,
        status: 'PENDING'
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            description: true,
            budget: true,
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                companyName: true
              }
            }
          }
        },
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            companyName: true
          }
        }
      }
    });

    // Create notification for freelancer
    await prisma.notification.create({
      data: {
        title: 'New Job Invitation',
        message: `You've been invited to work on "${job.title}"`,
        type: 'JOB_INVITATION',
        userId: freelancer.id
      }
    });

    res.status(201).json({
      success: true,
      data: invitation,
      message: 'Job invitation sent successfully'
    });
  } catch (error) {
    console.error('Error creating job invitation:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get job invitations for freelancer
// @route   GET /api/job-invitations/freelancer
// @access  Private (Freelancers only)
router.get('/freelancer', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.userType !== 'FREELANCER') {
      res.status(403).json({ message: 'Only freelancers can view job invitations' });
      return;
    }

    const invitations = await prisma.jobInvitation.findMany({
      where: {
        freelancerEmail: req.user!.email,
        status: { in: ['PENDING', 'ACCEPTED', 'REJECTED'] }
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            description: true,
            budget: true,
            skills: true,
            category: true,
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                companyName: true,
                avatar: true
              }
            }
          }
        },
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            companyName: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: invitations
    });
  } catch (error) {
    console.error('Error fetching job invitations:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get job invitations for client
// @route   GET /api/job-invitations/client
// @access  Private (Clients only)
router.get('/client', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.userType !== 'CLIENT') {
      res.status(403).json({ message: 'Only clients can view their job invitations' });
      return;
    }

    const invitations = await prisma.jobInvitation.findMany({
      where: {
        clientId: req.user!.id
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            budget: true
          }
        },
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            skills: true,
            hourlyRate: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: invitations
    });
  } catch (error) {
    console.error('Error fetching client job invitations:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Accept job invitation
// @route   PUT /api/job-invitations/:id/accept
// @access  Private (Freelancers only)
router.put('/:id/accept', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const invitationId = req.params.id;

    if (req.user!.userType !== 'FREELANCER') {
      res.status(403).json({ message: 'Only freelancers can accept job invitations' });
      return;
    }

    const invitation = await prisma.jobInvitation.findFirst({
      where: {
        id: invitationId,
        freelancerEmail: req.user!.email,
        status: 'PENDING'
      },
      include: {
        job: true
      }
    });

    if (!invitation) {
      res.status(404).json({ message: 'Job invitation not found or already processed' });
      return;
    }

    // Update invitation status
    await prisma.jobInvitation.update({
      where: { id: invitationId },
      data: { status: 'ACCEPTED' }
    });

    // Create proposal automatically
    const proposal = await prisma.proposal.create({
      data: {
        jobId: invitation.jobId,
        freelancerId: req.user!.id,
        coverLetter: `I'm interested in working on this project. ${invitation.message || ''}`,
        bidAmount: Number(invitation.job.budget) || 0,
        estimatedDuration: 'To be discussed',
        status: 'PENDING'
      }
    });

    // Create notification for client
    await prisma.notification.create({
      data: {
        title: 'Job Invitation Accepted',
        message: `${req.user!.firstName} has accepted your job invitation for "${invitation.job.title}"`,
        type: 'PROPOSAL_ACCEPTED',
        userId: invitation.clientId
      }
    });

    res.json({
      success: true,
      data: { invitation, proposal },
      message: 'Job invitation accepted and proposal created'
    });
  } catch (error) {
    console.error('Error accepting job invitation:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Reject job invitation
// @route   PUT /api/job-invitations/:id/reject
// @access  Private (Freelancers only)
router.put('/:id/reject', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const invitationId = req.params.id;

    if (req.user!.userType !== 'FREELANCER') {
      res.status(403).json({ message: 'Only freelancers can reject job invitations' });
      return;
    }

    const invitation = await prisma.jobInvitation.findFirst({
      where: {
        id: invitationId,
        freelancerEmail: req.user!.email,
        status: 'PENDING'
      },
      include: {
        job: true
      }
    });

    if (!invitation) {
      res.status(404).json({ message: 'Job invitation not found or already processed' });
      return;
    }

    // Update invitation status
    await prisma.jobInvitation.update({
      where: { id: invitationId },
      data: { status: 'REJECTED' }
    });

    // Create notification for client
    await prisma.notification.create({
      data: {
        title: 'Job Invitation Declined',
        message: `${req.user!.firstName} has declined your job invitation for "${invitation.job.title}"`,
        type: 'PROPOSAL_REJECTED',
        userId: invitation.clientId
      }
    });

    res.json({
      success: true,
      message: 'Job invitation rejected'
    });
  } catch (error) {
    console.error('Error rejecting job invitation:', error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

export default router; 