# Deed3 Coding Standards

## Language Standards

### TypeScript Exclusive

- **TypeScript Only**: All code in the Deed3 project MUST be written in TypeScript. JavaScript (.js files) is not allowed for application code.
- **File Extensions**: All source files should use `.ts` or `.tsx` extensions.
- **Configuration Files**: All configuration files (Jest, ESLint, etc.) should be in TypeScript format with `.ts` extensions whenever possible.
- **No JavaScript**: Do not introduce any new `.js` files to the project. Existing JavaScript files must be migrated to TypeScript.
  
### Exceptions

- The only allowed exceptions to the TypeScript-only rule are:
  - Third-party vendor scripts in the `/public` directory
  - Build tool configurations that absolutely cannot be expressed in TypeScript
  - Web3/Hardhat configurations that require JavaScript
  
## Type Safety

- **Strict Mode**: Use TypeScript's strict mode wherever possible.
- **Avoid `any`**: Avoid using `any` type. Use proper typing or `unknown` when the type is uncertain.
- **Type Interfaces**: Define interfaces for props, state, and complex objects.
- **Union Types**: Use union types instead of any when a variable can be one of several types.

## Code Organization

- **Component Structure**: Use functional components with hooks.
- **File Organization**: One component per file, named after the component.
- **Imports Organization**: Group imports by: React/Next.js, external libraries, project components, project utilities.

## Best Practices

- **Component Props**: Define props using interfaces, not types.
- **State Management**: Use React hooks for state management.
- **Error Handling**: Properly handle errors with try/catch blocks.
- **Async/Await**: Prefer async/await over Promise chains.
- **Comments**: Use JSDoc comments for functions and components.

## Testing

- All test files should use `.test.ts` or `.test.tsx` extensions for Jest unit tests.
- Cypress E2E test files should use `.cy.ts` extension.
- All test configuration files should be in TypeScript format:
  - Jest: `jest.config.ts`, `jest.setup.ts`
  - Cypress: `cypress.config.ts`
  - Lighthouse: `lighthouserc.ts`, `lighthouse/puppeteer-script.ts`
- Custom types for testing libraries should be defined in appropriate `.d.ts` files.
- For accessibility testing, use axe-core with Cypress.

## Migration Guidance

When migrating JavaScript files to TypeScript:

1. Change the file extension from `.js` to `.ts` or `.jsx` to `.tsx`
2. Add proper type definitions
3. Fix any type errors
4. Update imports to use the new file extension

## Enforcement

- Pull requests that introduce JavaScript files will not be approved.
- Code reviews should check for TypeScript compliance.
- The CI/CD pipeline should enforce these standards.
