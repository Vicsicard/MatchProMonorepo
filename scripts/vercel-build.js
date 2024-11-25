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
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
