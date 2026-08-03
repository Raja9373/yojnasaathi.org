export interface BlogArticle {
  id: string;
  slug: string;
  title_hi: string;
  title_en: string;
  meta_description_hi: string;
  meta_description_en: string;
  excerpt_hi: string;
  excerpt_en: string;
  author: string;
  publish_date: string;
  updated_at: string;
  read_time_minutes: number;
  featured_image: string;
  category: string;
  tags: string[];
  content_hi: string;
  content_en: string;
  faqs: {
    question_hi: string;
    question_en: string;
    answer_hi: string;
    answer_en: string;
  }[];
  related_slugs: string[];
  related_schemes?: string[];
  official_sources: {
    name: string;
    url: string;
  }[];
}
