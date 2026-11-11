// After-fix run: same widths and measurements as navbar-shots.js, then hovers "Repos"
// in light and dark mode. Run with `yarn dev` serving http://localhost:3000.
const { chromium } = require('playwright');
const REPOS = ['PyTorch', 'ExecuTorch', 'TorchVision', 'Helion'];
(async () => {
  const b = await chromium.launch();
  for (const w of [1920, 1440, 1351, 1350, 1280, 1024, 768]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto('http://localhost:3000/hud/pytorch/pytorch/main', { waitUntil: 'domcontentloaded', timeout: 180000 });
    await p.waitForSelector('text=Repos', { timeout: 120000 });
    await p.waitForTimeout(1500);
    const nav = await p.$('div[class*="navbar"]');
    const box = await nav.boundingBox();
    const top = await p.$$eval('a,button', (els, names) => els
      .filter(e => e.offsetParent !== null && names.includes(e.textContent.replace('▾', '').trim()))
      .map(e => { const r = e.getBoundingClientRect(); return `${e.textContent.trim()}@(${Math.round(r.x)},${Math.round(r.y)})`; }),
      [...REPOS, 'Repos', 'CRCR']);
    console.log(`width=${w}: navbar height=${Math.round(box.height)}px; visible repo items: ${top.join(' ')}`);
    await nav.screenshot({ path: `after-navbar-${w}.png` });
    await p.close();
  }
  for (const mode of ['light', 'dark']) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 600 } });
    await ctx.addInitScript(m => localStorage.setItem('themeMode', m), mode);
    const p = await ctx.newPage();
    await p.goto('http://localhost:3000/hud/pytorch/pytorch/main', { waitUntil: 'domcontentloaded', timeout: 180000 });
    await p.waitForSelector('text=Repos', { timeout: 120000 });
    await p.waitForTimeout(1500);
    await p.hover('button:has-text("Repos")');
    await p.waitForSelector('[role="menu"] >> text=Helion', { timeout: 10000 });
    const items = await p.$$eval('[role="menu"] a', as => as.map(a => `${a.textContent.trim()} -> ${a.getAttribute('href')}`));
    console.log(`${mode} mode, hover Repos: ${JSON.stringify(items)}`);
    await p.screenshot({ path: `after-repos-open-${mode}.png`, clip: { x: 0, y: 0, width: 700, height: 300 } });
    await ctx.close();
  }
  await b.close();
})();
