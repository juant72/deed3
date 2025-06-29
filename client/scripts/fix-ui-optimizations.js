const fs = require('fs');
const path = require('path');

// Función para corregir imports de useUIOptimizations
function fixUIOptimizationsImports(content) {
  // Remover import de useUIOptimizations
  content = content.replace(/import\s*{\s*[^}]*useUIOptimizations[^}]*}\s*from\s*['"][^'"]*['"];\s*\n?/g, '');
  
  // Reemplazar uso de useUIOptimizations con valores por defecto
  content = content.replace(
    /const\s*{\s*([^}]*)\s*}\s*=\s*useUIOptimizations\(\);/g,
    (match, destructured) => {
      const defaultValues = [];
      if (destructured.includes('shouldReduceMotion')) {
        defaultValues.push('const shouldReduceMotion = false;');
      }
      if (destructured.includes('vibrate')) {
        defaultValues.push('const vibrate = (pattern: number[]) => { if (navigator.vibrate) navigator.vibrate(pattern); };');
      }
      if (destructured.includes('prefersHighContrast')) {
        defaultValues.push('const prefersHighContrast = false;');
      }
      return defaultValues.join('\n  ');
    }
  );
  
  return content;
}

// Archivos a corregir
const filesToFix = [
  'components/mobile/MobilePropertyCard.tsx',
  'components/mobile/PullToRefresh.tsx',
  'components/mobile/PWAInstallBanner.tsx',
  'PageComponents/Components/PropertyCard3D.tsx'
];

filesToFix.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  
  if (fs.existsSync(filePath)) {
    console.log(`Fixing ${file}...`);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      content = fixUIOptimizationsImports(content);
      fs.writeFileSync(filePath, content);
      console.log(`✓ Fixed ${file}`);
    } catch (error) {
      console.error(`✗ Error fixing ${file}:`, error.message);
    }
  } else {
    console.log(`⚠ File not found: ${file}`);
  }
});

console.log('\\nDone fixing useUIOptimizations imports!');
