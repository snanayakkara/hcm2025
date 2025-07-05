import { chromium } from 'playwright';

async function testCenteredFooter() {
  console.log('🎯 Testing centered footer with labels...');
  
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
    console.log('📜 Scrolling to show footer...');
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(1000);
    
    // Check footer position
    const footer = await page.locator('[class*="fixed bottom-8"]').first();
    const footerVisible = await footer.isVisible().catch(() => false);
    
    if (footerVisible) {
      const footerBox = await footer.boundingBox();
      const viewportWidth = 430;
      const footerCenter = footerBox.x + (footerBox.width / 2);
      const viewportCenter = viewportWidth / 2;
      const centerOffset = Math.abs(footerCenter - viewportCenter);
      
      console.log(`📐 Footer dimensions: ${footerBox.width}x${footerBox.height}`);
      console.log(`📍 Footer position: x=${footerBox.x}, y=${footerBox.y}`);
      console.log(`🎯 Footer center: ${footerCenter}, Viewport center: ${viewportCenter}`);
      console.log(`📏 Center offset: ${centerOffset}px`);
      
      const isCentered = centerOffset < 5; // Allow 5px tolerance
      console.log(`✅ Footer centered: ${isCentered}`);
      
      // Check for text labels
      const callLabel = await page.locator('text=Call').isVisible().catch(() => false);
      const videoLabel = await page.locator('text=Video').isVisible().catch(() => false);
      const directionsLabel = await page.locator('text=Directions').isVisible().catch(() => false);
      const menuLabel = await page.locator('text=Menu').isVisible().catch(() => false);
      
      console.log(`🏷️ Labels visible:`);
      console.log(`  - Call: ${callLabel}`);
      console.log(`  - Video: ${videoLabel}`);
      console.log(`  - Directions: ${directionsLabel}`);
      console.log(`  - Menu: ${menuLabel}`);
      
      const allLabelsVisible = callLabel && videoLabel && directionsLabel && menuLabel;
      
      // Take screenshot
      await page.screenshot({ path: 'centered-footer-with-labels.png' });
      console.log('📸 Screenshot saved: centered-footer-with-labels.png');
      
      console.log('\n🎉 RESULTS:');
      console.log(`- Footer is centered: ${isCentered}`);
      console.log(`- All labels visible: ${allLabelsVisible}`);
      
      if (isCentered && allLabelsVisible) {
        console.log('✅ SUCCESS: Footer is properly centered with text labels!');
      } else {
        console.log('❌ ISSUES: Need to adjust positioning or labels');
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

testCenteredFooter().catch(console.error);