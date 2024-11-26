# MatchPro Career Suite Deployment Guide

This guide explains how to deploy the MatchPro Career Suite monorepo to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (linked to your GitHub account)
3. Access to the Supabase project

## Environment Variables

The following environment variables must be set in Vercel:

```env
VITE_SUPABASE_URL=https://iqovlypkybcxowsivguh.supabase.co
VITE_SUPABASE_ANON_KEY=[Your Supabase Anon Key]
```

## Deployment Steps

### 1. Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial monorepo setup"

# Set main branch
git branch -M main

# Add remote repository
git remote add origin [Your GitHub Repository URL]

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Vercel

1. Log in to [Vercel](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `yarn build`
   - Output Directory: `apps/matchproresumewebsite/dist`
   - Install Command: `yarn install`

### 3. Environment Variables

1. In Vercel project settings, go to "Environment Variables"
2. Add the following variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Set the variables for:
   - Production
   - Preview
   - Development

### 4. Deploy Settings

The following settings are automatically configured in `vercel.json`:

```json
{
  "name": "matchpro-career-suite",
  "version": 2,
  "buildCommand": "yarn build",
  "outputDirectory": "apps/matchproresumewebsite/dist",
  "installCommand": "yarn install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 5. Verify Deployment

1. Check the deployment logs in Vercel
2. Verify that all environment variables are correctly set
3. Test the deployed application:
   - Navigation works correctly
   - Feature flags are respected
   - Supabase connection is working
   - All shared components are loading

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Vercel build logs
   - Verify all dependencies are installed
   - Ensure build scripts are correct in package.json

2. **Runtime Errors**
   - Check browser console for errors
   - Verify environment variables are set
   - Check Supabase connection

3. **Routing Issues**
   - Verify vercel.json rewrites are correct
   - Check React Router configuration
   - Ensure lazy-loaded components are working

### Getting Help

If you encounter issues:
1. Check Vercel's deployment logs
2. Review the project's GitHub issues
3. Contact the development team

## Continuous Deployment

The project is set up for continuous deployment:
1. Push to `main` branch triggers production deployment
2. Pull requests create preview deployments
3. Feature branches can be deployed to preview environments

## Security Notes

1. Never commit environment variables
2. Keep Supabase keys secure
3. Regularly rotate API keys
4. Monitor Vercel deployment logs

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Supabase Documentation](https://supabase.io/docs)

## Current Deployment Status

We are experiencing issues deploying the monorepo to Vercel. This document tracks our deployment configuration, issues, and solutions.

## Environment Requirements

- Node.js: >=18.0.0
- Yarn: 1.22.x
- Framework: Vite + React + TypeScript
- Build Tool: Turborepo

## Configuration Files

### vercel.json
```json
{
  "version": 2,
  "framework": "vite",
  "installCommand": "yarn install",
  "buildCommand": "cd libs/ui && yarn build && cd ../data && yarn build && cd ../../apps/app-matchpro-resume && yarn build",
  "outputDirectory": "apps/app-matchpro-resume/dist"
}
```

### Required Environment Variables

```env
VITE_SUPABASE_URL=https://iqovlypkybcxowsivguh.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Known Issues

1. **Build Failure in Vercel**
   - Error: `Command 'yarn build' exited with 1`
   - Possible causes:
     - Workspace dependency resolution
     - Environment variable configuration
     - Build command sequence
     - Node.js/Yarn version mismatch

2. **Workspace Dependencies**
   - Local builds succeed
   - Vercel build fails to resolve workspace packages

## Troubleshooting Steps

1. **Verify Local Build**
   ```bash
   # Clean install
   yarn cache clean
   yarn install

   # Build workspace packages
   cd libs/ui && yarn build
   cd ../data && yarn build

   # Build main app
   cd ../../apps/app-matchpro-resume
   yarn build
   ```

2. **Check Vercel Configuration**
   - Verify Node.js version in Vercel
   - Confirm environment variables are set
   - Review build command output

3. **Test with Vercel CLI**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Test deployment locally
   vercel
   ```

## Next Steps

1. Obtain complete Vercel build logs
2. Test deployment with Vercel CLI
3. Consider alternative deployment strategies:
   - Simplified build process
   - Separate package deployments
   - Different hosting platform

## Resources

- [Vercel Monorepo Documentation](https://vercel.com/docs/monorepos)
- [Yarn Workspaces Guide](https://classic.yarnpkg.com/en/docs/workspaces/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## Support

If you encounter issues:
1. Check the error logs
2. Review this documentation
3. Create an issue with:
   - Complete error message
   - Steps to reproduce
   - Vercel build logs
   - Local environment details
