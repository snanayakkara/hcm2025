const { chromium } = require('playwright');
const path = require('path');

async function finalMobileTest() {
    console.log('🏁 Final Mobile Doctors Section Test');
    console.log('=' .repeat(50));
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
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
        console.log('📱 Loading website...');
        await page.goto('http://localhost:5177', { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        
        console.log('🏥 Navigating to doctors section...');
        await page.locator('#doctors').scrollIntoViewIfNeeded();
        await page.waitForTimeout(3000);
        
        // Take full-height screenshot of the doctors section
        await page.screenshot({
            path: path.join(screenshotsDir, 'mobile_doctors_complete_view.png'),
            clip: { x: 0, y: 150, width: 375, height: 600 }
        });
        
        // Test navigation through each doctor
        console.log('🔄 Testing each doctor in carousel...');
        
        const nextButton = await page.locator('button').nth(1); // Typically the next button
        
        for (let i = 0; i < 4; i++) {
            console.log(`\n👨‍⚕️ Doctor ${i + 1}/4:`);
            
            // Take screenshot of current doctor
            await page.screenshot({
                path: path.join(screenshotsDir, `mobile_doctor_card_${i + 1}.png`),
                clip: { x: 0, y: 150, width: 375, height: 500 }
            });
            
            // Look for doctor-specific content
            const cardContent = await page.locator('.bg-white\\/95, .rounded-3xl').first();
            if (await cardContent.isVisible()) {
                console.log('   ✅ Doctor card visible');
                
                // Check for gradient background (indicates doctor photo area)
                const gradientArea = await page.locator('[class*="gradient"]').first();
                if (await gradientArea.isVisible()) {
                    console.log('   ✅ Doctor photo area visible');
                }
                
                // Check for doctor images
                const images = await page.locator('img').all();
                for (const img of images) {
                    const src = await img.getAttribute('src');
                    if (src && src.includes('/images/') && !src.includes('hcm3d2')) {
                        const isVisible = await img.isVisible();
                        console.log(`   📸 Doctor image: ${src} - ${isVisible ? 'Visible' : 'Hidden'}`);
                    }
                }
                
                // Check for text content
                const allText = await page.locator('h3, h2, .text-2xl, .text-lg').allTextContents();
                const doctorTexts = allText.filter(text => 
                    text.includes('Dr') || text.includes('Prof') || 
                    text.includes('Cardiologist') || text.includes('Imaging')
                );
                
                if (doctorTexts.length > 0) {
                    console.log(`   📝 Doctor text found: ${doctorTexts[0]}`);
                } else {
                    console.log('   ❌ No doctor text found');
                }
            }
            
            // Navigate to next (except last)
            if (i < 3) {
                try {
                    await nextButton.click();
                    await page.waitForTimeout(1500);
                    console.log('   ▶️  Navigated to next doctor');
                } catch (error) {
                    console.log('   ⚠️  Navigation failed');
                }
            }
        }
        
        // Test interaction elements
        console.log('\n🔘 Testing interactive elements...');
        
        const buttons = await page.locator('button').all();
        let touchFriendlyCount = 0;
        
        for (const button of buttons) {
            if (await button.isVisible()) {
                const box = await button.boundingBox();
                if (box && box.width >= 44 && box.height >= 44) {
                    touchFriendlyCount++;
                }
            }
        }
        
        console.log(`✅ Touch-friendly buttons: ${touchFriendlyCount}`);
        
        // Final assessment
        console.log('\n📋 FINAL ASSESSMENT:');
        console.log('=' .repeat(50));
        
        // Check if this is mobile layout
        const isMobileLayout = await page.evaluate(() => window.innerWidth < 768);
        console.log(`📱 Mobile layout: ${isMobileLayout ? '✅ YES' : '❌ NO'}`);
        
        // Check carousel presence
        const hasCarousel = await page.locator('.relative.h-\\[420px\\]').isVisible();
        console.log(`🎠 Mobile carousel: ${hasCarousel ? '✅ YES' : '❌ NO'}`);
        
        // Check navigation
        const hasNavigation = await page.locator('button:has(svg)').count() >= 2;
        console.log(`🔄 Navigation buttons: ${hasNavigation ? '✅ YES' : '❌ NO'}`);
        
        // Check for doctor content
        const hasDoctorContent = await page.locator('text=Dr').isVisible();
        console.log(`👨‍⚕️ Doctor content: ${hasDoctorContent ? '✅ YES' : '❌ NO'}`);
        
        console.log('\n🎉 Mobile testing completed!');
        console.log(`📁 Screenshots saved in: ${screenshotsDir}`);
        
    } catch (error) {
        console.error(`❌ Test failed: ${error.message}`);
    } finally {
        await browser.close();
    }
}

finalMobileTest().catch(console.error);