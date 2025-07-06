import express, { Request, Response, RequestHandler, Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma.js';
import { protect, AuthRequest } from '../middleware/auth.js';

const router: Router = express.Router();

// @desc    Get conversations for current user
// @route   GET /api/messages/conversations
// @access  Private
router.get('/conversations', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          has: req.user!.email
        },
        isActive: true
      },
      select: {
        id: true,
        projectName: true,
        participants: true,
        updatedAt: true,
        createdAt: true,
        lastMessage: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            isRead: true,
            senderEmail: true,
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                userType: true
              }
            }
          }
        },
        // job: {
        //   select: {
        //     id: true,
        //     title: true
        //   }
        // }
      },
      skip,
      take: Number(limit),
      orderBy: [
        {
          lastMessage: {
            createdAt: 'desc'
          }
        },
        {
          updatedAt: 'desc'
        }
      ]
    });

    // Enrich with other participant info and unread counts
    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conv) => {
        // Get other participant
        const otherParticipantEmail = conv.participants.find(email => email !== req.user!.email);
        const otherParticipant = otherParticipantEmail ? await prisma.user.findUnique({
          where: { email: otherParticipantEmail },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            userType: true,
            companyName: true
          }
        }) : null;

        // Count unread messages in this conversation
        const unreadCount = await prisma.message.count({
          where: {
            conversationId: conv.id,
            isRead: false,
            senderEmail: { not: req.user!.email }
          }
        });

        return {
          id: conv.id,
          name: otherParticipant?.firstName,
          projectName: conv.projectName,
          otherParticipant,
          lastMessage: conv.lastMessage ? {
            ...conv.lastMessage,
            preview: conv.lastMessage.content.length > 100 
              ? conv.lastMessage.content.substring(0, 100) + '...'
              : conv.lastMessage.content
          } : null,
          unreadCount,
          // job: conv.job,
          updatedAt: conv.updatedAt,
          createdAt: conv.createdAt
        };
      })
    );

    const total = await prisma.conversation.count({
      where: {
        participants: {
          has: req.user!.email
        },
        isActive: true
      }
    });

    res.json({
      success: true,
      conversations: conversationsWithDetails,
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

// @desc    Get or create conversation between users
// @route   POST /api/messages/conversations
// @access  Private
router.post('/conversations', protect, [
  body('otherUserEmail').notEmpty().withMessage('Other user ID is required'),
  body('projectName').optional().isString().withMessage('Project name must be a string')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { otherUserEmail, jobId, projectName } = req.body;

    // Check if other user exists
    const otherUser = await prisma.user.findUnique({
      where: { email: otherUserEmail }
    });

    if (!otherUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if conversation already exists between these users
    const possibleConversations = await prisma.conversation.findMany({
      where: {
        participants: {
          hasEvery: [req.user!.email, otherUserEmail]
        },
        ...(jobId ? { jobId } : {})
      },
      include: {
        lastMessage: true
      }
    });

    // Now filter manually to ensure it's only those 2 participants
    const existingConversation = possibleConversations.find(conv => 
      conv.participants.length === 2 &&
      conv.participants.includes(req.user!.otherUserEmail) &&
      conv.participants.includes(otherUserEmail)
    );
    if (existingConversation) {
      res.json({
        success: true,
        data: existingConversation,
        message: 'Existing conversation found'
      });
      return;
    }

    // Create new conversation
    const newConversation = await prisma.conversation.create({
      data: {
        participants: [req.user!.email, otherUserEmail],
        jobId: jobId || null,
        projectName: projectName || null
      },
      // include: {
      //   job: {
      //     select: {
      //       id: true,
      //       title: true
      //     }
      //   }
      // }
    });

    res.status(201).json({
      success: true,
      data: newConversation,
      message: 'New conversation created'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get messages in a conversation
// @route   GET /api/messages/conversations/:conversationId/messages
// @access  Private
router.get('/conversations/:conversationId/messages', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log("systummm")
    const { page = 1, limit = 50 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const conversationId = req.params.conversationId;

    // Check if user is participant in this conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          has: req.user!.email
        }
      }
    });

    if (!conversation) {
      res.status(403).json({ message: 'Access denied to this conversation' });
      return;
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            userType: true
          }
        }
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    // Mark messages as read (messages sent by others to current user)
    await prisma.message.updateMany({
      where: {
        conversationId,
        isRead: false,
        senderEmail: { not: req.user!.email }
      },
      data: { isRead: true }
    });

    const total = await prisma.message.count({
      where: {
        conversationId
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
  body('conversationId').notEmpty().withMessage('Conversation ID is required'),
  body('content').notEmpty().withMessage('Message content is required').isLength({ min: 1, max: 1000 }).withMessage('Message must be between 1 and 1000 characters')
], (async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { conversationId, content } = req.body;

    // Check if user is participant in this conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          has: req.user.email
        }
      }
    });

    if (!conversation) {
      res.status(403).json({ message: 'Access denied to this conversation' });
      return;
    }

    // Get receiver ID (other participant)
    const receiverEmail = conversation.participants.find(id => id !== req.user!.email);
    if (!receiverEmail) {
      res.status(400).json({ message: 'Invalid conversation participants' });
      return;
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        senderEmail: req.user!.email,
        receiverEmail,
        conversationId
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            userType: true
          }
        }
      }
    });

    // Update conversation's last message and updatedAt
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageId: message.id,
        updatedAt: new Date()
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

