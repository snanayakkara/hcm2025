import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size to DESKTOP
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to the local development server
  await page.goto('http://localhost:5173');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Scroll to the doctors section
  await page.locator('#doctors').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  
  // Get the computed styles and layout info to debug
  const mainShowcase = page.locator('#doctors .mb-20 > div > div').first();
  
  // Check if the flexbox layout is being applied
  const computedStyles = await mainShowcase.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      display: styles.display,
      flexDirection: styles.flexDirection,
      gap: styles.gap,
      gridTemplateColumns: styles.gridTemplateColumns,
      width: el.offsetWidth,
      height: el.offsetHeight,
      className: el.className
    };
  });
  
  console.log('Main showcase container styles:', computedStyles);
  
  // Check mobile detection status
  const mobileDetection = await page.evaluate(() => {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      userAgent: navigator.userAgent
    };
  });
  
  console.log('Browser detection:', mobileDetection);
  
  // Take a focused screenshot of the problem area
  await mainShowcase.screenshot({ path: 'doctors-showcase-debug.png' });
  
  console.log('Debug screenshot saved as doctors-showcase-debug.png');
  
  await browser.close();
})();
