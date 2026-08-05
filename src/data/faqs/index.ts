// Auto-generated merge of 1,000 FAQs across 10 structured data files
import { faqsPart1 } from './faqs-part-1';
import { faqsPart2 } from './faqs-part-2';
import { faqsPart3 } from './faqs-part-3';
import { faqsPart4 } from './faqs-part-4';
import { faqsPart5 } from './faqs-part-5';
import { faqsPart6 } from './faqs-part-6';
import { faqsPart7 } from './faqs-part-7';
import { faqsPart8 } from './faqs-part-8';
import { faqsPart9 } from './faqs-part-9';
import { faqsPart10 } from './faqs-part-10';

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
