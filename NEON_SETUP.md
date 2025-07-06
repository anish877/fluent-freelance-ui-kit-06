# Neon Database Setup Guide

This guide will help you set up a free Neon PostgreSQL database for your Fluent Freelance platform.

## 🚀 Quick Setup

### Step 1: Create Neon Account
1. Go to [https://neon.tech](https://neon.tech)
2. Click "Sign Up" and create an account
3. Verify your email

### Step 2: Create Project
1. Click "Create New Project"
2. Choose a project name (e.g., "fluent-freelance")
3. Select a region close to your users
4. Click "Create Project"

### Step 3: Get Connection Strings
1. In your project dashboard, click "Connection Details"
2. Copy both connection strings:
   - **DATABASE_URL** (for Prisma)
   - **DIRECT_URL** (for direct connections)

### Step 4: Deploy with Neon
Run the deployment script:
```bash
./deploy-neon.sh
```

## 📋 Connection String Format

Your Neon connection strings will look like this:
```
DATABASE_URL=postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database?sslmode=require
DIRECT_URL=postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database?sslmode=require
```

## 🔧 Manual Setup (Alternative)

If you prefer to set up manually:

### 1. Set Environment Variables
```bash
heroku config:set DATABASE_URL="your-neon-database-url" --app taskmotive
heroku config:set DIRECT_URL="your-neon-direct-url" --app taskmotive
```

### 2. Deploy Backend
```bash
cd backend
git push heroku main --app taskmotive
heroku run npm run db:migrate --app taskmotive
```

### 3. Deploy Frontend
```bash
cd ..
git push heroku main --app taskmotive
```

## 💰 Neon Pricing

### Free Tier
- **3 projects** per account
- **0.5 GB** storage per project
- **10 GB** bandwidth per month
- **No credit card required**

### Paid Plans
- **Pro**: $10/month for 10GB storage
- **Team**: $25/month for 100GB storage

## 🔍 Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check if your IP is allowed
   - Verify connection strings
   - Ensure SSL mode is set to 'require'

2. **Migration Errors**
   - Check if database exists
   - Verify Prisma schema
   - Run `heroku run npm run db:generate --app taskmotive`

3. **Performance Issues**
   - Check Neon dashboard for usage
   - Consider upgrading to paid plan
   - Optimize database queries

### Useful Commands

```bash
# Check database connection
heroku run npm run db:studio --app taskmotive

# View logs
heroku logs --tail --app taskmotive

# Check environment variables
heroku config --app taskmotive

# Restart app
heroku restart --app taskmotive
```

## 📊 Monitoring

### Neon Dashboard
- Monitor database usage
- View query performance
- Check connection status
- Set up alerts

### Heroku Dashboard
- Monitor app performance
- View logs
- Check dyno usage
- Set up monitoring

## 🔒 Security

### Best Practices
1. **Never commit connection strings** to Git
2. **Use environment variables** for all secrets
3. **Enable SSL** for all connections
4. **Regular backups** (automatic with Neon)
5. **Monitor access** logs

### Environment Variables
Make sure these are set in Heroku:
```bash
DATABASE_URL=your-neon-database-url
DIRECT_URL=your-neon-direct-url
NODE_ENV=production
SESSION_SECRET=your-session-secret
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=https://your-app.herokuapp.com
```

## 🆘 Support

- **Neon Documentation**: https://neon.tech/docs
- **Neon Discord**: https://discord.gg/neondatabase
- **Heroku Support**: https://help.heroku.com 