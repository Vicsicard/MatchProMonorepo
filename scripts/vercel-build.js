const { execSync } = require('child_process');

// Get the path that changed
const changedFiles = process.env.VERCEL_GIT_COMMIT_REF || '';
console.log('Building with changes in:', changedFiles);

try {
  // Always build shared libraries first
  console.log('Building shared libraries...');
  execSync('yarn workspace @matchpro/ui build', { stdio: 'inherit' });
  execSync('yarn workspace @matchpro/data build', { stdio: 'inherit' });
  execSync('yarn workspace @matchpro/styles build', { stdio: 'inherit' });
  execSync('yarn workspace @matchpro/config build', { stdio: 'inherit' });

  // Build the main website
  console.log('Building main website...');
  execSync('yarn workspace matchproresumewebsite build', { stdio: 'inherit' });

  // Build the resume builder app
  console.log('Building resume builder app...');
  execSync('yarn workspace app-resume-tailoring build', { stdio: 'inherit' });

  // Create output directory structure
  execSync('mkdir -p .vercel/output/static', { stdio: 'inherit' });
  
  // Copy build outputs to the correct locations
  execSync('cp -r apps/matchproresumewebsite/dist/* .vercel/output/static/', { stdio: 'inherit' });
  execSync('mkdir -p .vercel/output/static/resume-builder', { stdio: 'inherit' });
  execSync('cp -r apps/app-resume-tailoring/dist/* .vercel/output/static/resume-builder/', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
