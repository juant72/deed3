const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const execPromise = promisify(exec);

/**
 * Utility to scan and fix Next.js Link component usage across the project
 * This script:
 * 1. Finds all .tsx and .jsx files
 * 2. Identifies incorrect Link usage where <a> is a direct child
 * 3. Updates the files to use the modern Next.js Link API
 */
async function fixNextJsLinkUsage() {
    console.log('🔍 Scanning for Next.js Link component issues...');

    try {
        // Use git grep to find potential issues (more efficient than scanning all files)
        // Look for Link components with <a> tags as direct children
        const { stdout } = await execPromise('cd .. && git grep -l "<Link.*>\\s*<a" -- "*.tsx" "*.jsx"');

        if (!stdout.trim()) {
            console.log('✅ No issues found with Next.js Link components!');
            return;
        }

        const files = stdout.trim().split('\n');
        console.log(`Found ${files.length} files with potential Link issues:`);

        for (const filePath of files) {
            const fullPath = path.join(__dirname, '..', filePath);
            console.log(`- Processing: ${filePath}`);

            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace pattern where <a> is direct child of <Link>
            const newContent = content.replace(
                /<Link([^>]*)>\s*<a([^>]*)>([\s\S]*?)<\/a>\s*<\/Link>/g,
                (match, linkProps, aProps, children) => {
                    modified = true;

                    // Extract className and other props from the <a> tag
                    const classMatch = aProps.match(/className=["'](.*?)["']/);
                    const className = classMatch ? classMatch[1] : '';

                    // Merge the className into the Link component
                    let mergedProps = linkProps;
                    if (className) {
                        if (mergedProps.includes('className=')) {
                            mergedProps = mergedProps.replace(/className=["'](.*?)["']/, `className="$1 ${className}"`);
                        } else {
                            mergedProps = `${mergedProps} className="${className}"`;
                        }
                    }

                    return `<Link${mergedProps}>${children}</Link>`;
                }
            );

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`  ✅ Fixed Link usage in: ${filePath}`);
            } else if (modified) {
                console.log(`  ✅ File was already properly formatted: ${filePath}`);
            }
        }

        console.log('✅ Completed Next.js Link component fixes!');
    } catch (error) {
        // If git grep fails, it might be because we're not in a git repo
        // In that case, we can use a more traditional file scanning approach
        console.log('Could not use git grep, falling back to manual file scanning...');
        scanAndFixFilesManually();
    }
}

/**
 * Alternative method to scan files manually if git grep is not available
 */
function scanAndFixFilesManually() {
    // Directory to start scanning from
    const rootDir = path.join(__dirname, '..');

    // Get all .tsx and .jsx files
    const files = [];

    function walkDir(dir) {
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // Skip node_modules and .next
                if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
                    walkDir(fullPath);
                }
            } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.jsx'))) {
                files.push(fullPath);
            }
        }
    }

    walkDir(rootDir);
    console.log(`Found ${files.length} .tsx/.jsx files to scan`);

    let fixedCount = 0;

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');

        // Check if file contains both Next.js Link import and potential issues
        if (content.includes('next/link') && (content.includes('<Link') && content.includes('<a'))) {
            const newContent = content.replace(
                /<Link([^>]*)>\s*<a([^>]*)>([\s\S]*?)<\/a>\s*<\/Link>/g,
                (match, linkProps, aProps, children) => {
                    // Extract className and other props from the <a> tag
                    const classMatch = aProps.match(/className=["'](.*?)["']/);
                    const className = classMatch ? classMatch[1] : '';

                    // Merge the className into the Link component
                    let mergedProps = linkProps;
                    if (className) {
                        if (mergedProps.includes('className=')) {
                            mergedProps = mergedProps.replace(/className=["'](.*?)["']/, `className="$1 ${className}"`);
                        } else {
                            mergedProps = `${mergedProps} className="${className}"`;
                        }
                    }

                    return `<Link${mergedProps}>${children}</Link>`;
                }
            );

            if (content !== newContent) {
                const relativePath = path.relative(rootDir, file);
                console.log(`- Fixing Link usage in: ${relativePath}`);
                fs.writeFileSync(file, newContent, 'utf8');
                fixedCount++;
            }
        }
    }

    console.log(`✅ Fixed Link usage in ${fixedCount} files`);
}

// Run the script
fixNextJsLinkUsage();
