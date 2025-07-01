#!/usr/bin/env ts-node

/**
 * Wallet Connection Decision Helper
 * Interactive script to help decide between Reown AppKit and RainbowKit migration
 */

import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => new Promise((resolve) => rl.question(query, resolve));

type Decision = 'rainbow' | 'reown' | 'alternative' | 'undecided';
type ProjectSize = 'small' | 'medium' | 'large';
type Timeline = 'urgent' | 'weeks' | 'months';
type TeamSize = 'solo' | 'small' | 'large';

interface AnswerSet {
  projectSize: ProjectSize;
  timeline: Timeline;
  team: TeamSize;
  features: string[];
  customization: number;
  futureProof: number;
  thirdParty: boolean;
  compliance: boolean;
}

async function main() {
  console.log('\n🔍 Wallet Connection Library Decision Helper\n');
  console.log('This script will help you decide between:');
  console.log('1. 🌈 Migrating to RainbowKit + Wagmi (Industry Standard)');
  console.log('2. 🔄 Optimizing current Reown AppKit setup');
  console.log('3. 🚀 Exploring other alternatives (Privy, Dynamic, etc.)');
  console.log('\n' + '='.repeat(60) + '\n');

  // Project context questions
  const projectSize = await question('❓ How would you rate your project size? (small/medium/large): ') as ProjectSize;
  const timeline = await question('⏰ What\'s your timeline? (urgent/weeks/months): ') as Timeline;
  const team = await question('👥 Team size? (solo/small/large): ') as TeamSize;
  
  const featuresInput = await question('🛠️ What wallet features do you need? (comma-separated list): ');
  const features = featuresInput.split(',').map(f => f.trim());
  
  const customizationInput = await question('🎨 How important is UI customization? (1-10): ');
  const customization = parseInt(customizationInput, 10);
  
  const futureProofInput = await question('🔮 How important is future-proofing? (1-10): ');
  const futureProof = parseInt(futureProofInput, 10);
  
  const thirdPartyInput = await question('🔌 Do you need third-party wallet integrations? (y/n): ');
  const thirdParty = thirdPartyInput.toLowerCase() === 'y';
  
  const complianceInput = await question('📜 Are regulatory compliance features needed? (y/n): ');
  const compliance = complianceInput.toLowerCase() === 'y';

  // Calculate recommendation
  const answers: AnswerSet = {
    projectSize,
    timeline,
    team,
    features,
    customization,
    futureProof,
    thirdParty,
    compliance
  };

  const decision = calculateDecision(answers);
  displayDecision(decision, answers);

  rl.close();
}

function calculateDecision(answers: AnswerSet): Decision {
  // Point system to determine recommendation
  let rainbowPoints = 0;
  let reownPoints = 0;
  let alternativePoints = 0;
  
  // Project size factor
  if (answers.projectSize === 'large') {
    rainbowPoints += 3;
    alternativePoints += 2;
  } else if (answers.projectSize === 'medium') {
    rainbowPoints += 2;
    reownPoints += 2;
  } else {
    reownPoints += 3;
  }
  
  // Timeline factor
  if (answers.timeline === 'urgent') {
    reownPoints += 3; // Stick with what you know for urgent projects
  } else if (answers.timeline === 'months') {
    rainbowPoints += 3; // Worth investing in industry standard
    alternativePoints += 2;
  }
  
  // Team size factor
  if (answers.team === 'large') {
    rainbowPoints += 2; // Better documentation for larger teams
  } else if (answers.team === 'solo') {
    reownPoints += 1; // Simplicity for solo devs
  }
  
  // Feature requirements
  if (answers.features.some(f => f.includes('nft') || f.includes('token'))) {
    rainbowPoints += 2;
  }
  if (answers.features.includes('auth') || answers.features.includes('authentication')) {
    alternativePoints += 3;
  }
  
  // Customization importance
  if (answers.customization > 7) {
    rainbowPoints += 2;
  } else if (answers.customization < 4) {
    reownPoints += 1;
  }
  
  // Future-proofing
  if (answers.futureProof > 7) {
    rainbowPoints += 3;
    alternativePoints += 1;
  }
  
  // Third-party integrations
  if (answers.thirdParty) {
    rainbowPoints += 2;
    alternativePoints += 3;
  }
  
  // Compliance features
  if (answers.compliance) {
    alternativePoints += 3;
  }
  
  // Determine winner
  const scores = {
    'rainbow': rainbowPoints,
    'reown': reownPoints,
    'alternative': alternativePoints
  };
  
  const highestScore = Math.max(rainbowPoints, reownPoints, alternativePoints);
  
  // Check if there's a clear winner
  if (highestScore - Math.max(...Object.values(scores).filter(s => s !== highestScore)) < 2) {
    return 'undecided';
  }
  
  if (rainbowPoints === highestScore) return 'rainbow';
  if (reownPoints === highestScore) return 'reown';
  return 'alternative';
}

