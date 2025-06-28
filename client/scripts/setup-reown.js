#!/usr/bin/env node

/**
 * Reown AppKit Project ID Setup Script
 * This script helps configure a valid Reown AppKit Project ID
 */

const fs = require('fs');
const path = require('path');

const ENV_FILE = path.join(__dirname, '.env.local');
const EXAMPLE_ENV_FILE = path.join(__dirname, '.env.example');

console.log('🔧 Reown AppKit Project ID Setup\n');

// Create .env.example if it doesn't exist
const envExample = `# Reown AppKit Configuration
# Get your project ID from https://cloud.reown.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Development Environment
NODE_ENV=development

# Contract Configuration (Optional)
# NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
# NEXT_PUBLIC_REAL_ESTATE_ADDRESS=your_real_estate_contract

# Pinata Configuration (Optional - if using IPFS)
# NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
# NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
`;

if (!fs.existsSync(EXAMPLE_ENV_FILE)) {
  fs.writeFileSync(EXAMPLE_ENV_FILE, envExample);
  console.log('✅ Created .env.example file');
}

// Check if .env.local exists
if (!fs.existsSync(ENV_FILE)) {
  fs.writeFileSync(ENV_FILE, envExample);
  console.log('✅ Created .env.local file');
} else {
  console.log('📄 .env.local file already exists');
}

console.log('\n📋 Next Steps:');
console.log('1. Visit https://cloud.reown.com');
console.log('2. Create a free account');
console.log('3. Create a new project');
console.log('4. Copy your Project ID');
console.log('5. Update .env.local with your Project ID:');
console.log('   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id');
console.log('\n🔗 Quick Setup Link: https://cloud.reown.com/sign-in');

// Check current configuration
const currentEnv = fs.readFileSync(ENV_FILE, 'utf8');
if (currentEnv.includes('your_project_id_here') || currentEnv.includes('demo-project-id')) {
  console.log('\n⚠️  Warning: Using placeholder project ID');
  console.log('   Replace "your_project_id_here" with your actual Reown Project ID');
} else {
  console.log('\n✅ Project ID appears to be configured');
}

console.log('\n📚 Documentation: https://docs.reown.com/appkit/react/core/installation');
