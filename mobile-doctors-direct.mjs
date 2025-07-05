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
    
    console.log('📱 Taking initial mobile screenshot...');
    await page.screenshot({ path: 'mobile-initial.png', fullPage: false });
    
    console.log('📜 Scrolling directly to doctors section...');
    // Scroll to the doctors section directly
    await page.evaluate(() => {
      const doctorsSection = document.getElementById('doctors');
      if (doctorsSection) {
        doctorsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(3000);
    
    console.log('📸 Taking doctors section screenshot...');
    await page.screenshot({ path: 'mobile-doctors-scrolled.png', fullPage: false });
    
    // Look for mobile carousel elements
    console.log('🎠 Analyzing mobile carousel...');
    
    // Check for carousel header
    const header = page.locator('text=Our Cardiologists');
    console.log('Header found:', await header.isVisible());
    
    // Check for navigation buttons using specific selectors
    const prevButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="chevron-left"]') });
    const nextButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="chevron-right"]') });
    
    console.log('Previous button found:', await prevButton.isVisible());
    console.log('Next button found:', await nextButton.isVisible());
    
    // Check for doctor card content - look for any element with doctor names
    const doctorElements = await page.locator('text=/Dr\\s+\\w+|A\\/Prof\\s+\\w+/').all();
    console.log(`Found ${doctorElements.length} doctor name elements`);
    
    // Look for images in the doctors section
    const images = await page.locator('img').all();
    console.log(`Found ${images.length} images on page`);
    
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const src = await img.getAttribute('src');
      const isVisible = await img.isVisible();
      console.log(`Image ${i + 1}: ${src} - Visible: ${isVisible}`);
    }
    
    // Test navigation if buttons exist
    if (await nextButton.isVisible()) {
      console.log('🎯 Testing next button...');
      await nextButton.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'mobile-doctors-next.png', fullPage: false });
      
      // Test previous button
      if (await prevButton.isVisible()) {
        console.log('🎯 Testing previous button...');
        await prevButton.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'mobile-doctors-prev.png', fullPage: false });
      }
    }
    
    // Look for dot indicators
    const dots = page.locator('button').filter({ has: page.locator('div, span').filter({ hasText: /^$/ }) });
    const dotCount = await dots.count();
    console.log(`Found ${dotCount} potential dot indicators`);
    
    // Check if any specific doctor names are visible
    const doctorNames = ['Dr Mark Freilich', 'Dr Phillip Ngu', 'A/Prof Alex Voskoboinik', 'Dr Shane Nanayakkara'];
    for (const name of doctorNames) {
      const nameElement = page.locator(`text=${name}`);
      const isVisible = await nameElement.isVisible();
      console.log(`${name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
    }
    
    // Check for booking button
    const bookingButton = page.locator('button').filter({ hasText: /Book|Appointment/ });
    console.log('Booking button found:', await bookingButton.isVisible());
    
    // Take a final full-page screenshot
    console.log('📸 Taking final full-page screenshot...');
    await page.screenshot({ path: 'mobile-doctors-full.png', fullPage: true });
    
    console.log('✅ Mobile doctors test completed!');
    console.log('🖼️ Screenshots saved:');
    console.log('   - mobile-initial.png');
    console.log('   - mobile-doctors-scrolled.png');
    console.log('   - mobile-doctors-next.png');
    console.log('   - mobile-doctors-prev.png');
    console.log('   - mobile-doctors-full.png');
    
    // Keep browser open for manual inspection
    console.log('⏳ Keeping browser open for 10 seconds for manual inspection...');
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('❌ Error during test:', error);
    await page.screenshot({ path: 'mobile-doctors-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();