const fs = require('fs');
const path = require('path');

/**
 * Fixes Next.js Link issues by replacing <a> tags with <span> tags
 * where appropriate, and ensures proper Link usage according to Next.js guidelines.
 */
function fixAuthorThreeFile() {
  console.log('🔍 Fixing Link issues in AuthorThree.tsx...');
  
  const filePath = path.join(process.cwd(), 'PageComponents', 'AuthorPage', 'AuthorThree.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace <a> tags inside profile-share with <span>
  content = content.replace(
    /<a(\s+)className="avatar"(\s+)data-tooltip=(.*?)>([\s\S]*?)<\/a>/g, 
    '<span$1className="avatar"$2data-tooltip=$3>$4</span>'
  );
  
  // Replace <a> tags with className="more-author-text" with <span>
  content = content.replace(
    /<a(\s+)className="more-author-text"(\s+)href="#">([\s\S]*?)<\/a>/g, 
    '<span$1className="more-author-text cursor-pointer">$3</span>'
  );
  
  // Replace other hardcoded author.html links with spans when they're not inside a Link component
  content = content.replace(
    /<a(\s+)href="author\.html"(.*?)>([\s\S]*?)<\/a>/g, 
    '<span$1$2 className="cursor-pointer">$3</span>'
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Fixed Link issues in AuthorThree.tsx');
}

fixAuthorThreeFile();
