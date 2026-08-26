import { chromium } from '@playwright/test';
const b = await chromium.launch();
const page = await b.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'load' });
const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
console.log('html_bg=' + bg);
await b.close();
process.exit(bg === 'rgb(10, 24, 22)' ? 0 : 1);