function displayDecision(decision: Decision, answers: AnswerSet) {
  console.log('\n' + '='.repeat(60));
  console.log('\n🔍 ANALYSIS RESULTS:\n');
  
  console.log('Project Context:');
  console.log(`- Size: ${answers.projectSize}`);
  console.log(`- Timeline: ${answers.timeline}`);
  console.log(`- Team: ${answers.team}`);
  console.log(`- Features: ${answers.features.join(', ')}`);
  console.log(`- Customization importance: ${answers.customization}/10`);
  console.log(`- Future-proofing importance: ${answers.futureProof}/10`);
  console.log(`- Third-party integrations: ${answers.thirdParty ? 'Yes' : 'No'}`);
  console.log(`- Compliance features: ${answers.compliance ? 'Yes' : 'No'}`);
  
  console.log('\n' + '-'.repeat(30) + '\n');
  
  switch(decision) {
    case 'rainbow':
      console.log('🌈 RECOMMENDATION: Migrate to RainbowKit + Wagmi');
      console.log('\nWhy this is a good choice:');
      console.log('- Industry standard with excellent documentation');
      console.log('- Large community and ongoing development');
      console.log('- High customization possibilities');
      console.log('- Best for future-proofing your project');
      
      console.log('\nNext steps:');
      console.log('1. Run `npm run migrate:rainbowkit` to start the migration');
      console.log('2. Review the changes in /components/web3/WalletConnect.tsx');
      console.log('3. Update the theme in /lib/rainbowkit-theme.ts');
      break;
      
    case 'reown':
      console.log('🔄 RECOMMENDATION: Optimize current Reown AppKit setup');
      console.log('\nWhy this is a good choice:');
      console.log('- Faster implementation with existing code');
      console.log('- Works well for smaller projects');
      console.log('- Less time investment needed');
      console.log('- Already familiar to your team');
      
      console.log('\nNext steps:');
      console.log('1. Run `npm run optimize:reown` to optimize the setup');
      console.log('2. Update configurations in /hooks/useWeb3Status.ts');
      console.log('3. Consider performance improvements in wallet connection');
      break;
      
    case 'alternative':
      console.log('🚀 RECOMMENDATION: Explore alternatives like Privy or Dynamic');
      console.log('\nWhy this is a good choice:');
      console.log('- Better for complex third-party integrations');
      console.log('- Strong focus on authentication flows');
      console.log('- Advanced compliance features');
      console.log('- Modern SDKs with robust support');
      
      console.log('\nNext steps:');
      console.log('1. Research Privy (https://privy.io) and Dynamic (https://dynamic.xyz)');
      console.log('2. Compare features that match your specific requirements');
      console.log('3. Set up a proof of concept with your preferred solution');
      break;
      
    case 'undecided':
      console.log('⚖️ RESULT: The analysis is inconclusive');
      console.log('\nYour requirements don\'t strongly favor any single approach.');
      console.log('Consider the following points:');
      console.log('- RainbowKit: Better for larger projects with longer timelines');
      console.log('- Reown AppKit: Better for quick implementation and smaller teams');
      console.log('- Alternatives: Better for specific needs like auth and compliance');
      
      console.log('\nSuggested action: Revisit your requirements or consult with your team');
      break;
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
}

main().catch(console.error);
