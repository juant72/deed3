/**
 * Tailwind CSS Configuration Validator
 * 
 * This script validates that the Tailwind CSS configuration is correct
 * and properly set up in the project. It checks:
 * 
 * 1. PostCSS configuration has the correct Tailwind plugin
 * 2. globals.css has the proper Tailwind directives
 * 3. package.json has the correct dependencies
 * 
 * Run with: npm run validate:tailwind or pnpm validate:tailwind
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk'); // Colorful terminal output

// Paths to check
const POST_CSS_CONFIG_PATH = path.join(process.cwd(), 'postcss.config.ts');
const GLOBALS_CSS_PATH = path.join(process.cwd(), 'styles', 'globals.css');
const PACKAGE_JSON_PATH = path.join(process.cwd(), 'package.json');

console.log(chalk.blue('🔍 Validating Tailwind CSS Configuration...'));

let hasErrors = false;

// Check if file exists
const fileExists = (filePath) => {
    try {
        return fs.existsSync(filePath);
    } catch (err) {
        return false;
    }
};

// Read file content
const readFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error(chalk.red(`❌ Error reading file ${filePath}: ${err.message}`));
        hasErrors = true;
        return null;
    }
};

// 1. Check PostCSS config
if (fileExists(POST_CSS_CONFIG_PATH)) {
    const postCssContent = readFile(POST_CSS_CONFIG_PATH);

    if (postCssContent) {
        // Check for correct plugin name
        if (postCssContent.includes('"@tailwindcss/postcss"') || postCssContent.includes("'@tailwindcss/postcss'")) {
            console.error(chalk.red('❌ PostCSS config has incorrect plugin: @tailwindcss/postcss'));
            console.log(chalk.yellow('   Should be: "tailwindcss"'));
            hasErrors = true;
        } else if (postCssContent.includes('"tailwindcss"') || postCssContent.includes("'tailwindcss'")) {
            console.log(chalk.green('✅ PostCSS config has correct Tailwind plugin'));
        } else {
            console.warn(chalk.yellow('⚠️ Could not find Tailwind plugin in PostCSS config'));
            hasErrors = true;
        }
    }
} else {
    console.error(chalk.red(`❌ PostCSS config not found at ${POST_CSS_CONFIG_PATH}`));
    hasErrors = true;
}

// 2. Check globals.css
if (fileExists(GLOBALS_CSS_PATH)) {
    const globalsCssContent = readFile(GLOBALS_CSS_PATH);

    if (globalsCssContent) {
        // Check for Tailwind directives
        const hasBase = globalsCssContent.includes('@tailwind base');
        const hasComponents = globalsCssContent.includes('@tailwind components');
        const hasUtilities = globalsCssContent.includes('@tailwind utilities');

        if (hasBase && hasComponents && hasUtilities) {
            console.log(chalk.green('✅ globals.css has all required Tailwind directives'));
        } else {
            console.error(chalk.red('❌ globals.css is missing some Tailwind directives'));
            if (!hasBase) console.log(chalk.yellow('   Missing: @tailwind base;'));
            if (!hasComponents) console.log(chalk.yellow('   Missing: @tailwind components;'));
            if (!hasUtilities) console.log(chalk.yellow('   Missing: @tailwind utilities;'));
            hasErrors = true;
        }

        // Check for incorrect import
        if (globalsCssContent.includes('@import "tailwindcss"')) {
            console.error(chalk.red('❌ globals.css has incorrect Tailwind import: @import "tailwindcss"'));
            console.log(chalk.yellow('   Should use @tailwind directives instead'));
            hasErrors = true;
        }
    }
} else {
    console.error(chalk.red(`❌ globals.css not found at ${GLOBALS_CSS_PATH}`));
    hasErrors = true;
}

// 3. Check package.json
if (fileExists(PACKAGE_JSON_PATH)) {
    const packageJsonContent = readFile(PACKAGE_JSON_PATH);

    if (packageJsonContent) {
        try {
            const packageJson = JSON.parse(packageJsonContent);

            // Check for incorrect dependency
            const devDeps = packageJson.devDependencies || {};
            if (devDeps['@tailwindcss/postcss']) {
                console.error(chalk.red('❌ package.json has incorrect dependency: @tailwindcss/postcss'));
                console.log(chalk.yellow('   This should be removed or replaced with standard tailwindcss'));
                hasErrors = true;
            }

            // Check for tailwindcss dependency
            if (!devDeps['tailwindcss']) {
                console.error(chalk.red('❌ package.json is missing tailwindcss dependency'));
                hasErrors = true;
            } else {
                console.log(chalk.green('✅ package.json has correct tailwindcss dependency'));
            }

            // Check for PostCSS
            if (!devDeps['postcss']) {
                console.warn(chalk.yellow('⚠️ package.json is missing postcss dependency'));
                hasErrors = true;
            }

            // Check for autoprefixer
            if (!devDeps['autoprefixer']) {
                console.warn(chalk.yellow('⚠️ package.json is missing autoprefixer dependency'));
                hasErrors = true;
            }
        } catch (err) {
            console.error(chalk.red(`❌ Error parsing package.json: ${err.message}`));
            hasErrors = true;
        }
    }
} else {
    console.error(chalk.red(`❌ package.json not found at ${PACKAGE_JSON_PATH}`));
    hasErrors = true;
}

// Final result
if (hasErrors) {
    console.error(chalk.red('❌ Tailwind CSS validation failed. Please fix the issues above.'));
    process.exit(1);
} else {
    console.log(chalk.green('✅ Tailwind CSS configuration validated successfully!'));
    process.exit(0);
}
