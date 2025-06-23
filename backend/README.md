# Fluent Freelance Backend API

A comprehensive backend API for the Fluent Freelance platform built with Node.js, Express, TypeScript, and Prisma.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access
- 👥 **User Management** - Complete user profiles for freelancers and clients
- 💼 **Job Management** - Post, browse, and manage freelance jobs
- 📝 **Proposal System** - Submit and manage job proposals
- 💬 **Messaging System** - Real-time messaging between users
- 🔔 **Notifications** - Real-time notifications for platform activities
- 📊 **Onboarding Flow** - Multi-step onboarding process with localStorage persistence
- 📁 **File Upload** - Cloudinary integration for images and PDFs
- 🗄️ **Database** - PostgreSQL with Prisma ORM

## Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL database (Neon recommended)
- Cloudinary account for file uploads

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fluent-freelance-ui-kit-06/backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://your-neon-connection-string-here"
   
   # JWT
   JWT_SECRET="your-super-secret-jwt-key-here"
   JWT_EXPIRES_IN="30d"
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # CORS
   CORS_ORIGIN="http://localhost:3000"
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up Cloudinary**
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Get your Cloud Name, API Key, and API Secret from your dashboard
   - Add them to your `.env` file

5. **Database setup**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Push schema to database
   pnpm prisma db push
   ```

6. **Start the development server**
   ```bash
   pnpm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users (with filters)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id/reviews` - Get user reviews

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `POST /api/jobs` - Create new job
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Proposals
- `GET /api/proposals` - Get proposals (with filters)
- `POST /api/proposals` - Submit proposal
- `GET /api/proposals/:id` - Get proposal by ID
- `PUT /api/proposals/:id` - Update proposal status

### Messages
- `GET /api/messages` - Get conversations
- `POST /api/messages` - Send message
- `GET /api/messages/:conversationId` - Get conversation messages

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read

### Onboarding
- `GET /api/onboarding/progress` - Get onboarding progress
- `PUT /api/onboarding/user-type` - Update user type
- `PUT /api/onboarding/freelancer/basic` - Update freelancer basic info
- `PUT /api/onboarding/freelancer/professional` - Update freelancer professional info
- `PUT /api/onboarding/freelancer/skills` - Update freelancer skills
- `PUT /api/onboarding/freelancer/portfolio` - Update freelancer portfolio
- `PUT /api/onboarding/freelancer/rates` - Update freelancer rates
- `PUT /api/onboarding/freelancer/verification` - Update freelancer verification
- `PUT /api/onboarding/client/basic` - Update client basic info
- `PUT /api/onboarding/client/company` - Update client company info
- `PUT /api/onboarding/client/projects` - Update client project needs
- `PUT /api/onboarding/client/budget` - Update client budget
- `PUT /api/onboarding/client/verification` - Update client verification
- `PUT /api/onboarding/complete` - Complete onboarding
- `POST /api/onboarding/complete-with-data` - Complete onboarding with all data (public)

### File Upload
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `DELETE /api/upload/:publicId` - Delete file from Cloudinary

## File Upload Features

The API includes comprehensive file upload functionality using Cloudinary:

### Supported File Types
- **Images**: JPG, PNG, GIF, WebP, SVG
- **Documents**: PDF
- **Size Limit**: 10MB per file

### Upload Endpoints
- **Single File Upload**: `POST /api/upload/single`
  - Form field: `file`
  - Returns: Cloudinary URL and metadata

- **Multiple Files Upload**: `POST /api/upload/multiple`
  - Form field: `files` (array)
  - Returns: Array of Cloudinary URLs and metadata

- **File Deletion**: `DELETE /api/upload/:publicId`
  - Deletes file from Cloudinary

### Usage in Frontend
```javascript
// Single file upload
const formData = new FormData();
formData.append('file', file);

const response = await fetch('/api/upload/single', {
  method: 'POST',
  body: formData
});

const result = await response.json();
// result.data.url contains the Cloudinary URL
```

## Onboarding Flow

The onboarding system supports both authenticated and unauthenticated users:

### For Unauthenticated Users
1. **localStorage Storage**: All data is stored in localStorage
2. **Resume Capability**: Users can leave and return to continue
3. **Final Account Creation**: Password is collected on the last step
4. **Complete Data Transfer**: All onboarding data is saved to database

### For Authenticated Users
1. **Database Storage**: Data is saved directly to database
2. **Progress Tracking**: Backend tracks current step
3. **Immediate Updates**: Changes are saved in real-time

## Development

### Scripts
- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm prisma studio` - Open Prisma Studio
- `pnpm prisma generate` - Generate Prisma client
- `pnpm prisma db push` - Push schema to database

### Database Management
```bash
# Generate Prisma client after schema changes
pnpm prisma generate

# Push schema changes to database
pnpm prisma db push

# Create a new migration
pnpm prisma migrate dev --name migration_name

# Reset database (development only)
pnpm prisma migrate reset
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRES_IN` | JWT token expiration time | No (default: 7d) |
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `CORS_ORIGIN` | Allowed CORS origin | No (default: http://localhost:3000) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt-based password security
- **CORS Protection** - Configurable cross-origin requests
- **Rate Limiting** - Request rate limiting
- **Input Validation** - Express-validator for request validation
- **Helmet** - Security headers middleware

## Error Handling

The API includes comprehensive error handling:
- **Validation Errors** - Detailed validation error messages
- **Authentication Errors** - Proper 401/403 responses
- **Database Errors** - Graceful database error handling
- **File Upload Errors** - Upload validation and error responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 