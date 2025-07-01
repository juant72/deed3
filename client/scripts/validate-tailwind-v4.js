#!/usr/bin/env node

/**
 * validate-tailwind-v4.js
 * 
 * Script para validar que Tailwind CSS v4 esté configurado correctamente.
 */

const fs = require('fs');
const path = require('path');

// Basic color functions
const colors = {
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`,
    bold: (text) => `\x1b[1m${text}\x1b[0m`,
};

const PROJECT_ROOT = process.cwd();
const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'package.json');
const POSTCSS_CONFIG_PATH = path.join(PROJECT_ROOT, 'postcss.config.ts');
const GLOBALS_CSS_PATH = path.join(PROJECT_ROOT, 'styles', 'globals.css');
const TAILWIND_CONFIG_PATH = path.join(PROJECT_ROOT, 'tailwind.config.js');

const validationRules = [
    {
        name: 'Verificar que @tailwindcss/postcss está instalado',
        path: PACKAGE_JSON_PATH,
        test: (content) => {
            const pkg = JSON.parse(content);
            return pkg.dependencies && pkg.dependencies['@tailwindcss/postcss'];
        },
        message: 'Falta @tailwindcss/postcss en dependencies'
    },
    {
        name: 'Verificar que NO hay tailwindcss v3 instalado',
        path: PACKAGE_JSON_PATH,
        test: (content) => {
            const pkg = JSON.parse(content);
            const hasTailwindV3 = (pkg.dependencies && pkg.dependencies['tailwindcss']) ||
                (pkg.devDependencies && pkg.devDependencies['tailwindcss']);
            return !hasTailwindV3;
        },
        message: 'Se encontró tailwindcss v3. Debe removerse para usar v4'
    },
    {
        name: 'Verificar configuración PostCSS para v4',
        path: POSTCSS_CONFIG_PATH,
        test: (content) => {
            return content.includes('@tailwindcss/postcss');
        },
        message: 'PostCSS debe estar configurado para usar @tailwindcss/postcss'
    },
    {
        name: 'Verificar globals.css usa @import "tailwindcss"',
        path: GLOBALS_CSS_PATH,
        test: (content) => {
            return content.includes('@import "tailwindcss"') && !content.includes('@tailwind');
        },
        message: 'globals.css debe usar @import "tailwindcss" en lugar de @tailwind'
    },
    {
        name: 'Verificar que existe tailwind.config.js',
        path: TAILWIND_CONFIG_PATH,
        test: (content) => {
            return content.includes('content:') && content.includes('export default');
        },
        message: 'Debe existir tailwind.config.js con configuración de v4'
    }
];

// Run validations
console.log(colors.bold(colors.blue('🔍 Validando Configuración de Tailwind CSS v4')));
console.log(colors.gray('===================================================='));

let errorCount = 0;

validationRules.forEach(rule => {
    process.stdout.write(colors.cyan(`Verificando ${rule.name}... `));

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
        console.log(colors.red(`  - No se pudo leer ${rule.path}: ${error.message}`));
        errorCount++;
    }
});

console.log(colors.gray('===================================================='));

if (errorCount === 0) {
    console.log(colors.bold(colors.green('✅ ¡Tailwind CSS v4 está configurado correctamente!')));
    console.log(colors.blue('Los estilos deberían funcionar ahora.'));
} else {
    console.log(colors.bold(colors.red(`❌ Se encontraron ${errorCount} problema${errorCount === 1 ? '' : 's'}.`)));
    console.log(colors.yellow('Por favor corrige los problemas anteriores.'));
    process.exit(1);
}
