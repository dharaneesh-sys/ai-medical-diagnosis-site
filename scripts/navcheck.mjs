import { chromium } from '@playwright/test';
const targets = ['overview', 'unit-1', 'unit-2', 'unit-3', 'demo', 'report'];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4173/', { waitUntil: 'load' });
let fail = 0;
for (const t of targets) {
  await p.click(`nav a[href="#${t}"]`);
  await p.waitForTimeout(450);
  const res = await p.evaluate((id) => {
    const el = document.getElementById(id);
    const top = el?.getBoundingClientRect().top ?? -9999;
    const visible = top >= -1 && top <= window.innerHeight - 1;
    return { top, ok: visible && window.location.hash === `#${id}` };
  }, t);
  console.log(`anchor ${t} hash=${t} top=${Math.round(res.top)} ${res.ok ? 'OK' : 'FAIL'}`);
  if (!res.ok) fail = 1;
}
const disc = await p.getByTestId('disclaimer-footer').innerText();
console.log(`footer_disclaimer=${disc.includes('not medical advice') ? 'OK' : 'MISSING'}`);
if (!disc.includes('not medical advice')) fail = 1;
await p.screenshot({ path: '/home/dinusus/.omo/evidence/task-7-ai-medical-diagnosis-website.png', fullPage: true });
console.log('screenshot saved');
await b.close();
process.exit(fail);
