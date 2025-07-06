# Heroku Quick Reference

## Prerequisites
- Install Heroku CLI: `brew install heroku/brew/heroku` (macOS)
- Login: `heroku login`

## Quick Deployment

### Option 1: Use the deployment script
```bash
# Deploy both frontend and backend
./deploy.sh both

# Deploy only backend
./deploy.sh backend

# Deploy only frontend
./deploy.sh frontend
```

### Option 2: Manual deployment

#### Backend
```bash
cd backend
heroku create your-backend-app-name
heroku addons:create heroku-postgresql:mini
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
git push heroku main
heroku run npm run db:migrate
```

#### Frontend
```bash
heroku create your-frontend-app-name
heroku config:set VITE_API_URL=https://your-backend-app-name.herokuapp.com
git push heroku main
```

## Essential Commands

### App Management
```bash
heroku apps                    # List all apps
heroku create app-name         # Create new app
heroku open                    # Open app in browser
heroku logs --tail            # View live logs
```

### Configuration
```bash
heroku config                  # View all config vars
heroku config:set KEY=value    # Set config var
heroku config:get KEY          # Get specific config var
```

### Database
```bash
heroku run npm run db:migrate  # Run migrations
heroku pg:info                 # Database info
heroku pg:psql                 # Connect to database
```

### Dynos
```bash
heroku ps                      # View dynos
heroku ps:scale web=1          # Scale web dyno
heroku restart                 # Restart app
```

## Environment Variables

### Backend Required
```bash
NODE_ENV=production
SESSION_SECRET=your-secret
JWT_SECRET=your-secret
DATABASE_URL=postgresql://... (auto-set)
CORS_ORIGIN=https://your-frontend-app.herokuapp.com
```

### Optional Backend
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

### Frontend Required
```bash
VITE_API_URL=https://your-backend-app.herokuapp.com
```

## Troubleshooting

### Common Issues
1. **Build fails**: Check `heroku logs --tail`
2. **Database connection**: Verify `DATABASE_URL` and run migrations
3. **CORS errors**: Check `CORS_ORIGIN` setting
4. **App crashes**: Check logs and restart with `heroku restart`

### Useful Debug Commands
```bash
heroku logs --tail            # Live logs
heroku run bash               # SSH into dyno
heroku run npm run build      # Test build locally
heroku config                  # Check environment variables
```

## Cost Management
```bash
heroku ps:scale web=0         # Stop dyno (free)
heroku ps:scale web=1         # Start dyno
heroku addons                  # View addon costs
```

## Security
- Never commit `.env` files
- Use strong secrets for `SESSION_SECRET` and `JWT_SECRET`
- Enable HTTPS (automatic on Heroku)
- Configure CORS properly 