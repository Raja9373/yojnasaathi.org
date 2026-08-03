export type Language = 
  | 'hi'
  | 'en'
  | 'as'
  | 'bn'
  | 'brx'
  | 'doi'
  | 'gu'
  | 'kn'
  | 'ks'
  | 'kok'
  | 'mai'
  | 'ml'
  | 'mni'
  | 'mr'
  | 'ne'
  | 'or'
  | 'pa'
  | 'sa'
  | 'sat'
  | 'sd'
  | 'ta'
  | 'te'
  | 'ur';

export type SchemeType = 'central' | 'state';

export type CategorySlug = 
  | 'kisan' 
  | 'subsidy'
  | 'mahila' 
  | 'beti' 
  | 'shiksha' 
  | 'rozgar' 
  | 'awas' 
  | 'pension' 
  | 'swasthya';

export interface FAQ {
  question_hi: string;
  question_en: string;
  answer_hi: string;
  answer_en: string;
}

export interface EligibilityCriteria {
  gender?: ('male' | 'female' | 'transgender' | 'all')[];
  min_age?: number;
  max_age?: number;
  max_income?: number; // In INR per annum
  occupations?: string[]; // e.g. 'farmer', 'student', 'worker', 'unemployed', 'self-employed', 'artisan', 'all'
  castes?: string[]; // e.g. 'general', 'obc', 'sc', 'st', 'ews', 'all'
  states?: string[]; // 'all' or specific state names
  other_hi?: string[];
  other_en?: string[];
}

export interface Scheme {
  id: string;
  slug: string;
  title_hi: string;
  title_en: string;
  summary_hi: string;
  summary_en: string;
  category: CategorySlug;
  type: SchemeType;
  state: string; // 'all' or state name e.g. 'Madhya Pradesh'
  state_slug?: string;
  ministry_hi: string;
  ministry_en: string;
  benefit_amount_hi: string;
  benefit_amount_en: string;
  last_date_hi: string;
  last_date_en: string;
  image: string;
  official_link: string;
  tags: string[];
  
  // Detail Sections
  introduction_hi: string;
  introduction_en: string;
  benefits_hi: string[];
  benefits_en: string[];
  eligibility: EligibilityCriteria;
  documents_hi: string[];
  documents_en: string[];
  apply_steps_hi: string[];
  apply_steps_en: string[];
  faqs: FAQ[];
  
  updated_at: string;
  created_at?: string;
  published_at?: string;
}

export interface FilterState {
  state: string;
  gender: string;
  age: string;
  category: string;
  occupation: string;
  caste: string;
  income: string;
  type: string; // 'all' | 'central' | 'state'
  searchQuery: string;
}

export interface CategoryInfo {
  slug: CategorySlug;
  name_hi: string;
  name_en: string;
  icon: string; // Lucide icon identifier
  description_hi: string;
  description_en: string;
  bgColor: string;
  textColor: string;
}
