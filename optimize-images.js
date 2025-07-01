import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import path from 'path';

const imagesToOptimize = [
  'public/images/mayne.png',
  'public/images/georgeson.png',
  'public/images/goodier.png'
];

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');
  
  for (const imagePath of imagesToOptimize) {
    try {
      // Get original file size
      const originalStats = fs.statSync(imagePath);
      const originalSize = originalStats.size;
      
      console.log(`\n📁 Processing: ${imagePath}`);
      console.log(`📊 Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      
      // Create backup
      const backupPath = imagePath.replace('.png', '.backup.png');
      fs.copyFileSync(imagePath, backupPath);
      console.log(`💾 Backup created: ${backupPath}`);
      
      // Optimize the image
      const files = await imagemin([imagePath], {
        destination: path.dirname(imagePath),
        plugins: [
          imageminPngquant({
            quality: [0.6, 0.8], // Good quality range for web
            strip: true // Remove metadata
          })
        ]
      });
      
      if (files.length > 0) {
        const newStats = fs.statSync(imagePath);
        const newSize = newStats.size;
        const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        
        console.log(`✅ Optimized size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`🎯 Size reduction: ${reduction}%`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${imagePath}:`, error.message);
    }
  }
  
  console.log('\n🎉 Image optimization complete!');
}

optimizeImages();
