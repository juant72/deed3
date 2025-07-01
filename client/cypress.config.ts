import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on, config) {
            // implement node event listeners here
            // and load any plugins that require the Node environment
        },
    },
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
});
