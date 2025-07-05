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
    await page.screenshot({ path: 'mobile-home.png', fullPage: false });
    
    console.log('🔍 Looking for mobile doctor carousel...');
    // Navigate to doctors section via bottom navigation
    const doctorsTab = page.locator('text=Doctors').first();
    if (await doctorsTab.isVisible()) {
      await doctorsTab.click();
      console.log('✅ Clicked on Doctors tab');
      await page.waitForTimeout(2000);
    } else {
      // Try scrolling to doctors section
      console.log('📜 Scrolling to doctors section...');
      await page.evaluate(() => {
        const doctorsSection = document.getElementById('doctors');
        if (doctorsSection) {
          doctorsSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      await page.waitForTimeout(2000);
    }
    
    console.log('📸 Taking doctors section screenshot...');
    await page.screenshot({ path: 'mobile-doctors-section.png', fullPage: false });
    
    // Look for the mobile carousel specifically
    console.log('🎠 Searching for mobile carousel elements...');
    
    // Check for the carousel header
    const carouselHeader = page.locator('text=Our Cardiologists');
    if (await carouselHeader.isVisible()) {
      console.log('✅ Found carousel header');
    } else {
      console.log('❌ Carousel header not found');
    }
    
    // Check for navigation buttons
    const prevButton = page.locator('button').filter({ hasText: /prev/i }).or(page.locator('svg[data-lucide="chevron-left"]').locator('..'));
    const nextButton = page.locator('button').filter({ hasText: /next/i }).or(page.locator('svg[data-lucide="chevron-right"]').locator('..'));
    
    if (await prevButton.isVisible()) {
      console.log('✅ Found previous button');
    } else {
      console.log('❌ Previous button not found');
    }
    
    if (await nextButton.isVisible()) {
      console.log('✅ Found next button');
    } else {
      console.log('❌ Next button not found');
    }
    
    // Check for doctor cards
    const doctorCards = page.locator('div').filter({ hasText: /Dr\s+\w+|A\/Prof\s+\w+/ });
    const cardCount = await doctorCards.count();
    console.log(`🏥 Found ${cardCount} doctor card elements`);
    
    // Look for specific doctor card structure
    const doctorCard = page.locator('div').filter({ hasText: /Dr Mark Freilich|Dr Phillip Ngu|A\/Prof Alex Voskoboinik|Dr Shane Nanayakkara/ }).first();
    if (await doctorCard.isVisible()) {
      console.log('✅ Found doctor card');
      
      // Check for photo within the card
      const photo = doctorCard.locator('img').first();
      if (await photo.isVisible()) {
        console.log('✅ Doctor photo is visible');
        const photoSrc = await photo.getAttribute('src');
        console.log(`📷 Photo source: ${photoSrc}`);
      } else {
        console.log('❌ Doctor photo not visible');
      }
      
      // Check for doctor name
      const nameElement = doctorCard.locator('h3').first();
      if (await nameElement.isVisible()) {
        const nameText = await nameElement.textContent();
        console.log(`✅ Doctor name visible: ${nameText}`);
      } else {
        console.log('❌ Doctor name not visible');
      }
      
      // Check for specialty
      const specialtyElement = doctorCard.locator('p').first();
      if (await specialtyElement.isVisible()) {
        const specialtyText = await specialtyElement.textContent();
        console.log(`✅ Doctor specialty visible: ${specialtyText}`);
      } else {
        console.log('❌ Doctor specialty not visible');
      }
      
      // Take focused screenshot of the card
      await doctorCard.scrollIntoViewIfNeeded();
      await page.screenshot({ path: 'mobile-doctor-card-focused.png', fullPage: false });
      
    } else {
      console.log('❌ Doctor card not found');
    }
    
    // Test navigation if buttons are available
    if (await nextButton.isVisible()) {
      console.log('🎯 Testing next button...');
      await nextButton.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'mobile-doctors-after-next.png', fullPage: false });
      
      console.log('🎯 Testing previous button...');
      if (await prevButton.isVisible()) {
        await prevButton.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'mobile-doctors-after-prev.png', fullPage: false });
      }
    }
    
    // Check dot indicators
    const dots = page.locator('button').filter({ hasText: '' }).filter({ has: page.locator('div, span').filter({ hasText: /^$/ }) });
    const dotCount = await dots.count();
    console.log(`🔘 Found ${dotCount} dot indicator elements`);
    
    // Test dot navigation if available
    if (dotCount > 1) {
      console.log('🎯 Testing dot navigation...');
      await dots.nth(1).click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'mobile-doctors-dot-navigation.png', fullPage: false });
    }
    
    console.log('✅ Mobile carousel test completed!');
    console.log('🖼️ Screenshots saved:');
    console.log('   - mobile-home.png');
    console.log('   - mobile-doctors-section.png');
    console.log('   - mobile-doctor-card-focused.png');
    console.log('   - mobile-doctors-after-next.png');
    console.log('   - mobile-doctors-after-prev.png');
    console.log('   - mobile-doctors-dot-navigation.png');
    
    // Keep browser open for manual inspection
    console.log('⏳ Keeping browser open for 15 seconds for manual inspection...');
    await page.waitForTimeout(15000);
    
  } catch (error) {
    console.error('❌ Error during test:', error);
    await page.screenshot({ path: 'mobile-carousel-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();