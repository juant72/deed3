describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should load the home page successfully', () => {
        cy.get('h1').should('be.visible');
    });

    it('should have navigation links', () => {
        cy.get('nav').should('exist');
        cy.get('nav a').should('have.length.at.least', 1);
    });

    it('should be responsive', () => {
        // Test on mobile viewport
        cy.viewport('iphone-6');
        cy.wait(500); // Wait for potential resize events
        cy.get('nav').should('exist');

        // Test on tablet viewport
        cy.viewport('ipad-2');
        cy.wait(500);
        cy.get('nav').should('exist');

        // Return to desktop viewport
        cy.viewport(1280, 720);
        cy.wait(500);
        cy.get('nav').should('exist');
    });
});
