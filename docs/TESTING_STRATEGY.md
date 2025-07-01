# Deed3 Testing Documentation

This document outlines the testing strategy and setup for the Deed3 project.

## Testing Strategy

Our testing strategy includes several layers:

1. **Unit Testing**: Using Jest and React Testing Library to test individual components
2. **End-to-End Testing**: Using Cypress to test full user flows and interactions
3. **Accessibility Testing**: Using axe-core and Cypress to validate accessibility compliance
4. **Performance Testing**: Using Lighthouse CI to validate performance metrics

## Test Configurations

### Unit Testing with Jest

All unit tests are configured in TypeScript:

- Configuration: `client/jest.config.ts`
- Setup: `client/jest.setup.ts`
- Mocks: `client/__mocks__/`

Run unit tests with:

```bash
pnpm test
```

### End-to-End Testing with Cypress

End-to-end tests are also configured in TypeScript:

- Configuration: `client/cypress.config.ts`
- Test files: `client/cypress/e2e/*.cy.ts`
- Support files: `client/cypress/support/`
- Custom commands: `client/cypress/support/commands.ts`

Run e2e tests with:

```bash
pnpm test:e2e        # Run headless
pnpm test:e2e:open   # Open Cypress GUI
```

### Accessibility Testing

We use axe-core integrated with Cypress for accessibility testing:

- Test files: `client/cypress/e2e/a11y-audit.cy.ts`
- Custom commands: `client/cypress/support/commands.ts`

Accessibility tests cover:
- ARIA attributes
- Keyboard navigation
- Focus management
- Color contrast
- Screen reader compatibility

### Performance Testing with Lighthouse CI

Performance is tested using Lighthouse CI:

- Configuration: `client/lighthouserc.js`
- Puppeteer script: `client/lighthouse/puppeteer-script.js`
- Reports: `client/lighthouse/reports/`

Run performance tests with:

```bash
pnpm lighthouse         # Default
pnpm lighthouse:desktop # Desktop preset
pnpm lighthouse:mobile  # Mobile preset
```

## Testing Standards

1. All tests must be written in TypeScript
2. Unit tests must have clear describe/it blocks
3. End-to-end tests should test complete user flows
4. All UI components must have accessibility tests
5. Performance tests must validate core web vitals

## Continuous Integration

These tests are integrated into our CI/CD pipeline:

1. Unit tests run on every PR
2. E2E tests run on feature branches
3. Lighthouse tests run on staging deployments

## Reporting

Test results are stored and tracked:

- Unit test results tracked in CI
- E2E test recordings available for failed tests
- Lighthouse reports available in the reports directory
