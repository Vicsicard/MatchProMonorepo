# Windows-Specific Deployment Guide for MatchPro Monorepo

## Introduction

This guide addresses Windows-specific deployment challenges for the MatchPro monorepo, particularly focusing on path issues and build configurations that we've encountered with Vercel deployment.

## Prerequisites

1. Windows 10 or later
2. Git for Windows
3. Node.js >= 18.0.0
4. Yarn 1.22.x
5. Vercel CLI (`npm install -g vercel`)

## Path-Related Configurations

### 1. Package.json Scripts

Use double quotes for Windows paths in npm scripts:
```json
{
  "scripts": {
    "clean": "rimraf \"./apps/*/node_modules\" \"./libs/*/node_modules\" \"./node_modules\" \"./apps/*/dist\" \"./libs/*/dist\"",
    "build": "turbo run build",
    "postinstall": "yarn install --force --ignore-scripts --production=false --network-timeout 300000"
  }
}
```

### 2. Vercel.json Configuration

Ensure build commands use forward slashes for cross-platform compatibility:
```json
{
  "version": 2,
  "framework": "vite",
  "installCommand": "yarn install --frozen-lockfile --network-timeout 300000",
  "buildCommand": "cd libs/ui && yarn build && cd ../data && yarn build && cd ../styles && yarn build && cd ../config && yarn build && cd ../../apps/matchproresumewebsite && yarn build",
  "outputDirectory": "apps/matchproresumewebsite/dist",
  "build": {
    "env": {
      "NODE_OPTIONS": "--max-old-space-size=4096",
      "TURBO_TELEMETRY_DISABLED": "1",
      "YARN_ENABLE_IMMUTABLE_INSTALLS": "false",
      "NPM_FLAGS": "--legacy-peer-deps"
    }
  }
}
```

### 3. Git Configuration

Set up Git to handle line endings correctly:
```bash
# Create .gitattributes file
* text=auto eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
```

## Common Issues and Solutions

### 1. Path Length Issues

Windows has a default path length limit of 260 characters. To handle this:

1. Enable long paths in Windows:
   ```powershell
   # Run in PowerShell as Administrator
   Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1
   ```

2. Configure Git to handle long paths:
   ```bash
   git config --system core.longpaths true
   ```

### 2. Build Process Issues

1. Clean installation before building:
   ```bash
   # Clean all dependencies and build artifacts
   yarn clean

   # Fresh install
   yarn install

   # Build all packages
   yarn build
   ```

2. Troubleshoot build failures:
   ```bash
   # Build with verbose output
   yarn build --verbose

   # Build specific package
   yarn workspace @matchpro/ui build
   ```

## Vercel Deployment Steps

1. Login to Vercel CLI:
   ```bash
   vercel login
   ```

2. Link your project:
   ```bash
   vercel link
   ```

3. Set up environment variables:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

4. Deploy:
   ```bash
   vercel deploy --prod
   ```

## Environment Variables

Ensure these environment variables are set in Vercel:

```env
VITE_SUPABASE_URL=https://iqovlypkybcxowsivguh.supabase.co
VITE_SUPABASE_ANON_KEY=[Your Supabase Anon Key]
NODE_OPTIONS=--max-old-space-size=4096
TURBO_TELEMETRY_DISABLED=1
YARN_ENABLE_IMMUTABLE_INSTALLS=false
NPM_FLAGS=--legacy-peer-deps
```

## Troubleshooting Build Failures

1. Check build logs:
   ```bash
   vercel logs [deployment-url]
   ```

2. Test build locally:
   ```bash
   # Clean install
   yarn clean && yarn install

   # Build with debug output
   DEBUG=* yarn build
   ```

3. Common error solutions:
   - "Command 'yarn build' exited with 1": Check individual package build commands
   - Path-related errors: Verify path separators in scripts
   - Memory issues: Increase Node.js memory limit
   - Network timeouts: Increase network timeout in yarn commands

## Additional Resources

- [Vercel Monorepo Documentation](https://vercel.com/docs/monorepos)
- [Turborepo Documentation](https://turborepo.org/docs)
- [Windows Development Guide](https://learn.microsoft.com/en-us/windows/dev-environment/)
