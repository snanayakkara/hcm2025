const { chromium } = require('playwright');

async function debugMobileCarousel() {
    console.log('🔍 Debugging Mobile Doctor Carousel');
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
    
    // Listen for console logs and errors
    page.on('console', msg => {
        console.log(`🖥️  CONSOLE: ${msg.type()}: ${msg.text()}`);
    });
    
    page.on('pageerror', error => {
        console.log(`❌ PAGE ERROR: ${error.message}`);
    });
    
    try {
        console.log('📱 Loading page...');
        await page.goto('http://localhost:5177', { waitUntil: 'networkidle' });
        
        console.log('🏥 Scrolling to doctors section...');
        await page.locator('#doctors').scrollIntoViewIfNeeded();
        await page.waitForTimeout(3000);
        
        // Check if we're on mobile layout
        const isMobile = await page.evaluate(() => window.innerWidth < 768);
        console.log(`📱 Mobile layout: ${isMobile ? 'YES' : 'NO'}`);
        
        // Look for carousel elements
        console.log('🎠 Checking for carousel elements...');
        
        // Check for carousel container
        const carouselContainer = await page.locator('[class*="carousel"], .relative.h-\\[420px\\]').first();
        const hasCarousel = await carouselContainer.isVisible();
        console.log(`📦 Carousel container visible: ${hasCarousel ? 'YES' : 'NO'}`);
        
        // Check for navigation buttons
        const chevronLeft = await page.locator('svg').filter({ hasText: '' }).first();
        const chevronRight = await page.locator('svg').filter({ hasText: '' }).last();
        
        console.log(`◀️  Left nav visible: ${await chevronLeft.isVisible() ? 'YES' : 'NO'}`);
        console.log(`▶️  Right nav visible: ${await chevronRight.isVisible() ? 'YES' : 'NO'}`);
        
        // Check for doctor card content
        console.log('👨‍⚕️ Checking doctor card content...');
        
        // Look for doctor images
        const doctorImages = await page.locator('img').all();
        console.log(`🖼️  Total images found: ${doctorImages.length}`);
        
        for (let i = 0; i < doctorImages.length; i++) {
            const img = doctorImages[i];
            const src = await img.getAttribute('src');
            const isVisible = await img.isVisible();
            
            if (src && (src.includes('freilich') || src.includes('ngu') || src.includes('vosko') || src.includes('nanayakkara') || src.includes('shane'))) {
                console.log(`📸 Doctor image ${i + 1}: ${src} - Visible: ${isVisible ? 'YES' : 'NO'}`);
                
                if (isVisible) {
                    const naturalWidth = await img.evaluate(img => img.naturalWidth);
                    const naturalHeight = await img.evaluate(img => img.naturalHeight);
                    console.log(`   📏 Dimensions: ${naturalWidth}x${naturalHeight}`);
                    
                    if (naturalWidth === 0 || naturalHeight === 0) {
                        console.log(`   ❌ Image failed to load: ${src}`);
                    } else {
                        console.log(`   ✅ Image loaded successfully`);
                    }
                }
            }
        }
        
        // Check for text content
        const textContent = await page.locator('h3, h2, .text-2xl').allTextContents();
        console.log(`📝 Text content found: ${textContent.length} elements`);
        textContent.forEach((text, i) => {
            if (text.includes('Dr') || text.includes('Prof')) {
                console.log(`   📋 Doctor text ${i + 1}: "${text}"`);
            }
        });
        
        // Check for gradient backgrounds
        const gradients = await page.locator('[class*="gradient"]').all();
        console.log(`🌈 Gradient elements: ${gradients.length}`);
        
        // Take detailed screenshot
        await page.screenshot({
            path: './screenshots/mobile_debug.png',
            fullPage: false
        });
        
        console.log('\n🎯 DIAGNOSIS:');
        
        if (!hasCarousel) {
            console.log('❌ ISSUE: Carousel container not found');
        } else {
            console.log('✅ Carousel container exists');
        }
        
        if (doctorImages.length === 0) {
            console.log('❌ ISSUE: No doctor images found');
        } else {
            console.log(`✅ Found ${doctorImages.length} images`);
        }
        
        if (textContent.length === 0) {
            console.log('❌ ISSUE: No text content found');
        } else {
            console.log(`✅ Found ${textContent.length} text elements`);
        }
        
        console.log('\n📱 Mobile carousel debugging complete!');
        
    } catch (error) {
        console.error(`❌ Debug failed: ${error.message}`);
    } finally {
        await browser.close();
    }
}

debugMobileCarousel().catch(console.error);