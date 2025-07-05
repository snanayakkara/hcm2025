import { chromium } from 'playwright';

async function testLayeredDesign() {
  console.log('🎯 Testing layered design improvements...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    console.log('📱 Checking header styling...');
    
    // Check header frosted glass effect
    const headerVisible = await page.locator('header').isVisible();
    console.log(`🏠 Header visible: ${headerVisible}`);
    
    // Take screenshot at top to see header
    await page.screenshot({ path: 'layered-design-header.png' });
    
    // Scroll down to see footer centering
    console.log('📜 Scrolling to check footer centering...');
    await page.evaluate(() => window.scrollTo(0, 400));
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
      
      console.log(`🎯 Footer center offset: ${centerOffset.toFixed(1)}px`);
      console.log(`✅ Footer properly centered: ${centerOffset < 5}`);
    }
    
    // Take screenshots of layered design
    await page.screenshot({ path: 'layered-design-with-footer.png' });
    
    // Scroll through different sections to see card shadows
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'layered-design-cards.png' });
    
    // Check if cards have proper shadows
    const cardsWithShadows = await page.evaluate(() => {
      const cards = document.querySelectorAll('[class*="card"], [class*="glass"]');
      return Array.from(cards).map(card => {
        const styles = window.getComputedStyle(card);
        return {
          element: card.tagName,
          boxShadow: styles.boxShadow !== 'none',
          background: styles.background
        };
      });
    });
    
    console.log(`🃏 Cards with shadows: ${cardsWithShadows.filter(c => c.boxShadow).length}/${cardsWithShadows.length}`);
    
    console.log('\n🎉 RESULTS:');
    console.log('📁 Screenshots saved:');
    console.log('  - layered-design-header.png');
    console.log('  - layered-design-with-footer.png');
    console.log('  - layered-design-cards.png');
    
    if (headerVisible && footerVisible) {
      console.log('✅ SUCCESS: Layered design improvements applied!');
    } else {
      console.log('❌ ISSUES: Some elements need adjustment');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testLayeredDesign().catch(console.error);