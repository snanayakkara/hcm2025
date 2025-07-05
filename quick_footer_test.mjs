import { chromium } from 'playwright';

async function quickTest() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Force scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    
    // Check for any red element (our test footer)
    const redElement = await page.locator('[style*="background-color: red"]').first();
    const isVisible = await redElement.isVisible().catch(() => false);
    
    console.log(`Red footer visible: ${isVisible}`);
    
    if (isVisible) {
      const box = await redElement.boundingBox();
      console.log(`Red footer position: ${JSON.stringify(box)}`);
    }
    
    // Take screenshot
    await page.screenshot({ path: 'red-footer-test.png', fullPage: false });
    console.log('Screenshot saved: red-footer-test.png');
    
    // Also check all elements with fixed position at the viewport
    const viewportFixedElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements
        .filter(el => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return style.position === 'fixed' && 
                 rect.top >= 0 && 
                 rect.top < window.innerHeight;
        })
        .map(el => ({
          tagName: el.tagName,
          className: el.className,
          style: el.getAttribute('style'),
          rect: el.getBoundingClientRect()
        }));
    });
    
    console.log('Fixed elements in viewport:', viewportFixedElements);
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

quickTest().catch(console.error);