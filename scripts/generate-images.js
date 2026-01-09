import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 颜色定义（从 favicon.svg 提取）
const gradientStart = '#14b8a6'; // 青绿色
const gradientEnd = '#4f46e5';   // 靛蓝色
const background = '#020617';     // 深色背景

/**
 * 生成社交分享预览图 (1200x630)
 */
async function generateOgImage() {
  const width = 1200;
  const height = 630;
  const circleRadius = 120;

  // 创建渐变圆形 SVG
  const circleSvg = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${gradientStart}"/>
          <stop offset="100%" style="stop-color:${gradientEnd}"/>
        </linearGradient>
      </defs>
      <circle cx="${width/2}" cy="${height/2 - 50}" r="${circleRadius}" fill="url(#grad)"/>
      <text x="${width/2}" y="${height/2 - 5}"
            font-family="Arial, sans-serif"
            font-size="120"
            font-weight="bold"
            fill="white"
            text-anchor="middle">R</text>
      <text x="${width/2}" y="${height/2 + 140}"
            font-family="Arial, sans-serif"
            font-size="48"
            font-weight="600"
            fill="#f1f5f9"
            text-anchor="middle">River Nexus</text>
      <text x="${width/2}" y="${height/2 + 190}"
            font-family="Arial, sans-serif"
            font-size="28"
            font-weight="400"
            fill="#94a3b8"
            text-anchor="middle">Riverhub 的数字流域</text>
    </svg>
  `;

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background
    }
  })
    .composite([
      {
        input: Buffer.from(circleSvg),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(join(__dirname, '../public/og-image.png'));

  console.log('✅ og-image.png 生成成功 (1200x630)');
}

/**
 * 生成 iOS 图标 (180x180)
 */
async function generateAppleTouchIcon() {
  const size = 180;
  const radius = 75;

  // 创建简洁的圆形图标
  const iconSvg = `
    <svg width="${size}" height="${size}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${gradientStart}"/>
          <stop offset="100%" style="stop-color:${gradientEnd}"/>
        </linearGradient>
      </defs>
      <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="url(#grad)"/>
      <text x="${size/2}" y="${size/2 + 30}"
            font-family="Arial, sans-serif"
            font-size="90"
            font-weight="bold"
            fill="white"
            text-anchor="middle">R</text>
    </svg>
  `;

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 } // 透明背景
    }
  })
    .composite([
      {
        input: Buffer.from(iconSvg),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(join(__dirname, '../public/apple-touch-icon.png'));

  console.log('✅ apple-touch-icon.png 生成成功 (180x180)');
}

// 执行生成
async function main() {
  try {
    console.log('开始生成图片资源...\n');
    await generateOgImage();
    await generateAppleTouchIcon();
    console.log('\n🎉 所有图片资源生成完成！');
  } catch (error) {
    console.error('❌ 生成失败:', error);
    process.exit(1);
  }
}

main();
