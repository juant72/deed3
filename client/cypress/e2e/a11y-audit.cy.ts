describe('Accessibility Audit', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.injectAxe();
    });

    it('should have no accessibility violations on homepage', () => {
        cy.checkA11y();
    });

    it('should have no accessibility violations in header', () => {
        cy.get('header').then($header => {
            cy.checkA11y($header);
        });
    });

    it('should have no accessibility violations in footer', () => {
        cy.get('footer').then($footer => {
            cy.checkA11y($footer);
        });
    });

    it('should have no accessibility violations in navigation', () => {
        cy.get('nav').then($nav => {
            cy.checkA11y($nav);
        });
    });

    it('should have no critical accessibility violations in main content', () => {
        cy.get('main').then($main => {
            cy.checkA11y($main, {
                includedImpacts: ['critical', 'serious']
            });
        });
    });
});
