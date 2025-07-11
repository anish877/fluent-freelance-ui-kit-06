import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import jobRoutes from './routes/jobs.js';
import proposalRoutes from './routes/proposals.js';
import messageRoutes from './routes/messages.js';
import notificationRoutes from './routes/notifications.js';
import onboardingRoutes from './routes/onboarding.js';
import uploadRoutes from './routes/upload.js';
import talentRoutes from './routes/talent.js';
import jobInvitationRoutes from './routes/job-invitations.js';
import offersRoutes from './routes/offers.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import session from 'express-session';
import passport from 'passport';

// Load environment variables
dotenv.config();

const app: Application = express();
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));
app.use(passport.initialize());
app.use(passport.session());
const PORT = process.env.PORT || 5000;
app.use(cookieParser())
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "wss:",
        "ws:",
        "https://taskmotive-a193fd395c98.herokuapp.com",
        "wss://taskmotive-a193fd395c98.herokuapp.com",
        "https://taskmotive.com",
        "wss://taskmotive.com"
      ],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:"],
    },
  },
}));
app.use(cors({
  origin: [
    'https://taskmotive.com',
    'https://www.taskmotive.com',
    'https://taskmotive-a193fd395c98.herokuapp.com',
    'http://localhost:3000',
    'http://localhost:3002'
  ],
  credentials: true
}));

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
// app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Fluent Freelance API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/talent', talentRoutes);
app.use('/api/job-invitations', jobInvitationRoutes);
app.use('/api/offers', offersRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Create HTTP server
const server = createServer(app);

// Import and attach WebSocket server
import { wss } from './websocket.js';

// Attach WebSocket server to HTTP server
server.on('upgrade', (request, socket, head) => {
  console.log('🔄 WebSocket upgrade request received');
  wss.handleUpgrade(request, socket, head, (ws) => {
    console.log('✅ WebSocket connection upgraded');
    wss.emit('connection', ws, request);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 WebSocket endpoint: ws://localhost:${PORT}`);
  console.log(`✅ WebSocket server attached and ready`);
});

export default app; 