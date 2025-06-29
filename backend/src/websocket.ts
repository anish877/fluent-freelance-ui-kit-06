import WebSocket from "ws";
import { createServer } from "http";
import prisma from "./lib/prisma";


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
    | "user_offline";
  payload: any;
}

interface ClientConnection {
  ws: WebSocket;
  userEmail: string;
  userName: string;
  conversationId?: string;
  authenticated: boolean;
}

const connections = new Map<string, ClientConnection>();
const conversationRooms = new Map<string, Set<string>>();

// WebSocket Server
const server = createServer();
const wss = new WebSocket.Server({ server });

// Utility functions
const broadcast = (
  conversationId: string,
  message: any,
  excludeUserEmail?: string
) => {
  const room = conversationRooms.get(conversationId);
  if (!room) return;

  room.forEach((userEmail) => {
    if (userEmail === excludeUserEmail) return;

    const connection = connections.get(userEmail);
    if (connection && connection.ws.readyState === WebSocket.OPEN) {
      connection.ws.send(JSON.stringify(message));
    }
  });
};

const addUserToRoom = (conversationId: string, userEmail: string) => {
  if (!conversationRooms.has(conversationId)) {
    conversationRooms.set(conversationId, new Set());
  }
  conversationRooms.get(conversationId)!.add(userEmail);
};

const removeUserFromRoom = (conversationId: string, userEmail: string) => {
  const room = conversationRooms.get(conversationId);
  if (room) {
    room.delete(userEmail);
    if (room.size === 0) {
      conversationRooms.delete(conversationId);
    }
  }
};


// Replace getConversationMessages function
const getConversationMessages = async (conversationId: string) => {
  return await prisma.message.findMany({
    where: {
      conversationId: conversationId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

const sendError = (ws: WebSocket, message: string, code = 4000) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type: "error",
        payload: { message, code },
      })
    );
  }
};

