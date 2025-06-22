import WebSocket from 'ws';
import { createServer } from 'http';
import { v4 as uuidv4 } from 'uuid';

// Types
interface User {
  id: string;
  name: string;
  type: 'client' | 'freelancer';
  avatar?: string;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
}

interface Conversation {
  id: string;
  participants: string[];
  projectName: string;
  lastMessage?: Message;
  createdAt: string;
}

interface WSMessage {
  type: 'register_user' | 'join_conversation' | 'send_message' | 'typing' | 'stop_typing' | 'user_online' | 'user_offline';
  payload: any;
}

interface ClientConnection {
  ws: WebSocket;
  userId: string;
  user: User;
  conversationId?: string;
  authenticated: boolean;
}

// In-memory storage (replace with database in production)
const users = new Map<string, User>();
const conversations = new Map<string, Conversation>();
const messages = new Map<string, Message[]>();
const connections = new Map<string, ClientConnection>();
const conversationRooms = new Map<string, Set<string>>(); // conversationId -> Set of userIds

// Initialize some sample data
const initializeSampleData = () => {
  // Sample users
  const user1: User = { id: 'user1', name: 'John Client', type: 'client' };
  const user2: User = { id: 'user2', name: 'Jane Freelancer', type: 'freelancer' };
  users.set(user1.id, user1);
  users.set(user2.id, user2);

  // Sample conversation
  const conv1: Conversation = {
    id: 'conv1',
    participants: ['user1', 'user2'],
    projectName: 'Website Development',
    createdAt: new Date().toISOString()
  };
  conversations.set(conv1.id, conv1);
  
  // Sample messages
  const msg1: Message = {
    id: 'msg1',
    conversationId: 'conv1',
    senderId: 'user1',
    senderName: 'John Client',
    content: 'Hello, how is the project going?',
    timestamp: new Date().toISOString(),
    type: 'text'
  };
  messages.set('conv1', [msg1]);
  conv1.lastMessage = msg1;
};

// WebSocket Server
const server = createServer();
const wss = new WebSocket.Server({ server });

// Utility functions
const broadcast = (conversationId: string, message: any, excludeUserId?: string) => {
  const room = conversationRooms.get(conversationId);
  if (!room) return;

  room.forEach(userId => {
    if (userId === excludeUserId) return;
    
    const connection = connections.get(userId);
    if (connection && connection.ws.readyState === WebSocket.OPEN) {
      connection.ws.send(JSON.stringify(message));
    }
  });
};

const addUserToRoom = (conversationId: string, userId: string) => {
  if (!conversationRooms.has(conversationId)) {
    conversationRooms.set(conversationId, new Set());
  }
  conversationRooms.get(conversationId)!.add(userId);
};

const removeUserFromRoom = (conversationId: string, userId: string) => {
  const room = conversationRooms.get(conversationId);
  if (room) {
    room.delete(userId);
    if (room.size === 0) {
      conversationRooms.delete(conversationId);
    }
  }
};

const getUserConversations = (userId: string): Conversation[] => {
  return Array.from(conversations.values()).filter(conv => 
    conv.participants.includes(userId)
  );
};

const getConversationMessages = (conversationId: string): Message[] => {
  return messages.get(conversationId) || [];
};

const sendError = (ws: WebSocket, message: string, code = 4000) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      type: 'error',
      payload: { message, code }
    }));
  }
};

