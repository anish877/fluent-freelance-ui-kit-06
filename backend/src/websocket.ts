import { WebSocketServer, WebSocket } from "ws";
import prisma from "./lib/prisma.js";

console.log("🚀 Starting WebSocket server initialization...");

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: "text" | "file" | "image";
}

interface Conversation {
  id: string;
  participants: string[];
  projectName: string;
  lastMessage?: Message;
  createdAt: string;
}

interface WSMessage {
  type:
    | "authenticate"
    | "join_conversation"
    | "authentication_success"
    | "send_message"
    | "typing"
    | "stop_typing"
    | "user_online"
    | "user_offline"
    | "interview_scheduled"
    | "interview_status_updated"
    | "interview_rescheduled"
    | "interview_invitation_sent"
    | "interview_invitation_updated";
  payload: any;
}

interface ClientConnection {
  ws: any;
  userEmail: string;
  userName: string;
  conversationId?: string;
  authenticated: boolean;
}
interface OnlineUsers {
  userEmail: string;
  userName: string;
}

const connections = new Map<string, ClientConnection>();
const conversationRooms = new Map<string, Set<string>>();

console.log("📊 Initialized connection maps and room management");

// WebSocket Server - will be attached to main server
const wss = new WebSocketServer({ noServer: true });

console.log("🌐 WebSocket server instance created");

// Utility functions
// Enhanced broadcast function with switch for global/room broadcasting
const broadcast = (
  message: any,
  options: {
    type: 'room' | 'global' | 'users';
    conversationId?: string;
    excludeUserEmail?: string;
    targetUsers?: string[]; // For broadcasting to specific users
  }
) => {
  const { type, conversationId, excludeUserEmail, targetUsers } = options;
  
  console.log(`📢 Broadcasting message type: ${message.type} with mode: ${type}`);
  
  let targetUserEmails: string[] = [];
  
  switch (type) {
    case 'room':
      // Original room-based broadcasting
      if (!conversationId) {
        console.log(`❌ Room broadcast requires conversationId`);
        return;
      }
      
      const room = conversationRooms.get(conversationId);
      if (!room) {
        console.log(`❌ No room found for conversation ${conversationId}`);
        return;
      }
      
      targetUserEmails = Array.from(room);
      console.log(`👥 Room ${conversationId} has ${targetUserEmails.length} participants: ${targetUserEmails.join(', ')}`);
      break;
      
    case 'global':
      // Broadcast to all connected users
      targetUserEmails = Array.from(connections.keys());
      console.log(`🌍 Global broadcast to ${targetUserEmails.length} connected users`);
      break;
      
    case 'users':
      // Broadcast to specific users
      if (!targetUsers || targetUsers.length === 0) {
        console.log(`❌ Users broadcast requires targetUsers array`);
        return;
      }
      
      targetUserEmails = targetUsers;
      console.log(`🎯 Targeted broadcast to ${targetUserEmails.length} specific users: ${targetUserEmails.join(', ')}`);
      break;
      
    default:
      console.log(`❌ Unknown broadcast type: ${type}`);
      return;
  }
  
  // Filter out excluded user
  if (excludeUserEmail) {
    targetUserEmails = targetUserEmails.filter(email => email !== excludeUserEmail);
    console.log(`⏭️ Excluding user: ${excludeUserEmail}`);
  }
  
  console.log(`📤 Sending to ${targetUserEmails.length} users`);
  
  // Send message to all target users
  let successCount = 0;
  let failCount = 0;
  
  targetUserEmails.forEach((userEmail) => {
    const connection = connections.get(userEmail);
    if (connection && connection.ws.readyState === 1) {
      try {
        connection.ws.send(JSON.stringify(message));
        successCount++;
        console.log(`✅ Message sent to ${userEmail}`);
      } catch (error) {
        failCount++;
        console.log(`❌ Failed to send to ${userEmail}:`, error);
      }
    } else {
      failCount++;
      console.log(`❌ Cannot send to ${userEmail} - connection not available or closed`);
    }
  });
  
  console.log(`📊 Broadcast complete: ${successCount} successful, ${failCount} failed`);
};

// Helper function for room broadcasting (backward compatibility)
const broadcastToRoom = (
  conversationId: string,
  message: any,
  excludeUserEmail?: string
) => {
  broadcast(message, {
    type: 'room',
    conversationId,
    excludeUserEmail
  });
};

// Helper function for global broadcasting
const broadcastGlobal = (
  message: any,
  excludeUserEmail?: string
) => {
  broadcast(message, {
    type: 'global',
    excludeUserEmail
  });
};

// Helper function for broadcasting to specific users
const broadcastToUsers = (
  userEmails: string[],
  message: any,
  excludeUserEmail?: string
) => {
  broadcast(message, {
    type: 'users',
    targetUsers: userEmails,
    excludeUserEmail
  });
};

const addUserToRoom = (conversationId: string, userEmail: string) => {
  console.log(`➕ Adding user ${userEmail} to room ${conversationId}`);
  
  if (!conversationRooms.has(conversationId)) {
    console.log(`🆕 Creating new room for conversation ${conversationId}`);
    conversationRooms.set(conversationId, new Set());
  }
  
  conversationRooms.get(conversationId)!.add(userEmail);
  console.log(`✅ User ${userEmail} added to room. Room size: ${conversationRooms.get(conversationId)!.size}`);
};

