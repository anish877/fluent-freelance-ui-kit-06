# Fluent Freelance Backend API

A robust TypeScript backend API for the Fluent Freelance platform, built with Express.js, Prisma ORM, and PostgreSQL.

## 🚀 Features

- **User Authentication & Authorization** - JWT-based authentication with role-based access control
- **Job Management** - Full CRUD operations for job postings
- **Proposal System** - Freelancers can submit proposals, clients can accept/reject
- **Messaging System** - Real-time communication between users
- **Notification System** - User notifications for various events
- **Review System** - User reviews and ratings
- **Advanced Filtering** - Search and filter jobs, users, and proposals
- **Pagination** - Efficient data pagination for all endpoints
- **Input Validation** - Comprehensive request validation
- **Error Handling** - Centralized error handling with proper HTTP status codes
- **Rate Limiting** - API rate limiting for security
- **CORS Support** - Cross-origin resource sharing configuration

## 🛠 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: JWT with bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: Nodemon, ts-node

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (Neon)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://neondb_owner:npg_3EFX1TORxVHw@ep-spring-smoke-a860gitf-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Run migrations
npm run db:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (with filters)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id/reviews` - Get user reviews

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (Clients only)
- `PUT /api/jobs/:id` - Update job (Job owner only)
- `DELETE /api/jobs/:id` - Delete job (Job owner only)
- `GET /api/jobs/client/me` - Get jobs by current client

### Proposals
- `GET /api/proposals/job/:jobId` - Get proposals for a job
- `GET /api/proposals/freelancer/me` - Get proposals by current freelancer
- `POST /api/proposals` - Submit proposal (Freelancers only)
- `PUT /api/proposals/:id/status` - Update proposal status (Job owner only)
- `PUT /api/proposals/:id/withdraw` - Withdraw proposal (Proposal owner only)

### Messages
- `GET /api/messages/conversations` - Get user conversations
- `GET /api/messages/conversation/:userId` - Get messages with specific user
- `POST /api/messages` - Send message
- `PUT /api/messages/read` - Mark messages as read
- `GET /api/messages/unread-count` - Get unread message count

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read
- `GET /api/notifications/unread-count` - Get unread notification count
- `DELETE /api/notifications/:id` - Delete notification
- `DELETE /api/notifications` - Delete all notifications

## 🗄 Database Schema

The database includes the following main entities:

- **Users** - Freelancers and clients with profile information
- **Jobs** - Job postings with requirements and budget
- **Proposals** - Freelancer proposals for jobs
- **Reviews** - User reviews and ratings
- **Messages** - Communication between users
- **Notifications** - User notifications

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet security headers

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 