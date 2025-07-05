import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE dimensions
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  
  try {
    console.log('Opening localhost:5173...');
    await page.goto('http://localhost:5173');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    console.log('Navigating to doctors section...');
    // Look for the doctors section and scroll to it
    await page.locator('text=Our Doctors').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    
    console.log('Taking initial screenshot...');
    await page.screenshot({ path: 'doctors-mobile-initial.png', fullPage: false });
    
    console.log('Looking for mobile doctor carousel...');
    const mobileCarousel = page.locator('.md\\:hidden').locator('div').filter({ hasText: /Dr\.|Doctor/ }).first();
    
    if (await mobileCarousel.isVisible()) {
      console.log('Mobile carousel found! Taking focused screenshot...');
      await mobileCarousel.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'doctors-mobile-carousel.png', fullPage: false });
      
      console.log('Testing swipe functionality...');
      const carouselContainer = page.locator('.overflow-x-auto').first();
      
      // Get the initial scroll position
      const initialScrollLeft = await carouselContainer.evaluate(el => el.scrollLeft);
      console.log('Initial scroll position:', initialScrollLeft);
      
      // Simulate swipe by scrolling
      await carouselContainer.evaluate(el => el.scrollBy({ left: 200, behavior: 'smooth' }));
      await page.waitForTimeout(1000);
      
      const newScrollLeft = await carouselContainer.evaluate(el => el.scrollLeft);
      console.log('New scroll position:', newScrollLeft);
      
      await page.screenshot({ path: 'doctors-mobile-swiped.png', fullPage: false });
      
      // Check if doctor cards are visible
      const doctorCards = page.locator('.min-w-\\[280px\\]');
      const cardCount = await doctorCards.count();
      console.log('Number of doctor cards found:', cardCount);
      
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = doctorCards.nth(i);
        const isVisible = await card.isVisible();
        console.log(`Doctor card ${i + 1} visible:`, isVisible);
        
        if (isVisible) {
          // Check for photo
          const photo = card.locator('img');
          const photoVisible = await photo.isVisible();
          console.log(`  Photo visible:`, photoVisible);
          
          // Check for name
          const name = card.locator('h3');
          const nameVisible = await name.isVisible();
          const nameText = await name.textContent();
          console.log(`  Name visible:`, nameVisible, '- Text:', nameText);
          
          // Check for specialty
          const specialty = card.locator('p').first();
          const specialtyVisible = await specialty.isVisible();
          const specialtyText = await specialty.textContent();
          console.log(`  Specialty visible:`, specialtyVisible, '- Text:', specialtyText);
        }
      }
      
    } else {
      console.log('Mobile carousel not found, checking for any doctor content...');
      const doctorSection = page.locator('text=Our Doctors').first();
      await doctorSection.scrollIntoViewIfNeeded();
      await page.screenshot({ path: 'doctors-section-mobile.png', fullPage: false });
    }
    
    console.log('Test completed! Screenshots saved.');
    console.log('Keeping browser open for manual inspection...');
    await page.waitForTimeout(10000); // Keep open for 10 seconds
    
  } catch (error) {
    console.error('Error during test:', error);
    await page.screenshot({ path: 'error-screenshot.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();