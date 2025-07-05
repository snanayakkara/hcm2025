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

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    issues: [],
    passed: 0,
    failed: 0
  };

  try {
    console.log('\n🌐 Loading website...');
    await page.goto('http://localhost:5178', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait for initial load
    await sleep(3000);
    
    console.log('\n📍 Test 1: Initial Load & Hero Section');
    await takeScreenshot(page, '01_initial_load', 'Initial mobile homepage load');
    
    // Check mobile layout
    const mobileElements = await page.evaluate(() => {
      const body = document.body;
      const width = window.innerWidth;
      const mobileSpecific = document.querySelectorAll('[class*="mobile"], [class*="Mobile"]');
      return {
        screenWidth: width,
        isMobile: width <= 768,
        mobileElementsCount: mobileSpecific.length,
        bodyClasses: body.className
      };
    });
    
    console.log(`📊 Screen width: ${mobileElements.screenWidth}px`);
    console.log(`📱 Mobile elements found: ${mobileElements.mobileElementsCount}`);
    
    testResults.sections.push({
      name: 'Mobile Layout Detection',
      passed: mobileElements.isMobile && mobileElements.mobileElementsCount > 0,
      details: mobileElements
    });
    
    console.log('\n📍 Test 2: Quick Actions Card');
    await sleep(1000);
    await takeScreenshot(page, '02_quick_actions', 'Quick Actions card');
    
    // Test for Quick Actions elements
    const quickActionsTest = await page.evaluate(() => {
      const callButtons = document.querySelectorAll('button');
      const foundActions = [];
      
      callButtons.forEach(button => {
        const text = button.textContent?.toLowerCase() || '';
        if (text.includes('call')) foundActions.push('Call');
        if (text.includes('telehealth') || text.includes('video')) foundActions.push('Telehealth');
        if (text.includes('directions') || text.includes('location')) foundActions.push('Directions');
      });
      
      return {
        buttonsFound: callButtons.length,
        actionsFound: foundActions,
        hasQuickActions: foundActions.length >= 3
      };
    });
    
    console.log(`🎯 Quick Actions found: ${quickActionsTest.actionsFound.join(', ')}`);
    testResults.sections.push({
      name: 'Quick Actions Card',
      passed: quickActionsTest.hasQuickActions,
      details: quickActionsTest
    });
    
    console.log('\n📍 Test 3: Services Section (Horizontal Scroll)');
    // Scroll to services
    await page.evaluate(() => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    
    await sleep(2000);
    await takeScreenshot(page, '03_services_initial', 'Services section initial');
    
    // Test horizontal scrolling
    const servicesScrollTest = await page.evaluate(() => {
      const scrollableElements = document.querySelectorAll('.overflow-x-auto, .overflow-x-scroll, [class*="scroll"]');
      let hasHorizontalScroll = false;
      
      scrollableElements.forEach(el => {
        if (el.scrollWidth > el.clientWidth) {
          hasHorizontalScroll = true;
          // Try to scroll
          el.scrollLeft = 100;
        }
      });
      
      return {
        scrollableElements: scrollableElements.length,
        hasHorizontalScroll
      };
    });
    
    await sleep(1000);
    await takeScreenshot(page, '04_services_scrolled', 'Services after scroll attempt');
    
    testResults.sections.push({
      name: 'Services Horizontal Scroll',
      passed: servicesScrollTest.hasHorizontalScroll,
      details: servicesScrollTest
    });
    
    console.log('\n📍 Test 4: Doctor Carousel');
    await page.evaluate(() => {
      const doctorsSection = document.getElementById('doctors');
      if (doctorsSection) {
        doctorsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    
    await sleep(2000);
    await takeScreenshot(page, '05_doctors_initial', 'Doctor carousel initial');
    
    // Test doctor carousel navigation
    const doctorCarouselTest = await page.evaluate(() => {
      const carouselElements = document.querySelectorAll('[class*="carousel"], [class*="swiper"], [class*="doctor"]');
      const navigationButtons = document.querySelectorAll('button[class*="next"], button[class*="prev"], .swiper-button');
      
      return {
        carouselElements: carouselElements.length,
        navigationButtons: navigationButtons.length,
        hasCarousel: carouselElements.length > 0
      };
    });
    
    // Try to navigate carousel
    try {
      const nextButtons = await page.$$('button');
      for (const button of nextButtons) {
        const text = await page.evaluate(el => el.textContent, button);
        if (text && (text.includes('next') || text.includes('›') || text.includes('→'))) {
          await button.click();
          await sleep(1000);
          await takeScreenshot(page, '06_doctors_navigated', 'Doctor carousel after navigation');
          break;
        }
      }
    } catch (error) {
      console.log('⚠️ Could not navigate doctor carousel');
    }
    
    testResults.sections.push({
      name: 'Doctor Carousel',
      passed: doctorCarouselTest.hasCarousel,
      details: doctorCarouselTest
    });
    
    console.log('\n📍 Test 5: Mobile Action Bar');
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    await sleep(1000);
    await takeScreenshot(page, '07_bottom_action_bar', 'Bottom action bar');
    
    const actionBarTest = await page.evaluate(() => {
      const actionBars = document.querySelectorAll('[class*="action-bar"], [class*="ActionBar"], [class*="bottom"]');
      let visibleActionBar = null;
      
      actionBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const styles = window.getComputedStyle(bar);
        if (rect.height > 0 && styles.display !== 'none') {
          visibleActionBar = {
            height: rect.height,
            bottom: rect.bottom,
            classes: bar.className
          };
        }
      });
      
      return {
        actionBarsFound: actionBars.length,
        visibleActionBar,
        hasActionBar: visibleActionBar !== null
      };
    });
    
    testResults.sections.push({
      name: 'Mobile Action Bar',
      passed: actionBarTest.hasActionBar,
      details: actionBarTest
    });
    
    console.log('\n📍 Test 6: Typography & Accessibility');
    const typographyTest = await page.evaluate(() => {
      const headings = document.querySelectorAll('h1, h2, h3');
      const paragraphs = document.querySelectorAll('p');
      const buttons = document.querySelectorAll('button');
      
      const issues = [];
      
      // Check heading hierarchy
      headings.forEach(heading => {
        const fontSize = parseFloat(window.getComputedStyle(heading).fontSize);
        if (fontSize < 18) issues.push(`Heading too small: ${heading.tagName} - ${fontSize}px`);
      });
      
      // Check paragraph readability
      paragraphs.forEach(p => {
        const fontSize = parseFloat(window.getComputedStyle(p).fontSize);
        if (fontSize < 16) issues.push(`Paragraph text too small: ${fontSize}px`);
      });
      
      // Check button sizes
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          issues.push(`Button too small for touch: ${Math.round(rect.width)}x${Math.round(rect.height)}px`);
        }
      });
      
      return {
        headings: headings.length,
        paragraphs: paragraphs.length,
        buttons: buttons.length,
        issues,
        passed: issues.length === 0
      };
    });
    
    testResults.sections.push({
      name: 'Typography & Touch Targets',
      passed: typographyTest.passed,
      details: typographyTest
    });
    
    console.log('\n📍 Test 7: Navigation & Scrolling');
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    
    await sleep(1000);
    await takeScreenshot(page, '08_navigation_top', 'Navigation at top');
    
    // Test smooth scrolling through sections
    const sections = ['home', 'about', 'services', 'doctors', 'contact'];
    for (const section of sections) {
      await page.evaluate((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, section);
      
      await sleep(1500);
      await takeScreenshot(page, `09_section_${section}`, `Section: ${section}`);
    }
    
    console.log('\n📍 Final Screenshots');
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await sleep(1000);
    await takeScreenshot(page, '10_final_overview', 'Final mobile overview');
    
    // Calculate results
    const passedTests = testResults.sections.filter(s => s.passed).length;
    const totalTests = testResults.sections.length;
    
    console.log('\n📊 TEST RESULTS SUMMARY');
    console.log('========================');
    console.log(`📱 Viewport: ${MOBILE_VIEWPORT.width}x${MOBILE_VIEWPORT.height} (iPhone SE)`);
    console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
    console.log(`📁 Screenshots saved to: ${SCREENSHOT_DIR}`);
    
    console.log('\n📋 DETAILED RESULTS:');
    testResults.sections.forEach((test, index) => {
      const status = test.passed ? '✅' : '❌';
      console.log(`${status} ${index + 1}. ${test.name}`);
      if (test.details && test.details.issues) {
        test.details.issues.forEach(issue => {
          console.log(`   ⚠️  ${issue}`);
        });
      }
    });
    
    const overallScore = Math.round((passedTests / totalTests) * 100);
    console.log(`\n🎯 Overall Mobile Experience Score: ${overallScore}%`);
    
    if (overallScore >= 90) {
      console.log('🎉 EXCELLENT! Mobile experience is outstanding!');
    } else if (overallScore >= 70) {
      console.log('👍 GOOD! Mobile experience is solid with minor improvements needed.');
    } else {
      console.log('⚠️  NEEDS IMPROVEMENT! Several mobile experience issues detected.');
    }
    
    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      viewport: MOBILE_VIEWPORT,
      score: overallScore,
      passed: passedTests,
      total: totalTests,
      sections: testResults.sections
    };
    
    fs.writeFileSync(path.join(SCREENSHOT_DIR, 'mobile_test_report.json'), JSON.stringify(report, null, 2));
    
    return report;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    await takeScreenshot(page, 'error', 'Test error screenshot');
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the test
testMobileExperience()
  .then(report => {
    console.log('\n🎯 Mobile test completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Test failed:', error);
    process.exit(1);
  });