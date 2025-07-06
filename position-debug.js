import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set large desktop viewport to replicate the issue
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');
  
  // Click referral button
  await page.click('header button:has-text("Referral")');
  await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
  await page.waitForTimeout(1000);
  
  // Take screenshot
  await page.screenshot({ path: 'borders-debug.png', fullPage: true });
  
  // Debug positioning
  const modal = await page.locator('.fixed.inset-0 .bg-white.rounded-2xl').first();
  const modalBox = await modal.boundingBox();
  console.log('Modal position:', modalBox);
  
  const form = await page.locator('.fixed.inset-0 form').first();
  const formBox = await form.boundingBox();
  console.log('Form position:', formBox);
  
  // Check where the first button actually is
  const firstButton = await page.locator('button:has-text("Cardiology Consult")').first();
  const firstButtonBox = await firstButton.boundingBox();
  console.log('First button (Cardiology Consult) position:', firstButtonBox);
  
  // Check submit button position
  const submitButton = await page.locator('button:has-text("Send Referral")');
  const submitBox = await submitButton.boundingBox();
  console.log('Submit button position:', submitBox);
  
  // Check if first button is actually visible in the modal bounds
  if (firstButtonBox && modalBox) {
    const isButtonInModal = firstButtonBox.x >= modalBox.x && 
                          (firstButtonBox.x + firstButtonBox.width) <= (modalBox.x + modalBox.width);
    console.log('Is first button within modal bounds?', isButtonInModal);
    console.log('Button starts at:', firstButtonBox.x, 'Modal starts at:', modalBox.x);
    console.log('Button ends at:', firstButtonBox.x + firstButtonBox.width, 'Modal ends at:', modalBox.x + modalBox.width);
  }
  
  await browser.close();
})();