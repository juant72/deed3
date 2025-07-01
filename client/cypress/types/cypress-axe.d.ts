/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Inject and configure axe-core
         * @example cy.injectAxe()
         */
        injectAxe(): void;

        /**
         * Run accessibility checks using axe-core
         * @example cy.checkA11y()
         */
        checkA11y(
            context?: string | Node | object | null,
            options?: object,
            violationCallback?: (violations: any[]) => void,
            skipFailures?: boolean
        ): void;

        /**
         * Configure aXe options
         * @example cy.configureAxe({ branding: { brand: String }, reporter: 'option', checks: [Object], rules: [Object] })
         */
        configureAxe(options: object): void;
    }
}
