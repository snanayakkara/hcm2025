import { chromium } from 'playwright';

async function finalTest() {
  console.log('🎯 Final footer test...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Check for floating footer at top of page
    console.log('📱 Checking footer at page top...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    
    const floatingFooter = await page.locator('div[class*="fixed"][class*="bottom-24"]').filter({
      has: page.locator('text=Heart Clinic Melbourne')
    }).first();
    
    const isVisible = await floatingFooter.isVisible().catch(() => false);
    console.log(`✨ Floating footer visible: ${isVisible}`);
    
    if (isVisible) {
      const box = await floatingFooter.boundingBox();
      console.log(`📐 Footer position: y=${box.y}, height=${box.height}`);
      console.log(`🎯 Expected position: bottom-24 = viewport height (932) - 96 = 836`);
      console.log(`✅ Footer is ${box.y < 900 ? 'PROPERLY POSITIONED' : 'TOO LOW'}`);
    }
    
    // Check bottom navigation
    const bottomNav = await page.locator('div[class*="fixed"][class*="bottom-0"]').filter({
      has: page.locator('text=Home')
    }).first();
    
    const navVisible = await bottomNav.isVisible().catch(() => false);
    console.log(`🧭 Bottom navigation visible: ${navVisible}`);
    
    if (navVisible) {
      const navBox = await bottomNav.boundingBox();
      console.log(`📐 Bottom nav position: y=${navBox.y}, height=${navBox.height}`);
    }
    
    // Take final screenshot
    await page.screenshot({ path: 'final-footer-success.png' });
    console.log('📸 Final screenshot: final-footer-success.png');
    
    // Test scrolling behavior
    console.log('📜 Testing scroll behavior...');
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);
    
    const stillVisible = await floatingFooter.isVisible().catch(() => false);
    console.log(`📜 Footer visible after scroll: ${stillVisible}`);
    
    console.log('\n🎉 FINAL RESULTS:');
    console.log(`- Footer visible on load: ${isVisible}`);
    console.log(`- Bottom nav visible: ${navVisible}`);
    console.log(`- Footer persists on scroll: ${stillVisible}`);
    
    if (isVisible && navVisible) {
      console.log('✅ SUCCESS: Both footer and navigation are working!');
    } else {
      console.log('❌ STILL ISSUES: Some elements not visible');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

finalTest().catch(console.error);