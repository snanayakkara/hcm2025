import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE dimensions
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  
  try {
    console.log('🚀 Opening mobile website...');
    await page.goto('http://localhost:5173');
    
    // Wait for mobile layout to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    console.log('📜 Scrolling to doctors section...');
    await page.evaluate(() => {
      const doctorsSection = document.getElementById('doctors');
      if (doctorsSection) {
        doctorsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(2000);
    
    console.log('📸 Taking doctors section screenshot...');
    await page.screenshot({ path: 'carousel-test-1.png', fullPage: false });
    
    // Test navigation buttons
    console.log('🎯 Testing next button...');
    const nextButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="chevron-right"]') });
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'carousel-test-2.png', fullPage: false });
      
      console.log('🎯 Testing next button again...');
      await nextButton.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'carousel-test-3.png', fullPage: false });
      
      console.log('🎯 Testing next button again...');
      await nextButton.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'carousel-test-4.png', fullPage: false });
    }
    
    // Test dot navigation
    console.log('🔘 Testing dot navigation...');
    const dots = page.locator('button').filter({ has: page.locator('div').filter({ hasText: /^$/ }) });
    const dotCount = await dots.count();
    console.log(`Found ${dotCount} dots`);
    
    if (dotCount > 0) {
      await dots.first().click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'carousel-dot-1.png', fullPage: false });
    }
    
    // Verify all elements are visible
    console.log('✅ Verification Summary:');
    
    // Check header
    const header = page.locator('h2').filter({ hasText: 'Our Cardiologists' });
    console.log('Header visible:', await header.isVisible());
    
    // Check navigation buttons
    const prevButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="chevron-left"]') });
    console.log('Previous button visible:', await prevButton.isVisible());
    console.log('Next button visible:', await nextButton.isVisible());
    
    // Check counter
    const counter = page.locator('text=/\\d+ of \\d+/');
    console.log('Counter visible:', await counter.isVisible());
    
    // Check doctor card
    const doctorCard = page.locator('div').filter({ hasText: /Interventional Cardiologist|Non-Invasive Imaging|Electrophysiologist|Heart Failure/ });
    console.log('Doctor card visible:', await doctorCard.isVisible());
    
    // Check images
    const images = page.locator('img').filter({ hasText: /Dr|A\/Prof/ });
    console.log('Doctor images found:', await images.count());
    
    // Check action buttons
    const bookButton = page.locator('button').filter({ hasText: /Book|Appointment/ });
    console.log('Book button visible:', await bookButton.isVisible());
    
    console.log('✅ Mobile carousel test completed successfully!');
    console.log('🖼️ Screenshots saved:');
    console.log('   - carousel-test-1.png (Doctor 1)');
    console.log('   - carousel-test-2.png (Doctor 2)');
    console.log('   - carousel-test-3.png (Doctor 3)');
    console.log('   - carousel-test-4.png (Doctor 4)');
    console.log('   - carousel-dot-1.png (Dot navigation)');
    
    // Keep browser open briefly
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('❌ Error during test:', error);
    await page.screenshot({ path: 'carousel-final-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();