const removeUserFromRoom = (conversationId: string, userEmail: string) => {
  console.log(`➖ Removing user ${userEmail} from room ${conversationId}`);
  
  const room = conversationRooms.get(conversationId);
  if (room) {
    room.delete(userEmail);
    console.log(`✅ User removed. Room size: ${room.size}`);
    
    if (room.size === 0) {
      console.log(`🗑️ Room ${conversationId} is empty, deleting room`);
      conversationRooms.delete(conversationId);
    }
  } else {
    console.log(`❌ Room ${conversationId} not found when trying to remove user ${userEmail}`);
  }
};

// Replace getConversationMessages function
const getConversationMessages = async (conversationId: string) => {
  console.log(`💬 Fetching messages for conversation ${conversationId}`);
  
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    
    console.log(`✅ Found ${messages.length} messages for conversation ${conversationId}`);
    return messages;
  } catch (error) {
    console.error(`❌ Error fetching messages for conversation ${conversationId}:`, error);
    throw error;
  }
};

const sendError = (ws: any, message: string, code = 4000) => {
  console.log(`❌ Sending error to client: ${message} (code: ${code})`);
  
  if (ws.readyState === 1) { // WebSocket.OPEN = 1
    ws.send(
      JSON.stringify({
        type: "error",
        payload: { message, code },
      })
    );
    console.log(`✅ Error message sent successfully`);
  } else {
    console.log(`❌ Cannot send error - WebSocket is not open`);
  }
};

