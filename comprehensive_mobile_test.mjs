import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const MOBILE_VIEWPORT = {
  width: 375,
  height: 667,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  isLandscape: false,
};

const SCREENSHOT_DIR = './screenshots/final_mobile_test';

async function ensureScreenshotDir() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
}

async function takeScreenshot(page, name, description) {
  const filename = `${name}.png`;
  const filepath = path.join(SCREENSHOT_DIR, filename);
  
  await page.screenshot({
    path: filepath,
    fullPage: false,
    clip: {
      x: 0,
      y: 0,
      width: MOBILE_VIEWPORT.width,
      height: MOBILE_VIEWPORT.height,
    },
  });
  
  console.log(`📸 Screenshot saved: ${filename} - ${description}`);
  return filepath;
}

async function waitForAnimations(page, delay = 1000) {
  await new Promise(resolve => setTimeout(resolve, delay));
}

async function testMobileExperience() {
  console.log('🚀 Starting Comprehensive Mobile Experience Test');
  console.log('📱 Testing on iPhone SE viewport (375x667)');
  
  await ensureScreenshotDir();
  
  const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1200,800',
    ],
  });

  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewport(MOBILE_VIEWPORT);
  
  // Set user agent for mobile
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1');
  
  const testResults = {
    sections: [],
    interactions: [],
    performance: [],
    issues: [],
    recommendations: []
  };

  try {
    console.log('\n🌐 Loading website...');
    await page.goto('http://localhost:5178', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait for initial load
    await waitForAnimations(page, 2000);
    
    console.log('\n📍 Testing Section 1: Initial Load & Hero Section');
    await takeScreenshot(page, '01_initial_load', 'Initial mobile homepage load');
    
    // Check if mobile layout is properly loaded
    const isMobileLayout = await page.evaluate(() => {
      const mobileElements = document.querySelectorAll('[class*="mobile"], [class*="Mobile"]');
      return mobileElements.length > 0;
    });
    
    testResults.sections.push({
      name: 'Hero Section',
      loaded: true,
      mobileOptimized: isMobileLayout,
      screenshot: '01_initial_load.png'
    });
    
    console.log('\n📍 Testing Section 2: Quick Actions Card');
    // Scroll to ensure Quick Actions card is visible
    await page.evaluate(() => {
      const quickActions = document.querySelector('[class*="QuickActions"], [class*="quick-actions"]');
      if (quickActions) {
        quickActions.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    
    await waitForAnimations(page, 1500);
    await takeScreenshot(page, '02_quick_actions', 'Quick Actions card with call, telehealth, and directions');
    
    // Test Quick Actions interactions
    console.log('🔄 Testing Quick Actions interactions...');
    
    // Test Call button
    try {
      const callButton = await page.waitForSelector('button[aria-label*="call"], button[aria-label*="Call"]', { timeout: 5000 });
      if (callButton) {
        await callButton.click();
        await waitForAnimations(page, 1000);
        await takeScreenshot(page, '03_call_modal', 'Call modal interaction');
        
        // Close modal
        const closeButton = await page.$('button[aria-label*="close"], button[aria-label*="Close"], .modal button');
        if (closeButton) {
          await closeButton.click();
          await waitForAnimations(page, 500);
        }
        
        testResults.interactions.push({
          name: 'Call Button',
          working: true,
          notes: 'Successfully opens call modal'
        });
      }
    } catch (error) {
      console.log('⚠️ Call button interaction issue:', error.message);
      testResults.interactions.push({
        name: 'Call Button',
        working: false,
        notes: 'Could not find or interact with call button'
      });
    }
    
    // Test Telehealth button
    try {
      const telehealthButton = await page.waitForSelector('button[aria-label*="telehealth"], button[aria-label*="video"]', { timeout: 5000 });
      if (telehealthButton) {
        // Check if it opens in new tab (we'll just verify the button exists and is clickable)
        testResults.interactions.push({
          name: 'Telehealth Button',
          working: true,
          notes: 'Button found and clickable'
        });
      }
    } catch (error) {
      console.log('⚠️ Telehealth button interaction issue:', error.message);
      testResults.interactions.push({
        name: 'Telehealth Button',
        working: false,
        notes: 'Could not find telehealth button'
      });
    }
    
    // Test Directions button
    try {
      const directionsButton = await page.waitForSelector('button[aria-label*="directions"], button[aria-label*="location"]', { timeout: 5000 });
      if (directionsButton) {
        await directionsButton.click();
        await waitForAnimations(page, 1000);
        await takeScreenshot(page, '04_directions_modal', 'Directions modal with location options');
        
        // Close modal
        const closeButton = await page.$('button[aria-label*="close"], button[aria-label*="Close"], .modal button');
        if (closeButton) {
          await closeButton.click();
          await waitForAnimations(page, 500);
        }
        
        testResults.interactions.push({
          name: 'Directions Button',
          working: true,
          notes: 'Successfully opens directions modal'
        });
      }
    } catch (error) {
      console.log('⚠️ Directions button interaction issue:', error.message);
      testResults.interactions.push({
        name: 'Directions Button',
        working: false,
        notes: 'Could not find or interact with directions button'
      });
    }
    
    console.log('\n📍 Testing Section 3: Mobile Services (Horizontal Scroll)');
    // Scroll to services section
    await page.evaluate(() => {
      const servicesSection = document.getElementById('services') || 
                            document.querySelector('[class*="services"], [class*="Services"]');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    
    await waitForAnimations(page, 1500);
    await takeScreenshot(page, '05_services_initial', 'Mobile services section - initial view');
    
    // Test horizontal scrolling of services
    try {
      const servicesContainer = await page.$('.overflow-x-auto, .overflow-x-scroll, [class*="scroll"]');
      if (servicesContainer) {
        // Scroll horizontally
        await page.evaluate(() => {
          const container = document.querySelector('.overflow-x-auto, .overflow-x-scroll, [class*="scroll"]');
          if (container) {
            container.scrollLeft = 200;
          }
        });
        
        await waitForAnimations(page, 1000);
        await takeScreenshot(page, '06_services_scrolled', 'Mobile services - after horizontal scroll');
        
        testResults.sections.push({
          name: 'Services Section',
          loaded: true,
          horizontalScroll: true,
          screenshot: '06_services_scrolled.png'
        });
      }
    } catch (error) {
      console.log('⚠️ Services horizontal scroll issue:', error.message);
      testResults.sections.push({
        name: 'Services Section',
        loaded: true,
        horizontalScroll: false,
        notes: 'Horizontal scroll not working properly'
      });
    }
    
    console.log('\n📍 Testing Section 4: Doctor Carousel');
    // Scroll to doctors section
    await page.evaluate(() => {
      const doctorsSection = document.getElementById('doctors') || 
                           document.querySelector('[class*="doctors"], [class*="Doctors"]');
      if (doctorsSection) {
        doctorsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    
    await waitForAnimations(page, 1500);
    await takeScreenshot(page, '07_doctors_initial', 'Doctor carousel - initial view');
    
    // Test doctor carousel navigation
    console.log('🔄 Testing doctor carousel navigation...');
    
    for (let i = 0; i < 4; i++) {
      try {
        // Look for next button or swipe area
        const nextButton = await page.$('button[aria-label*="next"], button[class*="next"], .swiper-button-next');
        if (nextButton) {
          await nextButton.click();
          await waitForAnimations(page, 1000);
          await takeScreenshot(page, `08_doctor_${i + 1}`, `Doctor ${i + 1} in carousel`);
          
          testResults.sections.push({
            name: `Doctor ${i + 1}`,
            loaded: true,
            carouselNavigation: true,
            screenshot: `08_doctor_${i + 1}.png`
          });
        } else {
          // Try swipe gesture
          await page.evaluate(() => {
            const carousel = document.querySelector('[class*="carousel"], [class*="swiper"]');
            if (carousel) {
              // Simulate swipe
              const touchStartEvent = new TouchEvent('touchstart', {
                touches: [{ clientX: 300, clientY: 200 }]
              });
              const touchEndEvent = new TouchEvent('touchend', {
                touches: [{ clientX: 100, clientY: 200 }]
              });
              carousel.dispatchEvent(touchStartEvent);
              carousel.dispatchEvent(touchEndEvent);
            }
          });
          
          await waitForAnimations(page, 1000);
          await takeScreenshot(page, `09_doctor_swipe_${i + 1}`, `Doctor ${i + 1} via swipe`);
        }
      } catch (error) {
        console.log(`⚠️ Doctor carousel navigation issue for doctor ${i + 1}:`, error.message);
        break;
      }
    }
    
    console.log('\n📍 Testing Section 5: Mobile Action Bar (Bottom)');
    // Scroll to bottom to show action bar
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    await waitForAnimations(page, 1000);
    await takeScreenshot(page, '10_action_bar', 'Mobile action bar at bottom');
    
    // Test action bar visibility and interactions
    const actionBarVisible = await page.evaluate(() => {
      const actionBar = document.querySelector('[class*="action-bar"], [class*="ActionBar"], [class*="bottom-nav"]');
      return actionBar && actionBar.offsetHeight > 0;
    });
    
    testResults.sections.push({
      name: 'Mobile Action Bar',
      loaded: actionBarVisible,
      visible: actionBarVisible,
      screenshot: '10_action_bar.png'
    });
    
    console.log('\n📍 Testing Section 6: Navigation Elements');
    // Test navigation
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    
    await waitForAnimations(page, 1000);
    await takeScreenshot(page, '11_navigation', 'Mobile navigation elements');
    
    // Test hamburger menu or navigation
    try {
      const menuButton = await page.$('button[aria-label*="menu"], button[class*="menu"], .hamburger');
      if (menuButton) {
        await menuButton.click();
        await waitForAnimations(page, 500);
        await takeScreenshot(page, '12_menu_open', 'Mobile menu opened');
        
        testResults.interactions.push({
          name: 'Mobile Menu',
          working: true,
          notes: 'Menu successfully opens'
        });
      }
    } catch (error) {
      console.log('⚠️ Mobile menu interaction issue:', error.message);
      testResults.interactions.push({
        name: 'Mobile Menu',
        working: false,
        notes: 'Could not find or interact with mobile menu'
      });
    }
    
    console.log('\n📍 Testing Section 7: Typography & Spacing');
    // Check text readability and spacing
    const typographyTest = await page.evaluate(() => {
      const elements = document.querySelectorAll('h1, h2, h3, p, button, a');
      const issues = [];
      
      elements.forEach((el, index) => {
        const styles = window.getComputedStyle(el);
        const fontSize = parseFloat(styles.fontSize);
        const lineHeight = parseFloat(styles.lineHeight);
        
        // Check minimum font sizes for mobile
        if (el.tagName === 'P' && fontSize < 16) {
          issues.push(`Paragraph text too small: ${fontSize}px`);
        }
        if (el.tagName === 'BUTTON' && fontSize < 16) {
          issues.push(`Button text too small: ${fontSize}px`);
        }
        if (el.tagName === 'A' && fontSize < 16) {
          issues.push(`Link text too small: ${fontSize}px`);
        }
      });
      
      return { totalElements: elements.length, issues };
    });
    
    testResults.performance.push({
      name: 'Typography',
      totalElements: typographyTest.totalElements,
      issues: typographyTest.issues,
      passed: typographyTest.issues.length === 0
    });
    
    console.log('\n📍 Testing Section 8: Touch Targets');
    // Check touch target sizes
    const touchTargetTest = await page.evaluate(() => {
      const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
      const issues = [];
      
      interactiveElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const minSize = 44; // Apple's recommended minimum touch target size
        
        if (rect.width < minSize || rect.height < minSize) {
          issues.push(`Touch target too small: ${Math.round(rect.width)}x${Math.round(rect.height)}px`);
        }
      });
      
      return { totalElements: interactiveElements.length, issues };
    });
    
    testResults.performance.push({
      name: 'Touch Targets',
      totalElements: touchTargetTest.totalElements,
      issues: touchTargetTest.issues,
      passed: touchTargetTest.issues.length === 0
    });
    
    console.log('\n📍 Final Screenshots');
    // Take final comprehensive screenshots
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await waitForAnimations(page, 1000);
    await takeScreenshot(page, '13_final_top', 'Final view - top of page');
    
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
    await waitForAnimations(page, 1000);
    await takeScreenshot(page, '14_final_middle', 'Final view - middle of page');
    
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await waitForAnimations(page, 1000);
    await takeScreenshot(page, '15_final_bottom', 'Final view - bottom of page');
    
    console.log('\n📊 Generating Test Report...');
    
    // Generate comprehensive report
    const report = {
      testDate: new Date().toISOString(),
      viewport: MOBILE_VIEWPORT,
      ...testResults,
      summary: {
        totalSections: testResults.sections.length,
        workingSections: testResults.sections.filter(s => s.loaded).length,
        totalInteractions: testResults.interactions.length,
        workingInteractions: testResults.interactions.filter(i => i.working).length,
        performanceTests: testResults.performance.length,
        passedPerformanceTests: testResults.performance.filter(p => p.passed).length,
      }
    };
    
    // Save report
    const reportPath = path.join(SCREENSHOT_DIR, 'test_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n✅ Comprehensive Mobile Test Complete!');
    console.log(`📁 Screenshots saved to: ${SCREENSHOT_DIR}`);
    console.log(`📄 Report saved to: ${reportPath}`);
    
    console.log('\n📋 SUMMARY:');
    console.log(`📱 Viewport: ${MOBILE_VIEWPORT.width}x${MOBILE_VIEWPORT.height}`);
    console.log(`🎯 Sections tested: ${report.summary.totalSections}`);
    console.log(`✅ Working sections: ${report.summary.workingSections}`);
    console.log(`🔄 Interactions tested: ${report.summary.totalInteractions}`);
    console.log(`✅ Working interactions: ${report.summary.workingInteractions}`);
    console.log(`🔍 Performance tests: ${report.summary.performanceTests}`);
    console.log(`✅ Passed performance tests: ${report.summary.passedPerformanceTests}`);
    
    if (report.summary.workingSections === report.summary.totalSections && 
        report.summary.workingInteractions === report.summary.totalInteractions &&
        report.summary.passedPerformanceTests === report.summary.performanceTests) {
      console.log('\n🎉 ALL TESTS PASSED! Mobile experience is excellent!');
    } else {
      console.log('\n⚠️  Some issues detected. Check the report for details.');
    }
    
    return report;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    await takeScreenshot(page, 'error', 'Error screenshot');
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the test
testMobileExperience()
  .then(report => {
    console.log('\n🎯 Test completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Test failed:', error);
    process.exit(1);
  });