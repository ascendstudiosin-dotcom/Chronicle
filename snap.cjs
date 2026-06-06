const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 800});
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    await page.goto('http://localhost:5173/', {waitUntil: 'networkidle2'});
    await page.goto('http://localhost:5173/story/1', {waitUntil: 'load'});
    await page.waitForSelector('.minimal-index-btn', {timeout: 5000});
    
    await page.screenshot({path: 'C:/Users/StarXD/.gemini/antigravity/brain/3cf0276c-da8e-4a8a-a1c8-10c7741f3afa/screenshot_test.png'});
    
    await page.click('.minimal-index-btn');
    await page.waitForTimeout(1000);
    await page.screenshot({path: 'C:/Users/StarXD/.gemini/antigravity/brain/3cf0276c-da8e-4a8a-a1c8-10c7741f3afa/screenshot_test_menu.png'});
    
    await browser.close();
    console.log("Screenshots taken.");
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
})();