// WebSocket connection handler
wss.on("connection", (ws: WebSocket, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`New WebSocket connection from ${ip}`);

  let currentConnection: ClientConnection | null = null;
  let isAuthenticated = false;
  let heartbeatInterval: NodeJS.Timeout;

  // Send initial connection success
  ws.send(
    JSON.stringify({
      type: "connection_established",
      payload: { message: "Connected to server. Please authenticate." },
    })
  );

  // Heartbeat to keep connection alive
  heartbeatInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    }
  }, 30000);

  ws.on("message", (data: WebSocket.Data) => {
    try {
      const message: WSMessage = JSON.parse(data.toString());

      // Handle authentication first
      if (!isAuthenticated && message.type !== "authenticate") {
        sendError(
          ws,
          "Authentication required. Please send authenticate message first.",
          4001
        );
        return;
      }

      switch (message.type) {
        case "authenticate":
          (async () => {
            const { userEmail, userName } = message.payload;


          try {
            // Verify user exists in database
            const user = await prisma.user.findUnique({
              where: { email: userEmail },
            });

            if (!user) {
              sendError(ws, "User not found", 4004);
              return;
            }

            // Create authenticated connection
            currentConnection = {
              ws,
              userEmail,
              userName,
              authenticated: true,
            };
            
            connections.set(userEmail, currentConnection);
            isAuthenticated = true;

            // Send success response
            ws.send(JSON.stringify({
              type: "authentication_success",
              payload: { userEmail, message: "Authentication successful" }
            }));

          } catch (error) {
            console.error("Authentication error:", error);
            sendError(ws, "Authentication failed", 4500);
          }
        })();
        break;
        
        case "user_online":
          // This is now handled in register_user, but kept for backward compatibility
          if (currentConnection) {
            ws.send(
              JSON.stringify({
                type: "user_status",
                payload: { status: "online", userEmail: currentConnection.userEmail },
              })
            );
          }
          break;

        case "join_conversation":
          (async () => {
          if (!currentConnection) {
            sendError(ws, "Not authenticated", 4001);
            return;
          }
          
          const { conversationId } = message.payload;
          
          try {
            // Fetch conversation from database
            const conversation = await prisma.conversation.findUnique({
              where: { id: conversationId },
            });
            
            
            if (!conversation) {
              sendError(ws, "Conversation not found", 4004);
              return;
            }
            
            // Check if user is participant
            if (!conversation.participants.includes(currentConnection.userEmail)) {
              sendError(ws, "Access denied to this conversation", 4003);
              return;
            }

            // Leave previous room if any
            if (currentConnection.conversationId) {
              removeUserFromRoom(currentConnection.conversationId, currentConnection.userEmail);
            }

            // Join new room
            currentConnection.conversationId = conversationId;
            addUserToRoom(conversationId, currentConnection.userEmail);

            // Send recent messages
            const conversationMessages = await getConversationMessages(conversationId)

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

            // Mark messages as read
            await prisma.message.updateMany({
              where: {
                conversationId,
                isRead: false,
                senderEmail: { not: currentConnection.userEmail }
              },
              data: { isRead: true }
            });

            // Notify others in the room that user joined
            broadcast(
              conversationId,
              {
                type: "user_joined",
                payload: {
                  userEmail: currentConnection.userEmail,
                },
              }
            );

          } catch (error) {
            console.error("Error joining conversation:", error);
            sendError(ws, "Failed to join conversation", 4500);
          }
        })();
        break;
        
        case "send_message":
        (async () => {
          if (!currentConnection) {
            sendError(ws, "Not authenticated", 4001);
            return;
          }

          const {
            conversationId: msgConvId,
            content,
          } = message.payload;

          try {
            // Verify conversation exists and user has access
            const msgConversation = await prisma.conversation.findUnique({
              where: { id: msgConvId },
            });

            if (!msgConversation || !msgConversation.participants.includes(currentConnection.userEmail)) {
              sendError(ws, "Access denied to this conversation", 4003);
              return;
            }

            // Get receiver ID (the other participant)
            const receiverEmail = msgConversation.participants.find(
              (p) => p !== currentConnection?.userEmail
            );

            if (!receiverEmail) {
              sendError(ws, "Invalid conversation participants", 4400);
              return;
            }

            // Create message in database
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

            console.log('New message', newMessage)

            // Update conversation's lastMessage and updatedAt
            await prisma.conversation.update({
              where: { id: msgConvId },
              data: {
                lastMessageId: newMessage.id,
                updatedAt: new Date(),
              },
            });

            // Broadcast message to all participants in the conversation
            broadcast(
              msgConvId,
              {
                type: "new_message",
                payload: {
                  ...newMessage,
                  isOwn: false,
                },
              }
            );

            ws.send(JSON.stringify({
              type: "message_sent",
              payload: {
                ...newMessage,
                isOwn: true,
              },
            }));

          } catch (error) {
            console.error("Error sending message:", error);
            sendError(ws, "Failed to send message", 4500);
          }
        })();
        break;
        
        case "typing":
          const { conversationId: typingConvId } = message.payload;
          if (currentConnection && typingConvId) {
            broadcast(
              typingConvId,
              {
                type: "user_typing",
                payload: {
                  userName: currentConnection.userName
                },
              },
              currentConnection.userEmail
            );
          }
          break;

        case "stop_typing":
          const { conversationId: stopTypingConvId } = message.payload;
          if (currentConnection && stopTypingConvId) {
            broadcast(
              stopTypingConvId,
              {
                type: "user_stop_typing",
                payload: {
                  userName: currentConnection.userName
                },
              }
            );
          }
          break;

        default:
          sendError(ws, `Unknown message type: ${message.type}`, 4006);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      sendError(ws, "Invalid message format", 4007);
    }
  });

  ws.on("close", (code, reason) => {
    console.log(
      `WebSocket connection closed. Code: ${code}, Reason: ${reason}`
    );

    clearInterval(heartbeatInterval);

    if (currentConnection) {
      // Remove from room if in one
      if (currentConnection.conversationId) {
        removeUserFromRoom(
          currentConnection.conversationId,
          currentConnection.userEmail
        );

        // Notify others that user left
        broadcast(currentConnection.conversationId, {
          type: "user_left",
          payload: {
            userEmail: currentConnection.userEmail,
          },
        });
      }

      connections.delete(currentConnection.userEmail);
      console.log(`User ${currentConnection.userEmail} disconnected`);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    clearInterval(heartbeatInterval);
  });

  ws.on("pong", () => {
    // Heartbeat received
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`WebSocket endpoint: ws://localhost:${PORT}`);
});
