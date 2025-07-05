import { chromium } from 'playwright';

async function finalCenterTest() {
  console.log('🎯 Final test of centered footer...');
  
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
    
    // Check footer position
    const footer = await page.locator('[class*="fixed bottom-8"]').first();
    const footerVisible = await footer.isVisible();
    
    if (footerVisible) {
      const footerBox = await footer.boundingBox();
      const viewportWidth = 430;
      const footerCenter = footerBox.x + (footerBox.width / 2);
      const viewportCenter = viewportWidth / 2;
      const centerOffset = Math.abs(footerCenter - viewportCenter);
      
      console.log(`📐 Footer: ${footerBox.width}px wide at x=${footerBox.x}`);
      console.log(`🎯 Center offset: ${centerOffset.toFixed(1)}px`);
      
      const isCentered = centerOffset < 10; // Allow 10px tolerance
      console.log(`✅ Footer centered: ${isCentered}`);
      
      // Take final screenshot
      await page.screenshot({ path: 'final-centered-footer.png' });
      console.log('📸 Final screenshot saved');
      
      if (isCentered) {
        console.log('🎉 SUCCESS: Footer is now properly centered!');
      } else {
        console.log('⚠️  Still slightly off-center');
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

finalCenterTest().catch(console.error);