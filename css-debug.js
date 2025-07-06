import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');
  
  await page.click('header button:has-text("Referral")');
  await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
  await page.waitForTimeout(1000);
  
  // Check computed styles
  const modalContainer = await page.locator('.fixed.inset-0 .bg-white.rounded-2xl').first();
  const modalStyles = await modalContainer.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return {
      position: computed.position,
      left: computed.left,
      right: computed.right,
      width: computed.width,
      maxWidth: computed.maxWidth,
      transform: computed.transform,
      marginLeft: computed.marginLeft,
      marginRight: computed.marginRight
    };
  });
  console.log('Modal container styles:', modalStyles);
  
  const form = await page.locator('.fixed.inset-0 form').first();
  const formStyles = await form.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return {
      position: computed.position,
      left: computed.left,
      width: computed.width,
      maxWidth: computed.maxWidth,
      paddingLeft: computed.paddingLeft,
      paddingRight: computed.paddingRight,
      boxSizing: computed.boxSizing
    };
  });
  console.log('Form styles:', formStyles);
  
  const firstButtonContainer = await page.locator('.flex.flex-wrap').first();
  const containerStyles = await firstButtonContainer.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return {
      position: computed.position,
      left: computed.left,
      width: computed.width,
      maxWidth: computed.maxWidth,
      overflow: computed.overflow,
      overflowX: computed.overflowX
    };
  });
  console.log('Button container styles:', containerStyles);
  
  await browser.close();
})();