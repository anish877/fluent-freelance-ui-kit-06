#!/bin/bash

# Heroku Deployment Script for Fluent Freelance Platform
# Usage: ./deploy.sh [backend|frontend|both]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Deploy backend
deploy_backend() {
    print_status "Deploying backend..."
    
    cd backend
    
    # Check if app exists, if not create it
    if ! heroku apps:info &> /dev/null; then
        print_status "Creating new Heroku app for backend..."
        heroku create
    fi
    
    # Get app name
    APP_NAME=$(heroku apps:info --json | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
    print_status "Backend app name: $APP_NAME"
    
    # Add PostgreSQL if not already added
    if ! heroku addons:info heroku-postgresql &> /dev/null; then
        print_status "Adding PostgreSQL addon..."
        heroku addons:create heroku-postgresql:mini
    fi
    
    # Set environment variables
    print_status "Setting environment variables..."
    heroku config:set NODE_ENV=production
    
    # Generate secrets if not set
    if ! heroku config:get SESSION_SECRET &> /dev/null; then
        SESSION_SECRET=$(openssl rand -base64 32)
        heroku config:set SESSION_SECRET="$SESSION_SECRET"
    fi
    
    if ! heroku config:get JWT_SECRET &> /dev/null; then
        JWT_SECRET=$(openssl rand -base64 32)
        heroku config:set JWT_SECRET="$JWT_SECRET"
    fi
    
    # Deploy
    print_status "Deploying to Heroku..."
    git add .
    git commit -m "Deploy backend to Heroku" || true
    git push heroku main
    
    # Run migrations
    print_status "Running database migrations..."
    heroku run npm run db:migrate
    
    print_status "Backend deployed successfully!"
    print_status "Backend URL: https://$APP_NAME.herokuapp.com"
    
    cd ..
}

# Deploy frontend
deploy_frontend() {
    print_status "Deploying frontend..."
    
    # Check if app exists, if not create it
    if ! heroku apps:info &> /dev/null; then
        print_status "Creating new Heroku app for frontend..."
        heroku create
    fi
    
    # Get app name
    APP_NAME=$(heroku apps:info --json | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
    print_status "Frontend app name: $APP_NAME"
    
    # Get backend URL from user
    read -p "Enter your backend Heroku app URL (e.g., https://your-backend-app.herokuapp.com): " BACKEND_URL
    
    # Set environment variables
    print_status "Setting environment variables..."
    heroku config:set VITE_API_URL="$BACKEND_URL"
    
    # Deploy
    print_status "Deploying to Heroku..."
    git add .
    git commit -m "Deploy frontend to Heroku" || true
    git push heroku main
    
    print_status "Frontend deployed successfully!"
    print_status "Frontend URL: https://$APP_NAME.herokuapp.com"
    
    # Update backend CORS
    print_status "Updating backend CORS settings..."
    cd backend
    heroku config:set CORS_ORIGIN="https://$APP_NAME.herokuapp.com"
    heroku restart
    cd ..
}

# Main deployment function
main() {
    print_status "Starting Heroku deployment..."
    
    # Check prerequisites
    check_heroku_cli
    check_heroku_login
    
    case "${1:-both}" in
        "backend")
            deploy_backend
            ;;
        "frontend")
            deploy_frontend
            ;;
        "both")
            deploy_backend
            deploy_frontend
            ;;
        *)
            print_error "Invalid option. Use: backend, frontend, or both"
            exit 1
            ;;
    esac
    
    print_status "Deployment completed!"
    print_status "Don't forget to:"
    echo "1. Set up your Google OAuth credentials in the backend"
    echo "2. Set up your Cloudinary credentials if using file uploads"
    echo "3. Test your application thoroughly"
    echo "4. Set up monitoring and logging"
}

# Run main function with all arguments
main "$@" 