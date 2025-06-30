const fs = require('fs');
const path = require('path');

// List of files with syntax errors that need fixing
const filesToFix = [
  'components/mobile/MobileHeader.tsx',
  'components/mobile/MobilePropertyCard.tsx', 
  'components/mobile/PullToRefresh.tsx',
  'components/property/BlockchainBadges.tsx',
  'components/property/RealTimeMetrics.tsx',
  'hooks/useUIOptimizations.ts',
  'PageComponents/Components/PropertyDetails.tsx',
  'PageComponents/Components/SearchAndFilters.tsx'
];

// Function to fix prop syntax in TypeScript React components
function fixPropSyntax(content) {
  // Fix React.FC prop syntax with default values
  content = content.replace(
    /React\.FC<\{\s*([^}]*?)\s*\}>/g,
    (match, props) => {
      if (!props.includes('=')) return match;
      
      // Extract prop definitions and create proper interface
      const propParts = props.split(',').map(p => p.trim()).filter(p => p);
      const interfaceProps = [];
      const propNames = [];
      
      propParts.forEach(prop => {
        if (prop.includes('=')) {
          const [name, defaultValue] = prop.split('=').map(p => p.trim());
          interfaceProps.push(`  ${name}?: any;`);
          propNames.push(name);
        } else {
          interfaceProps.push(`  ${prop}: any;`);
          propNames.push(prop);
        }
      });
      
      return 'React.FC<TempProps>';
    }
  );
  
  return content;
}

// Function to add necessary imports
function addImports(content) {
  if (!content.includes('import React')) {
    if (content.includes('useState') || content.includes('useEffect') || content.includes('useRef')) {
      const reactImports = ['React'];
      if (content.includes('useState')) reactImports.push('useState');
      if (content.includes('useEffect')) reactImports.push('useEffect');
      if (content.includes('useRef')) reactImports.push('useRef');
      
      content = `import ${reactImports.join(', ')} from 'react';\n` + content;
    }
  }
  return content;
}

// Function to create a simpler version without complex prop syntax
function createSimplifiedComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Create a simplified version that just uses 'any' for complex props
  let fixed = content
    // Fix complex React.FC syntax
    .replace(/React\.FC<\{\s*[^}]*?=\s*[^}]*?\s*\}>/g, 'React.FC<any>')
    // Fix function return types that shouldn't be React.FC
    .replace(/const\s+(\w+):\s*React\.FC\s*=\s*\(/g, 'const $1 = (')
    // Add missing React import if needed
    .replace(/^(import.*from\s+['"]react['"];?\s*\n)/m, (match) => {
      if (!match.includes('useState') && content.includes('useState')) {
        return match.replace(/import\s+([^}]+)\s+from\s+['"]react['"]/, 'import $1, { useState, useEffect, useRef } from "react"');
      }
      return match;
    });
    
  // If no React import exists, add it
  if (!fixed.includes('import React') && (fixed.includes('React.FC') || fixed.includes('useState'))) {
    fixed = 'import React, { useState, useEffect, useRef } from "react";\n' + fixed;
  }
  
  return fixed;
}

// Process each file
filesToFix.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  
  if (fs.existsSync(filePath)) {
    console.log(`Fixing ${file}...`);
    
    try {
      const fixed = createSimplifiedComponent(filePath);
      fs.writeFileSync(filePath, fixed);
      console.log(`✓ Fixed ${file}`);
    } catch (error) {
      console.error(`✗ Error fixing ${file}:`, error.message);
    }
  } else {
    console.log(`⚠ File not found: ${file}`);
  }
});

console.log('\\nDone! Files have been simplified to avoid complex TypeScript syntax.');
