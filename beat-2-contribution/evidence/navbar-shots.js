// Screenshots the HUD navbar at several widths and prints its height and repo-link positions.
// Run with `yarn dev` serving http://localhost:3000. Needs: npm i playwright@1.48.2 && npx playwright install chromium
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const w of [1920, 1440, 1351, 1350, 1280, 1024, 768]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto('http://localhost:3000/hud/pytorch/pytorch/main', { waitUntil: 'domcontentloaded', timeout: 180000 });
    await p.waitForSelector('text=ExecuTorch', { timeout: 120000 });
    await p.waitForTimeout(1500);
    const nav = await p.$('div[class*="navbar"]');
    const box = await nav.boundingBox();
    const repos = await p.$$eval('a', as => as
      .filter(a => ['PyTorch', 'ExecuTorch', 'TorchVision', 'Helion', 'CRCR'].includes(a.textContent.trim()))
      .map(a => { const r = a.getBoundingClientRect(); return `${a.textContent.trim()}@(${Math.round(r.x)},${Math.round(r.y)})`; }));
    console.log(`width=${w}: navbar height=${Math.round(box.height)}px; repo links: ${repos.join(' ')}`);
    await nav.screenshot({ path: `navbar-${w}.png` });
    await p.close();
  }
  // One repo that has no menu link: show its HUD page draws.
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000/hud/pytorch/ao/main', { waitUntil: 'domcontentloaded', timeout: 180000 });
  await p.waitForTimeout(8000);
  console.log(`ao page: h1/h2 text = ${JSON.stringify(await p.$$eval('h1,h2', hs => hs.map(h => h.textContent.trim()).slice(0, 3)))}`);
  await p.screenshot({ path: 'hud-ao-page.png' });
  await b.close();
})();
