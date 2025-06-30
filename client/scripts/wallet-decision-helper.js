#!/usr/bin/env node

/**
 * Wallet Connection Decision Helper
 * Interactive script to help decide between Reown AppKit and RainbowKit migration
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('\n🔍 Wallet Connection Library Decision Helper\n');
  console.log('This script will help you decide between:');
  console.log('1. 🌈 Migrating to RainbowKit + Wagmi (Industry Standard)');
  console.log('2. 🔄 Optimizing current Reown AppKit setup');
  console.log('3. 🚀 Exploring other alternatives (Privy, Dynamic, etc.)');
  console.log('\n' + '='.repeat(60) + '\n');

  // Project context questions
  const projectSize = await question('❓ How would you rate your project size? (small/medium/large): ');
  const timeline = await question('⏰ What\'s your timeline? (urgent/weeks/months): ');
  const team = await question('👥 Team size? (solo/small/large): ');
  const budget = await question('💰 Budget considerations? (tight/flexible/enterprise): ');
  const priority = await question('🎯 Top priority? (speed/stability/features/cost): ');

  console.log('\n📊 Analyzing your answers...\n');

  // Decision logic
  let recommendation = '';
  let score = {
    rainbowkit: 0,
    reown: 0,
    privy: 0
  };

  // Scoring logic
  if (timeline === 'urgent') {
    score.reown += 3;  // Already working
    recommendation += '⚡ Urgent timeline favors keeping current setup\n';
  } else if (timeline === 'weeks') {
    score.rainbowkit += 2;
    recommendation += '📅 Weekly timeline allows for strategic migration\n';
  } else {
    score.rainbowkit += 3;
    score.privy += 2;
    recommendation += '📅 Long timeline allows for best-practice implementation\n';
  }

  if (team === 'solo' || team === 'small') {
    score.reown += 2;  // Less disruption
    score.privy += 1;  // Easier setup
    recommendation += '👤 Small team benefits from stable, working solutions\n';
  } else {
    score.rainbowkit += 2;  // Can handle complexity
    recommendation += '👥 Larger team can handle migration complexity\n';
  }

  if (priority === 'stability') {
    score.reown += 3;
    recommendation += '🛡️ Stability priority favors current working setup\n';
  } else if (priority === 'features') {
    score.rainbowkit += 3;
    score.privy += 2;
    recommendation += '✨ Feature priority favors modern libraries\n';
  } else if (priority === 'speed') {
    score.reown += 2;
    recommendation += '🚀 Speed priority favors minimal changes\n';
  }

  if (budget === 'tight') {
    score.reown += 2;
    score.rainbowkit += 1;  // Free but requires time
    recommendation += '💵 Tight budget favors keeping current setup\n';
  } else if (budget === 'enterprise') {
    score.privy += 3;
    recommendation += '💼 Enterprise budget allows for premium solutions\n';
  }

  console.log('📈 Decision Matrix:');
  console.log(`🌈 RainbowKit + Wagmi: ${score.rainbowkit} points`);
  console.log(`🔄 Reown AppKit (current): ${score.reown} points`);
  console.log(`🚀 Privy/Enterprise: ${score.privy} points`);
  console.log('\n');

  // Final recommendation
  const maxScore = Math.max(score.rainbowkit, score.reown, score.privy);
  let finalRec = '';

  if (score.rainbowkit === maxScore) {
    finalRec = '🌈 RainbowKit + Wagmi Migration';
    console.log('🏆 RECOMMENDATION: Migrate to RainbowKit + Wagmi\n');
    console.log('✅ Reasons:');
    console.log('  • Industry standard with best ecosystem support');
    console.log('  • Future-proof technology stack');
    console.log('  • Excellent developer experience');
    console.log('  • Strong TypeScript support');
    console.log('  • Large community and documentation');
    console.log('\n⚠️ Considerations:');
    console.log('  • Requires 2-4 days of migration work');
    console.log('  • Learning curve for new APIs');
    console.log('  • Slightly larger bundle size');
  } else if (score.reown === maxScore) {
    finalRec = '🔄 Optimize Reown AppKit';
    console.log('🏆 RECOMMENDATION: Optimize current Reown AppKit setup\n');
    console.log('✅ Reasons:');
    console.log('  • Already working and tested');
    console.log('  • Minimal risk and timeline');
    console.log('  • Team familiarity');
    console.log('  • Good enough for current needs');
    console.log('\n⚠️ Considerations:');
    console.log('  • Smaller ecosystem compared to RainbowKit');
    console.log('  • Need to configure real Project ID');
    console.log('  • Less future-proof than industry standards');
  } else {
    finalRec = '🚀 Enterprise Solution (Privy/Dynamic)';
    console.log('🏆 RECOMMENDATION: Consider Enterprise Solutions\n');
    console.log('✅ Reasons:');
    console.log('  • Advanced features like embedded wallets');
    console.log('  • Better user onboarding experience');
    console.log('  • Enterprise support and SLAs');
    console.log('  • Multi-platform support');
    console.log('\n⚠️ Considerations:');
    console.log('  • Higher costs at scale');
    console.log('  • Vendor lock-in considerations');
    console.log('  • May be overkill for current needs');
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📋 Next Steps:\n');

  if (finalRec.includes('RainbowKit')) {
    console.log('1. 📚 Review the migration plan: /docs/research/rainbowkit-migration-technical-plan.md');
    console.log('2. 🔧 Create a migration branch: git checkout -b feature/rainbowkit-migration');
    console.log('3. 📦 Install dependencies: npm install @rainbow-me/rainbowkit wagmi viem');
    console.log('4. ⚙️ Follow the step-by-step migration guide');
    console.log('5. 🧪 Test thoroughly before merging');
  } else if (finalRec.includes('Reown')) {
    console.log('1. 🔧 Setup real Reown Project ID: npm run setup:reown');
    console.log('2. 🧪 Test wallet connections with real Project ID');
    console.log('3. 📚 Monitor Reown AppKit ecosystem development');
    console.log('4. 📝 Document current setup for future reference');
    console.log('5. 🔄 Consider RainbowKit migration in future sprints');
  } else {
    console.log('1. 📚 Research Privy/Dynamic pricing and features');
    console.log('2. 🔧 Setup proof-of-concept with preferred solution');
    console.log('3. 💰 Evaluate total cost of ownership');
    console.log('4. 🧪 Test enterprise features needed');
    console.log('5. 📊 Compare with RainbowKit for final decision');
  }

  // Generate decision log
  const decisionLog = {
    timestamp: new Date().toISOString(),
    context: {
      projectSize,
      timeline,
      team,
      budget,
      priority
    },
    scores: score,
    recommendation: finalRec,
    reasoning: recommendation
  };

  const logPath = path.join(__dirname, '..', 'docs', 'decisions', `wallet-decision-${Date.now()}.json`);
  
  // Ensure directory exists
  const logDir = path.dirname(logPath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  fs.writeFileSync(logPath, JSON.stringify(decisionLog, null, 2));
  
  console.log(`\n💾 Decision logged to: ${logPath}`);
  console.log('\n🤝 Need help? Join the discussion:');
  console.log('   • RainbowKit Discord: https://discord.gg/rainbowkit');
  console.log('   • Wagmi GitHub: https://github.com/wevm/wagmi');
  console.log('   • Reown Support: https://reown.com/support');

  rl.close();
}

main().catch(console.error);
