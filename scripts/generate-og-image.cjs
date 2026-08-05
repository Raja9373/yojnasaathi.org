const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generateOGImage() {
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background Gradient - Deep Premium Navy to Slate
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#0F172A');
  bgGrad.addColorStop(0.5, '#1E293B');
  bgGrad.addColorStop(1, '#0F172A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle Indian Saffron & Green Accent Glow Orbs
  const orangeGlow = ctx.createRadialGradient(100, 100, 10, 100, 100, 350);
  orangeGlow.addColorStop(0, 'rgba(249, 115, 22, 0.22)');
  orangeGlow.addColorStop(1, 'rgba(249, 115, 22, 0)');
  ctx.fillStyle = orangeGlow;
  ctx.fillRect(0, 0, width, height);

  const greenGlow = ctx.createRadialGradient(1100, 530, 10, 1100, 530, 350);
  greenGlow.addColorStop(0, 'rgba(34, 197, 94, 0.18)');
  greenGlow.addColorStop(1, 'rgba(34, 197, 94, 0)');
  ctx.fillStyle = greenGlow;
  ctx.fillRect(0, 0, width, height);

  // Top Tricolor Border Stripe
  ctx.fillStyle = '#FF9933';
  ctx.fillRect(0, 0, width, 6);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 6, width, 6);
  ctx.fillStyle = '#138808';
  ctx.fillRect(0, 12, width, 6);

  // Central Card Frame
  ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  const cardX = 60;
  const cardY = 60;
  const cardW = width - 120;
  const cardH = height - 120;
  const radius = 24;

  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, radius);
  ctx.fill();
  ctx.stroke();

  // Top Left Badge
  ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
  ctx.strokeStyle = '#F97316';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(100, 95, 300, 40, 20);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFEDD5';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('🇮🇳 GOVERNMENT SCHEMES 2026', 120, 120);

  // Main Brand Name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 64px sans-serif';
  ctx.fillText('YojnaSaathi', 100, 200);

  const titleWidth = ctx.measureText('YojnaSaathi').width;
  ctx.fillStyle = '#F97316';
  ctx.fillText('.org', 100 + titleWidth + 4, 200);

  // Taglines
  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('हर योजना, हर नागरिक तक', 100, 260);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 22px sans-serif';
  ctx.fillText('Central & State Government Schemes Portal • 100% Free Information', 100, 300);

  // Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(100, 335);
  ctx.lineTo(1100, 335);
  ctx.stroke();

  // Feature Badges
  const pills = [
    { text: '✓ 4,700+ Verified Schemes', bg: '#1E3A8A', color: '#93C5FD' },
    { text: '✓ Smart Eligibility Checker', bg: '#065F46', color: '#A7F3D0' },
    { text: '✓ Official Direct Links', bg: '#831843', color: '#FBCFE8' }
  ];

  let pillX = 100;
  const pillY = 365;
  pills.forEach((p) => {
    ctx.font = 'bold 18px sans-serif';
    const textW = ctx.measureText(p.text).width;
    const pW = textW + 36;
    const pH = 46;

    ctx.fillStyle = p.bg;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pW, pH, 12);
    ctx.fill();

    ctx.fillStyle = p.color;
    ctx.fillText(p.text, pillX + 18, pillY + 29);

    pillX += pW + 20;
  });

  // Footer Tagline
  ctx.fillStyle = '#64748B';
  ctx.font = '16px sans-serif';
  ctx.fillText('PM Kisan • PM Awas • Delhi Lakshmi Yojana • Ladli Behna • Ayushman Bharat • State Subsidies', 100, 460);

  // Bottom Web URL bar
  ctx.fillStyle = '#2563EB';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY + cardH - 52, cardW, 52, [0, 0, 24, 24]);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('https://www.yojnasaathi.org', 100, cardY + cardH - 18);

  ctx.fillStyle = '#DBEAFE';
  ctx.font = '500 16px sans-serif';
  ctx.fillText('Official Govt Schemes Information & Eligibility Portal', 680, cardY + cardH - 18);

  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pngBuffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), pngBuffer);

  const jpgBuffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
  fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), jpgBuffer);

  console.log('Successfully generated public/og-image.png and public/og-image.jpg (1200x630)');
}

generateOGImage();
