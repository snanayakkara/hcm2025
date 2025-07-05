import { chromium } from 'playwright';

async function debugFooter() {
  console.log('🔧 Starting detailed footer debug...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Scroll to top first
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    console.log('🔍 Checking footer visibility at page top...');
    
    // Check if footer elements exist and their computed styles
    const footerDebug = await page.evaluate(() => {
      const floatingFooter = document.querySelector('[class*="fixed"][class*="bottom-24"]');
      const bottomNav = document.querySelector('[class*="fixed"][class*="bottom-0"][class*="z-\\[100\\]"]');
      
      return {
        floatingFooter: {
          exists: !!floatingFooter,
          className: floatingFooter?.className || 'not found',
          computedStyle: floatingFooter ? {
            position: getComputedStyle(floatingFooter).position,
            bottom: getComputedStyle(floatingFooter).bottom,
            zIndex: getComputedStyle(floatingFooter).zIndex,
            display: getComputedStyle(floatingFooter).display,
            visibility: getComputedStyle(floatingFooter).visibility,
            opacity: getComputedStyle(floatingFooter).opacity,
            transform: getComputedStyle(floatingFooter).transform
          } : null,
          boundingRect: floatingFooter ? floatingFooter.getBoundingClientRect() : null
        },
        bottomNav: {
          exists: !!bottomNav,
          className: bottomNav?.className || 'not found',
          computedStyle: bottomNav ? {
            position: getComputedStyle(bottomNav).position,
            bottom: getComputedStyle(bottomNav).bottom,
            zIndex: getComputedStyle(bottomNav).zIndex,
            display: getComputedStyle(bottomNav).display,
            visibility: getComputedStyle(bottomNav).visibility,
            opacity: getComputedStyle(bottomNav).opacity,
            transform: getComputedStyle(bottomNav).transform
          } : null,
          boundingRect: bottomNav ? bottomNav.getBoundingClientRect() : null
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          scrollY: window.scrollY
        }
      };
    });
    
    console.log('📊 Footer Debug Results:');
    console.log(JSON.stringify(footerDebug, null, 2));
    
    // Take a screenshot at the bottom of the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'footer-at-bottom.png' });
    
    // Take a screenshot at the top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'footer-at-top.png' });
    
    console.log('📸 Screenshots saved: footer-at-bottom.png and footer-at-top.png');
    
    // Check if the issue is with the React state
    const reactState = await page.evaluate(() => {
      // Look for React DevTools or component state
      const footer = document.querySelector('[class*="fixed"][class*="bottom-24"]');
      if (footer && footer._reactInternalFiber) {
        return 'React fiber found';
      }
      return 'No React state accessible';
    });
    
    console.log(`React state: ${reactState}`);
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await browser.close();
  }
}

debugFooter().catch(console.error);