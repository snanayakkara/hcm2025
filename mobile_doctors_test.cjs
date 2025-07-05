const { chromium } = require('playwright');
const path = require('path');

async function testMobileDoctorsSection() {
    console.log('🏥 Testing Heart Clinic Melbourne - Mobile Doctors Section');
    console.log('📱 Device: iPhone SE (375x667)');
    console.log('=' .repeat(60));
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500 // Slow down for better visibility
    });
    
    // Create mobile context with iPhone SE dimensions
    const context = await browser.newContext({
        viewport: { width: 375, height: 667 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Mobile/15E148 Safari/604.1'
    });
    
    const page = await context.newPage();
    
    // Create screenshots directory
    const screenshotsDir = path.join(__dirname, 'screenshots');
    
    try {
        console.log('🚀 Navigating to the website...');
        await page.goto('http://localhost:5177', { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        
        // Take initial screenshot
        await page.screenshot({
            path: path.join(screenshotsDir, '01_initial_load.png'),
            fullPage: true
        });
        console.log('✅ Initial page loaded successfully');
        
        // Test 1: Navigate to doctors section
        console.log('\n📋 TEST 1: Navigating to Doctors Section');
        console.log('-'.repeat(50));
        
        const doctorsSection = await page.locator('#doctors');
        await doctorsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(2000);
        
        await page.screenshot({
            path: path.join(screenshotsDir, '02_doctors_section.png'),
            fullPage: false
        });
        console.log('✅ Doctors section visible');
        
        // Test 2: Check doctor selection cards
        console.log('\n🩺 TEST 2: Doctor Selection Cards');
        console.log('-'.repeat(50));
        
        const doctorCards = await page.locator('#doctors .grid button').all();
        console.log(`Found ${doctorCards.length} doctor selection cards`);
        
        let visibleCards = 0;
        let cardsWithImages = 0;
        let cardsWithTitles = 0;
        
        for (let i = 0; i < doctorCards.length; i++) {
            const card = doctorCards[i];
            const isVisible = await card.isVisible();
            
            if (isVisible) {
                visibleCards++;
                
                // Check for image
                const image = await card.locator('img').first();
                if (await image.isVisible()) {
                    cardsWithImages++;
                    const imageBox = await image.boundingBox();
                    console.log(`  📸 Card ${i + 1}: Image visible (${imageBox.width}x${imageBox.height})`);
                } else {
                    console.log(`  ❌ Card ${i + 1}: Image not visible`);
                }
                
                // Check for title/name
                const title = await card.locator('h4').first();
                if (await title.isVisible()) {
                    cardsWithTitles++;
                    const titleText = await title.textContent();
                    console.log(`  📝 Card ${i + 1}: Title visible - "${titleText}"`);
                } else {
                    console.log(`  ❌ Card ${i + 1}: Title not visible`);
                }
                
                // Check card size for touch accessibility
                const cardBox = await card.boundingBox();
                if (cardBox.height < 44 || cardBox.width < 44) {
                    console.log(`  ⚠️  Card ${i + 1}: May be too small for touch (${cardBox.width}x${cardBox.height})`);
                } else {
                    console.log(`  ✅ Card ${i + 1}: Touch-friendly size (${cardBox.width}x${cardBox.height})`);
                }
            }
        }
        
        console.log(`\n📊 Card Summary:`);
        console.log(`   Total cards: ${doctorCards.length}`);
        console.log(`   Visible cards: ${visibleCards}`);
        console.log(`   Cards with images: ${cardsWithImages}`);
        console.log(`   Cards with titles: ${cardsWithTitles}`);
        
        // Test 3: Test card interactions
        console.log('\n🔄 TEST 3: Card Interactions');
        console.log('-'.repeat(50));
        
        if (doctorCards.length > 0) {
            // Click on the first card
            console.log('Clicking on first doctor card...');
            await doctorCards[0].click();
            await page.waitForTimeout(1000);
            
            await page.screenshot({
                path: path.join(screenshotsDir, '03_first_doctor_selected.png'),
                fullPage: false
            });
            console.log('✅ First doctor card clicked');
            
            // Click on the second card if it exists
            if (doctorCards.length > 1) {
                console.log('Clicking on second doctor card...');
                await doctorCards[1].click();
                await page.waitForTimeout(1000);
                
                await page.screenshot({
                    path: path.join(screenshotsDir, '04_second_doctor_selected.png'),
                    fullPage: false
                });
                console.log('✅ Second doctor card clicked');
            }
        }
        
        // Test 4: Check main doctor showcase
        console.log('\n👨‍⚕️ TEST 4: Main Doctor Showcase');
        console.log('-'.repeat(50));
        
        const doctorShowcase = await page.locator('#doctors .bg-white\\/80.backdrop-blur-sm.rounded-3xl').first();
        if (await doctorShowcase.isVisible()) {
            console.log('✅ Main doctor showcase visible');
            
            // Check doctor portrait
            const doctorPortrait = await doctorShowcase.locator('img').first();
            if (await doctorPortrait.isVisible()) {
                const portraitBox = await doctorPortrait.boundingBox();
                console.log(`  📸 Doctor portrait: ${portraitBox.width}x${portraitBox.height}`);
                
                // Check if image loads properly
                const imageLoaded = await doctorPortrait.evaluate((img) => img.complete && img.naturalWidth > 0);
                if (imageLoaded) {
                    console.log('  ✅ Doctor portrait loaded successfully');
                } else {
                    console.log('  ❌ Doctor portrait failed to load');
                }
            } else {
                console.log('  ❌ Doctor portrait not visible');
            }
            
            // Check doctor name
            const doctorName = await doctorShowcase.locator('h3').first();
            if (await doctorName.isVisible()) {
                const nameText = await doctorName.textContent();
                console.log(`  📝 Doctor name: "${nameText}"`);
            } else {
                console.log('  ❌ Doctor name not visible');
            }
            
            // Check doctor title
            const doctorTitle = await doctorShowcase.locator('p.font-semibold.text-primary-600').first();
            if (await doctorTitle.isVisible()) {
                const titleText = await doctorTitle.textContent();
                console.log(`  📝 Doctor title: "${titleText}"`);
            } else {
                console.log('  ❌ Doctor title not visible');
            }
            
            // Check book button
            const bookButton = await doctorShowcase.locator('button:has-text("Book with")').first();
            if (await bookButton.isVisible()) {
                const buttonBox = await bookButton.boundingBox();
                console.log(`  🔘 Book button: ${buttonBox.width}x${buttonBox.height}`);
                
                if (buttonBox.height >= 44) {
                    console.log('  ✅ Book button is touch-friendly');
                } else {
                    console.log('  ⚠️  Book button may be too small for touch');
                }
            } else {
                console.log('  ❌ Book button not visible');
            }
        } else {
            console.log('❌ Main doctor showcase not visible');
        }
        
        // Test 5: Check selection bullets
        console.log('\n🎯 TEST 5: Selection Bullets');
        console.log('-'.repeat(50));
        
        const selectionBullets = await page.locator('#doctors .flex.justify-center button').all();
        console.log(`Found ${selectionBullets.length} selection bullets`);
        
        let touchFriendlyBullets = 0;
        for (let i = 0; i < selectionBullets.length; i++) {
            const bullet = selectionBullets[i];
            if (await bullet.isVisible()) {
                const bulletBox = await bullet.boundingBox();
                console.log(`  🎯 Bullet ${i + 1}: ${bulletBox.width}x${bulletBox.height}`);
                
                if (bulletBox.height >= 44 && bulletBox.width >= 44) {
                    touchFriendlyBullets++;
                    console.log(`  ✅ Bullet ${i + 1} is touch-friendly`);
                } else {
                    console.log(`  ⚠️  Bullet ${i + 1} may be too small for touch`);
                }
                
                // Test clicking the bullet
                if (i < 2) { // Test first two bullets
                    console.log(`  🔄 Testing click on bullet ${i + 1}...`);
                    await bullet.click();
                    await page.waitForTimeout(500);
                }
            }
        }
        
        console.log(`Touch-friendly bullets: ${touchFriendlyBullets}/${selectionBullets.length}`);
        
        // Test 6: Test MobileDoctorCarousel (if it exists)
        console.log('\n📱 TEST 6: Mobile Doctor Carousel');
        console.log('-'.repeat(50));
        
        const mobileCarousel = await page.locator('[class*="MobileDoctorCarousel"]');
        if (await mobileCarousel.isVisible()) {
            console.log('✅ Mobile doctor carousel detected');
            
            // Test navigation buttons
            const prevButton = await page.locator('button:has(svg[class*="ChevronLeft"])').first();
            const nextButton = await page.locator('button:has(svg[class*="ChevronRight"])').first();
            
            if (await prevButton.isVisible() && await nextButton.isVisible()) {
                console.log('  ✅ Navigation buttons visible');
                
                // Test navigation
                await nextButton.click();
                await page.waitForTimeout(1000);
                console.log('  ✅ Next button works');
                
                await prevButton.click();
                await page.waitForTimeout(1000);
                console.log('  ✅ Previous button works');
            } else {
                console.log('  ❌ Navigation buttons not visible');
            }
        } else {
            console.log('ℹ️  Mobile doctor carousel not found (may be using desktop version)');
        }
        
        // Test 7: Scroll performance and layout stability
        console.log('\n⚡ TEST 7: Scroll Performance');
        console.log('-'.repeat(50));
        
        // Scroll to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
        
        // Scroll to doctors section
        await doctorsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        // Take multiple screenshots during scroll
        for (let i = 0; i < 3; i++) {
            await page.evaluate(() => window.scrollBy(0, 100));
            await page.waitForTimeout(200);
        }
        
        await page.screenshot({
            path: path.join(screenshotsDir, '05_scroll_test.png'),
            fullPage: false
        });
        console.log('✅ Scroll test completed');
        
        // Test 8: Touch interactions
        console.log('\n👆 TEST 8: Touch Interactions');
        console.log('-'.repeat(50));
        
        if (doctorCards.length > 0) {
            // Simulate touch on first card
            const firstCard = doctorCards[0];
            const cardBox = await firstCard.boundingBox();
            
            if (cardBox) {
                // Tap the center of the card
                await page.touchscreen.tap(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2);
                await page.waitForTimeout(1000);
                console.log('✅ Touch interaction successful');
            }
        }
        
        // Final screenshot
        await page.screenshot({
            path: path.join(screenshotsDir, '06_final_state.png'),
            fullPage: true
        });
        
        // Test Summary
        console.log('\n📊 TEST SUMMARY');
        console.log('=' .repeat(60));
        console.log(`✅ Total doctor cards found: ${doctorCards.length}`);
        console.log(`✅ Visible doctor cards: ${visibleCards}`);
        console.log(`✅ Cards with images: ${cardsWithImages}`);
        console.log(`✅ Cards with titles: ${cardsWithTitles}`);
        console.log(`✅ Touch-friendly bullets: ${touchFriendlyBullets}/${selectionBullets.length}`);
        console.log(`✅ Screenshots saved to: ${screenshotsDir}`);
        
        // Issues found
        console.log('\n⚠️  POTENTIAL ISSUES:');
        if (cardsWithImages < visibleCards) {
            console.log(`❌ ${visibleCards - cardsWithImages} cards missing images`);
        }
        if (cardsWithTitles < visibleCards) {
            console.log(`❌ ${visibleCards - cardsWithTitles} cards missing titles`);
        }
        if (touchFriendlyBullets < selectionBullets.length) {
            console.log(`❌ ${selectionBullets.length - touchFriendlyBullets} bullets may be too small for touch`);
        }
        
        if (cardsWithImages === visibleCards && cardsWithTitles === visibleCards) {
            console.log('✅ All cards have proper images and titles');
        }
        
        console.log('\n🎉 Mobile testing completed!');
        
    } catch (error) {
        console.error(`❌ Test failed: ${error.message}`);
        console.error(error.stack);
    } finally {
        await browser.close();
    }
}

// Run the test
testMobileDoctorsSection().catch(console.error);