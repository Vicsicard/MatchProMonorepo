const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Helper function to execute commands
function execute(command, options = {}) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (error) {
    return false;
  }
}

// Helper function to check if file exists
function checkFile(filePath, name) {
  const exists = fs.existsSync(filePath);
  console.log(
    `${exists ? colors.green + '✓' : colors.red + '✗'} ${colors.bright}${name}${
      colors.reset
    } ${exists ? 'exists' : 'is missing'}`
  );
  return exists;
}

// Main test function
async function testDeployment() {
  console.log(`\n${colors.bright}🚀 Testing Deployment Setup...${colors.reset}\n`);

  let success = true;

  // Check required files
  console.log(`${colors.bright}Checking Required Files:${colors.reset}`);
  success &= checkFile('vercel.json', 'vercel.json');
  success &= checkFile('.gitignore', '.gitignore');
  success &= checkFile('package.json', 'package.json');
  success &= checkFile(
    'apps/matchproresumewebsite/vite.config.ts',
    'Vite Config'
  );
  success &= checkFile('.github/workflows/ci.yml', 'CI Workflow');

  // Check environment variables
  console.log(`\n${colors.bright}Checking Environment Variables:${colors.reset}`);
  const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
  for (const envVar of requiredEnvVars) {
    const exists = process.env[envVar];
    console.log(
      `${exists ? colors.green + '✓' : colors.yellow + '!'} ${
        colors.bright
      }${envVar}${colors.reset} ${
        exists ? 'is set' : 'is not set (required for deployment)'
      }`
    );
  }

  // Check package scripts
  console.log(`\n${colors.bright}Checking Package Scripts:${colors.reset}`);
  const packageJson = require('../package.json');
  const requiredScripts = ['build', 'test', 'lint'];
  for (const script of requiredScripts) {
    const exists = packageJson.scripts && packageJson.scripts[script];
    console.log(
      `${exists ? colors.green + '✓' : colors.red + '✗'} ${colors.bright}${script}${
        colors.reset
      } script ${exists ? 'exists' : 'is missing'}`
    );
    success &= exists;
  }

  // Clean install dependencies
  console.log(`\n${colors.bright}Testing Clean Install:${colors.reset}`);
  success &= execute('yarn clean');
  success &= execute('yarn install');

  // Run tests
  console.log(`\n${colors.bright}Running Tests:${colors.reset}`);
  success &= execute('yarn test', { stdio: 'pipe' });

  // Run linting
  console.log(`\n${colors.bright}Running Linting:${colors.reset}`);
  success &= execute('yarn lint', { stdio: 'pipe' });

  // Test build
  console.log(`\n${colors.bright}Testing Build Process:${colors.reset}`);
  success &= execute('yarn build:libs');
  success &= execute('yarn build:main');

  // Check build output
  console.log(`\n${colors.bright}Checking Build Output:${colors.reset}`);
  success &= checkFile(
    'apps/matchproresumewebsite/build/index.html',
    'Build Output'
  );

  // Check CI workflow
  console.log(`\n${colors.bright}Validating CI Workflow:${colors.reset}`);
  const ciConfig = fs.readFileSync('.github/workflows/ci.yml', 'utf8');
  const hasTestJob = ciConfig.includes('name: Run Tests');
  const hasBuildJob = ciConfig.includes('name: Build Apps');
  const hasLintJob = ciConfig.includes('name: Run Linting');

  console.log(
    `${hasTestJob ? colors.green + '✓' : colors.red + '✗'} ${colors.bright}Test Job${
      colors.reset
    } ${hasTestJob ? 'configured' : 'missing'}`
  );
  console.log(
    `${hasBuildJob ? colors.green + '✓' : colors.red + '✗'} ${colors.bright}Build Job${
      colors.reset
    } ${hasBuildJob ? 'configured' : 'missing'}`
  );
  console.log(
    `${hasLintJob ? colors.green + '✓' : colors.red + '✗'} ${colors.bright}Lint Job${
      colors.reset
    } ${hasLintJob ? 'configured' : 'missing'}`
  );

  success &= hasTestJob && hasBuildJob && hasLintJob;

  // Final report
  console.log(
    `\n${colors.bright}${
      success ? colors.green + '✓ All checks passed!' : colors.red + '✗ Some checks failed!'
    }${colors.reset}\n`
  );

  if (!success) {
    console.log(
      `${colors.yellow}Please fix the issues above before deploying.${colors.reset}\n`
    );
    process.exit(1);
  }
}

// Run tests
testDeployment().catch((error) => {
  console.error(
    `${colors.red}Error during deployment testing:${colors.reset}`,
    error
  );
  process.exit(1);
});
