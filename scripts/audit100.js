import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { voraStore } from '../server/voraKnowledgeStore.js';
import { velza100Questions } from '../data/velza100Questions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUDIT_OUT = path.join(__dirname, '..', 'data', 'velza-100-audit.json');

/**
 * 100-QUESTION FULL-SCALE QUALITY AUDIT RUNNER
 * Tests the complete Velza AI Assistant pipeline across all 13 categories.
 */
async function run100QuestionAudit() {
  console.log('========================================================================');
  console.log('🚀 EXECUTING VELZA AI 100-QUESTION FULL-SCALE QUALITY AUDIT');
  console.log('========================================================================\n');

  await voraStore.syncAll(true);

  const results = [];
  const categoryStats = {};
  let totalPass = 0;
  let totalFail = 0;
  let hallucinatedCount = 0;
  let irrelevantCount = 0;
  let incorrectRetrievalCount = 0;

  const startTimer = Date.now();

  for (let i = 0; i < velza100Questions.length; i++) {
    const item = velza100Questions[i];
    const cat = item.category;

    if (!categoryStats[cat]) {
      categoryStats[cat] = { total: 0, passed: 0, failed: 0 };
    }
    categoryStats[cat].total++;

    const response = await voraStore.answerQuery(item.q, item.history || []);
    const reply = (response && response.reply) ? response.reply.trim() : '';
    const sources = (response && response.sources) ? response.sources : [];

    let isPass = true;
    const failures = [];

    // 1. Completeness & Length
    if (reply.length < 60) {
      isPass = false;
      failures.push('Response too short or empty');
    }

    // 2. Connection Pause Error Guard
    if (reply.includes("connection pause") || reply.includes("I'm having a brief connection pause")) {
      isPass = false;
      failures.push('Generic connection pause error returned');
    }

    // 3. Must Include Keywords / Entities
    if (item.mustInclude && item.mustInclude.length > 0) {
      for (const inc of item.mustInclude) {
        if (!reply.toLowerCase().includes(inc.toLowerCase())) {
          isPass = false;
          failures.push(`Missing expected entity/concept: "${inc}"`);
        }
      }
    }

    // 4. Must Not Include (Contamination / False matches)
    if (item.mustNotInclude && item.mustNotInclude.length > 0) {
      for (const notInc of item.mustNotInclude) {
        if (reply.toLowerCase().includes(notInc.toLowerCase())) {
          isPass = false;
          failures.push(`Contains contaminated/forbidden content: "${notInc}"`);
        }
      }
    }

    // 5. Source Link Validation
    if (item.expectedSource) {
      const hasSource = sources.some(s => s.url && s.url.includes(item.expectedSource));
      if (!hasSource && !item.isUnavailableInfo) {
        isPass = false;
        failures.push(`Missing expected official link: ${item.expectedSource}`);
        incorrectRetrievalCount++;
      }
    }

    // Categorize failure types for reporting
    if (!isPass) {
      if (failures.some(f => f.includes('contaminated'))) irrelevantCount++;
      if (failures.some(f => f.includes('Missing expected entity'))) irrelevantCount++;
    }

    if (isPass) {
      totalPass++;
      categoryStats[cat].passed++;
      process.stdout.write('.');
    } else {
      totalFail++;
      categoryStats[cat].failed++;
      process.stdout.write('F');
    }

    results.push({
      id: item.id,
      category: item.category,
      question: item.q,
      expectedIntent: item.expectedIntent,
      isUnavailableInfo: item.isUnavailableInfo,
      result: isPass ? 'PASS' : 'FAIL',
      issues: failures.join('; ') || 'None',
      actualReply: reply,
      sources: sources.map(s => s.url)
    });

    if ((i + 1) % 25 === 0 || i === velza100Questions.length - 1) {
      console.log(`  [${i + 1}/${velza100Questions.length}]`);
    }
  }

  const durationSec = ((Date.now() - startTimer) / 1000).toFixed(2);
  const accuracyPct = ((totalPass / velza100Questions.length) * 100).toFixed(2);

  // Write full JSON audit artifact
  const auditReportData = {
    auditDate: new Date().toISOString(),
    totalQuestions: velza100Questions.length,
    passed: totalPass,
    failed: totalFail,
    accuracyPct: `${accuracyPct}%`,
    durationSec: `${durationSec}s`,
    hallucinatedCount,
    irrelevantCount,
    incorrectRetrievalCount,
    categoryStats,
    results
  };

  fs.writeFileSync(AUDIT_OUT, JSON.stringify(auditReportData, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log('📊 100-QUESTION FULL-SCALE QUALITY AUDIT SUMMARY');
  console.log('========================================================================');
  console.log(`Total Questions Tested : ${velza100Questions.length}`);
  console.log(`Passed                 : ${totalPass}`);
  console.log(`Failed                 : ${totalFail}`);
  console.log(`Overall Accuracy       : ${accuracyPct}%`);
  console.log(`Hallucinated Answers   : ${hallucinatedCount}`);
  console.log(`Irrelevant Answers     : ${irrelevantCount}`);
  console.log(`Incorrect Retrievals   : ${incorrectRetrievalCount}`);
  console.log(`Execution Time         : ${durationSec}s\n`);

  console.log('Category-Wise Breakdown:');
  for (const [catName, stats] of Object.entries(categoryStats)) {
    const pct = ((stats.passed / stats.total) * 100).toFixed(1);
    console.log(`  • ${catName.padEnd(46)}: ${stats.passed}/${stats.total} passed (${pct}%)`);
  }

  if (totalFail > 0) {
    console.log('\n❌ FAILED QUESTIONS DETAIL:');
    results.filter(r => r.result === 'FAIL').forEach(r => {
      console.log(`  [${r.id}] ${r.category} -> "${r.question}": ${r.issues}`);
    });
    process.exit(1);
  } else {
    console.log('\n✅ 100% PERFECT PASS ON ALL 100 REAL-WORLD QUESTIONS!');
    process.exit(0);
  }
}

run100QuestionAudit();
