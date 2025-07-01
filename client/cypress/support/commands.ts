// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to simulate pressing the tab key
             * @example cy.tabKey()
             */
            tabKey(): Chainable<Element>;

            /**
             * Custom command to test focus trap in modals
             * @example cy.checkFocusTrap('selector')
             */
            checkFocusTrap(selector: string): Chainable<Element>;
        }
    }
}

// Tab key command
Cypress.Commands.add('tabKey', (): void => {
    cy.focused().trigger('keydown', { keyCode: 9, which: 9 });
    cy.document().trigger('keyup', { keyCode: 9, which: 9 });
});

// Focus trap command for accessibility testing
Cypress.Commands.add('checkFocusTrap', (selector: string): void => {
    const focusableSelectors = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

    cy.get(selector).find(focusableSelectors).first().as('firstFocusable');
    cy.get(selector).find(focusableSelectors).last().as('lastFocusable');

    // Focus the last element and press Tab
    cy.get('@lastFocusable').focus().tabKey();

    // Should cycle back to first element
    cy.get('@firstFocusable').should('be.focused');
});

export { };