// WebSocket connection handler
wss.on("connection", (ws: WebSocket, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`🔌 New WebSocket connection from ${ip}`);
  console.log(`📊 Total active connections: ${connections.size + 1}`);

  let currentConnection: ClientConnection | null = null;
  let isAuthenticated = false;
  let heartbeatInterval: NodeJS.Timeout;

  console.log(`📤 Sending connection established message to ${ip}`);

  // Send initial connection success
  ws.send(
    JSON.stringify({
      type: "connection_established",
      payload: { message: "Connected to server. Please authenticate." },
    })
  );

  console.log(`💓 Starting heartbeat for connection ${ip}`);

  // Heartbeat to keep connection alive
  heartbeatInterval = setInterval(() => {
    if (ws.readyState === 1) { // WebSocket.OPEN = 1
      console.log(`💓 Sending ping to ${currentConnection?.userEmail || ip}`);
      ws.ping();
    } else {
      console.log(`💔 Heartbeat failed - connection closed for ${currentConnection?.userEmail || ip}`);
    }
  }, 30000);

  ws.on("message", (data: any) => {
    console.log(`📨 Received message from ${currentConnection?.userEmail || ip}`);
    console.log(`📨 Raw message data:`, data.toString());
    
    try {
      const message: WSMessage = JSON.parse(data.toString());
      console.log(`📨 Parsed message type: ${message.type}`);
      console.log(`📨 Message payload:`, message.payload);

      // Handle authentication first
      if (!isAuthenticated && message.type !== "authenticate") {
        console.log(`🚫 Unauthenticated user trying to send ${message.type} message`);
        sendError(
          ws,
          "Authentication required. Please send authenticate message first.",
          4001
        );
        return;
      }

      

      switch (message.type) {
        case "authenticate":
          console.log(`🔐 Processing authentication request`);
          (async () => {
            const { userEmail, userName, conversationId } = message.payload;
            console.log(`🔐 Authenticating user: ${userEmail} (${userName})`);

          try {
            console.log(`🔍 Looking up user in database: ${userEmail}`);
            
            // Verify user exists in database
            const user = await prisma.user.findUnique({
              where: { email: userEmail },
            });

            if (!user) {
              console.log(`❌ User not found in database: ${userEmail}`);
              sendError(ws, "User not found", 4004);
              return;
            }

            console.log(`✅ User found in database: ${user.id} - ${user.firstName} ${user.lastName}`);

            // Create authenticated connection
            currentConnection = {
              ws,
              userEmail,
              userName,
              authenticated: true,
            };
            
            console.log(`💾 Storing connection for user: ${userEmail}`);
            connections.set(userEmail, currentConnection);
            isAuthenticated = true;

            console.log(`✅ Authentication successful for ${userEmail}`);
            console.log(`📊 Total authenticated connections: ${connections.size}`);

            const currentOnlineUsers= Array.from(connections.values()); // Your server's online users storage
            const usersToSend = currentOnlineUsers.map((u) => ({ userEmail: u.userEmail, userName: u.userName }))
            ws.send(JSON.stringify({
              type: 'online_users_list',
              payload: {
                users: usersToSend
              }
            }));
            broadcastGlobal(
              {
                type: "user_online",
                payload: {
                  userEmail: currentConnection.userEmail,
                  userName: currentConnection.userName
                },
              }
            );
            

            if(conversationId){
              try {
                console.log(`🔍 Fetching conversation from database: ${conversationId}`);
                
                // Fetch conversation from database
                const conversation = await prisma.conversation.findUnique({
                  where: { id: conversationId },
                });
                
                if (!conversation) {
                  console.log(`❌ Conversation not found: ${conversationId}`);
                  sendError(ws, "Conversation not found", 4004);
                  return;
                }
                
                console.log(`✅ Conversation found, sending user online status: ${conversation.id}`);

                

              } catch (error){
                console.log("Error while verifying conversationId: ", error)

              }

            }

            
            // Send success response
            ws.send(JSON.stringify({
              type: "authentication_success",
              payload: { userEmail, message: "Authentication successful" }
            }));

            console.log(`📤 Authentication success message sent to ${userEmail}`);

          } catch (error) {
            console.error(`❌ Authentication error for ${userEmail}:`, error);
            sendError(ws, "Authentication failed", 4500);
          }
        })();
        break;
        
        case "user_online":
          console.log(`🟢 User online status request from ${currentConnection?.userEmail}`);
          // This is now handled in register_user, but kept for backward compatibility
          if (currentConnection) {
            console.log(`📤 Sending online status to ${currentConnection.userEmail}`);
            ws.send(
              JSON.stringify({
                type: "user_status",
                payload: { status: "online", userEmail: currentConnection.userEmail },
              })
            );
          } else {
            console.log(`❌ No current connection for user_online request`);
          }
          break;

        case "join_conversation":
          console.log(`🚪 Processing join_conversation request`);
          (async () => {
          if (!currentConnection) {
            console.log(`❌ Join conversation attempted without authentication`);
            sendError(ws, "Not authenticated", 4001);
            return;
          }

          console.log(`🚪 User ${currentConnection.userEmail} attempting to join conversation`);
          
          const { conversationId } = message.payload;
          console.log(`🚪 Target conversation ID: ${conversationId}`);
          
          try {
            console.log(`🔍 Fetching conversation from database: ${conversationId}`);
            
            // Fetch conversation from database
            const conversation = await prisma.conversation.findUnique({
              where: { id: conversationId },
              include: {
                job: {
                  select: {
                    id: true,
                    title: true,
                    description: true,
                    budget: true,
                    minBudget: true,
                    maxBudget: true,
                    duration: true,
                    status: true
                  }
                }
              }
            });
            
            if (!conversation) {
              console.log(`❌ Conversation not found: ${conversationId}`);
              sendError(ws, "Conversation not found", 4004);
              return;
            }
            
            console.log(`✅ Conversation found: ${conversation.id}`);
            console.log(`👥 Conversation participants:`, conversation.participants);
            
            // Check if user is participant
            if (!conversation.participants.includes(currentConnection.userEmail)) {
              console.log(`🚫 Access denied - ${currentConnection.userEmail} not in participants list`);
              sendError(ws, "Access denied to this conversation", 4003);
              return;
            }

            console.log(`✅ User ${currentConnection.userEmail} is authorized for conversation ${conversationId}`);

            broadcastGlobal(
                  {
                    type: "user_online",
                    payload: {
                      userEmail: currentConnection.userEmail,
                      userName: currentConnection.userName
                    },
                  }
                );

            // Leave previous room if any
            if (currentConnection.conversationId) {
              console.log(`🚪 User leaving previous conversation: ${currentConnection.conversationId}`);
              removeUserFromRoom(currentConnection.conversationId, currentConnection.userEmail);
            }

            // Join new room
            console.log(`🚪 User joining new conversation: ${conversationId}`);
            currentConnection.conversationId = conversationId;
            addUserToRoom(conversationId, currentConnection.userEmail);

            // Send recent messages
            console.log(`💬 Loading conversation messages for ${conversationId}`);
            const conversationMessages = await getConversationMessages(conversationId);

            console.log(`📤 Sending ${conversationMessages.length} messages to ${currentConnection.userEmail}`);

            ws.send(JSON.stringify({
              type: "messages_loaded",
              payload: {
                conversationId,
                messages: conversationMessages.reverse().map((msg) => ({
                  ...msg,
                  isOwn: msg.senderEmail === currentConnection!.userEmail,
                })),
              },
            }));

            console.log(`✅ Messages sent successfully to ${currentConnection.userEmail}`);

            // Mark messages as read
            console.log(`👁️ Marking messages as read for ${currentConnection.userEmail} in conversation ${conversationId}`);
            
            const updateResult = await prisma.message.updateMany({
              where: {
                conversationId,
                isRead: false,
                senderEmail: { not: currentConnection.userEmail }
              },
              data: { isRead: true }
            });

            console.log(`✅ Marked ${updateResult.count} messages as read`);

            // Notify others in the room that user joined
            console.log(`📢 Broadcasting user_joined event for ${currentConnection.userEmail}`);
            broadcastToRoom(
              conversationId,
              {
                type: "user_joined",
                payload: {
                  userEmail: currentConnection.userEmail,
                },
              }
            );

            console.log(`✅ Join conversation completed successfully for ${currentConnection.userEmail}`);

          } catch (error) {
            console.error(`❌ Error joining conversation ${conversationId}:`, error);
            sendError(ws, "Failed to join conversation", 4500);
          }
        })();
        break;
        
        case "send_message":
        console.log(`💬 Processing send_message request`);
        (async () => {
          if (!currentConnection) {
            console.log(`❌ Send message attempted without authentication`);
            sendError(ws, "Not authenticated", 4001);
            return;
          }

          const {
            conversationId: msgConvId,
            content,
          } = message.payload;

          console.log(`💬 User ${currentConnection.userEmail} sending message to conversation ${msgConvId}`);
          console.log(`💬 Message content: "${content}"`);

          try {
            console.log(`🔍 Verifying conversation access for ${msgConvId}`);
            
            // Verify conversation exists and user has access
            const msgConversation = await prisma.conversation.findUnique({
              where: { id: msgConvId },
              include: {
                job: {
                  select: {
                    id: true,
                    title: true,
                    description: true
                  }
                }
              }
            });

            if (!msgConversation || !msgConversation.participants.includes(currentConnection.userEmail)) {
              console.log(`🚫 Access denied to conversation ${msgConvId} for user ${currentConnection.userEmail}`);
              sendError(ws, "Access denied to this conversation", 4003);
              return;
            }

            console.log(`✅ Conversation access verified for ${msgConvId}`);
            console.log(`👥 Conversation participants:`, msgConversation.participants);

            // Get receiver ID (the other participant)
            const receiverEmail = msgConversation.participants.find(
              (p) => p !== currentConnection?.userEmail
            );

            if (!receiverEmail) {
              console.log(`❌ No receiver found in conversation ${msgConvId}`);
              sendError(ws, "Invalid conversation participants", 4400);
              return;
            }

            console.log(`📧 Message receiver: ${receiverEmail}`);

            // Create message in database
            console.log(`💾 Creating message in database...`);
            
            const newMessage = await prisma.message.create({
              data: {
                content: content.trim(),
                senderEmail: currentConnection.userEmail,
                receiverEmail: receiverEmail,
                conversationId: msgConvId,
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

            console.log(`✅ Message created in database with ID: ${newMessage.id}`);
            console.log(`💬 New message details:`, {
              id: newMessage.id,
              content: newMessage.content,
              senderEmail: newMessage.senderEmail,
              receiverEmail: newMessage.receiverEmail,
              conversationId: newMessage.conversationId,
              createdAt: newMessage.createdAt
            });

            // Update conversation's lastMessage and updatedAt
            console.log(`🔄 Updating conversation lastMessage for ${msgConvId}`);
            
            await prisma.conversation.update({
              where: { id: msgConvId },
              data: {
                lastMessageId: newMessage.id,
                updatedAt: new Date(),
              },
            });

            console.log(`✅ Conversation updated successfully`);

            // Broadcast message to all participants in the conversation
            console.log(`📢 Broadcasting new message to conversation participants`);
            
            broadcastToRoom(
              msgConvId,
              {
                type: "new_message",
                payload: {
                  ...newMessage,
                  isOwn: false,
                },
              }
            );

            console.log(`📤 Sending message confirmation to sender ${currentConnection.userEmail}`);

            ws.send(JSON.stringify({
              type: "message_sent",
              payload: {
                ...newMessage,
                isOwn: true,
              },
            }));

            console.log(`✅ Message sent successfully by ${currentConnection.userEmail}`);

          } catch (error) {
            console.error(`❌ Error sending message from ${currentConnection.userEmail}:`, error);
            sendError(ws, "Failed to send message", 4500);
          }
        })();
        break;
        
        case "typing":
          console.log(`⌨️ User typing event from ${currentConnection?.userEmail}`);
          const { conversationId: typingConvId } = message.payload;
          console.log(`⌨️ Typing in conversation: ${typingConvId}`);
          
          if (currentConnection && typingConvId) {
            console.log(`📢 Broadcasting typing event for ${currentConnection.userName}`);
            broadcastToRoom(
              typingConvId,
              {
                type: "user_typing",
                payload: {
                  userName: currentConnection.userName
                },
              },
              currentConnection.userEmail
            );
          } else {
            console.log(`❌ Cannot broadcast typing - missing connection or conversation ID`);
          }
          break;

        case "stop_typing":
          console.log(`⌨️ Stop typing event from ${currentConnection?.userEmail}`);
          const { conversationId: stopTypingConvId } = message.payload;
          console.log(`⌨️ Stop typing in conversation: ${stopTypingConvId}`);
          
          if (currentConnection && stopTypingConvId) {
            console.log(`📢 Broadcasting stop typing event for ${currentConnection.userName}`);
            broadcastToRoom(
              stopTypingConvId,
              {
                type: "user_stop_typing",
                payload: {
                  userName: currentConnection.userName
                },
              }
            );
          } else {
            console.log(`❌ Cannot broadcast stop typing - missing connection or conversation ID`);
          }
          break;

        case "interview_scheduled":
          console.log(`📅 Interview scheduling event from ${currentConnection?.userEmail}`);
          console.log(`📅 Full message payload:`, message.payload);
          (async () => {
            if (!currentConnection) {
              console.log(`❌ Interview scheduling attempted without authentication`);
              sendError(ws, "Not authenticated", 4001);
              return;
            }

            const { conversationId, interviewData, proposalId } = message.payload;
            console.log(`📅 Interview data:`, interviewData);

            try {
              // Verify conversation exists and user is participant
              const conversation = await prisma.conversation.findUnique({
                where: { id: conversationId },
                include: {
                  job: {
                    select: {
                      id: true,
                      title: true
                    }
                  }
                }
              });

              if (!conversation) {
                console.log(`❌ Conversation not found: ${conversationId}`);
                sendError(ws, "Conversation not found", 4004);
                return;
              }

              if (!conversation.participants.includes(currentConnection.userEmail)) {
                console.log(`🚫 Access denied - ${currentConnection.userEmail} not in participants list`);
                sendError(ws, "Access denied to this conversation", 4003);
                return;
              }

              // Ensure interviewData has all required fields with defaults
              const normalizedInterviewData = {
                type: 'interview_scheduled',
                scheduled: true,
                date: interviewData.date || new Date().toISOString().split('T')[0],
                time: interviewData.time || '09:00',
                duration: interviewData.duration || 30,
                notes: interviewData.notes || '',
                meetLink: interviewData.meetLink || '',
                jobTitle: interviewData.jobTitle || conversation.job?.title || 'Interview',
                clientName: interviewData.clientName || currentConnection.userName,
                status: 'pending',
                ...interviewData // Keep any additional fields
              };

              // Check if an interview message already exists in this conversation
              const existingInterviewMessage = await prisma.message.findFirst({
                where: {
                  conversationId: conversationId,
                  type: 'interview'
                }
              });

              let interviewMessage;

              if (existingInterviewMessage) {
                // Update existing interview message
                console.log(`🔄 Updating existing interview message: ${existingInterviewMessage.id}`);
                
                interviewMessage = await prisma.message.update({
                  where: { id: existingInterviewMessage.id },
                  data: {
                    content: JSON.stringify(normalizedInterviewData),
                    updatedAt: new Date()
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
                
                console.log(`✅ Interview message updated in database with ID: ${interviewMessage.id}`);
              } else {
                // Create new interview message
                console.log(`🆕 Creating new interview message`);
                
                interviewMessage = await prisma.message.create({
                  data: {
                    content: JSON.stringify(normalizedInterviewData),
                    senderEmail: currentConnection!.userEmail,
                    receiverEmail: conversation.participants.find(p => p !== currentConnection!.userEmail) || '',
                    conversationId: conversationId,
                    type: 'interview'
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
                
                console.log(`✅ Interview message created in database with ID: ${interviewMessage.id}`);
              }

              // Update conversation's lastMessage and updatedAt
              await prisma.conversation.update({
                where: { id: conversationId },
                data: {
                  lastMessageId: interviewMessage.id,
                  updatedAt: new Date(),
                },
              });

              // Update proposal if proposalId is provided
              if (proposalId) {
                console.log(`📝 Updating proposal ${proposalId} with interview data`);
                
                try {
                  await prisma.proposal.update({
                    where: { id: proposalId },
                    data: {
                      interview: normalizedInterviewData
                    }
                  });
                  console.log(`✅ Proposal ${proposalId} updated with interview data`);
                } catch (proposalError) {
                  console.log(`⚠️ Failed to update proposal ${proposalId}:`, proposalError);
                  // Don't fail the entire operation if proposal update fails
                }
              }

              // Broadcast interview message to all participants in the conversation
              console.log(`📢 Broadcasting interview message to conversation participants`);
              
              broadcastToRoom(
                conversationId,
                {
                  type: "interview_scheduled",
                  payload: {
                    ...interviewMessage,
                    interviewData: normalizedInterviewData,
                    isOwn: false,
                  },
                }
              );

              console.log(`📤 Sending interview message confirmation to sender ${currentConnection.userEmail}`);

              ws.send(JSON.stringify({
                type: "interview_scheduled",
                payload: {
                  ...interviewMessage,
                  interviewData: normalizedInterviewData,
                  isOwn: true,
                },
              }));

              console.log(`✅ Interview message sent successfully by ${currentConnection.userEmail}`);

            } catch (error) {
              console.error(`❌ Error sending interview message from ${currentConnection.userEmail}:`, error);
              sendError(ws, "Failed to send interview message", 4500);
            }
          })();
          break;

        case "interview_status_updated":
          console.log(`📅 Interview status update event from ${currentConnection?.userEmail}`);
          console.log(`📅 Full message payload:`, message.payload);
          (async () => {
            if (!currentConnection) {
              console.log(`❌ Interview status update attempted without authentication`);
              sendError(ws, "Not authenticated", 4001);
              return;
            }

            const { messageId, status, reason } = message.payload;
            console.log(`📅 Interview status update: ${status} for message ${messageId}`);

            try {
              // Find the message and verify it's an interview message
              const message = await prisma.message.findUnique({
                where: { id: messageId },
                include: {
                  conversation: {
                    select: {
                      participants: true
                    }
                  }
                }
              });

              if (!message) {
                console.log(`❌ Message not found: ${messageId}`);
                sendError(ws, "Message not found", 4004);
                return;
              }

              // Check if user is participant in this conversation
              if (!message.conversation.participants.includes(currentConnection.userEmail)) {
                console.log(`🚫 Access denied - ${currentConnection.userEmail} not in participants list`);
                sendError(ws, "Access denied to this message", 4003);
                return;
              }

              // Check if it's an interview message
              if (message.type !== 'interview') {
                console.log(`❌ This is not an interview message: ${messageId}`);
                sendError(ws, "This is not an interview message", 4005);
                return;
              }

              // Parse the current interview data
              let interviewData;
              try {
                interviewData = JSON.parse(message.content);
              } catch (error) {
                console.log(`❌ Invalid interview data format: ${messageId}`);
                sendError(ws, "Invalid interview data format", 4006);
                return;
              }

              // Update the interview data based on status and new data
              const updatedInterviewData = {
                ...interviewData,
                status,
                ...(status === 'withdrawn' && {
                  withdrawnBy: currentConnection.userEmail,
                  withdrawnReason: reason || 'Interview was withdrawn by the client',
                  withdrawnAt: new Date().toISOString(),
                  // Preserve original data for rescheduling
                  originalData: {
                    date: interviewData.date,
                    time: interviewData.time,
                    duration: interviewData.duration,
                    notes: interviewData.notes,
                    meetLink: interviewData.meetLink,
                    jobTitle: interviewData.jobTitle,
                    clientName: interviewData.clientName
                  }
                })
              };

              // Update the message content with new status
              const updatedMessage = await prisma.message.update({
                where: { id: messageId },
                data: {
                  content: JSON.stringify(updatedInterviewData)
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

              console.log(`✅ Interview status updated in database: ${messageId} -> ${status}`);

              // Broadcast status update to all participants in the conversation
              console.log(`📢 Broadcasting interview status update to conversation participants`);
              
              broadcastToRoom(
                message.conversationId,
                {
                  type: "interview_status_updated",
                  payload: {
                    ...updatedMessage,
                    interviewData: updatedInterviewData,
                    isOwn: false,
                  },
                }
              );

              console.log(`📤 Sending interview status update confirmation to sender ${currentConnection.userEmail}`);

              ws.send(JSON.stringify({
                type: "interview_status_updated",
                payload: {
                  ...updatedMessage,
                  interviewData: updatedInterviewData,
                  isOwn: true,
                },
              }));

              console.log(`✅ Interview status update sent successfully by ${currentConnection.userEmail}`);

            } catch (error) {
              console.error(`❌ Error updating interview status from ${currentConnection.userEmail}:`, error);
              sendError(ws, "Failed to update interview status", 4501);
            }
          })();
          break;

        case "interview_rescheduled":
          console.log(`📅 Interview rescheduling event from ${currentConnection?.userEmail}`);
          console.log(`📅 Full message payload:`, message.payload);
          (async () => {
            if (!currentConnection) {
              console.log(`❌ Interview rescheduling attempted without authentication`);
              sendError(ws, "Not authenticated", 4001);
              return;
            }

            const { messageId, interviewData, proposalId } = message.payload;
            console.log(`📅 Interview rescheduling: ${messageId} with new data`);

            try {
              // Find the message and verify it's an interview message
              const message = await prisma.message.findUnique({
                where: { id: messageId },
                include: {
                  conversation: {
                    select: {
                      participants: true
                    }
                  }
                }
              });

              if (!message) {
                console.log(`❌ Message not found: ${messageId}`);
                sendError(ws, "Message not found", 4004);
                return;
              }

              // Check if user is participant in this conversation
              if (!message.conversation.participants.includes(currentConnection.userEmail)) {
                console.log(`🚫 Access denied - ${currentConnection.userEmail} not in participants list`);
                sendError(ws, "Access denied to this message", 4003);
                return;
              }

              // Check if it's an interview message
              if (message.type !== 'interview') {
                console.log(`❌ This is not an interview message: ${messageId}`);
                sendError(ws, "This is not an interview message", 4005);
                return;
              }

              // Parse the current interview data
              let currentInterviewData;
              try {
                currentInterviewData = JSON.parse(message.content);
              } catch (error) {
                console.log(`❌ Invalid interview data format: ${messageId}`);
                sendError(ws, "Invalid interview data format", 4006);
                return;
              }

              // Update the interview data with new schedule
              const updatedInterviewData = {
                ...currentInterviewData,
                ...interviewData,
                status: 'pending',
                // Remove withdrawn fields
                withdrawnBy: undefined,
                withdrawnReason: undefined,
                withdrawnAt: undefined,
                // Keep original data for future reference
                originalData: currentInterviewData.originalData || {
                  date: currentInterviewData.date,
                  time: currentInterviewData.time,
                  duration: currentInterviewData.duration,
                  notes: currentInterviewData.notes,
                  meetLink: currentInterviewData.meetLink,
                  jobTitle: currentInterviewData.jobTitle,
                  clientName: currentInterviewData.clientName
                }
              };

              // Update the message content with new schedule
              const updatedMessage = await prisma.message.update({
                where: { id: messageId },
                data: {
                  content: JSON.stringify(updatedInterviewData)
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

              console.log(`✅ Interview rescheduled in database: ${messageId}`);

              // Update proposal if proposalId is provided
              if (proposalId) {
                console.log(`📝 Updating proposal ${proposalId} with rescheduled interview data`);
                
                try {
                  await prisma.proposal.update({
                    where: { id: proposalId },
                    data: {
                      interview: updatedInterviewData
                    }
                  });
                  console.log(`✅ Proposal ${proposalId} updated with rescheduled interview data`);
                } catch (proposalError) {
                  console.log(`⚠️ Failed to update proposal ${proposalId}:`, proposalError);
                }
              }

              // Broadcast reschedule to all participants in the conversation
              console.log(`📢 Broadcasting interview reschedule to conversation participants`);
              
              broadcastToRoom(
                message.conversationId,
                {
                  type: "interview_rescheduled",
                  payload: {
                    ...updatedMessage,
                    interviewData: updatedInterviewData,
                    isOwn: false,
                  },
                }
              );

              console.log(`📤 Sending interview reschedule confirmation to sender ${currentConnection.userEmail}`);

              ws.send(JSON.stringify({
                type: "interview_rescheduled",
                payload: {
                  ...updatedMessage,
                  interviewData: updatedInterviewData,
                  isOwn: true,
                },
              }));

              console.log(`✅ Interview rescheduled successfully by ${currentConnection.userEmail}`);

            } catch (error) {
              console.error(`❌ Error rescheduling interview from ${currentConnection.userEmail}:`, error);
              sendError(ws, "Failed to reschedule interview", 4502);
            }
          })();
          break;

        case "interview_invitation_sent":
          console.log(`📋 Interview invitation sent event from ${currentConnection?.userEmail}`);
          console.log(`📋 Full message payload:`, message.payload);
          (async () => {
            if (!currentConnection) {
              console.log(`❌ Interview invitation attempted without authentication`);
              sendError(ws, "Not authenticated", 4001);
              return;
            }

            const { conversationId, invitationData } = message.payload;
            console.log(`📋 Invitation data:`, invitationData);

            try {
              // Verify conversation exists and user is participant
              const conversation = await prisma.conversation.findUnique({
                where: { id: conversationId },
                include: {
                  job: {
                    select: {
                      id: true,
                      title: true
                    }
                  }
                }
              });

              if (!conversation) {
                console.log(`❌ Conversation not found: ${conversationId}`);
                sendError(ws, "Conversation not found", 4004);
                return;
              }

              if (!conversation.participants.includes(currentConnection.userEmail)) {
                console.log(`🚫 Access denied - ${currentConnection.userEmail} not in participants list`);
                sendError(ws, "Access denied to this conversation", 4003);
                return;
              }

              // Ensure invitationData has all required fields with defaults
              const normalizedInvitationData = {
                type: 'interview_invitation',
                jobTitle: invitationData.jobTitle || conversation.job?.title || 'Job Interview',
                clientName: invitationData.clientName || currentConnection.userName,
                message: invitationData.message || '',
                status: 'pending',
                ...invitationData // Keep any additional fields
              };

              // Check if an interview invitation message already exists in this conversation
              const existingInvitationMessage = await prisma.message.findFirst({
                where: {
                  conversationId: conversationId,
                  type: 'interview_invitation'
                }
              });

              let invitationMessage;

              if (existingInvitationMessage) {
                // Update existing invitation message
                console.log(`🔄 Updating existing interview invitation message: ${existingInvitationMessage.id}`);
                
                invitationMessage = await prisma.message.update({
                  where: { id: existingInvitationMessage.id },
                  data: {
                    content: JSON.stringify(normalizedInvitationData),
                    updatedAt: new Date()
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
                
                console.log(`✅ Interview invitation message updated in database with ID: ${invitationMessage.id}`);
              } else {
                // Create new invitation message
                console.log(`🆕 Creating new interview invitation message`);
                
                invitationMessage = await prisma.message.create({
                  data: {
                    content: JSON.stringify(normalizedInvitationData),
                    senderEmail: currentConnection!.userEmail,
                    receiverEmail: conversation.participants.find(p => p !== currentConnection!.userEmail) || '',
                    conversationId: conversationId,
                    type: 'interview_invitation'
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
                
                console.log(`✅ Interview invitation message created in database with ID: ${invitationMessage.id}`);
              }

              // Update conversation's lastMessage and updatedAt
              await prisma.conversation.update({
                where: { id: conversationId },
                data: {
                  lastMessageId: invitationMessage.id,
                  updatedAt: new Date(),
                },
              });

              // Broadcast invitation message to all participants in the conversation
              console.log(`📢 Broadcasting interview invitation message to conversation participants`);
              
              broadcastToRoom(
                conversationId,
                {
                  type: "interview_invitation_sent",
                  payload: {
                    ...invitationMessage,
                    invitationData: normalizedInvitationData,
                    isOwn: false,
                  },
                }
              );

              console.log(`📤 Sending interview invitation message confirmation to sender ${currentConnection.userEmail}`);

              ws.send(JSON.stringify({
                type: "interview_invitation_sent",
                payload: {
                  ...invitationMessage,
                  invitationData: normalizedInvitationData,
                  isOwn: true,
                },
              }));

              console.log(`✅ Interview invitation message sent successfully by ${currentConnection.userEmail}`);

            } catch (error) {
              console.error(`❌ Error sending interview invitation from ${currentConnection.userEmail}:`, error);
              sendError(ws, "Failed to send interview invitation", 4503);
            }
          })();
          break;

        case "interview_invitation_updated":
          console.log(`📋 Interview invitation update event from ${currentConnection?.userEmail}`);
          console.log(`📋 Full message payload:`, message.payload);
          (async () => {
            if (!currentConnection) {
              console.log(`❌ Interview invitation update attempted without authentication`);
              sendError(ws, "Not authenticated", 4001);
              return;
            }

            const { messageId, status } = message.payload;
            console.log(`📋 Interview invitation update: ${status} for message ${messageId}`);

            try {
              // Find the message and verify it's an interview invitation message
              const message = await prisma.message.findUnique({
                where: { id: messageId },
                include: {
                  conversation: {
                    select: {
                      id: true,
                      participants: true
                    }
                  }
                }
              });

              if (!message) {
                console.log(`❌ Message not found: ${messageId}`);
                sendError(ws, "Message not found", 4004);
                return;
              }

              // Check if user is participant in this conversation
              if (!message.conversation.participants.includes(currentConnection.userEmail)) {
                console.log(`🚫 Access denied - ${currentConnection.userEmail} not in participants list`);
                sendError(ws, "Access denied to this message", 4003);
                return;
              }

              // Check if it's an interview invitation message
              if (message.type !== 'interview_invitation') {
                console.log(`❌ This is not an interview invitation message: ${messageId}`);
                sendError(ws, "This is not an interview invitation message", 4005);
                return;
              }

              // Parse the current invitation data
              let invitationData;
              try {
                invitationData = JSON.parse(message.content);
              } catch (error) {
                console.log(`❌ Invalid invitation data format: ${messageId}`);
                sendError(ws, "Invalid invitation data format", 4006);
                return;
              }

              // Update the invitation data based on status
              const updatedInvitationData = {
                ...invitationData,
                status: status,
                updatedAt: new Date().toISOString()
              };

              // Update the message content with new status
              const updatedMessage = await prisma.message.update({
                where: { id: messageId },
                data: {
                  content: JSON.stringify(updatedInvitationData)
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

              console.log(`✅ Interview invitation status updated in database: ${messageId} -> ${status}`);

              // Broadcast status update to all participants in the conversation
              console.log(`📢 Broadcasting interview invitation status update to conversation participants`);
              
              broadcastToRoom(
                message.conversationId,
                {
                  type: "interview_invitation_updated",
                  payload: {
                    ...updatedMessage,
                    invitationData: updatedInvitationData,
                    isOwn: false,
                  },
                }
              );

              console.log(`📤 Sending interview invitation status update confirmation to sender ${currentConnection.userEmail}`);

              ws.send(JSON.stringify({
                type: "interview_invitation_updated",
                payload: {
                  ...updatedMessage,
                  invitationData: updatedInvitationData,
                  isOwn: true,
                },
              }));

              console.log(`✅ Interview invitation status update sent successfully by ${currentConnection.userEmail}`);

            } catch (error) {
              console.error(`❌ Error updating interview invitation status from ${currentConnection.userEmail}:`, error);
              sendError(ws, "Failed to update interview invitation status", 4504);
            }
          })();
          break;

        default:
          console.log(`❓ Unknown message type received: ${message.type}`);
          sendError(ws, `Unknown message type: ${message.type}`, 4006);
      }
    } catch (error) {
      console.error(`❌ Error processing message from ${currentConnection?.userEmail || ip}:`, error);
      console.error(`📨 Problematic message data:`, data.toString());
      sendError(ws, "Invalid message format", 4007);
    }
  });

  ws.on("close", (code, reason) => {
    console.log(`🔌 WebSocket connection closed from ${ip}`);
    console.log(`🔌 Close code: ${code}, Reason: ${reason}`);

    clearInterval(heartbeatInterval);
    console.log(`💔 Heartbeat cleared for ${currentConnection?.userEmail || ip}`);

    if (currentConnection) {
      console.log(`🧹 Cleaning up connection for ${currentConnection.userEmail}`);
      
      // Remove from room if in one
      if (currentConnection.conversationId) {
        console.log(`🚪 Removing user from conversation room: ${currentConnection.conversationId}`);
        removeUserFromRoom(
          currentConnection.conversationId,
          currentConnection.userEmail
        );

        // Notify others that user left
        console.log(`📢 Broadcasting user_left event for ${currentConnection.userEmail}`);
        broadcastToRoom(currentConnection.conversationId, {
          type: "user_left",
          payload: {
            userEmail: currentConnection.userEmail,
          },
        });
      }

      console.log(`🗑️ Removing connection from connections map: ${currentConnection.userEmail}`);
      connections.delete(currentConnection.userEmail);
      console.log(`✅ User ${currentConnection.userEmail} disconnected successfully`);
      broadcastGlobal({
        type: "user_offline",
        payload: {
          userEmail: currentConnection.userEmail,
          userName: currentConnection.userName
        }
      })
      console.log("Broadcasted user disconnnected");
      console.log(`📊 Remaining active connections: ${connections.size}`);
    } else {
      console.log(`🤷 Connection closed but no currentConnection found for ${ip}`);
    }
  });

  ws.on("error", (error) => {
    console.error(`❌ WebSocket error from ${currentConnection?.userEmail || ip}:`, error);
    clearInterval(heartbeatInterval);
    console.log(`💔 Heartbeat cleared due to error for ${currentConnection?.userEmail || ip}`);
  });

  ws.on("pong", () => {
    console.log(`🏓 Pong received from ${currentConnection?.userEmail || ip}`);
  });
});

// Export the WebSocket server for use in main server
export { wss };

console.log(`🎯 WebSocket server setup complete - will be attached to main server`);