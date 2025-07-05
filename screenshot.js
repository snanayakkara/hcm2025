import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size to DESKTOP - this is key!
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to the local development server
  await page.goto('http://localhost:5173');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Scroll to the doctors section
  await page.locator('#doctors').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  
  // Take a full page screenshot to see desktop layout
  await page.screenshot({ path: 'desktop-full-page.png', fullPage: true });
  
  // Take a screenshot of just the doctors section
  const doctorsSection = page.locator('#doctors');
  await doctorsSection.screenshot({ path: 'doctors-section-desktop.png' });
  
  console.log('Desktop screenshots saved as desktop-full-page.png and doctors-section-desktop.png');
  
  await browser.close();
})();
