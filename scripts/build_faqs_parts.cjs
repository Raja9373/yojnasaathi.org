const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'src', 'data', 'faqs');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'allSchemesFaqs.json'), 'utf8'));

function createSlug(item, index) {
  let text = item.slug || item.q_en || item.q || '';
  let s = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  // strip repeated dashes
  s = s.replace(/-+/g, '-');
  if (s.length > 70) {
    s = s.substring(0, 70).replace(/-[^-]*$/, '');
  }
  if (!s) s = `faq-scheme-question-${item.id || index + 1}`;
  return `${s}-faq-${item.id || index + 1}`;
}

function extractKeywords(item) {
  const cat = item.cat || item.category || 'Government Scheme';
  const qText = (item.q || '') + ' ' + (item.q_en || '');
  const terms = new Set(['Sarkari Yojana', '2026', cat, 'Govt Scheme']);
  
  if (/kisan|farmer|17th|18th|kist/i.test(qText)) terms.add('PM Kisan');
  if (/ekyc|kyc/i.test(qText)) terms.add('eKYC');
  if (/ladli|behna|majhi/i.test(qText)) terms.add('Ladli Behna');
  if (/ayushman|card|5 lakh/i.test(qText)) terms.add('Ayushman Bharat');
  if (/solar|surya|rooftop|300/i.test(qText)) terms.add('PM Surya Ghar Solar');
  if (/ujjwala|gas|cylinder/i.test(qText)) terms.add('Ujjwala Yojana');
  if (/mudra|loan|shishu/i.test(qText)) terms.add('Mudra Loan');
  if (/shram|labour/i.test(qText)) terms.add('e-Shram');
  if (/awas|housing|gramin/i.test(qText)) terms.add('PM Awas Yojana');
  if (/mgnrega|nrega|job card/i.test(qText)) terms.add('MGNREGA');
  if (/ration|khadya/i.test(qText)) terms.add('Ration Card');
  
  return Array.from(terms);
}

const processedData = rawData.map((item, idx) => {
  const id = item.id || idx + 1;
  const category = item.cat || item.category || 'PM Kisan';
  const slug = createSlug(item, idx);
  const question = item.q;
  const answer = item.a;
  const q_en = item.q_en || item.q;
  const a_en = item.a_en || item.a;
  const keywords = extractKeywords(item);
  const lastmod = "2026-08-05";

  return {
    id,
    slug,
    question,
    answer,
    q: question,
    a: answer,
    q_en,
    a_en,
    category,
    cat: category,
    keywords,
    lastmod
  };
});

console.log(`Processed ${processedData.length} FAQs.`);

const PART_SIZE = 100;
for (let part = 1; part <= 10; part++) {
  const startIndex = (part - 1) * PART_SIZE;
  const partData = processedData.slice(startIndex, startIndex + PART_SIZE);
  const fileName = `faqs-part-${part}.ts`;
  const filePath = path.join(targetDir, fileName);

  const fileContent = `export const faqsPart${part} = ${JSON.stringify(partData, null, 2)};\n`;
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Saved ${fileName} with ${partData.length} items.`);
}

// Create index.ts
const indexImports = [];
for (let p = 1; p <= 10; p++) {
  indexImports.push(`import { faqsPart${p} } from './faqs-part-${p}';`);
}

const indexContent = `// Auto-generated merge of 1,000 FAQs across 10 structured data files
${indexImports.join('\n')}

export interface FAQItem {
  id: number;
  slug: string;
  question: string;
  answer: string;
  q: string;
  a: string;
  q_en: string;
  a_en: string;
  category: string;
  cat: string;
  keywords: string[];
  lastmod: string;
}

export const ALL_FAQS: FAQItem[] = [
  ...faqsPart1,
  ...faqsPart2,
  ...faqsPart3,
  ...faqsPart4,
  ...faqsPart5,
  ...faqsPart6,
  ...faqsPart7,
  ...faqsPart8,
  ...faqsPart9,
  ...faqsPart10,
];

export const allFaqsData = ALL_FAQS;

export default ALL_FAQS;
`;

fs.writeFileSync(path.join(targetDir, 'index.ts'), indexContent, 'utf8');
console.log('Saved src/data/faqs/index.ts successfully.');
