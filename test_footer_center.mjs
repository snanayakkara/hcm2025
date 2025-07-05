import { chromium } from 'playwright';

async function testFooterCenter() {
  console.log('🎯 Testing footer centering fix...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Scroll to trigger footer
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(1000);
    
    // Check footer centering
    const footer = await page.locator('[class*="fixed bottom-8"]').first();
    const footerVisible = await footer.isVisible();
    
    if (footerVisible) {
      const footerBox = await footer.boundingBox();
      const viewportWidth = 430;
      const footerCenter = footerBox.x + (footerBox.width / 2);
      const viewportCenter = viewportWidth / 2;
      const centerOffset = Math.abs(footerCenter - viewportCenter);
      
      console.log(`📐 Footer width: ${footerBox.width}px`);
      console.log(`📍 Footer left: ${footerBox.x}px`);
      console.log(`🎯 Footer center: ${footerCenter}px vs Viewport center: ${viewportCenter}px`);
      console.log(`📏 Center offset: ${centerOffset.toFixed(1)}px`);
      
      const isCentered = centerOffset < 5; // Allow 5px tolerance
      console.log(`✅ Footer properly centered: ${isCentered}`);
      
      await page.screenshot({ path: 'footer-centered-test.png' });
      console.log('📸 Screenshot saved: footer-centered-test.png');
      
      if (isCentered) {
        console.log('🎉 SUCCESS: Footer is now properly centered!');
      } else {
        console.log('❌ Still need to adjust footer centering');
      }
    } else {
      console.log('❌ Footer not visible');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testFooterCenter().catch(console.error);