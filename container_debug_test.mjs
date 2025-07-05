import { chromium } from 'playwright';

async function debugContainers() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check for CSS properties that create containing blocks
    const containingBlocks = await page.evaluate(() => {
      const footerElement = document.querySelector('[style*="background-color: red"]');
      if (!footerElement) return 'Footer not found';
      
      let current = footerElement.parentElement;
      const problematicAncestors = [];
      
      while (current && current !== document.body) {
        const style = getComputedStyle(current);
        const hasTransform = style.transform !== 'none';
        const hasContain = style.contain !== 'none';
        const hasFilter = style.filter !== 'none';
        const hasWillChange = style.willChange !== 'auto';
        const hasPerspective = style.perspective !== 'none';
        const hasClipPath = style.clipPath !== 'none';
        
        if (hasTransform || hasContain || hasFilter || hasWillChange || hasPerspective || hasClipPath) {
          problematicAncestors.push({
            tagName: current.tagName,
            className: current.className,
            id: current.id,
            transform: style.transform,
            contain: style.contain,
            filter: style.filter,
            willChange: style.willChange,
            perspective: style.perspective,
            clipPath: style.clipPath,
            position: style.position
          });
        }
        
        current = current.parentElement;
      }
      
      return {
        footerParents: problematicAncestors,
        footerPosition: footerElement.getBoundingClientRect(),
        bodyHeight: document.body.scrollHeight,
        viewportHeight: window.innerHeight
      };
    });
    
    console.log('🔍 Container debug results:');
    console.log(JSON.stringify(containingBlocks, null, 2));
    
    // Also check if we can fix it by moving the footer outside problematic containers
    await page.evaluate(() => {
      const footer = document.querySelector('[style*="background-color: red"]');
      if (footer) {
        // Move footer directly to body
        document.body.appendChild(footer);
      }
    });
    
    await page.waitForTimeout(1000);
    
    // Check position after moving
    const newPosition = await page.evaluate(() => {
      const footer = document.querySelector('[style*="background-color: red"]');
      return footer ? footer.getBoundingClientRect() : null;
    });
    
    console.log('📍 Footer position after moving to body:', newPosition);
    
    await page.screenshot({ path: 'footer-moved-to-body.png' });
    console.log('📸 Screenshot saved: footer-moved-to-body.png');
    
  } catch (error) {
    console.error('Debug failed:', error);
  } finally {
    await browser.close();
  }
}

debugContainers().catch(console.error);