# MatchPro Deployment Guide

This guide provides detailed instructions for deploying the MatchPro platform.

## Prerequisites

- Node.js v18 or higher
- Yarn package manager
- Vercel CLI (optional for manual deployments)
- GitHub account
- Supabase account

## Environment Setup

1. **Create Supabase Project**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Create a new project
   - Note down the project URL and anon key

2. **Configure Environment Variables**
   ```bash
   # Copy example env file
   cp .env.example .env
   
   # Add your values
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

## Deployment Options

### 1. Automatic Deployment (Recommended)

#### GitHub Actions + Vercel

1. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings:
     ```
     Build Command: yarn build
     Output Directory: apps/matchproresumewebsite/dist
     Install Command: yarn install
     ```

2. **Add Environment Variables**
   - In Vercel Dashboard:
     - Go to Project Settings > Environment Variables
     - Add all variables from your `.env` file

3. **Configure Domain (Optional)**
   - In Vercel Dashboard:
     - Go to Project Settings > Domains
     - Add your custom domain
     - Follow DNS configuration instructions

4. **Enable GitHub Integration**
   - Automatic deployments will trigger on:
     - Push to main branch
     - Pull request creation
   - Preview deployments available for pull requests

### 2. Manual Deployment

#### Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Deploy to preview
   vercel
   
   # Deploy to production
   vercel --prod
   ```

#### Using Docker (Alternative)

1. **Build Docker Image**
   ```bash
   docker build -t matchpro .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e VITE_SUPABASE_URL=your_url \
     -e VITE_SUPABASE_ANON_KEY=your_key \
     matchpro
   ```

## Post-Deployment

### 1. Verify Deployment

- Check application health:
  ```bash
  curl https://your-domain.com/api/health
  ```
- Test authentication flows
- Verify database connections
- Check all environment variables are set

### 2. Monitoring

- Set up monitoring in Vercel Dashboard
- Configure error tracking (e.g., Sentry)
- Set up performance monitoring
- Enable email notifications for deployment failures

### 3. Backup and Recovery

- Enable Supabase automated backups
- Document recovery procedures
- Test backup restoration process

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel
   - Verify all dependencies are installed
   - Check for TypeScript errors
   - Ensure environment variables are set

2. **Runtime Errors**
   - Check application logs
   - Verify API endpoints
   - Check database connections
   - Validate environment variables

3. **Performance Issues**
   - Review Vercel analytics
   - Check database query performance
   - Verify CDN configuration
   - Monitor API response times

### Getting Help

- Check deployment logs
- Review GitHub Actions workflow runs
- Consult error documentation
- Contact support team

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use Vercel's encrypted environment variables
   - Rotate keys periodically
   - Use different keys for staging/production

2. **Access Control**
   - Configure CORS properly
   - Set up proper authentication
   - Use secure headers
   - Enable rate limiting

3. **Monitoring**
   - Set up security alerts
   - Monitor for unusual activity
   - Keep dependencies updated
   - Regular security audits

## Maintenance

### Regular Tasks

1. **Updates**
   - Keep dependencies updated
   - Review security advisories
   - Update Node.js version
   - Patch system vulnerabilities

2. **Monitoring**
   - Check error rates
   - Monitor performance metrics
   - Review usage statistics
   - Audit access logs

3. **Backup**
   - Verify backup integrity
   - Test restoration procedures
   - Update backup configurations
   - Document recovery steps

## Rollback Procedures

1. **Quick Rollback**
   ```bash
   # Using Vercel CLI
   vercel rollback
   ```

2. **Manual Rollback**
   - Revert to last working commit
   - Deploy previous version
   - Verify application state
   - Update DNS if needed

Remember to always test deployments in a staging environment first!
