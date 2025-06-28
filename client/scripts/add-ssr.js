#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Lista de páginas que necesitan SSR según los errores de build
const pagesToFix = [
  'active.tsx',
  'contact.tsx', 
  'creator.tsx',
  'detail.tsx',
  'edit-profile.tsx',
  'forget.tsx',
  'explor.tsx',
  'fourm.tsx',
  'product.tsx',
  'signup.tsx',
  'upcoming.tsx',
  'blog.tsx',
  'connect.tsx',
  'test-auth.tsx',
  'index.tsx',
  'author.tsx',
  'blogdetail.tsx',
  'collection.tsx',
  'create.tsx',
  'login.tsx',
  'news.tsx',
  'privacy.tsx',
  'ranking.tsx',
  'update.tsx'
];

const pagesDir = path.join(__dirname, 'pages');

// Template para getServerSideProps
const getServerSidePropsTemplate = `
// Force SSR to avoid Wagmi hook errors during build
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
`;

const importTemplate = `import { GetServerSideProps } from "next";`;

function addSSRToPage(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Verificar si ya tiene getServerSideProps
    if (content.includes('getServerSideProps')) {
      console.log(`✓ ${path.basename(filePath)} already has getServerSideProps`);
      return;
    }
    
    // Verificar si ya tiene el import de GetServerSideProps
    const needsImport = !content.includes('GetServerSideProps');
    
    // Agregar import si es necesario
    if (needsImport) {
      // Buscar línea después de las importaciones de React
      const lines = content.split('\n');
      let insertIndex = 0;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('import React') || lines[i].includes('import { ')) {
          insertIndex = i + 1;
        } else if (lines[i].trim() === '' && insertIndex > 0) {
          break;
        }
      }
      
      lines.splice(insertIndex, 0, importTemplate);
      content = lines.join('\n');
    }
    
    // Agregar getServerSideProps antes del export default
    const defaultExportMatch = content.match(/export default \w+;?$/m);
    if (defaultExportMatch) {
      content = content.replace(defaultExportMatch[0], getServerSidePropsTemplate + '\n' + defaultExportMatch[0]);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✓ Added SSR to ${path.basename(filePath)}`);
    
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(filePath)}:`, error.message);
  }
}

// Procesar todas las páginas
pagesToFix.forEach(pageFile => {
  const fullPath = path.join(pagesDir, pageFile);
  if (fs.existsSync(fullPath)) {
    addSSRToPage(fullPath);
  } else {
    console.log(`! ${pageFile} not found`);
  }
});

console.log('\n✓ Finished adding SSR to pages');
