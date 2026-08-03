import { Scheme } from '../types';
import { MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';

/**
 * Common spelling variations for the official brand YojnaSaathi
 */
export const BRAND_VARIATIONS = [
  'yojnasaathi',
  'yojna saathi',
  'yojana saathi',
  'yojanasaathi',
  'yojan saathi',
  'yojnasathi',
  'yojanasathi',
  'yojna sathi',
  'yojana sathi',
  'yojnasaati',
  'yojna saati',
  'yojna',
  'yojana',
  'yojan',
];

export const OFFICIAL_BRAND_NAME = 'YojnaSaathi';
export const OFFICIAL_DOMAIN = 'https://www.yojnasaathi.org';

/**
 * Common typo & synonym dictionary for popular Indian government scheme terms
 */
export const SYNONYM_DICTIONARY: Record<string, string[]> = {
  // Brand variations
  yojnasaathi: ['yojnasaathi', 'yojna saathi', 'yojana saathi', 'yojanasaathi', 'yojan saathi', 'yojnasathi', 'yojanasathi', 'yojna sathi', 'yojana sathi'],
  
  // Farmer / Kisan
  kisan: ['kisan', 'kisaan', 'kisn', 'farmer', 'krishi', 'khet', 'kheti', 'किसान', 'कृषि', 'खेती'],
  
  // Pension
  pension: ['pension', 'penshan', 'pensin', 'pencion', 'vridha', 'vridhavastha', 'पेंशन', 'वृद्धावस्था'],
  
  // Health / Ayushman
  ayushman: ['ayushman', 'ashuaman', 'ayushmn', 'aayushman', 'health', 'swasthya', 'ilaj', 'आयुष्मान', 'स्वास्थ्य', 'इलाज'],
  
  // Housing / Awas
  awas: ['awas', 'aawas', 'aawaas', 'house', 'housing', 'makan', 'ghar', 'आवास', 'मकान', 'घर'],
  
  // Women / Ladli / Female / DLY
  ladli: ['ladli', 'ladeli', 'laadli', 'behna', 'behan', 'kanya', 'beti', 'mahila', 'women', 'female', 'लाडली', 'बहना', 'महिला', 'बेटी', 'dly', 'dly.delhi.gov.in', 'dly delhi', 'delhi ladli', 'delhi lakshmi yojana', 'delhi lakshmi', 'delhi laxmi', 'lakshmi yojana'],
  dly: ['dly', 'dly.delhi.gov.in', 'dly delhi', 'delhi ladli', 'ladli delhi', 'delhi lakshmi yojana', 'delhi lakshmi', 'delhi laxmi', 'lakshmi yojana', 'लक्ष्मी योजना', 'दिल्ली लक्ष्मी योजना'],
  
  // Artisan / Vishwakarma
  vishwakarma: ['vishwakarma', 'vishwkarma', 'vishvakarma', 'karigar', 'craftsman', 'विश्वकर्मा', 'कारीगर'],
  
  // Business Loan / Mudra
  mudra: ['mudra', 'mudar', 'loan', 'udyam', 'business loan', 'मुद्रा', 'ऋण', 'लोन', 'उद्यम'],
  
  // LPG / Ujjwala
  ujjwala: ['ujjwala', 'ujwala', 'ujwalaa', 'gas', 'lpg', 'cylinder', 'उज्जवला', 'गैस'],
  
  // Ration / Food
  ration: ['ration', 'rasan', 'raashan', 'khadya', 'anna', 'राशन', 'खाद्यान्न', 'अन्न'],
  
  // Student / Scholarship
  student: ['student', 'shiksha', 'chatra', 'chhatra', 'scholarship', 'stipend', 'padhai', 'विद्यार्थी', 'छात्र', 'छात्रवृत्ति', 'शिक्षा'],
  
  // Insurance / Bima
  bima: ['bima', 'beema', 'insurance', 'suraksha', 'बीमा', 'सुरक्षा'],
  
  // Subsidy
  subsidy: ['subsidy', 'subsidhi', 'anudan', 'सब्सिडी', 'अनुदान']
};

/**
 * Calculates Levenshtein Distance between two strings
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null)
  );

  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // insertion
        track[j - 1][i] + 1, // deletion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return track[str2.length][str1.length];
}

/**
 * Checks if query is a search for brand variations (e.g. "Yojna Saathi", "Yojana Saathi", "yojanasaathi")
 */
export function isBrandSearchQuery(query: string): boolean {
  if (!query || !query.trim()) return false;
  const q = query.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  if (q.length < 3) return false;
  return BRAND_VARIATIONS.some(
    (bv) => bv.replace(/[^a-z0-9]/g, '') === q || q.includes('yojna') || q.includes('yojana') || q.includes('sathi') || q.includes('saathi')
  );
}

/**
 * Returns a "Did you mean?" suggestion for typos or brand misspellings
 */
export function getDidYouMeanSuggestion(query: string): {
  suggestion: string;
  isBrand: boolean;
  explanationText: string;
} | null {
  if (!query || !query.trim()) return null;
  const q = query.toLowerCase().trim();

  // Check if it's a brand misspelling
  if (isBrandSearchQuery(q) && q !== 'yojnasaathi') {
    return {
      suggestion: OFFICIAL_BRAND_NAME,
      isBrand: true,
      explanationText: `Showing official schemes from ${OFFICIAL_BRAND_NAME} (searched for "${query}")`,
    };
  }

  // Check synonym & typo mapping
  for (const [key, variants] of Object.entries(SYNONYM_DICTIONARY)) {
    for (const v of variants) {
      if (v.toLowerCase() === q) {
        if (key !== q) {
          return {
            suggestion: key.charAt(0).toUpperCase() + key.slice(1),
            isBrand: false,
            explanationText: `Showing results for "${key}" (matched from "${query}")`,
          };
        }
      } else if (v.length > 4 && q.length > 4) {
        const dist = levenshteinDistance(q, v.toLowerCase());
        if (dist <= 2) {
          return {
            suggestion: key.charAt(0).toUpperCase() + key.slice(1),
            isBrand: false,
            explanationText: `Did you mean "${key}"? Showing best matched results.`,
          };
        }
      }
    }
  }

  return null;
}

export interface AutocompleteSuggestion {
  type: 'brand' | 'scheme' | 'category' | 'tag';
  title: string;
  subtitle?: string;
  badge?: string;
  url: string;
}

/**
 * Generates rich live autocomplete options as user types
 */
export function getLiveSearchAutocomplete(query: string, maxResults: number = 6): AutocompleteSuggestion[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const suggestions: AutocompleteSuggestion[] = [];

  // 1. Check brand query
  if (isBrandSearchQuery(q)) {
    suggestions.push({
      type: 'brand',
      title: `${OFFICIAL_BRAND_NAME} Official Portal`,
      subtitle: `Explore all 4,770+ Central & State Govt Schemes on ${OFFICIAL_BRAND_NAME}`,
      badge: 'Official Brand',
      url: '/yojanas',
    });
  }

  // 2. Expand query using synonyms
  const expandedQueries = [q];
  for (const [key, variants] of Object.entries(SYNONYM_DICTIONARY)) {
    if (variants.some((v) => v.toLowerCase().includes(q) || q.includes(v.toLowerCase()))) {
      expandedQueries.push(key);
      variants.forEach((v) => expandedQueries.push(v));
    }
  }

  // 3. Search Schemes Database with fuzzy scoring
  const matches: { scheme: Scheme; score: number }[] = [];

  for (const scheme of MASTER_SCHEMES_DATABASE) {
    let score = 0;
    const titleEn = scheme.title_en.toLowerCase();
    const titleHi = scheme.title_hi.toLowerCase();
    const summaryEn = scheme.summary_en.toLowerCase();
    const tagsStr = scheme.tags.join(' ').toLowerCase();

    for (const term of expandedQueries) {
      if (titleEn.startsWith(term) || titleHi.startsWith(term)) score += 50;
      else if (titleEn.includes(term) || titleHi.includes(term)) score += 30;
      else if (tagsStr.includes(term)) score += 20;
      else if (summaryEn.includes(term)) score += 10;
      
      // Fuzzy match for minor typos
      if (term.length >= 4) {
        const titleWords = titleEn.split(' ');
        for (const w of titleWords) {
          if (w.length >= 4 && levenshteinDistance(term, w) <= 2) {
            score += 15;
          }
        }
      }
    }

    if (score > 0) {
      matches.push({ scheme, score });
    }
  }

  // Sort by highest score
  matches.sort((a, b) => b.score - a.score);

  // Pick top schemes
  for (const item of matches.slice(0, maxResults)) {
    suggestions.push({
      type: 'scheme',
      title: item.scheme.title_hi,
      subtitle: `${item.scheme.title_en} • ${item.scheme.state || 'Central Govt'}`,
      badge: item.scheme.category,
      url: `/yojana/${item.scheme.slug}`,
    });
  }

  return suggestions.slice(0, maxResults);
}
