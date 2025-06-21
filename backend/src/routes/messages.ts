import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import { protect, AuthRequest } from '../middleware/auth';

const router: Router = express.Router();

// @desc    Get conversations for current user
// @route   GET /api/messages/conversations
// @access  Private
router.get('/conversations', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const conversations = await prisma.$queryRaw`
      SELECT DISTINCT 
        CASE 
          WHEN m.sender_id = ${req.user!.id} THEN m.receiver_id
          ELSE m.sender_id
        END as other_user_id,
        CASE 
          WHEN m.sender_id = ${req.user!.id} THEN m.receiver_id
          ELSE m.sender_id
        END as conversation_id,
        m.content as last_message,
        m.created_at as last_message_time,
        m.is_read
      FROM messages m
      WHERE m.sender_id = ${req.user!.id} OR m.receiver_id = ${req.user!.id}
      AND m.id IN (
        SELECT MAX(id) 
        FROM messages 
        WHERE (sender_id = ${req.user!.id} AND receiver_id = m.receiver_id)
           OR (sender_id = m.sender_id AND receiver_id = ${req.user!.id})
        GROUP BY 
          CASE 
            WHEN sender_id = ${req.user!.id} THEN receiver_id
            ELSE sender_id
          END
      )
      ORDER BY m.created_at DESC
    `;

    // Get user details for each conversation
    const conversationsWithUsers = await Promise.all(
      (conversations as any[]).map(async (conv: any) => {
        const user = await prisma.user.findUnique({
          where: { id: conv.other_user_id },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            userType: true,
            companyName: true
          }
        });
        return {
          ...conv,
          user
        };
      })
    );

    res.json({
      success: true,
      data: conversationsWithUsers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get messages between two users
// @route   GET /api/messages/conversation/:userId
// @access  Private
router.get('/conversation/:userId', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: req.user!.id,
            receiverId: req.params.userId
          },
          {
            senderId: req.params.userId,
            receiverId: req.user!.id
          }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        senderId: req.params.userId,
        receiverId: req.user!.id,
        isRead: false
      },
      data: { isRead: true }
    });

    const total = await prisma.message.count({
      where: {
        OR: [
          {
            senderId: req.user!.id,
            receiverId: req.params.userId
          },
          {
            senderId: req.params.userId,
            receiverId: req.user!.id
          }
        ]
      }
    });

    res.json({
      success: true,
      data: messages.reverse(), // Return in chronological order
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

// @desc    Send message
// @route   POST /api/messages
// @access  Private
router.post('/', protect, [
  body('receiverId').notEmpty().withMessage('Receiver ID is required'),
  body('content').notEmpty().withMessage('Message content is required'),
  body('jobId').optional().notEmpty().withMessage('Job ID cannot be empty')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    // Check if receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: req.body.receiverId }
    });

    if (!receiver) {
      res.status(404).json({ message: 'Receiver not found' });
      return;
    }

    // Check if job exists if jobId is provided
    if (req.body.jobId) {
      const job = await prisma.job.findUnique({
        where: { id: req.body.jobId }
      });

      if (!job) {
        res.status(404).json({ message: 'Job not found' });
        return;
      }
    }

    const message = await prisma.message.create({
      data: {
        content: req.body.content,
        senderId: req.user!.id,
        receiverId: req.body.receiverId,
        jobId: req.body.jobId || null
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Mark messages as read
// @route   PUT /api/messages/read
// @access  Private
router.put('/read', protect, [
  body('senderId').notEmpty().withMessage('Sender ID is required')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    await prisma.message.updateMany({
      where: {
        senderId: req.body.senderId,
        receiverId: req.user!.id,
        isRead: false
      },
      data: { isRead: true }
    });

    res.json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get unread message count
// @route   GET /api/messages/unread-count
// @access  Private
router.get('/unread-count', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const count = await prisma.message.count({
      where: {
        receiverId: req.user!.id,
        isRead: false
      }
    });

    res.json({
      success: true,
      data: { count }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

export default router; 