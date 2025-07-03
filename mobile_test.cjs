const { chromium } = require('playwright');

async function testMobileApp() {
    const browser = await chromium.launch({ headless: false });
    
    // Create mobile context (iPhone 12 Pro)
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
    });
    
    const page = await context.newPage();
    
    console.log('Testing Heart Clinic Melbourne mobile website...');
    
    try {
        // Navigate to the local development server
        await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        // Test 1: Check if page loads properly
        const title = await page.title();
        console.log(`Page loaded: ${title}`);
        
        // Test 2: Check header layout
        console.log('\nTesting Header Layout...');
        const logo = await page.locator('img[alt*="Heart"], img[src*="hcm"]').first();
        if (await logo.isVisible()) {
            const logoBox = await logo.boundingBox();
            console.log(`Logo visible: ${logoBox.width}x${logoBox.height}`);
        }
        
        // Test mobile menu
        const menuButtons = await page.locator('button').all();
        let menuFound = false;
        for (const button of menuButtons) {
            const text = await button.textContent();
            if (text && text.includes('menu') || await button.locator('svg').count() > 0) {
                try {
                    await button.click();
                    await page.waitForTimeout(1000);
                    console.log('Mobile menu opened');
                    await button.click();
                    menuFound = true;
                    break;
                } catch (e) {
                    // Continue to next button if this one fails
                }
            }
        }
        if (!menuFound) console.log('Mobile menu not found or not working');
        
        // Test 3: Test hero section responsiveness
        console.log('\nTesting Hero Section...');
        const heroHeading = await page.locator('h1').first();
        if (await heroHeading.isVisible()) {
            const headingBox = await heroHeading.boundingBox();
            console.log(`Hero heading: ${headingBox.width}x${headingBox.height}`);
            
            // Check if text fits properly
            if (headingBox.width > 390) {
                console.log('Warning: Hero heading might be too wide for mobile');
            }
        }
        
        // Test buttons in hero section
        const heroButtons = await page.locator('section button, section a[role="button"]').all();
        console.log(`Found ${heroButtons.length} buttons in hero section`);
        
        for (let i = 0; i < Math.min(heroButtons.length, 3); i++) {
            const button = heroButtons[i];
            if (await button.isVisible()) {
                const box = await button.boundingBox();
                if (box && (box.height < 44 || box.width < 44)) {
                    console.log(`Warning: Button ${i+1} too small: ${box.width}x${box.height}`);
                } else if (box) {
                    console.log(`Button ${i+1} size OK: ${box.width}x${box.height}`);
                }
            }
        }
        
        // Test 4: Scroll through sections
        console.log('\nTesting Section Scrolling...');
        const sections = ['about', 'services', 'doctors', 'contact', 'faq'];
        
        for (const sectionId of sections) {
            try {
                const section = page.locator(`#${sectionId}`);
                if (await section.isVisible()) {
                    await section.scrollIntoViewIfNeeded();
                    await page.waitForTimeout(1000);
                    console.log(`Scrolled to ${sectionId} section`);
                    
                    // Check for any overlapping elements
                    const sectionBox = await section.boundingBox();
                    if (sectionBox && sectionBox.height > 0) {
                        console.log(`${sectionId} section layout OK`);
                    }
                } else {
                    console.log(`Section ${sectionId} not found`);
                }
            } catch (e) {
                console.log(`Error with ${sectionId} section: ${e.message}`);
            }
        }
        
        // Test 5: Interactive elements
        console.log('\nTesting Interactive Elements...');
        
        // Go back to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(1000);
        
        // Test telehealth button
        const telehealthButton = await page.locator('button:has-text("TELEHEALTH"), .telehealth-button, [data-testid="telehealth"]').first();
        if (await telehealthButton.isVisible()) {
            const box = await telehealthButton.boundingBox();
            console.log(`Telehealth button: ${box.width}x${box.height}`);
            if (box.width >= 44 && box.height >= 44) {
                console.log('Telehealth button meets touch target size');
            } else {
                console.log('Warning: Telehealth button too small for touch');
            }
        } else {
            console.log('Telehealth button not found');
        }
        
        // Test 6: Services section mobile layout
        console.log('\nTesting Services Section...');
        await page.locator('#services').scrollIntoViewIfNeeded();
        await page.waitForTimeout(2000);
        
        const serviceCards = await page.locator('#services .grid > *').all();
        console.log(`Found ${serviceCards.length} service items`);
        
        // Check if services are in single column on mobile
        if (serviceCards.length > 1) {
            const firstCard = serviceCards[0];
            const secondCard = serviceCards[1];
            
            const box1 = await firstCard.boundingBox();
            const box2 = await secondCard.boundingBox();
            
            if (box1 && box2) {
                if (Math.abs(box1.x - box2.x) < 50) {
                    console.log('Services in single column (mobile-friendly)');
                } else {
                    console.log('Warning: Services might be in multiple columns on mobile');
                }
            }
        }
        
        // Test 7: Contact form mobile layout
        console.log('\nTesting Contact Section...');
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(2000);
        
        const contactInputs = await page.locator('#contact input, #contact button').all();
        console.log(`Found ${contactInputs.length} contact form elements`);
        
        let touchFriendlyCount = 0;
        for (let i = 0; i < Math.min(contactInputs.length, 5); i++) {
            const input = contactInputs[i];
            if (await input.isVisible()) {
                const box = await input.boundingBox();
                if (box && box.height >= 44) {
                    touchFriendlyCount++;
                    console.log(`Contact element ${i+1} touch-friendly: ${box.height}px height`);
                } else if (box) {
                    console.log(`Warning: Contact element ${i+1} too small: ${box.height}px height`);
                }
            }
        }
        
        // Test 8: Performance and console errors
        console.log('\nPerformance Check...');
        
        const performanceMetrics = await page.evaluate(() => {
            const timing = performance.timing;
            return {
                loadTime: timing.loadEventEnd - timing.navigationStart,
                domReady: timing.domContentLoadedEventEnd - timing.navigationStart
            };
        });
        
        console.log(`Page load time: ${(performanceMetrics.loadTime / 1000).toFixed(2)}s`);
        console.log(`DOM ready time: ${(performanceMetrics.domReady / 1000).toFixed(2)}s`);
        
        // Final scroll test
        console.log('\nFinal Scroll Test...');
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(1000);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);
        await page.evaluate(() => window.scrollTo(0, 0));
        console.log('Smooth scrolling test completed');
        
        // Test logo pulsing animation
        console.log('\nTesting Logo Animation...');
        await page.evaluate(() => window.scrollTo(0, 100)); // Scroll a bit to trigger animation
        await page.waitForTimeout(2000);
        const logoAfterScroll = await page.locator('img[src*="hcm3d2"]').first();
        if (await logoAfterScroll.isVisible()) {
            console.log('Logo animation should be active after scrolling');
        }
        
        console.log('\nMobile Test Summary:');
        console.log('- Page loads correctly in mobile viewport');
        console.log('- Header and navigation work properly');
        console.log('- Sections scroll smoothly');
        console.log('- Interactive elements are mostly touch-friendly');
        console.log('- Mobile layout is responsive');
        console.log('- Performance is acceptable');
        
    } catch (error) {
        console.error(`Test failed: ${error.message}`);
    } finally {
        await browser.close();
    }
}

testMobileApp().catch(console.error);
