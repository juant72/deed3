describe('Accessibility', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should have proper keyboard navigation', () => {
        cy.get('a:visible').first().focus();
        // Navigate through the site with keyboard only
        for (let i = 0; i < 5; i++) {
            cy.focused().should('be.visible');
            cy.tabKey();
        }
    });

    it('should have proper ARIA attributes', () => {
        // Check for proper role attributes in common components
        cy.get('nav').should('have.attr', 'role', 'navigation');
        cy.get('button').each(($el) => {
            const hasAriaLabel = $el.attr('aria-label') !== undefined;
            const hasTextContent = $el.text().trim().length > 0;
            // Use Cypress assertion style
            cy.wrap(hasAriaLabel || hasTextContent).should('eq', true);
        });
    });

    it('should test modals for keyboard accessibility', () => {
        // Find a button that opens a modal
        cy.get('button').contains(/sign in|log in|connect/i).first().click({ force: true });

        // The modal should trap focus for accessibility
        cy.get('[role="dialog"]').should('be.visible');

        // Test Escape key closes the modal
        cy.get('body').type('{esc}');
        cy.get('[role="dialog"]').should('not.exist');
    });
});
