import { BlogArticle } from './blogTypes';
import { BLOG_ARTICLES_PART1 } from './blogArticlesPart1';
import { BLOG_ARTICLES_PART2 } from './blogArticlesPart2';
import { BLOG_ARTICLES_PART3 } from './blogArticlesPart3';
import { BLOG_ARTICLES_PART4 } from './blogArticlesPart4';

export type { BlogArticle };

export const BLOG_ARTICLES: BlogArticle[] = [
  ...BLOG_ARTICLES_PART1,
  ...BLOG_ARTICLES_PART2,
  ...BLOG_ARTICLES_PART3,
  ...BLOG_ARTICLES_PART4
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find(a => a.slug === slug);
}
