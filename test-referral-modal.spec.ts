import { test, expect } from '@playwright/test';

test('test referral modal full width after clicking header button', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:5173');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Take initial screenshot to confirm page loaded
  await page.screenshot({ 
    path: 'step1-homepage.png', 
    fullPage: true 
  });
  
  // Find and click the referral button in the header
  console.log('Looking for referral button in header...');
  await page.click('header button:has-text("Referral")');
  
  // Wait for modal to appear
  await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
  
  // Take screenshot of modal
  await page.screenshot({ 
    path: 'step2-modal-opened.png', 
    fullPage: true 
  });
  
  // Check if referral types section exists
  const referralTypesHeading = await page.locator('text=What is this referral for?');
  const isHeadingVisible = await referralTypesHeading.isVisible();
  console.log('Referral types heading visible:', isHeadingVisible);
  
  // Count referral type buttons
  const referralButtons = await page.locator('button:has-text("Cardiology Consult"), button:has-text("Resting Echo"), button:has-text("Stress Echo"), button:has-text("Holter Monitor"), button:has-text("Device Review")');
  const buttonCount = await referralButtons.count();
  console.log('Number of referral type buttons found:', buttonCount);
  
  // List all buttons found
  for (let i = 0; i < buttonCount; i++) {
    const buttonText = await referralButtons.nth(i).textContent();
    const buttonBox = await referralButtons.nth(i).boundingBox();
    console.log(`Button ${i}: "${buttonText}"`, buttonBox);
  }
  
  // Check modal width
  const modal = await page.locator('.fixed.inset-0 > div');
  const modalBox = await modal.boundingBox();
  console.log('Modal container bounding box:', modalBox);
  
  // Check form scroll vs client width
  const form = await page.locator('form');
  const formScrollWidth = await form.evaluate((el) => el.scrollWidth);
  const formClientWidth = await form.evaluate((el) => el.clientWidth);
  console.log('Form scroll width:', formScrollWidth, 'client width:', formClientWidth);
  
  if (formScrollWidth > formClientWidth) {
    console.log('❌ ISSUE: Form content is wider than container!');
  } else {
    console.log('✅ Form width is contained properly');
  }
  
  // Test should pass if we have all 5 buttons visible
  expect(buttonCount).toBe(5);
});