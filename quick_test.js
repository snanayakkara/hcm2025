const { chromium } = require('playwright');

async function quickTest() {
  console.log('🚀 Quick Test: Checking if the application loads correctly...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Test desktop version
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('http://localhost:5176', { waitUntil: 'networkidle' });
    
    // Check if main sections are visible
    const sections = ['home', 'about', 'services', 'doctors', 'contact'];
    let loadedSections = 0;
    
    for (const section of sections) {
      const element = await page.locator(`#${section}`);
      if (await element.isVisible()) {
        loadedSections++;
        console.log(`✅ ${section} section loaded`);
      } else {
        console.log(`❌ ${section} section not found`);
      }
    }
    
    console.log(`\n📊 Desktop: ${loadedSections}/${sections.length} sections loaded`);
    
    // Test mobile version
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForTimeout(2000);
    
    // Check mobile specific elements
    const mobileElements = await page.evaluate(() => {
      const isMobile = window.innerWidth <= 768;
      const mobileSpecific = document.querySelectorAll('[class*="mobile"], [class*="Mobile"]');
      return {
        isMobile,
        mobileElementsCount: mobileSpecific.length
      };
    });
    
    console.log(`\n📱 Mobile: Layout detected: ${mobileElements.isMobile ? '✅' : '❌'}`);
    console.log(`📱 Mobile: ${mobileElements.mobileElementsCount} mobile-specific elements found`);
    
    // Test doctor section specifically
    await page.locator('#doctors').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    const doctorSection = await page.evaluate(() => {
      const doctorCards = document.querySelectorAll('[class*="doctor"], [class*="Doctor"]');
      const doctorImages = document.querySelectorAll('img[src*="freilich"], img[src*="ngu"], img[src*="nanayakkara"]');
      return {
        doctorCards: doctorCards.length,
        doctorImages: doctorImages.length
      };
    });
    
    console.log(`\n👨‍⚕️ Doctors: ${doctorSection.doctorCards} cards, ${doctorSection.doctorImages} images`);
    
    // Test for any console errors
    const consoleLogs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleLogs.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    
    if (consoleLogs.length > 0) {
      console.log('\n⚠️  Console Errors:');
      consoleLogs.forEach(log => console.log(`  - ${log}`));
    } else {
      console.log('\n✅ No console errors detected');
    }
    
    console.log('\n🎉 Quick test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

quickTest().catch(console.error);
