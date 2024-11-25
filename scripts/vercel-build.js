const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
  const outputDir = '.vercel/output/static';
  fs.mkdirSync(path.join(process.cwd(), outputDir), { recursive: true });
  
  // Copy build outputs to the correct locations using cross-platform commands
  const copyDir = (src, dest) => {
    fs.cpSync(path.join(process.cwd(), src), path.join(process.cwd(), dest), { recursive: true });
  };

  copyDir('apps/matchproresumewebsite/dist', outputDir);
  
  const resumeBuilderDir = path.join(outputDir, 'resume-builder');
  fs.mkdirSync(resumeBuilderDir, { recursive: true });
  copyDir('apps/app-resume-tailoring/dist', resumeBuilderDir);

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