// @desc    Mark conversation messages as read
// @route   PUT /api/messages/conversations/:conversationId/read
// @access  Private
router.put('/conversations/:conversationId/read', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const conversationId = req.params.conversationId;

    // Check if user is participant in this conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          has: req.user!.email
        }
      }
    });

    if (!conversation) {
      res.status(403).json({ message: 'Access denied to this conversation' });
      return;
    }

    // Mark all unread messages in this conversation as read
    const updatedCount = await prisma.message.updateMany({
      where: {
        conversationId,
        isRead: false,
        senderEmail: { not: req.user!.email } // Only messages sent by others
      },
      data: { isRead: true }
    });

    res.json({
      success: true,
      message: 'Messages marked as read',
      data: { updatedCount: updatedCount.count }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Get total unread message count
// @route   GET /api/messages/unread-count
// @access  Private
router.get('/unread-count', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const count = await prisma.message.count({
      where: {
        receiverEmail: req.user!.email,
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

// @desc    Archive/Delete conversation
// @route   DELETE /api/messages/conversations/:conversationId
// @access  Private
router.delete('/conversations/:conversationId', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const conversationId = req.params.conversationId;

    // Check if user is participant in this conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          has: req.user!.email
        }
      }
    });

    if (!conversation) {
      res.status(403).json({ message: 'Access denied to this conversation' });
      return;
    }

    // Soft delete by marking as inactive
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Conversation archived'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

// @desc    Search conversations
// @route   GET /api/messages/search
// @access  Private
router.get('/search', protect, (async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { query, limit = 10 } = req.query;

    if (!query || typeof query !== 'string') {
      res.status(400).json({ message: 'Search query is required' });
      return;
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          has: req.user!.email
        },
        isActive: true,
        OR: [
          {
            projectName: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            messages: {
              some: {
                content: {
                  contains: query,
                  mode: 'insensitive'
                }
              }
            }
          }
        ]
      },
      select: {
        id: true,
        projectName: true,
        participants: true,
        lastMessage: {
          select: {
            content: true,
            createdAt: true,
            senderEmail: true
          }
        },
        job: {
          select: {
            id: true,
            title: true
          }
        }
      },
      take: Number(limit),
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // Add other participant info
    const conversationsWithUsers = await Promise.all(
      conversations.map(async (conv) => {
        const otherParticipantId = conv.participants.find(id => id !== req.user!.email);
        const otherParticipant = otherParticipantId ? await prisma.user.findUnique({
          where: { id: otherParticipantId },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            userType: true
          }
        }) : null;

        return {
          ...conv,
          otherParticipant
        };
      })
    );


    console.log("email: ", conversationsWithUsers)

    res.json({
      success: true,
      data: conversationsWithUsers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}) as RequestHandler);

export default router;