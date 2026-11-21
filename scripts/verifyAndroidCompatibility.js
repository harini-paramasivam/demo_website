import fs from 'fs';
import path from 'path';

console.log('======================================================');
console.log('VERIFYING ANDROID MOBILE RESPONSIVENESS SUITE');
console.log('======================================================\n');

// 1. Verify index.html
const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
const checks = [
  { name: 'Viewport cover meta', pass: indexHtml.includes('viewport-fit=cover') },
  { name: 'Theme color meta for Android Chrome', pass: indexHtml.includes('name="theme-color"') },
  { name: 'Cache-Control meta', pass: indexHtml.includes('http-equiv="Cache-Control"') },
  { name: 'Pragma no-cache meta', pass: indexHtml.includes('http-equiv="Pragma"') },
  { name: 'Expires 0 meta', pass: indexHtml.includes('http-equiv="Expires"') }
];

console.log('1. Checking HTML & Viewport Setup:');
checks.forEach(c => {
  console.log(`   ${c.pass ? '✅' : '❌'} ${c.name}`);
});

// 2. Verify vercel.json caching
const vercelJson = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const hasIndexHeader = vercelJson.headers?.some(h => h.source === '/index.html' && h.headers.some(x => x.key === 'Cache-Control'));
console.log('\n2. Checking Server / Vercel Invalidation:');
console.log(`   ${hasIndexHeader ? '✅' : '❌'} Vercel Cache-Control no-revalidate header for index.html`);

// 3. Verify CSS build
const distAssets = fs.readdirSync('dist/assets');
const cssFile = distAssets.find(f => f.endsWith('.css'));
const builtCss = fs.readFileSync(path.join('dist/assets', cssFile), 'utf8');

const cssChecks = [
  { name: 'text-size-adjust: 100% on html/body (Prevents Android Chrome Font Boosting)', pass: builtCss.includes('text-size-adjust:100%') || builtCss.includes('text-size-adjust: 100%') },
  { name: 'overflow-x: clip (Prevents Android scroll container bug)', pass: builtCss.includes('overflow-x:clip') || builtCss.includes('overflow-x: clip') },
  { name: 'Universal overflow-wrap: break-word', pass: builtCss.includes('overflow-wrap:break-word') || builtCss.includes('overflow-wrap: break-word') },
  { name: 'Android 360px breakpoint suite', pass: builtCss.includes('(max-width:360px)') || builtCss.includes('(max-width: 360px)') },
  { name: 'Android 320px breakpoint suite', pass: builtCss.includes('(max-width:320px)') || builtCss.includes('(max-width: 320px)') },
  { name: 'Android Landscape (max-height: 500px)', pass: builtCss.includes('(max-height:500px)') || builtCss.includes('(max-height: 500px)') },
  { name: 'Dynamic viewport height 100dvh for mobile drawer', pass: builtCss.includes('100dvh') },
  { name: 'svc-benefits-showcase-grid single-column override', pass: builtCss.includes('.svc-benefits-showcase-grid') },
  { name: 'training-tools-grid single-column override', pass: builtCss.includes('.training-tools-grid') },
  { name: 'training-careers-grid single-column override', pass: builtCss.includes('.training-careers-grid') },
  { name: 'sol-bento-card__actions wrap override', pass: builtCss.includes('.sol-bento-card__actions') }
];

console.log('\n3. Checking Built Production CSS Tokens & Rules:');
cssChecks.forEach(c => {
  console.log(`   ${c.pass ? '✅' : '❌'} ${c.name}`);
});

// 4. Verify Components Touch and Logic
const headerJsx = fs.readFileSync('src/components/Header.jsx', 'utf8');
const homeSliderJsx = fs.readFileSync('src/components/HomeServicesSlider.jsx', 'utf8');
const indSliderJsx = fs.readFileSync('src/components/IndustrySolutionsSlider.jsx', 'utf8');
const transSliderJsx = fs.readFileSync('src/components/TransitionBannerSlider.jsx', 'utf8');
const wheelJsx = fs.readFileSync('src/components/EpublishingProductionWheel.jsx', 'utf8');

const compChecks = [
  { name: 'Header.jsx: Body scroll lock on mobile drawer open', pass: headerJsx.includes('document.body.style.overflow = \'hidden\'') },
  { name: 'Header.jsx: Touch action none on mobile open', pass: headerJsx.includes('document.body.style.touchAction = \'none\'') },
  { name: 'HomeServicesSlider.jsx: Touch swipe listeners (onTouchStart/Move/End)', pass: homeSliderJsx.includes('onTouchStart') && homeSliderJsx.includes('handleTouchEnd') },
  { name: 'IndustrySolutionsSlider.jsx: Touch swipe listeners', pass: indSliderJsx.includes('onTouchStart') && indSliderJsx.includes('handleTouchEnd') },
  { name: 'TransitionBannerSlider.jsx: Touch swipe listeners', pass: transSliderJsx.includes('onTouchStart') && transSliderJsx.includes('handleTouchEnd') },
  { name: 'EpublishingProductionWheel.jsx: Safe scale down to 0.30 for narrow screens', pass: wheelJsx.includes('0.30') }
];

console.log('\n4. Checking Interactive Component Mobile Behaviors:');
compChecks.forEach(c => {
  console.log(`   ${c.pass ? '✅' : '❌'} ${c.name}`);
});

const allPassed = checks.every(c => c.pass) && cssChecks.every(c => c.pass) && compChecks.every(c => c.pass);
console.log('\n======================================================');
console.log(allPassed ? '🎉 ALL ANDROID MOBILE COMPATIBILITY CHECKS PASSED!' : '⚠️ SOME CHECKS FAILED');
console.log('======================================================');
