#!/usr/bin/env node

/**
 * diagnose-tailwind.js
 * 
 * Script completo para diagnosticar problemas con Tailwind CSS v4
 */

const fs = require('fs');
const path = require('path');

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

console.log(colors.bold(colors.blue('🔍 Diagnóstico Completo de Tailwind CSS v4')));
console.log(colors.gray('======================================================'));

// 1. Verificar archivos de configuración
console.log(colors.cyan('\n📁 Verificando archivos de configuración:'));

const configFiles = [
    'package.json',
    'postcss.config.mjs',
    'postcss.config.ts',
    'tailwind.config.js',
    'tailwind.config.ts',
    'styles/globals.css'
];

configFiles.forEach(file => {
    const filePath = path.join(PROJECT_ROOT, file);
    const exists = fs.existsSync(filePath);
    console.log(`  ${file}: ${exists ? colors.green('✓ Existe') : colors.red('✗ No existe')}`);
});

// 2. Verificar dependencias
console.log(colors.cyan('\n📦 Verificando dependencias:'));
try {
    const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf8'));

    const requiredDeps = {
        'tailwindcss': 'dependencies o devDependencies',
        '@tailwindcss/postcss': 'dependencies',
        'postcss': 'devDependencies'
    };

    Object.entries(requiredDeps).forEach(([dep, location]) => {
        const inDeps = pkg.dependencies && pkg.dependencies[dep];
        const inDevDeps = pkg.devDependencies && pkg.devDependencies[dep];
        const version = inDeps || inDevDeps;

        if (version) {
            console.log(`  ${dep}: ${colors.green('✓')} v${version} (${inDeps ? 'deps' : 'devDeps'})`);
        } else {
            console.log(`  ${dep}: ${colors.red('✗')} No instalado (necesario en ${location})`);
        }
    });
} catch (error) {
    console.log(colors.red('  ✗ Error leyendo package.json'));
}

// 3. Verificar contenido de configuraciones
console.log(colors.cyan('\n⚙️  Verificando contenido de configuraciones:'));

// PostCSS
const postcssFiles = ['postcss.config.mjs', 'postcss.config.ts'];
let postcssConfigFound = false;
postcssFiles.forEach(file => {
    const filePath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(filePath)) {
        postcssConfigFound = true;
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`  ${file}:`);
        console.log(`    @tailwindcss/postcss: ${content.includes('@tailwindcss/postcss') ? colors.green('✓') : colors.red('✗')}`);
    }
});

if (!postcssConfigFound) {
    console.log(colors.red('  ✗ No se encontró configuración de PostCSS'));
}

// Globals CSS
const globalsPath = path.join(PROJECT_ROOT, 'styles', 'globals.css');
if (fs.existsSync(globalsPath)) {
    const content = fs.readFileSync(globalsPath, 'utf8');
    console.log(`  styles/globals.css:`);
    console.log(`    @import "tailwindcss": ${content.includes('@import "tailwindcss"') ? colors.green('✓') : colors.red('✗')}`);
    console.log(`    Directivas v3 (@tailwind): ${content.includes('@tailwind') ? colors.yellow('⚠️  Encontradas (remover)') : colors.green('✓ No encontradas')}`);
}

// 4. Verificar archivos build
console.log(colors.cyan('\n🏗️  Verificando archivos de build:'));

const nextPath = path.join(PROJECT_ROOT, '.next');
if (fs.existsSync(nextPath)) {
    console.log(`  .next/: ${colors.green('✓ Directorio existe')}`);

    // Buscar archivos CSS compilados
    function findCSSFiles(dir) {
        let cssFiles = [];
        try {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    cssFiles = cssFiles.concat(findCSSFiles(fullPath));
                } else if (file.endsWith('.css')) {
                    cssFiles.push(fullPath);
                }
            });
        } catch (error) {
            // Ignore errors
        }
        return cssFiles;
    }

    const cssFiles = findCSSFiles(nextPath);
    console.log(`  Archivos CSS compilados: ${cssFiles.length}`);

    if (cssFiles.length > 0) {
        const firstCSS = cssFiles[0];
        try {
            const content = fs.readFileSync(firstCSS, 'utf8');
            const hasTailwindClasses = content.includes('.text-') || content.includes('.bg-') || content.includes('.flex');
            console.log(`  Contiene clases Tailwind: ${hasTailwindClasses ? colors.green('✓') : colors.red('✗')}`);
        } catch (error) {
            console.log(`  Error leyendo CSS: ${colors.red('✗')}`);
        }
    }
} else {
    console.log(`  .next/: ${colors.yellow('⚠️  No existe (ejecutar build)')}`);
}

console.log(colors.gray('\n======================================================'));
console.log(colors.bold(colors.blue('📋 Resumen y Recomendaciones:')));

console.log(colors.yellow('\n1. Si faltan dependencias, instalar con:'));
console.log(colors.gray('   pnpm add tailwindcss @tailwindcss/postcss'));

console.log(colors.yellow('\n2. Si no hay archivos .css compilados, limpiar caché:'));
console.log(colors.gray('   Remove-Item ".next" -Recurse -Force'));
console.log(colors.gray('   pnpm run dev'));

console.log(colors.yellow('\n3. Si persisten problemas, verificar orden de imports en globals.css'));

console.log(colors.yellow('\n4. Para probar Tailwind rápidamente:'));
console.log(colors.gray('   Agregar clases como "bg-blue-500 text-white p-4" a un elemento'));

console.log(colors.cyan('\n🔧 Próximo paso: Ejecutar el servidor y verificar en el navegador'));
console.log(colors.gray('======================================================\n'));
