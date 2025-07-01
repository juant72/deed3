// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Add accessibility testing capability using axe-core
import 'cypress-axe';

// Ensures tab key press works in tests
Cypress.on('window:before:load', (win) => {
    // Stub tab key behavior
    cy.stub(win.console, 'error').callsFake((msg) => {
        // Filter out non-critical errors
        if (!msg.includes('ResizeObserver loop limit exceeded')) {
            cy.log(`Console error: ${msg}`);
        }
    });
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