// WebSocket connection handler
wss.on('connection', (ws: WebSocket, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`New WebSocket connection from ${ip}`);
  
  let currentConnection: ClientConnection | null = null;
  let isAuthenticated = false;
  let heartbeatInterval: NodeJS.Timeout;

  // Send initial connection success
  ws.send(JSON.stringify({
    type: 'connection_established',
    payload: { message: 'Connected to server. Please authenticate.' }
  }));

  // Heartbeat to keep connection alive
  heartbeatInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    }
  }, 30000);

  ws.on('message', (data: WebSocket.Data) => {
    try {
      const message: WSMessage = JSON.parse(data.toString());
      
      // Handle authentication first
      if (!isAuthenticated && message.type !== 'register_user') {
        sendError(ws, 'Authentication required. Please send register_user message first.', 4001);
        return;
      }
      
      switch (message.type) {
        case 'register_user':
          const { userId, name, type: userType } = message.payload;
          
          if (!userId || !name || !userType) {
            sendError(ws, 'Missing required fields: userId, name, type', 4002);
            return;
          }

          // Check if user exists or create new one
          let user = users.get(userId);
          if (!user) {
            user = {
              id: userId,
              name,
              type: userType,
              avatar: message.payload.avatar
            };
            users.set(userId, user);
            console.log(`New user registered: ${name} (${userId})`);
          } else {
            // Update existing user info
            user.name = name;
            user.type = userType;
            if (message.payload.avatar) user.avatar = message.payload.avatar;
            users.set(userId, user);
            console.log(`User updated: ${name} (${userId})`);
          }

          // Create authenticated connection
          currentConnection = {
            ws,
            userId,
            user,
            authenticated: true
          };
          
          connections.set(userId, currentConnection);
          isAuthenticated = true;

          // Send authentication success
          ws.send(JSON.stringify({
            type: 'authentication_success',
            payload: { 
              message: 'Authentication successful',
              user: user
            }
          }));

          // Send user's conversations
          const userConversations = getUserConversations(userId);
          ws.send(JSON.stringify({
            type: 'conversations_loaded',
            payload: { conversations: userConversations }
          }));

          console.log(`User ${user.name} authenticated successfully`);
          break;

        case 'user_online':
          // This is now handled in register_user, but kept for backward compatibility
          if (currentConnection) {
            ws.send(JSON.stringify({
              type: 'user_status',
              payload: { status: 'online', userId: currentConnection.userId }
            }));
          }
          break;

        case 'join_conversation':
          const { conversationId } = message.payload;
          const conversation = conversations.get(conversationId);
          
          if (!conversation) {
            sendError(ws, 'Conversation not found', 4004);
            return;
          }

          if (!currentConnection) {
            sendError(ws, 'Not authenticated', 4001);
            return;
          }

          if (!conversation.participants.includes(currentConnection.userId)) {
            sendError(ws, 'Access denied to this conversation', 4003);
            return;
          }

          // Leave previous room if any
          if (currentConnection.conversationId) {
            removeUserFromRoom(currentConnection.conversationId, currentConnection.userId);
          }
          
          // Join new room
          currentConnection.conversationId = conversationId;
          addUserToRoom(conversationId, currentConnection.userId);
          
          // Send conversation messages
          const conversationMessages = getConversationMessages(conversationId);
          ws.send(JSON.stringify({
            type: 'messages_loaded',
            payload: { 
              conversationId,
              messages: conversationMessages.map(msg => ({
                ...msg,
                isOwn: msg.senderId === currentConnection!.userId
              }))
            }
          }));
          
          // Notify others in the room that user joined
          broadcast(conversationId, {
            type: 'user_joined',
            payload: { 
              userId: currentConnection.userId, 
              userName: currentConnection.user.name 
            }
          }, currentConnection.userId);

          console.log(`User ${currentConnection.user.name} joined conversation ${conversationId}`);
          break;

        case 'send_message':
          const { conversationId: msgConvId, content, type = 'text' } = message.payload;
          
          if (!currentConnection) {
            sendError(ws, 'Not authenticated', 4001);
            return;
          }

          if (!content || !content.trim()) {
            sendError(ws, 'Message content cannot be empty', 4005);
            return;
          }

          const msgConversation = conversations.get(msgConvId);
          if (!msgConversation) {
            sendError(ws, 'Conversation not found', 4004);
            return;
          }

          if (!msgConversation.participants.includes(currentConnection.userId)) {
            sendError(ws, 'Access denied to this conversation', 4003);
            return;
          }

          const newMessage: Message = {
            id: uuidv4(),
            conversationId: msgConvId,
            senderId: currentConnection.userId,
            senderName: currentConnection.user.name,
            content: content.trim(),
            timestamp: new Date().toISOString(),
            type
          };
          
          // Save message
          if (!messages.has(msgConvId)) {
            messages.set(msgConvId, []);
          }
          messages.get(msgConvId)!.push(newMessage);
          
          // Update conversation's last message
          msgConversation.lastMessage = newMessage;
          
          // Broadcast to all users in the conversation
          const room = conversationRooms.get(msgConvId);
          if (room) {
            room.forEach(userId => {
              const connection = connections.get(userId);
              if (connection && connection.ws.readyState === WebSocket.OPEN) {
                connection.ws.send(JSON.stringify({
                  type: 'new_message',
                  payload: {
                    ...newMessage,
                    isOwn: newMessage.senderId === userId
                  }
                }));
              }
            });
          }
          
          console.log(`Message sent in conversation ${msgConvId} by ${currentConnection.user.name}: ${content}`);
          break;

        case 'typing':
          const { conversationId: typingConvId } = message.payload;
          if (currentConnection && typingConvId) {
            broadcast(typingConvId, {
              type: 'user_typing',
              payload: { 
                userId: currentConnection.userId, 
                userName: currentConnection.user.name 
              }
            }, currentConnection.userId);
          }
          break;

        case 'stop_typing':
          const { conversationId: stopTypingConvId } = message.payload;
          if (currentConnection && stopTypingConvId) {
            broadcast(stopTypingConvId, {
              type: 'user_stop_typing',
              payload: { 
                userId: currentConnection.userId, 
                userName: currentConnection.user.name 
              }
            }, currentConnection.userId);
          }
          break;

        default:
          sendError(ws, `Unknown message type: ${message.type}`, 4006);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      sendError(ws, 'Invalid message format', 4007);
    }
  });

  ws.on('close', (code, reason) => {
    console.log(`WebSocket connection closed. Code: ${code}, Reason: ${reason}`);
    
    clearInterval(heartbeatInterval);
    
    if (currentConnection) {
      // Remove from room if in one
      if (currentConnection.conversationId) {
        removeUserFromRoom(currentConnection.conversationId, currentConnection.userId);
        
        // Notify others that user left
        broadcast(currentConnection.conversationId, {
          type: 'user_left',
          payload: { 
            userId: currentConnection.userId, 
            userName: currentConnection.user.name 
          }
        });
      }
      
      connections.delete(currentConnection.userId);
      console.log(`User ${currentConnection.user.name} disconnected`);
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clearInterval(heartbeatInterval);
  });

  ws.on('pong', () => {
    // Heartbeat received
  });
});

