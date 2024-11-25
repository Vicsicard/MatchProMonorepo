const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');

try {
  // Build the main website
  console.log('Building main website...');
  execSync('yarn workspace matchproresumewebsite build', { stdio: 'inherit' });

  // Build the resume builder app
  console.log('Building resume builder app...');
  execSync('yarn workspace app-resume-tailoring build', { stdio: 'inherit' });

  // Create output directory structure
  const outputDir = '.vercel/output/static';
  fs.mkdirSync(path.join(process.cwd(), outputDir), { recursive: true });
  
  // Copy build outputs to the correct locations
  console.log('Copying build outputs...');
  
  // Copy main website
  const mainWebsiteBuild = path.join(process.cwd(), 'apps/matchproresumewebsite/dist');
  if (fs.existsSync(mainWebsiteBuild)) {
    fs.cpSync(mainWebsiteBuild, path.join(process.cwd(), outputDir), { recursive: true });
    console.log('Main website build copied successfully');
  } else {
    throw new Error('Main website build directory not found');
  }
  
  // Copy resume builder
  const resumeBuilderBuild = path.join(process.cwd(), 'apps/app-resume-tailoring/dist');
  const resumeBuilderDir = path.join(process.cwd(), outputDir, 'resume-builder');
  
  if (fs.existsSync(resumeBuilderBuild)) {
    fs.mkdirSync(resumeBuilderDir, { recursive: true });
    fs.cpSync(resumeBuilderBuild, resumeBuilderDir, { recursive: true });
    console.log('Resume builder build copied successfully');
  } else {
    throw new Error('Resume builder build directory not found');
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
