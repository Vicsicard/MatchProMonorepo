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
