# Fluent Freelance Platform

A full-stack freelance platform built with React, Node.js, TypeScript, and PostgreSQL.

## 🚀 Quick Deployment to Heroku

### Prerequisites
1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Have a [Heroku account](https://signup.heroku.com/)
3. Git repository set up

### Option 1: Automated Deployment (Recommended)

Use the provided deployment script:

```bash
# Make the script executable
chmod +x deploy.sh

# Deploy both frontend and backend
./deploy.sh both

# Or deploy individually
./deploy.sh backend
./deploy.sh frontend
```

### Option 2: Manual Deployment

#### Step 1: Deploy Backend

```bash
# Navigate to backend directory
cd backend

# Create Heroku app
heroku create your-backend-app-name

# Add PostgreSQL database
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)
heroku config:set JWT_SECRET=$(openssl rand -base64 32)

# Deploy
git add .
git commit -m "Deploy backend"
git push heroku main

# Run database migrations
heroku run npm run db:migrate
```

#### Step 2: Deploy Frontend

```bash
# Navigate back to root
cd ..

# Create Heroku app
heroku create your-frontend-app-name

# Set backend URL
heroku config:set VITE_API_URL=https://your-backend-app-name.herokuapp.com

# Deploy
git add .
git commit -m "Deploy frontend"
git push heroku main
```

#### Step 3: Update CORS

```bash
# Update backend CORS with frontend URL
cd backend
heroku config:set CORS_ORIGIN=https://your-frontend-app-name.herokuapp.com
heroku restart
```

### Environment Variables

#### Backend (Required)
- `NODE_ENV=production`
- `SESSION_SECRET` (auto-generated)
- `JWT_SECRET` (auto-generated)
- `DATABASE_URL` (auto-set by Heroku)
- `CORS_ORIGIN` (your frontend URL)

#### Backend (Optional)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

#### Frontend (Required)
- `VITE_API_URL` (your backend URL)

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd fluent-freelance-ui-kit-06
```

2. **Install dependencies**
```bash
# Frontend
pnpm install

# Backend
cd backend
pnpm install
```

3. **Set up environment variables**
```bash
# Backend (.env file)
cp backend/.env.example backend/.env
# Edit backend/.env with your values

# Frontend (.env file)
cp .env.example .env
# Edit .env with your values
```

4. **Set up database**
```bash
cd backend
npx prisma generate
npx prisma db push
```

5. **Start development servers**
```bash
# Backend (in backend directory)
pnpm dev

# Frontend (in root directory)
pnpm dev
```

## 📁 Project Structure

```
fluent-freelance-ui-kit-06/
├── src/                    # Frontend React app
│   ├── components/         # React components
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
│   ├── backend/            # Backend Node.js app
│   │   ├── src/           # Source code
│   │   │   ├── routes/    # API routes
│   │   │   ├── middleware/# Express middleware
│   │   │   ├── lib/       # Database and utilities
│   │   │   └── types/     # TypeScript types
│   │   └── prisma/         # Database schema and migrations
│   ├── public/             # Static assets
│   └── dist/               # Built frontend (generated)
```

## 🚀 Features

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Shadcn/ui components
- React Router for navigation
- React Query for data fetching
- Form handling with React Hook Form
- Real-time messaging with WebSocket

### Backend
- Node.js with Express
- TypeScript for type safety
- Prisma ORM with PostgreSQL
- JWT authentication
- Google OAuth integration
- File upload with Cloudinary
- WebSocket for real-time features
- Rate limiting and security middleware

### Key Features
- User authentication (email/password + Google OAuth)
- Job posting and management
- Proposal submission and management
- Real-time messaging
- User profiles and portfolios
- Search and filtering
- Notifications system
- File uploads
- Responsive design

## 🔧 Configuration

### Database
The app uses PostgreSQL with Prisma ORM. The database schema is defined in `backend/prisma/schema.prisma`.

### Authentication
- JWT tokens for API authentication
- Session-based authentication for web
- Google OAuth integration

### File Uploads
File uploads are handled by Cloudinary. Set up your Cloudinary account and add credentials to environment variables.

## 📚 API Documentation

The API endpoints are organized as follows:

- `/api/auth` - Authentication routes
- `/api/users` - User management
- `/api/jobs` - Job posting and management
- `/api/proposals` - Proposal management
- `/api/messages` - Messaging system
- `/api/notifications` - Notification system
- `/api/upload` - File uploads
- `/api/talent` - Talent search and profiles

## 🧪 Testing

```bash
# Frontend tests
pnpm test

# Backend tests
cd backend
pnpm test
```

## 📦 Build

```bash
# Frontend build
pnpm build

# Backend build
cd backend
pnpm build
```

## 🚀 Deployment

See the deployment section above for Heroku deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [deployment guide](DEPLOYMENT.md)
- Review the [Heroku quick reference](HEROKU_QUICK_REFERENCE.md)
- Open an issue on GitHub
