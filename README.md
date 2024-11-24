# MatchPro Monorepo

A comprehensive career development platform built with React, TypeScript, and Vite.

## Applications

- **Resume Builder**: Create and manage professional resumes
- **Job Matching**: Find jobs that match your skills and experience
- **Resume Tailoring**: Customize resumes for specific job applications
- **Interview Coach**: Practice and improve interview skills (Coming Soon)

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Yarn Workspaces

## Project Structure

```
MatchProMonorepo/
├── apps/
│   ├── matchproresumewebsite/    # Main website
│   ├── app-matchpro-resume/      # Resume Builder
│   ├── app-job-matching/         # Job Matching
│   ├── app-resume-tailoring/     # Resume Tailoring
│   └── app-interview-coach/      # Interview Coach
├── libs/
│   ├── ui/                       # Shared UI components
│   ├── styles/                   # Shared styles
│   ├── data/                     # Shared data layer
│   └── config/                   # Shared configuration
```

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add required environment variables:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. Start development server:
   ```bash
   # Start main website
   yarn workspace matchproresumewebsite dev
   
   # Start specific app
   yarn workspace @matchpro/resume-builder dev
   ```

## Development

- **Feature Flags**: Control feature availability in `libs/config/src/featureFlags.ts`
- **Styling**: Add shared styles in `libs/styles/src/tailwind.css`
- **Components**: Create reusable components in `libs/ui/src/components`
- **Data Layer**: Manage data access in `libs/data/src`

## Deployment

The monorepo is configured for deployment on Vercel:

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

2. Import to Vercel:
   - Connect your GitHub repository
   - Configure build settings:
     - Build Command: `yarn build`
     - Output Directory: `apps/matchproresumewebsite/dist`
   - Add environment variables in Vercel dashboard

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE)
