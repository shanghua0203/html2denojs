import puppeteer from 'npm:puppeteer'

const opts = {
  headless: true,
  // headless: false,
  slowMo: 100,
  timeout: 10000000
};

const browser = await puppeteer.launch(opts);
const page = await browser.newPage();
await page.goto("https://example.com");
await page.screenshot({ path: "example.png" });

await browser.close();
