import { chromium } from 'playwright';

async function testNewFooter() {
  console.log('🎯 Testing new floating capsule footer...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    console.log('📱 Starting at page top...');
    
    // Check no footer initially
    const footerVisible = await page.locator('[class*="fixed bottom-8"]').isVisible().catch(() => false);
    console.log(`🔍 Footer visible at top: ${footerVisible}`);
    
    // Take screenshot at top
    await page.screenshot({ path: 'new-footer-top.png' });
    
    // Scroll down to trigger footer
    console.log('📜 Scrolling down to trigger footer...');
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(1000);
    
    // Check footer after scroll
    const footerAfterScroll = await page.locator('[class*="fixed bottom-8"]').isVisible().catch(() => false);
    console.log(`✨ Footer visible after scroll: ${footerAfterScroll}`);
    
    if (footerAfterScroll) {
      // Check footer buttons
      const callButton = await page.locator('button:has(svg[class*="lucide-phone"])').isVisible().catch(() => false);
      const videoButton = await page.locator('button:has(svg[class*="lucide-video"])').isVisible().catch(() => false);
      const mapButton = await page.locator('button:has(svg[class*="lucide-map-pin"])').isVisible().catch(() => false);
      const menuButton = await page.locator('button:has(svg[class*="lucide-menu"])').isVisible().catch(() => false);
      
      console.log(`📞 Call button: ${callButton}`);
      console.log(`📹 Video button: ${videoButton}`);
      console.log(`🗺️ Map button: ${mapButton}`);
      console.log(`☰ Menu button: ${menuButton}`);
      
      // Test menu button
      if (menuButton) {
        console.log('🔘 Clicking menu button...');
        await page.locator('button:has(svg[class*="lucide-menu"])').click();
        await page.waitForTimeout(500);
        
        const menuModal = await page.locator('[class*="fixed bottom-24"]').isVisible().catch(() => false);
        console.log(`📋 Menu modal visible: ${menuModal}`);
      }
    }
    
    // Take screenshot with footer
    await page.screenshot({ path: 'new-footer-scrolled.png' });
    
    // Check header section display
    console.log('📍 Checking header section display...');
    const headerSection = await page.locator('[class*="bg-white/20 backdrop-blur-sm"]').textContent().catch(() => 'not found');
    console.log(`📄 Header shows: "${headerSection}"`);
    
    console.log('\n🎉 RESULTS:');
    console.log(`- Footer hidden at top: ${!footerVisible}`);
    console.log(`- Footer shows on scroll: ${footerAfterScroll}`);
    console.log(`- Header updates with section: ${headerSection !== 'not found'}`);
    
    if (!footerVisible && footerAfterScroll) {
      console.log('✅ SUCCESS: New footer behavior working correctly!');
    } else {
      console.log('❌ ISSUES: Footer behavior needs adjustment');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testNewFooter().catch(console.error);