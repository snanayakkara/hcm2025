import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size to DESKTOP
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to the local development server
  await page.goto('http://localhost:5174');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Scroll to the reception team section
  await page.locator('#reception-team').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  
  // Get the Practice Manager card
  const practiceManagerCard = page.locator('#reception-team .bg-white.rounded-3xl').first();
  
  // Check if the card exists and get its styles
  const cardExists = await practiceManagerCard.count();
  console.log('Practice Manager card found:', cardExists > 0);
  
  if (cardExists > 0) {
    const computedStyles = await practiceManagerCard.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        borderRadius: styles.borderRadius,
        boxShadow: styles.boxShadow,
        className: el.className,
        width: el.offsetWidth,
        height: el.offsetHeight
      };
    });
    
    console.log('Practice Manager Card styles:', computedStyles);
  }
  
  // Check mobile detection status
  const mobileDetection = await page.evaluate(() => {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      userAgent: navigator.userAgent
    };
  });
  
  console.log('Browser detection:', mobileDetection);
  
  // Take a screenshot of the reception team section
  await page.screenshot({ 
    path: 'reception-team-desktop.png', 
    fullPage: false,
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });
  
  console.log('Screenshot saved as reception-team-desktop.png');
  
  await browser.close();
})();
