# Deployment Guide for StudyMate AI

This guide outlines the steps to deploy StudyMate AI to production using Vercel and Inngest.

## Prerequisites

- A GitHub account
- A Vercel account
- An Inngest account
- A NeonDB account (for PostgreSQL)
- A Clerk account
- A Google Cloud account (for Gemini AI)

## 1. Database Setup (NeonDB)

1. Create a new project on NeonDB
2. Create a new database
3. Get your database connection string
4. Add the connection string to your environment variables:
   ```
   DATABASE_URL="postgresql://user:password@ep-something.region.aws.neon.tech/dbname"
   ```

## 2. Authentication Setup (Clerk)

1. Create a new application on Clerk
2. Configure your application settings:
   - Set allowed redirect URLs
   - Configure sign-in and sign-up pages
3. Get your API keys and add them to environment variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
   ```

## 3. AI Setup (Google Gemini)

1. Create a project on Google Cloud Console
2. Enable the Gemini API
3. Create API credentials
4. Add the API key to environment variables:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY="your-gemini-api-key"
   ```

## 4. Background Jobs Setup (Inngest)

1. Create an account on Inngest
2. Create a new project
3. Get your Inngest event key
4. Add the key to environment variables:
   ```
   INNGEST_EVENT_KEY="your-inngest-event-key"
   ```

## 5. Local Development Setup

1. Copy the environment variables:

   ```bash
   cp .env.sample .env
   ```

2. Fill in all required environment variables in `.env`

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run database migrations:

   ```bash
   npm run db:generate
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 6. Deployment to Vercel

1. Push your code to GitHub

2. Connect your repository to Vercel:

   - Go to Vercel dashboard
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Next.js
     - Build Command: `next build`
     - Output Directory: `.next`
     - Install Command: `npm install`

3. Add environment variables in Vercel:

   - Go to Project Settings > Environment Variables
   - Add all variables from your `.env` file

4. Deploy the project

## 7. Inngest Functions Deployment

1. Install Inngest CLI:

   ```bash
   npm install -g inngest-cli
   ```

2. Login to Inngest:

   ```bash
   inngest-cli login
   ```

3. Deploy your functions:

   ```bash
   inngest-cli deploy
   ```

4. Configure Inngest in your Vercel deployment:
   - Add Inngest environment variables
   - Configure the Inngest endpoint in your API routes

## 8. Post-Deployment Steps

1. Verify database connections
2. Test authentication flow
3. Test course generation
4. Monitor Inngest functions
5. Set up error tracking (optional)
6. Configure custom domain (optional)

## 9. Monitoring and Maintenance

1. Set up Vercel Analytics
2. Monitor Inngest function logs
3. Set up database backups
4. Configure rate limiting
5. Set up error alerts

## 10. Security Considerations

1. Enable HTTPS
2. Configure CORS settings
3. Set up rate limiting
4. Enable security headers
5. Regular dependency updates

## Troubleshooting

Common issues and solutions:

1. Database Connection Issues

   - Verify DATABASE_URL
   - Check database permissions
   - Ensure IP whitelist is configured

2. Authentication Problems

   - Verify Clerk API keys
   - Check redirect URLs
   - Validate session configuration

3. Inngest Function Failures

   - Check function logs
   - Verify event key
   - Monitor function timeouts

4. AI Generation Issues
   - Verify Gemini API key
   - Check API quotas
   - Monitor response times

## Support

For additional support:

- Vercel Documentation
- Inngest Documentation
- NeonDB Documentation
- Clerk Documentation
- Google Cloud Documentation
