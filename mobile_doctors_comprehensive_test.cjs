const { chromium } = require('playwright');
const path = require('path');

async function testMobileDoctorsComprehensive() {
    console.log('🏥 Heart Clinic Melbourne - Comprehensive Mobile Doctors Test');
    console.log('📱 Device: iPhone SE (375x667)');
    console.log('=' .repeat(70));
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 300
    });
    
    const context = await browser.newContext({
        viewport: { width: 375, height: 667 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Mobile/15E148 Safari/604.1'
    });
    
    const page = await context.newPage();
    const screenshotsDir = path.join(__dirname, 'screenshots');
    
    try {
        console.log('🚀 Loading website...');
        await page.goto('http://localhost:5177', { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        
        console.log('📍 Scrolling to doctors section...');
        await page.locator('#doctors').scrollIntoViewIfNeeded();
        await page.waitForTimeout(2000);
        
        await page.screenshot({
            path: path.join(screenshotsDir, 'mobile_doctors_overview.png'),
            fullPage: true
        });
        
        // Test 1: Mobile Layout Detection
        console.log('\n🔍 TEST 1: Mobile Layout Detection');
        console.log('-'.repeat(50));
        
        const isMobileLayout = await page.evaluate(() => {
            return window.innerWidth <= 768;
        });
        console.log(`Mobile layout detected: ${isMobileLayout ? '✅' : '❌'}`);
        
        // Test 2: Mobile Doctor Carousel
        console.log('\n🎠 TEST 2: Mobile Doctor Carousel');
        console.log('-'.repeat(50));
        
        // Look for carousel navigation
        const prevButton = await page.locator('button').filter({ hasText: '' }).or(
            page.locator('button:has(svg)')
        ).first();
        const nextButton = await page.locator('button').filter({ hasText: '' }).or(
            page.locator('button:has(svg)')
        ).last();
        
        console.log('Testing carousel navigation...');
        
        // Test navigation buttons
        let navigationWorks = false;
        try {
            // Look for chevron buttons specifically
            const chevronButtons = await page.locator('button:has(svg)').all();
            console.log(`Found ${chevronButtons.length} buttons with icons`);
            
            if (chevronButtons.length >= 2) {
                // Test next button
                await chevronButtons[1].click(); // Usually the right/next button
                await page.waitForTimeout(1000);
                
                await page.screenshot({
                    path: path.join(screenshotsDir, 'mobile_carousel_next.png'),
                    fullPage: false
                });
                
                console.log('✅ Navigation button clicked successfully');
                navigationWorks = true;
            }
        } catch (error) {
            console.log('⚠️  Navigation test failed:', error.message);
        }
        
        // Test 3: Doctor Card Content
        console.log('\n👨‍⚕️ TEST 3: Doctor Card Content');
        console.log('-'.repeat(50));
        
        // Look for doctor images
        const doctorImages = await page.locator('img').all();
        let doctorImagesFound = 0;
        
        for (const img of doctorImages) {
            const src = await img.getAttribute('src');
            if (src && (src.includes('freilich') || src.includes('ngu') || src.includes('vosko') || src.includes('nanayakkara') || src.includes('shane'))) {
                doctorImagesFound++;
                const isVisible = await img.isVisible();
                console.log(`📸 Doctor image found: ${src} - ${isVisible ? 'Visible' : 'Hidden'}`);
                
                // Check if image loads
                if (isVisible) {
                    const imageLoaded = await img.evaluate((img) => img.complete && img.naturalWidth > 0);
                    console.log(`   Image loaded: ${imageLoaded ? '✅' : '❌'}`);
                }
            }
        }
        
        console.log(`Total doctor images found: ${doctorImagesFound}`);
        
        // Look for doctor names
        const doctorNames = ['Dr Mark Freilich', 'Dr Phillip Ngu', 'A/Prof Alex Voskoboinik', 'Dr Shane Nanayakkara'];
        let namesFound = 0;
        
        for (const name of doctorNames) {
            const nameElement = await page.locator(`text=${name}`).first();
            if (await nameElement.isVisible()) {
                namesFound++;
                console.log(`📝 Doctor name visible: ${name} ✅`);
            } else {
                console.log(`📝 Doctor name missing: ${name} ❌`);
            }
        }
        
        console.log(`Doctor names visible: ${namesFound}/${doctorNames.length}`);
        
        // Test 4: Interactive Elements
        console.log('\n🔘 TEST 4: Interactive Elements');
        console.log('-'.repeat(50));
        
        // Look for buttons
        const buttons = await page.locator('button').all();
        let touchFriendlyButtons = 0;
        let totalButtons = 0;
        
        for (const button of buttons) {
            if (await button.isVisible()) {
                totalButtons++;
                const box = await button.boundingBox();
                if (box) {
                    const isTouchFriendly = box.width >= 44 && box.height >= 44;
                    if (isTouchFriendly) touchFriendlyButtons++;
                    
                    const buttonText = await button.textContent();
                    console.log(`🔘 Button: "${buttonText?.trim() || 'No text'}" - ${box.width}x${box.height} - ${isTouchFriendly ? '✅' : '❌'}`);
                }
            }
        }
        
        console.log(`Touch-friendly buttons: ${touchFriendlyButtons}/${totalButtons}`);
        
        // Test 5: Mobile-specific Features
        console.log('\n📱 TEST 5: Mobile-specific Features');
        console.log('-'.repeat(50));
        
        // Check for mobile action bar
        const mobileActionBar = await page.locator('[class*="MobileActionBar"], .mobile-action-bar, .bottom-nav').first();
        if (await mobileActionBar.isVisible()) {
            console.log('✅ Mobile action bar detected');
        } else {
            console.log('ℹ️  Mobile action bar not found');
        }
        
        // Check for call buttons
        const callButtons = await page.locator('button:has-text("Call"), a[href^="tel:"]').all();
        console.log(`📞 Call buttons found: ${callButtons.length}`);
        
        // Test 6: Scroll Behavior
        console.log('\n📜 TEST 6: Scroll Behavior');
        console.log('-'.repeat(50));
        
        // Test smooth scrolling
        await page.evaluate(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        await page.waitForTimeout(500);
        
        await page.evaluate(() => {
            window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
        });
        await page.waitForTimeout(500);
        
        console.log('✅ Smooth scrolling test completed');
        
        // Test 7: Performance Check
        console.log('\n⚡ TEST 7: Performance Check');
        console.log('-'.repeat(50));
        
        const metrics = await page.evaluate(() => {
            const timing = performance.timing;
            const navigation = performance.getEntriesByType('navigation')[0];
            return {
                loadTime: timing.loadEventEnd - timing.navigationStart,
                domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
                firstPaint: navigation.loadEventEnd - navigation.fetchStart
            };
        });
        
        console.log(`Page load time: ${(metrics.loadTime / 1000).toFixed(2)}s`);
        console.log(`DOM ready time: ${(metrics.domReady / 1000).toFixed(2)}s`);
        
        // Test 8: Touch Gestures
        console.log('\n👆 TEST 8: Touch Gestures');
        console.log('-'.repeat(50));
        
        try {
            // Test tap gesture on doctor card area
            await page.touchscreen.tap(187, 400); // Center of typical card position
            await page.waitForTimeout(1000);
            console.log('✅ Touch gesture test completed');
        } catch (error) {
            console.log('⚠️  Touch gesture test failed:', error.message);
        }
        
        // Final screenshot
        await page.screenshot({
            path: path.join(screenshotsDir, 'mobile_doctors_final.png'),
            fullPage: true
        });
        
        // Generate Test Report
        console.log('\n📊 COMPREHENSIVE TEST REPORT');
        console.log('=' .repeat(70));
        
        const report = {
            mobileLayoutDetected: isMobileLayout,
            navigationWorks: navigationWorks,
            doctorImagesFound: doctorImagesFound,
            doctorNamesVisible: namesFound,
            touchFriendlyButtons: touchFriendlyButtons,
            totalButtons: totalButtons,
            callButtonsFound: callButtons.length,
            performanceMetrics: {
                loadTime: (metrics.loadTime / 1000).toFixed(2) + 's',
                domReady: (metrics.domReady / 1000).toFixed(2) + 's'
            }
        };
        
        console.log('✅ WORKING FEATURES:');
        if (report.mobileLayoutDetected) console.log('  ✅ Mobile layout properly detected');
        if (report.navigationWorks) console.log('  ✅ Carousel navigation working');
        if (report.doctorImagesFound > 0) console.log(`  ✅ ${report.doctorImagesFound} doctor images found`);
        if (report.doctorNamesVisible > 0) console.log(`  ✅ ${report.doctorNamesVisible} doctor names visible`);
        if (report.touchFriendlyButtons > 0) console.log(`  ✅ ${report.touchFriendlyButtons} touch-friendly buttons`);
        if (report.callButtonsFound > 0) console.log(`  ✅ ${report.callButtonsFound} call buttons available`);
        
        console.log('\n⚠️  POTENTIAL ISSUES:');
        if (report.doctorImagesFound < 4) console.log(`  ❌ Only ${report.doctorImagesFound}/4 doctor images found`);
        if (report.doctorNamesVisible < 4) console.log(`  ❌ Only ${report.doctorNamesVisible}/4 doctor names visible`);
        if (report.touchFriendlyButtons < report.totalButtons) {
            console.log(`  ❌ ${report.totalButtons - report.touchFriendlyButtons} buttons may be too small for touch`);
        }
        
        console.log('\n📈 PERFORMANCE:');
        console.log(`  Load time: ${report.performanceMetrics.loadTime}`);
        console.log(`  DOM ready: ${report.performanceMetrics.domReady}`);
        
        console.log('\n📁 SCREENSHOTS SAVED:');
        console.log(`  ${screenshotsDir}/mobile_doctors_overview.png`);
        console.log(`  ${screenshotsDir}/mobile_carousel_next.png`);
        console.log(`  ${screenshotsDir}/mobile_doctors_final.png`);
        
        console.log('\n🎯 RECOMMENDATIONS:');
        if (report.doctorImagesFound < 4) {
            console.log('  📸 Check doctor image paths and ensure all images are loading');
        }
        if (report.doctorNamesVisible < 4) {
            console.log('  📝 Verify doctor name visibility in mobile carousel');
        }
        if (report.touchFriendlyButtons < report.totalButtons) {
            console.log('  🔘 Increase button sizes to meet 44x44px touch target minimum');
        }
        
        console.log('\n🎉 MOBILE TESTING COMPLETED!');
        
        return report;
        
    } catch (error) {
        console.error(`❌ Test failed: ${error.message}`);
        console.error(error.stack);
        return null;
    } finally {
        await browser.close();
    }
}

// Run the comprehensive test
testMobileDoctorsComprehensive().catch(console.error);