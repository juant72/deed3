#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script para migrar archivos JSX a TSX
 * Convierte componentes React básicos de JavaScript a TypeScript
 */

function migrateJsxToTsx(filePath) {
  try {
    // Leer el archivo original
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Hacer las transformaciones básicas
    let newContent = content;
    
    // Buscar declaraciones de componentes y agregar tipos
    newContent = newContent.replace(
      /const\s+(\w+)\s*=\s*\(\s*\)\s*=>/g,
      'const $1: React.FC = () =>'
    );
    
    newContent = newContent.replace(
      /const\s+(\w+)\s*=\s*\(\{([^}]*)\}\)\s*=>/g,
      'const $1: React.FC<{$2}> = ({$2}) =>'
    );
    
    newContent = newContent.replace(
      /function\s+(\w+)\s*\(\s*\)/g,
      'const $1: React.FC = () =>'
    );
    
    // Asegurarse que React esté importado correctamente
    if (newContent.includes('import React') && !newContent.includes('import React from')) {
      newContent = newContent.replace(/import React.*from.*['"](.*)['"]/g, 'import React from "react"');
    }
    
    // Crear el nuevo archivo TSX
    const tsxPath = filePath.replace('.jsx', '.tsx');
    fs.writeFileSync(tsxPath, newContent, 'utf8');
    
    // Eliminar el archivo JSX original
    fs.unlinkSync(filePath);
    
    console.log(`✅ Migrated: ${path.basename(filePath)} -> ${path.basename(tsxPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error migrating ${filePath}:`, error.message);
    return false;
  }
}

function findJsxFiles(dir) {
  let jsxFiles = [];
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      jsxFiles = jsxFiles.concat(findJsxFiles(fullPath));
    } else if (file.endsWith('.jsx')) {
      jsxFiles.push(fullPath);
    }
  }
  
  return jsxFiles;
}

// Directorios a procesar
const targetDirs = [
  path.join(__dirname, '..', 'PageComponents'),
  path.join(__dirname, '..', 'components'),
  path.join(__dirname, '..', 'hooks'),
  path.join(__dirname, '..', 'lib')
];

let totalMigrated = 0;

console.log('🚀 Starting JSX to TSX migration...\n');

for (const dir of targetDirs) {
  if (fs.existsSync(dir)) {
    console.log(`📁 Processing directory: ${path.relative(__dirname, dir)}`);
    const jsxFiles = findJsxFiles(dir);
    
    for (const filePath of jsxFiles) {
      if (migrateJsxToTsx(filePath)) {
        totalMigrated++;
      }
    }
    console.log('');
  } else {
    console.log(`⚠️  Directory not found: ${dir}`);
  }
}

console.log(`\n✨ Migration completed! Total files migrated: ${totalMigrated}`);
