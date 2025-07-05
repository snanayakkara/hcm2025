import { chromium } from 'playwright';

async function testMobileFooter() {
  console.log('🚀 Starting mobile footer visibility test...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 }, // iPhone 14 Pro Max
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📱 Navigating to localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    
    // Wait for mobile detection to kick in
    await page.waitForTimeout(2000);
    
    console.log('🔍 Checking if we\'re in mobile mode...');
    const isMobile = await page.evaluate(() => {
      return window.innerWidth <= 768;
    });
    console.log(`Mobile detection: ${isMobile}`);
    
    // Check for footer elements
    console.log('👀 Looking for footer elements...');
    
    // Check floating footer
    const floatingFooter = await page.locator('div[class*="fixed"][class*="bottom-"]').filter({
      has: page.locator('text=Heart Clinic Melbourne')
    });
    
    const floatingFooterVisible = await floatingFooter.isVisible().catch(() => false);
    console.log(`Floating footer visible: ${floatingFooterVisible}`);
    
    if (floatingFooterVisible) {
      const footerText = await floatingFooter.textContent();
      console.log(`✅ Floating footer found with text: ${footerText?.substring(0, 100)}...`);
      
      // Check position
      const boundingBox = await floatingFooter.boundingBox();
      console.log(`📐 Footer position: ${JSON.stringify(boundingBox)}`);
    }
    
    // Check main footer
    const mainFooter = await page.locator('footer');
    const mainFooterVisible = await mainFooter.isVisible().catch(() => false);
    console.log(`Main footer visible: ${mainFooterVisible}`);
    
    // Check bottom navigation
    const bottomNav = await page.locator('div[class*="fixed"][class*="bottom-0"]').filter({
      has: page.locator('text=Home')
    });
    const bottomNavVisible = await bottomNav.isVisible().catch(() => false);
    console.log(`Bottom navigation visible: ${bottomNavVisible}`);
    
    if (bottomNavVisible) {
      const navBox = await bottomNav.boundingBox();
      console.log(`📐 Bottom nav position: ${JSON.stringify(navBox)}`);
    }
    
    // Take screenshot
    await page.screenshot({ path: 'mobile-footer-test.png', fullPage: true });
    console.log('📸 Screenshot saved as mobile-footer-test.png');
    
    // Scroll down to see if footer behavior changes
    console.log('📜 Testing scroll behavior...');
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);
    
    const floatingFooterAfterScroll = await floatingFooter.isVisible().catch(() => false);
    console.log(`Floating footer visible after scroll: ${floatingFooterAfterScroll}`);
    
    // Check z-index values
    console.log('🔢 Checking z-index values...');
    const footerZIndex = await page.evaluate(() => {
      const footer = document.querySelector('[class*="fixed"][class*="bottom-"]');
      return footer ? window.getComputedStyle(footer).zIndex : 'not found';
    });
    console.log(`Footer z-index: ${footerZIndex}`);
    
    const navZIndex = await page.evaluate(() => {
      const nav = document.querySelector('[class*="z-\\[100\\]"]');
      return nav ? window.getComputedStyle(nav).zIndex : 'not found';
    });
    console.log(`Bottom nav z-index: ${navZIndex}`);
    
    // Log all elements with fixed positioning
    console.log('🔍 All fixed positioned elements:');
    const fixedElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements
        .filter(el => window.getComputedStyle(el).position === 'fixed')
        .map(el => ({
          tagName: el.tagName,
          className: el.className,
          zIndex: window.getComputedStyle(el).zIndex,
          bottom: window.getComputedStyle(el).bottom,
          visible: el.offsetParent !== null
        }));
    });
    
    fixedElements.forEach((el, i) => {
      console.log(`  ${i + 1}. ${el.tagName} - class: "${el.className}" - z-index: ${el.zIndex} - bottom: ${el.bottom} - visible: ${el.visible}`);
    });
    
    console.log('\n📊 Test Summary:');
    console.log(`- Mobile mode: ${isMobile}`);
    console.log(`- Floating footer visible: ${floatingFooterVisible}`);
    console.log(`- Main footer visible: ${mainFooterVisible}`);
    console.log(`- Bottom navigation visible: ${bottomNavVisible}`);
    
    if (!floatingFooterVisible) {
      console.log('❌ FOOTER NOT VISIBLE - Need to investigate');
    } else {
      console.log('✅ FOOTER IS VISIBLE');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testMobileFooter().catch(console.error);