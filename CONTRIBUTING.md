# Contributing to MatchPro

Thank you for your interest in contributing to MatchPro! This document provides guidelines and instructions for contributing to our project.

## Development Workflow

### 1. Setting Up Your Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/MatchProMonorepo.git
   cd MatchProMonorepo
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in the required values

### 2. Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Development Guidelines**
   - Follow the existing code style
   - Write meaningful commit messages
   - Add tests for new features
   - Update documentation as needed

3. **Testing Your Changes**
   ```bash
   # Run tests
   yarn test
   
   # Run linting
   yarn lint
   
   # Build the project
   yarn build
   ```

### 3. Submitting Changes

1. **Push Your Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Use a clear PR title
   - Describe your changes in detail
   - Reference any related issues
   - Ensure CI checks pass

## Project Structure Guidelines

### Adding a New Application

1. Create a new directory under `apps/`:
   ```bash
   mkdir apps/your-new-app
   ```

2. Initialize with our template:
   ```bash
   yarn create vite apps/your-new-app --template react-ts
   ```

3. Update `package.json`:
   ```json
   {
     "name": "@matchpro/your-new-app",
     "private": true,
     "dependencies": {
       "@matchpro/ui": "workspace:*",
       "@matchpro/data": "workspace:*",
       "@matchpro/styles": "workspace:*"
     }
   }
   ```

### Working with Shared Libraries

1. **UI Components (`libs/ui/`)**
   - Place reusable components here
   - Follow the component template
   - Include PropTypes/TypeScript types
   - Add tests and documentation

2. **Data Layer (`libs/data/`)**
   - Handle data access and state management
   - Follow the repository pattern
   - Document API interfaces

3. **Styles (`libs/styles/`)**
   - Use Tailwind utility classes
   - Follow BEM naming convention for custom classes
   - Keep theme configuration centralized

## Code Style Guide

### TypeScript

- Use TypeScript for all new code
- Define interfaces for props and state
- Use meaningful type names
- Avoid `any` type

### React

- Use functional components
- Implement proper error boundaries
- Follow React hooks best practices
- Keep components focused and small

### Testing

- Write unit tests for utilities
- Add integration tests for components
- Include E2E tests for critical flows
- Maintain good test coverage

## Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex algorithms
- Include usage examples
- Keep README files up to date

### API Documentation

- Document all API endpoints
- Include request/response examples
- Note authentication requirements
- List error responses

## Need Help?

- Check existing issues and documentation
- Join our development discussions
- Ask questions in pull requests
- Contact the maintainers

Remember: Good code is readable, maintainable, and well-documented. Thank you for helping make MatchPro better!
