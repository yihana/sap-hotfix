// scrapeHotfix.ts
import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://launchpad.support.sap.com/#/notes');
  await page.fill('#searchInput', 'hotfix collection');
  await page.click('#searchButton');
  await page.waitForSelector('.noteResultList');

  const notes = await page.$$eval('.noteItem', items =>
    items.map(item => ({
      title: item.querySelector('.noteTitle')?.textContent.trim(),
      noteId: item.querySelector('.noteId')?.textContent.trim(),
      date: new Date().toISOString().split('T')[0],
      link: item.querySelector('a')?.href,
    }))
  );

  fs.writeFileSync('hotfixes.json', JSON.stringify(notes, null, 2));
  await browser.close();
})();
