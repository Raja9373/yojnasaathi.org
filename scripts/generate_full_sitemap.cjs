const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.yojnasaathi.org';
const LASTMOD = '2026-08-08';

const urlSet = new Set();
const urlsList = [];

function addUrl(loc, changefreq = 'weekly', priority = '0.8') {
  // Clean relative path
  let cleanPath = loc.startsWith('/') ? loc : '/' + loc;
  // Remove trailing slash if not root
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  // Do NOT include /sitemap or /sitemap.xml
  if (cleanPath === '/sitemap' || cleanPath === '/sitemap.xml') {
    return;
  }

  const fullUrl = `${BASE_URL}${cleanPath}`;

  if (!urlSet.has(fullUrl)) {
    urlSet.add(fullUrl);
    urlsList.push({
      loc: fullUrl,
      lastmod: LASTMOD,
      changefreq,
      priority
    });
  }
}

// 1. Core Pages
const corePages = [
  { path: '/', freq: 'daily', prio: '1.0' },
  { path: '/about', freq: 'monthly', prio: '0.8' },
  { path: '/contact', freq: 'monthly', prio: '0.8' },
  { path: '/blog', freq: 'daily', prio: '0.9' },
  { path: '/faqs', freq: 'daily', prio: '0.9' },
  { path: '/all-faqs', freq: 'weekly', prio: '0.8' },
  { path: '/pm-kisan-faqs', freq: 'daily', prio: '0.9' },
  { path: '/terms', freq: 'monthly', prio: '0.5' },
  { path: '/privacy', freq: 'monthly', prio: '0.5' },
  { path: '/disclaimer', freq: 'monthly', prio: '0.5' },
  { path: '/states', freq: 'weekly', prio: '0.9' },
  { path: '/find-yojana', freq: 'daily', prio: '0.9' },
  { path: '/yojanas', freq: 'daily', prio: '0.9' },
  { path: '/link-checker', freq: 'monthly', prio: '0.6' }
];

corePages.forEach(p => addUrl(p.path, p.freq, p.prio));

// 2. Load Schemes from schemes.json
try {
  const schemesFile = path.join(__dirname, '..', 'src', 'data', 'schemes.json');
  if (fs.existsSync(schemesFile)) {
    const schemes = JSON.parse(fs.readFileSync(schemesFile, 'utf8'));
    schemes.forEach(s => {
      if (s.slug) {
        addUrl(`/yojana/${s.slug}`, 'daily', '0.9');
      }
    });
  }
} catch (e) {
  console.error('Error reading schemes.json:', e);
}

// 3. Load Blogs from blogArticlesPart1..4.ts
for (let b = 1; b <= 4; b++) {
  try {
    const blogFile = path.join(__dirname, '..', 'src', 'data', `blogArticlesPart${b}.ts`);
    if (fs.existsSync(blogFile)) {
      const content = fs.readFileSync(blogFile, 'utf8');
      const matches = content.match(/slug:\s*["']([^"']+)["']/g);
      if (matches) {
        matches.forEach(m => {
          const slug = m.replace(/slug:\s*["']/, '').replace(/["']/, '');
          if (slug) {
            addUrl(`/blog/${slug}`, 'daily', '0.8');
          }
        });
      }
    }
  } catch (e) {
    console.error(`Error reading blog file ${b}:`, e);
  }
}

// 4. Load States from statesAndCategories.ts
try {
  const statesFile = path.join(__dirname, '..', 'src', 'data', 'statesAndCategories.ts');
  if (fs.existsSync(statesFile)) {
    const content = fs.readFileSync(statesFile, 'utf8');
    const matches = content.match(/slug:\s*["']([^"']+)["']/g);
    if (matches) {
      matches.forEach(m => {
        const slug = m.replace(/slug:\s*["']/, '').replace(/["']/, '');
        if (slug) {
          addUrl(`/state/${slug}`, 'weekly', '0.8');
        }
      });
    }
  }
} catch (e) {
  console.error('Error reading states file:', e);
}

// 5. Load 1,000 FAQs from faqs-part-1..10.ts
for (let p = 1; p <= 10; p++) {
  try {
    const partFile = path.join(__dirname, '..', 'src', 'data', 'faqs', `faqs-part-${p}.ts`);
    if (fs.existsSync(partFile)) {
      const content = fs.readFileSync(partFile, 'utf8');
      const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
      const items = JSON.parse(jsonStr);
      items.forEach(faq => {
        if (faq.slug) {
          addUrl(`/faq/${faq.slug}`, 'weekly', '0.8');
        }
      });
    }
  } catch (e) {
    console.error(`Error reading faq part ${p}:`, e);
  }
}

console.log(`Total unique URLs in sitemap: ${urlsList.length}`);

// Generate sitemap XML string
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urlsList.forEach(u => {
  xml += `  <url>\n`;
  xml += `    <loc>${u.loc}</loc>\n`;
  xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
  xml += `    <priority>${u.priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`Successfully written sitemap.xml to ${outputPath} (${xml.length} bytes)`);
