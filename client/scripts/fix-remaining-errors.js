const fs = require('fs');
const path = require('path');

// Función para simplificar variantes de Framer Motion
function simplifyFramerMotion(content) {
  // Simplificar variantes complejas de Framer Motion
  content = content.replace(
    /const\s+(\w+)Variants\s*=\s*{[\s\S]*?transition:\s*shouldReduceMotion\s*\?\s*{\s*duration:\s*0\s*}\s*:\s*{[^}]*}[\s\S]*?}/g,
    (match, variantName) => {
      return `const ${variantName}Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    expanded: { height: "auto", transition: { duration: 0.3 } }
  };`;
    }
  );
  
  // Simplificar formatPrice
  content = content.replace(
    /const\s+formatPrice\s*=\s*\(price:\s*[^)]+\)\s*=>\s*{[\s\S]*?};/g,
    `const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(numPrice || 0);
  };`
  );
  
  return content;
}

// Función para corregir archivos problemáticos
function fixProblemFiles(content) {
  // Añadir imports faltantes si es necesario
  if (content.includes('useState') && !content.includes('import React')) {
    content = `import React, { useState, useEffect } from 'react';\n` + content;
  }
  
  // Simplificar tipos complejos
  content = content.replace(/React\.FC<any>/g, 'React.FC<any>');
  
  return content;
}

// Archivos específicos a corregir
const specificFixes = [
  {
    file: 'components/mobile/MobilePropertyCard.tsx',
    fix: (content) => {
      content = simplifyFramerMotion(content);
      return content;
    }
  },
  {
    file: 'components/mobile/OfflineExperience.tsx', 
    fix: (content) => {
      if (!content.includes('import React')) {
        content = `import React, { useState, useEffect } from 'react';\n` + content;
      }
      return content;
    }
  }
];

specificFixes.forEach(({ file, fix }) => {
  const filePath = path.join(process.cwd(), file);
  
  if (fs.existsSync(filePath)) {
    console.log(`Fixing ${file}...`);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      content = fix(content);
      fs.writeFileSync(filePath, content);
      console.log(`✓ Fixed ${file}`);
    } catch (error) {
      console.error(`✗ Error fixing ${file}:`, error.message);
    }
  } else {
    console.log(`⚠ File not found: ${file}`);
  }
});

console.log('\\nDone fixing specific issues!');
