#!/bin/bash

# Neon + Heroku Deployment Script for Fluent Freelance Platform
# Usage: ./deploy-neon.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if Heroku CLI is installed
check_heroku_cli() {
    if ! command -v heroku &> /dev/null; then
        print_error "Heroku CLI is not installed. Please install it first:"
        echo "https://devcenter.heroku.com/articles/heroku-cli"
        exit 1
    fi
}

# Check if user is logged in to Heroku
check_heroku_login() {
    if ! heroku auth:whoami &> /dev/null; then
        print_warning "You are not logged in to Heroku. Please login:"
        heroku login
    fi
}

# Deploy to existing Heroku app with Neon database
deploy_with_neon() {
    print_status "Starting deployment to Heroku with Neon database..."
    
    # Get app name from user
    read -p "Enter your Heroku app name (e.g., taskmotive): " APP_NAME
    
    if [ -z "$APP_NAME" ]; then
        print_error "App name is required"
        exit 1
    fi
    
    print_step "Step 1: Setting up environment variables..."
    
    # Set basic environment variables
    heroku config:set NODE_ENV=production --app $APP_NAME
    
    # Generate secrets if not set
    if ! heroku config:get SESSION_SECRET --app $APP_NAME &> /dev/null; then
        SESSION_SECRET=$(openssl rand -base64 32)
        heroku config:set SESSION_SECRET="$SESSION_SECRET" --app $APP_NAME
        print_status "Generated SESSION_SECRET"
    fi
    
    if ! heroku config:get JWT_SECRET --app $APP_NAME &> /dev/null; then
        JWT_SECRET=$(openssl rand -base64 32)
        heroku config:set JWT_SECRET="$JWT_SECRET" --app $APP_NAME
        print_status "Generated JWT_SECRET"
    fi
    
    print_step "Step 2: Neon Database Setup"
    echo ""
    echo "Please follow these steps to set up Neon:"
    echo "1. Go to https://neon.tech and sign up"
    echo "2. Create a new project"
    echo "3. Copy the connection string"
    echo "4. You'll need both DATABASE_URL and DIRECT_URL"
    echo ""
    
    # Get Neon database URLs
    read -p "Enter your Neon DATABASE_URL: " NEON_DATABASE_URL
    read -p "Enter your Neon DIRECT_URL: " NEON_DIRECT_URL
    
    if [ -z "$NEON_DATABASE_URL" ] || [ -z "$NEON_DIRECT_URL" ]; then
        print_error "Both DATABASE_URL and DIRECT_URL are required"
        exit 1
    fi
    
    # Set database URLs
    heroku config:set DATABASE_URL="$NEON_DATABASE_URL" --app $APP_NAME
    heroku config:set DIRECT_URL="$NEON_DIRECT_URL" --app $APP_NAME
    print_status "Database URLs configured"
    
    # Set CORS origin
    APP_URL="https://$APP_NAME.herokuapp.com"
    heroku config:set CORS_ORIGIN="$APP_URL" --app $APP_NAME
    print_status "CORS origin set to $APP_URL"
    
    print_step "Step 3: Deploying backend..."
    
    # Deploy backend
    cd backend
    git add .
    git commit -m "Deploy backend with Neon database" || true
    git push heroku main --app $APP_NAME
    
    # Run database migrations
    print_status "Running database migrations..."
    heroku run npm run db:migrate --app $APP_NAME
    
    cd ..
    
    print_step "Step 4: Deploying frontend..."
    
    # Set frontend environment variable
    heroku config:set VITE_API_URL="$APP_URL" --app $APP_NAME
    
    # Deploy frontend
    git add .
    git commit -m "Deploy frontend" || true
    git push heroku main --app $APP_NAME
    
    print_status "Deployment completed successfully!"
    print_status "Your app is available at: $APP_URL"
    print_status "Backend API: $APP_URL/api"
    print_status "Health check: $APP_URL/health"
    
    echo ""
    print_warning "Next steps:"
    echo "1. Test your application at $APP_URL"
    echo "2. Set up Google OAuth credentials if needed"
    echo "3. Set up Cloudinary credentials for file uploads"
    echo "4. Monitor your Neon database usage"
}

# Main deployment function
main() {
    print_status "Starting Neon + Heroku deployment..."
    
    # Check prerequisites
    check_heroku_cli
    check_heroku_login
    
    deploy_with_neon
}

# Run main function
main "$@" 