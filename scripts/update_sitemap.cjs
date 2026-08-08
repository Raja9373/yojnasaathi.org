const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
let existingSitemap = fs.readFileSync(sitemapPath, 'utf8');

// Load all FAQs
const faqsIndexPath = path.join(__dirname, '..', 'src', 'data', 'faqs', 'index.ts');
// Read the generated part files
const faqs = [];
for (let p = 1; p <= 10; p++) {
  const partFile = path.join(__dirname, '..', 'src', 'data', 'faqs', `faqs-part-${p}.ts`);
  const content = fs.readFileSync(partFile, 'utf8');
  // extract array JSON
  const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
  const items = JSON.parse(jsonStr);
  faqs.push(...items);
}

console.log(`Loaded ${faqs.length} FAQs for sitemap.`);

// Remove closing </urlset> tag from existing sitemap
existingSitemap = existingSitemap.replace('</urlset>', '').trim();

// Ensure key core URLs are present
const coreUrls = [
  'https://www.yojnasaathi.org/terms',
  'https://www.yojnasaathi.org/state/kerala',
  'https://www.yojnasaathi.org/yojana/kanya-sumangala-yojana',
  'https://www.yojnasaathi.org/blog/government-business-loan-schemes',
  'https://www.yojnasaathi.org/faqs',
  'https://www.yojnasaathi.org/pm-kisan-faqs'
];

coreUrls.forEach((url) => {
  if (!existingSitemap.includes(`<loc>${url}</loc>`)) {
    existingSitemap += `\n  <url><loc>${url}</loc><lastmod>2026-08-05</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;
  }
});

// Append each FAQ URL if not already present
let addedCount = 0;
faqs.forEach((faq) => {
  const url = `https://www.yojnasaathi.org/faq/${faq.slug}`;
  if (!existingSitemap.includes(`<loc>${url}</loc>`)) {
    existingSitemap += `\n  <url><loc>${url}</loc><lastmod>2026-08-05</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    addedCount++;
  }
});

existingSitemap += '\n</urlset>\n';

fs.writeFileSync(sitemapPath, existingSitemap, 'utf8');
console.log(`Updated sitemap.xml with ${addedCount} new FAQ URLs. Total size: ${existingSitemap.length} bytes.`);
