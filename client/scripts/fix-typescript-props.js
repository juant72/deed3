#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script para arreglar errores de sintaxis de TypeScript en componentes React migrados
 */

function fixTypeScriptProps(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Arreglar la sintaxis de props con valores por defecto
    content = content.replace(
      /const\s+(\w+):\s*React\.FC<\{\s*([^}]*=\s*[^}]*)\s*\}>\s*=\s*\(\{\s*([^}]*)\s*\}\)\s*=>/g,
      (match, componentName, propsDefinition, destructuring) => {
        // Crear interface para props
        const interfaceName = `${componentName}Props`;
        
        // Convertir props con valores por defecto
        const propsWithTypes = propsDefinition
          .split(',')
          .map(prop => {
            const trimmed = prop.trim();
            if (trimmed.includes('=')) {
              const [name] = trimmed.split('=');
              return `${name.trim()}?: any;`;
            }
            return `${trimmed}: any;`;
          })
          .join('\n  ');
        
        return `interface ${interfaceName} {
  ${propsWithTypes}
}

const ${componentName}: React.FC<${interfaceName}> = ({ ${destructuring} }) =>`;
      }
    );
    
    // Escribir el archivo corregido
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function findTypescriptFiles(dir) {
  let tsxFiles = [];
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      tsxFiles = tsxFiles.concat(findTypescriptFiles(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      tsxFiles.push(fullPath);
    }
  }
  
  return tsxFiles;
}

// Directorios a procesar
const targetDirs = [
  path.join(__dirname, '..', 'components'),
  path.join(__dirname, '..', 'PageComponents')
];

let totalFixed = 0;

console.log('🚀 Starting TypeScript syntax fixes...\n');

for (const dir of targetDirs) {
  if (fs.existsSync(dir)) {
    console.log(`📁 Processing directory: ${path.relative(__dirname, dir)}`);
    const tsFiles = findTypescriptFiles(dir);
    
    for (const filePath of tsFiles) {
      if (fixTypeScriptProps(filePath)) {
        totalFixed++;
      }
    }
    console.log('');
  }
}

console.log(`\n✨ Fixes completed! Total files fixed: ${totalFixed}`);
