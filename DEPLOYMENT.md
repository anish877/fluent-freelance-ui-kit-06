# Heroku Deployment Guide

This guide will help you deploy both the frontend and backend of the Fluent Freelance platform to Heroku.

## Prerequisites

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Install [Git](https://git-scm.com/)
3. Have a [Heroku account](https://signup.heroku.com/)

## Step 1: Prepare Your Repository

Make sure your code is pushed to a Git repository (GitHub, GitLab, etc.).

## Step 2: Deploy Backend

### 2.1 Create Backend App on Heroku

```bash
# Navigate to backend directory
cd backend

# Login to Heroku
heroku login

# Create a new Heroku app for backend
heroku create your-backend-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=your-session-secret-here
heroku config:set JWT_SECRET=your-jwt-secret-here
heroku config:set CORS_ORIGIN=https://your-frontend-app-name.herokuapp.com

# Set Google OAuth credentials (if using Google auth)
heroku config:set GOOGLE_CLIENT_ID=your-google-client-id
heroku config:set GOOGLE_CLIENT_SECRET=your-google-client-secret

# Set Cloudinary credentials (if using file uploads)
heroku config:set CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
heroku config:set CLOUDINARY_API_KEY=your-cloudinary-api-key
heroku config:set CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Deploy to Heroku
git add .
git commit -m "Prepare backend for Heroku deployment"
git push heroku main

# Run database migrations
heroku run npm run db:migrate
```

### 2.2 Verify Backend Deployment

```bash
# Check if the app is running
heroku open

# Check logs
heroku logs --tail

# Test the health endpoint
curl https://your-backend-app-name.herokuapp.com/health
```

## Step 3: Deploy Frontend

### 3.1 Create Frontend App on Heroku

```bash
# Navigate back to root directory
cd ..

# Create a new Heroku app for frontend
heroku create your-frontend-app-name

# Set environment variables
heroku config:set VITE_API_URL=https://your-backend-app-name.herokuapp.com

# Deploy to Heroku
git add .
git commit -m "Prepare frontend for Heroku deployment"
git push heroku main
```

### 3.2 Verify Frontend Deployment

```bash
# Check if the app is running
heroku open

# Check logs
heroku logs --tail
```

## Step 4: Update CORS Settings

After both apps are deployed, update the backend CORS origin:

```bash
# Navigate to backend directory
cd backend

# Update CORS origin with the actual frontend URL
heroku config:set CORS_ORIGIN=https://your-frontend-app-name.herokuapp.com

# Restart the backend app
heroku restart
```

## Step 5: Environment Variables

### Backend Environment Variables

Make sure these are set in your backend Heroku app:

```bash
NODE_ENV=production
SESSION_SECRET=your-secure-session-secret
JWT_SECRET=your-secure-jwt-secret
CORS_ORIGIN=https://your-frontend-app-name.herokuapp.com
DATABASE_URL=postgresql://... (automatically set by Heroku PostgreSQL)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Frontend Environment Variables

Make sure these are set in your frontend Heroku app:

```bash
VITE_API_URL=https://your-backend-app-name.herokuapp.com
```

## Step 6: Custom Domains (Optional)

If you want to use custom domains:

### Backend Custom Domain

```bash
# Add custom domain to backend
heroku domains:add api.yourdomain.com

# Configure DNS records as instructed by Heroku
```

### Frontend Custom Domain

```bash
# Add custom domain to frontend
heroku domains:add yourdomain.com

# Configure DNS records as instructed by Heroku
```

## Step 7: SSL Certificates

Heroku automatically provides SSL certificates for your apps. If you're using custom domains, you may need to configure SSL:

```bash
# Enable SSL for custom domains
heroku certs:auto:enable
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the build logs: `heroku logs --tail`
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

2. **Database Connection Issues**
   - Check if PostgreSQL addon is properly attached
   - Verify `DATABASE_URL` environment variable
   - Run migrations: `heroku run npm run db:migrate`

3. **CORS Issues**
   - Verify `CORS_ORIGIN` is set correctly
   - Check that the frontend URL matches exactly

4. **Environment Variables**
   - List all config vars: `heroku config`
   - Set missing variables: `heroku config:set VARIABLE_NAME=value`

### Useful Commands

```bash
# View app logs
heroku logs --tail

# Open app in browser
heroku open

# Run commands on Heroku
heroku run npm run db:migrate

# Restart app
heroku restart

# Scale dynos
heroku ps:scale web=1

# View app info
heroku info
```

## Monitoring and Maintenance

1. **Set up monitoring**: Use Heroku's built-in monitoring or add-ons like New Relic
2. **Set up logging**: Use add-ons like Papertrail for log aggregation
3. **Set up alerts**: Configure alerts for app crashes or performance issues
4. **Regular updates**: Keep dependencies updated and redeploy regularly

## Cost Optimization

1. **Use appropriate dyno types**: Start with hobby dynos for development
2. **Scale down when not in use**: Use `heroku ps:scale web=0` to stop dynos
3. **Monitor usage**: Use `heroku addons` to see addon costs
4. **Use free tier when possible**: Some addons have free tiers available

## Security Considerations

1. **Environment variables**: Never commit secrets to Git
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Configure CORS properly for your domains
4. **Rate limiting**: Ensure rate limiting is enabled
5. **Input validation**: Validate all user inputs
6. **SQL injection**: Use parameterized queries (Prisma handles this)

## Support

If you encounter issues:

1. Check Heroku documentation: https://devcenter.heroku.com/
2. Check Heroku status: https://status.heroku.com/
3. Contact Heroku support if needed 