import { chromium } from 'playwright';

async function testLightBackground() {
  console.log('🎨 Testing new light animated background...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    console.log('📱 Checking background elements...');
    
    // Check for animated background elements
    const backgroundContainer = await page.locator('div[class*="-z-10"]').first().isVisible();
    console.log(`🎭 Background container visible: ${backgroundContainer}`);
    
    const floatingOrbs = await page.locator('div[class*="animate-float-slow"]').count();
    console.log(`🟡 Floating orbs count: ${floatingOrbs}`);
    
    const waveElements = await page.locator('div[class*="animate-gentle-wave"]').count();
    console.log(`🌊 Wave elements count: ${waveElements}`);
    
    // Take screenshots at different positions
    console.log('📸 Taking screenshots...');
    
    // Top of page
    await page.screenshot({ path: 'light-bg-top.png' });
    
    // Scroll down to see footer
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'light-bg-with-footer.png' });
    
    // Scroll through different sections
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'light-bg-middle.png' });
    
    console.log('🎉 Background test completed!');
    console.log('📁 Screenshots saved:');
    console.log('  - light-bg-top.png');
    console.log('  - light-bg-with-footer.png');
    console.log('  - light-bg-middle.png');
    
    if (backgroundContainer && floatingOrbs > 0) {
      console.log('✅ SUCCESS: Light animated background is working!');
    } else {
      console.log('❌ ISSUES: Background elements not found');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testLightBackground().catch(console.error);