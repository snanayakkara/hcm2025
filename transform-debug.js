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
  
  // Check all elements in the positioning chain for transforms
  const overlay = await page.locator('.fixed.inset-0').first();
  const overlayTransform = await overlay.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return {
      transform: computed.transform,
      position: computed.position,
      left: computed.left,
      top: computed.top
    };
  });
  console.log('Overlay (.fixed.inset-0) styles:', overlayTransform);
  
  const modalContainer = await page.locator('.fixed.inset-0 .bg-white.rounded-2xl').first();
  const modalTransform = await modalContainer.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      transform: computed.transform,
      position: computed.position,
      left: computed.left,
      top: computed.top,
      actualX: rect.x,
      actualY: rect.y
    };
  });
  console.log('Modal container styles:', modalTransform);
  
  const form = await page.locator('.fixed.inset-0 form').first();
  const formTransform = await form.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      transform: computed.transform,
      position: computed.position,
      left: computed.left,
      top: computed.top,
      actualX: rect.x,
      actualY: rect.y
    };
  });
  console.log('Form styles:', formTransform);
  
  const buttonContainer = await page.locator('.flex.flex-wrap').first();
  const containerTransform = await buttonContainer.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      transform: computed.transform,
      position: computed.position,
      left: computed.left,
      top: computed.top,
      actualX: rect.x,
      actualY: rect.y,
      width: rect.width
    };
  });
  console.log('Button container styles:', containerTransform);
  
  const firstButton = await page.locator('button:has-text("Cardiology Consult")').first();
  const buttonTransform = await firstButton.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      transform: computed.transform,
      position: computed.position,
      left: computed.left,
      top: computed.top,
      actualX: rect.x,
      actualY: rect.y,
      offsetLeft: el.offsetLeft,
      offsetParent: el.offsetParent ? el.offsetParent.tagName : 'null'
    };
  });
  console.log('First button styles:', buttonTransform);
  
  await browser.close();
})();