// REST API endpoints
server.on('request', (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url!, `http://${req.headers.host}`);
  
  if (req.method === 'GET' && url.pathname === '/api/conversations') {
    const userId = url.searchParams.get('userId');
    if (userId) {
      const userConversations = getUserConversations(userId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ conversations: userConversations }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'userId required' }));
    }
  } else if (req.method === 'GET' && url.pathname === '/api/messages') {
    const conversationId = url.searchParams.get('conversationId');
    const userId = url.searchParams.get('userId');
    
    if (conversationId && userId) {
      const conversation = conversations.get(conversationId);
      if (conversation && conversation.participants.includes(userId)) {
        const conversationMessages = getConversationMessages(conversationId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          messages: conversationMessages.map(msg => ({
            ...msg,
            isOwn: msg.senderId === userId
          }))
        }));
      } else {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Access denied' }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'conversationId and userId required' }));
    }
  } else if (req.method === 'GET' && url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'healthy',
      connections: connections.size,
      users: users.size,
      conversations: conversations.size
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Initialize sample data
initializeSampleData();

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`WebSocket endpoint: ws://localhost:${PORT}`);
  console.log(`HTTP API endpoint: http://localhost:${PORT}/api`);
  console.log('Sample users initialized: user1 (John Client), user2 (Jane Freelancer)');
});