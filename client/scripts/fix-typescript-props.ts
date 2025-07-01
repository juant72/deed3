#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

/**
 * Script para arreglar errores de sintaxis de TypeScript en componentes React migrados
 */

function fixTypeScriptProps(filePath: string): void {
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

                // Crear una nueva interfaz para las props
                const interfaceDefinition = `\ninterface ${interfaceName} {\n  ${propsWithTypes}\n}\n\n`;

                // Reemplazar la definición de FC con la nueva interfaz
                return `${interfaceDefinition}const ${componentName}: React.FC<${interfaceName}> = ({ ${destructuring} }) =>`;
            }
        );

        // Arreglar props inline sin valores por defecto
        content = content.replace(
            /const\s+(\w+):\s*React\.FC<\{\s*([^{}=]*)\s*\}>\s*=\s*\(\{\s*([^}]*)\s*\}\)\s*=>/g,
            (match, componentName, propsDefinition, destructuring) => {
                // Crear interface para props
                const interfaceName = `${componentName}Props`;

                // Convertir props sin valores por defecto
                const propsWithTypes = propsDefinition
                    .split(',')
                    .map(prop => `${prop.trim()}: any;`)
                    .join('\n  ');

                // Crear una nueva interfaz para las props
                const interfaceDefinition = `\ninterface ${interfaceName} {\n  ${propsWithTypes}\n}\n\n`;

                // Reemplazar la definición de FC con la nueva interfaz
                return `${interfaceDefinition}const ${componentName}: React.FC<${interfaceName}> = ({ ${destructuring} }) =>`;
            }
        );

        // Guardar el archivo modificado
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fijado: ${filePath}`);
    } catch (error) {
        console.error(`❌ Error procesando ${filePath}:`, error);
    }
}

// Buscar archivos .tsx recursivamente
function processDirectory(dir: string): void {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !filePath.includes('node_modules')) {
            processDirectory(filePath);
        } else if (file.endsWith('.tsx')) {
            fixTypeScriptProps(filePath);
        }
    }
}

// Directorios a procesar
const directories = [
    path.join(process.cwd(), 'components'),
    path.join(process.cwd(), 'pages'),
    path.join(process.cwd(), 'PageComponents')
];

console.log('🔍 Buscando componentes con sintaxis de props incorrecta...');

// Procesar todos los directorios
directories.forEach(dir => {
    if (fs.existsSync(dir)) {
        processDirectory(dir);
    } else {
        console.warn(`⚠️ Directorio no encontrado: ${dir}`);
    }
});

console.log('✨ Proceso completado');
