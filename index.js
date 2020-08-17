const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');
  await page.screenshot({path: 'instagram.png'})

  await browser.close();
})();
