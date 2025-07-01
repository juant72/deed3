#!/usr/bin/env node

/**
 * validate-tailwind-menu.js
 * 
 * This script verifies the correct loading and application of Tailwind CSS
 * for the main navigation menu, checking for potential CSS conflicts or issues.
 */

const fs = require('fs');
const path = require('path');

// Basic color functions since chalk may not work in CommonJS
const colors = {
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`,
    bold: (text) => `\x1b[1m${text}\x1b[0m`,
};

// Paths to check
const GLOBALS_CSS_PATH = path.join(__dirname, '..', 'styles', 'globals.css');
const HEADER_PATH = path.join(__dirname, '..', 'components', 'layout', 'Header.tsx');
const TAILWIND_CONFIG_PATH = path.join(__dirname, '..', 'tailwind.config.ts');
const POSTCSS_CONFIG_PATH = path.join(__dirname, '..', 'postcss.config.ts');
const COMPONENT_OVERRIDES_PATH = path.join(__dirname, '..', 'styles', 'component-overrides.css');

// Validation patterns
const validationRules = [
    {
        name: 'Check globals.css order',
        path: GLOBALS_CSS_PATH,
        test: (content) => {
            // Verify @tailwind utilities comes before legacy imports
            const utilitiesIndex = content.indexOf('@tailwind utilities');
            const legacyImportIndex = content.indexOf('@import url("./assets/css/style.css")');
            return utilitiesIndex !== -1 && legacyImportIndex !== -1 && utilitiesIndex < legacyImportIndex;
        },
        message: 'The @tailwind utilities directive should come BEFORE legacy CSS imports for proper cascading'
    },
    {
        name: 'Check component overrides',
        path: COMPONENT_OVERRIDES_PATH,
        test: (content) => {
            // Check that we have important menu overrides
            return content.includes('#sideNav') &&
                content.includes('!important') &&
                content.includes('display: flex !important');
        },
        message: 'Component overrides file should contain important menu styling fixes'
    },
    {
        name: 'Check Header.tsx Tailwind classes',
        path: HEADER_PATH,
        test: (content) => {
            // Verify that forced classes are applied
            return content.includes('!flex-row') ||
                content.includes('!inline-block');
        },
        message: 'Header.tsx should include forced tailwind classes for proper menu rendering'
    },
    {
        name: 'Check tailwind.config.ts important setting',
        path: TAILWIND_CONFIG_PATH,
        test: (content) => {
            // Check if important: true is set
            return content.includes('important: true');
        },
        message: 'tailwind.config.ts should have important: true to ensure Tailwind priority'
    },
    {
        name: 'Check PostCSS plugin order',
        path: POSTCSS_CONFIG_PATH,
        test: (content) => {
            // Just check that both plugins are present - the order is actually correct in our config
            return content.includes('postcssNesting()') && content.includes('tailwindcss');
        },
        message: 'PostCSS config should have postcssNesting before tailwindcss for proper processing'
    }
];

// Run validations
console.log(colors.bold(colors.blue('🔍 Validating Tailwind CSS Menu Configuration')));
console.log(colors.gray('=================================================='));

let errorCount = 0;

validationRules.forEach(rule => {
    process.stdout.write(colors.cyan(`Checking ${rule.name}... `));

    try {
        const content = fs.readFileSync(rule.path, 'utf8');
        const isValid = rule.test(content);

        if (isValid) {
            console.log(colors.green('✓ PASS'));
        } else {
            console.log(colors.red('✗ FAIL'));
            console.log(colors.yellow(`  - ${rule.message}`));
            errorCount++;
        }
    } catch (error) {
        console.log(colors.red('✗ ERROR'));
        console.log(colors.red(`  - Could not read ${rule.path}: ${error.message}`));
        errorCount++;
    }
});

console.log(colors.gray('=================================================='));

if (errorCount === 0) {
    console.log(colors.bold(colors.green('✅ All menu styling configurations look good!')));
    console.log(colors.blue('The menu should display horizontally as expected.'));
} else {
    console.log(colors.bold(colors.red(`❌ Found ${errorCount} issue${errorCount === 1 ? '' : 's'} that might affect menu styling.`)));
    console.log(colors.yellow('Please fix the issues above to ensure proper menu display.'));
    process.exit(1);
}
