import React, { useMemo } from 'react';
import { useRoute, Link } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { getBlogArticleBySlug, BLOG_ARTICLES } from '../data/blogArticles';
import { MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';
import { SEOHead } from '../components/SEOHead';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { SchemeCard } from '../components/SchemeCard';
import {
  Calendar,
  Clock,
  User,
  ExternalLink,
  Share2,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Tag,
  ChevronRight,
  ListOrdered,
  Sparkles,
  MapPin,
  Grid
} from 'lucide-react';

export function BlogDetailPage() {
  const [, params] = useRoute<{ slug: string }>('/blog/:slug');
  const [, paramsAlt] = useRoute<{ slug: string }>('/blogs/:slug');
  const { lang } = useLanguage();

  const slug = (params ? params.slug : '') || (paramsAlt ? paramsAlt.slug : '') || '';
  const article = getBlogArticleBySlug(slug);

  // Extract Table of Contents from markdown content
  const tocList = useMemo(() => {
    if (!article) return [];
    const contentText = lang === 'hi' ? article.content_hi : article.content_en;
    const lines = contentText.split('\n');
    const toc: { id: string; text: string; level: number }[] = [];

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').replace(/\*\*/g, '').trim();
        const id = text.toLowerCase().replace(/[^\w\u0900-\u097F]+/g, '-');
        toc.push({ id, text, level: 2 });
      } else if (line.startsWith('### ')) {
        const text = line.replace('### ', '').replace(/\*\*/g, '').trim();
        const id = text.toLowerCase().replace(/[^\w\u0900-\u097F]+/g, '-');
        toc.push({ id, text, level: 3 });
      }
    });

    return toc;
  }, [article, lang]);

  // Find related government schemes from MASTER_SCHEMES_DATABASE
  const matchingSchemes = useMemo(() => {
    if (!article) return [];
    const directSlugs = article.related_schemes || [];
    if (directSlugs.length > 0) {
      const found = MASTER_SCHEMES_DATABASE.filter((s) => directSlugs.includes(s.slug));
      if (found.length > 0) return found.slice(0, 3);
    }

    // Fallback: match by category or tags
    return MASTER_SCHEMES_DATABASE.filter(
      (s) => s.category === article.category || article.tags.some((t) => s.title_hi.includes(t) || s.title_en.includes(t))
    ).slice(0, 3);
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          {lang === 'hi' ? 'लेख नहीं मिला' : 'Article Not Found'}
        </h1>
        <p className="text-slate-600 mb-6">
          {lang === 'hi'
            ? 'आपके द्वारा खोजा गया लेख उपलब्ध नहीं है या हटा दिया गया है।'
            : 'The blog article you are looking for does not exist.'}
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'ब्लॉग सूची पर वापस जाएं' : 'Back to Blog'}</span>
        </Link>
      </div>
    );
  }

  const title = lang === 'hi' ? article.title_hi : article.title_en;
  const content = lang === 'hi' ? article.content_hi : article.content_en;
  const excerpt = lang === 'hi' ? article.excerpt_hi : article.excerpt_en;

  const relatedArticles = BLOG_ARTICLES.filter(
    a => article.related_slugs.includes(a.slug) || (a.category === article.category && a.id !== article.id)
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'hi' ? 'लिंक कॉपी हो गया!' : 'Link copied to clipboard!');
    }
  };

  // Inline markdown link & formatting parser
  const renderFormattedText = (text: string) => {
    // Replace markdown links [label](url)
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const [, label, url] = match;
        if (url.startsWith('/')) {
          return (
            <Link key={i} href={url} className="text-blue-600 font-semibold hover:underline">
              {label}
            </Link>
          );
        }
        return (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-0.5">
            <span>{label}</span>
            <ExternalLink className="w-3 h-3 text-blue-500 inline" />
          </a>
        );
      }

      // Handle bold text **bold**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, j) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          return <strong key={j} className="font-bold text-slate-900">{bPart.slice(2, -2)}</strong>;
        }
        return bPart;
      });
    });
  };

  return (
    <article className="bg-[#F8FAFC] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={title}
        description={lang === 'hi' ? article.meta_description_hi : article.meta_description_en}
        canonicalUrl={`https://www.yojnasaathi.org/blog/${article.slug}`}
        ogImage={article.featured_image}
      />

      {/* Schema.org BlogPosting, Breadcrumb & FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": lang === 'hi' ? 'होम' : 'Home',
                  "item": "https://www.yojnasaathi.org"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": lang === 'hi' ? 'ब्लॉग' : 'Blog',
                  "item": "https://www.yojnasaathi.org/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": title,
                  "item": `https://www.yojnasaathi.org/blog/${article.slug}`
                }
              ]
            },
            {
              "@type": "BlogPosting",
              "headline": title,
              "description": lang === 'hi' ? article.meta_description_hi : article.meta_description_en,
              "image": article.featured_image,
              "author": {
                "@type": "Person",
                "name": article.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "YojnaSaathi",
                "url": "https://www.yojnasaathi.org",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.yojnasaathi.org/logo.png"
                }
              },
              "datePublished": article.publish_date,
              "dateModified": article.updated_at,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.yojnasaathi.org/blog/${article.slug}`
              }
            }
          ]
        })}
      </script>

      {article.faqs && article.faqs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": article.faqs.map(faq => ({
              "@type": "Question",
              "name": lang === 'hi' ? faq.question_hi : faq.question_en,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": lang === 'hi' ? faq.answer_hi : faq.answer_en
              }
            }))
          })}
        </script>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs sm:text-sm text-slate-500 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-blue-600">
            {lang === 'hi' ? 'होम' : 'Home'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-blue-600">
            {lang === 'hi' ? 'ब्लॉग व गाइड' : 'Blog & Articles'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-xs">
            {title}
          </span>
        </nav>

        {/* Header Block */}
        <header className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 mb-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.read_time_minutes} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {title}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed border-l-4 border-blue-600 pl-4 bg-blue-50/50 py-2.5 rounded-r-lg">
            {excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                <User className="w-4 h-4 text-blue-600" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {lang === 'hi' ? 'अंतिम अपडेट:' : 'Updated:'} {article.updated_at}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded-lg font-medium transition-colors text-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'शेयर करें' : 'Share'}</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-xs max-h-[420px] bg-slate-100">
          <img
            src={article.featured_image}
            alt={title}
            title={title}
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Interactive Table of Contents */}
        {tocList.length > 0 && (
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 mb-8">
            <h3 className="text-base font-bold text-blue-900 mb-3 flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-blue-600" />
              <span>{lang === 'hi' ? 'विषय सूची (Table of Contents)' : 'Table of Contents'}</span>
            </h3>
            <ul className="space-y-2 text-sm">
              {tocList.map((item, idx) => (
                <li key={idx} className={item.level === 3 ? 'pl-4' : ''}>
                  <a
                    href={`#${item.id}`}
                    className="text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-1.5 font-medium"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 mb-8 shadow-xs">
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700">
            {content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return null; // Heading H1 is rendered in header
              }
              if (paragraph.startsWith('## ')) {
                const headingText = paragraph.replace('## ', '').replace(/\*\*/g, '').trim();
                const headingId = headingText.toLowerCase().replace(/[^\w\u0900-\u097F]+/g, '-');
                return (
                  <h2 id={headingId} key={index} className="text-xl sm:text-2xl font-bold text-slate-900 mt-10 mb-4 text-blue-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span>{renderFormattedText(paragraph.replace('## ', ''))}</span>
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                const headingText = paragraph.replace('### ', '').replace(/\*\*/g, '').trim();
                const headingId = headingText.toLowerCase().replace(/[^\w\u0900-\u097F]+/g, '-');
                return (
                  <h3 id={headingId} key={index} className="text-lg font-bold text-slate-900 mt-6 mb-3">
                    {renderFormattedText(paragraph.replace('### ', ''))}
                  </h3>
                );
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <div key={index} className="my-5 p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 rounded-r-lg font-medium text-sm sm:text-base">
                    {renderFormattedText(paragraph.replace('> ', ''))}
                  </div>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n- ');
                return (
                  <ul key={index} className="space-y-2.5 my-4 list-disc pl-5">
                    {items.map((item, i) => (
                      <li key={i} className="text-slate-700 text-base">
                        {renderFormattedText(item.replace('- ', ''))}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.match(/^\d+\.\s/)) {
                const items = paragraph.split(/\n\d+\.\s/);
                return (
                  <ol key={index} className="space-y-2.5 my-4 list-decimal pl-5">
                    {items.map((item, i) => (
                      <li key={i} className="text-slate-700 text-base">
                        {renderFormattedText(item.replace(/^\d+\.\s/, ''))}
                      </li>
                    ))}
                  </ol>
                );
              }

              return (
                <p key={index} className="mb-4 text-slate-700 text-base leading-relaxed">
                  {renderFormattedText(paragraph)}
                </p>
              );
            })}
          </div>

          {/* Official External Sources Box */}
          {article.official_sources && article.official_sources.length > 0 && (
            <div className="mt-10 bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'hi' ? 'आधिकारिक सरकारी स्रोत लिंक:' : 'Official Government Source Links:'}</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {article.official_sources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                  >
                    <span>{src.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase">{lang === 'hi' ? 'टैग:' : 'Tags:'}</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Government Schemes Widget */}
        {matchingSchemes.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>{lang === 'hi' ? 'संबंधित प्रमुख सरकारी योजनाएं' : 'Related Government Schemes'}</span>
              </h3>
              <Link href="/" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                <span>{lang === 'hi' ? 'सभी 4,770+ योजनाएं देखें' : 'View All Schemes'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {matchingSchemes.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          </div>
        )}

        {/* AdSense Placement: Between Article Content and FAQs */}
        <AdSenseSlot type="article-banner" format="horizontal" slotId="8877665544" className="my-8" />

        {/* Browse by State & Category Quick Navigation */}
        <div className="bg-slate-100 rounded-2xl p-6 mb-8 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Grid className="w-4 h-4 text-blue-600" />
            <span>{lang === 'hi' ? 'राज्य व श्रेणी अनुसार योजनाएं खोजें:' : 'Browse Schemes by State & Category:'}</span>
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link href="/state/delhi" className="bg-white border border-slate-300 hover:border-blue-500 text-slate-800 px-3 py-1.5 rounded-lg font-medium shadow-2xs">
              🏛️ {lang === 'hi' ? 'दिल्ली की योजनाएं' : 'Delhi Schemes'}
            </Link>
            <Link href="/state/uttar-pradesh" className="bg-white border border-slate-300 hover:border-blue-500 text-slate-800 px-3 py-1.5 rounded-lg font-medium shadow-2xs">
              🌾 {lang === 'hi' ? 'यूपी की योजनाएं' : 'UP Schemes'}
            </Link>
            <Link href="/state/madhya-pradesh" className="bg-white border border-slate-300 hover:border-blue-500 text-slate-800 px-3 py-1.5 rounded-lg font-medium shadow-2xs">
              🌸 {lang === 'hi' ? 'एमपी की योजनाएं' : 'MP Schemes'}
            </Link>
            <Link href="/state/bihar" className="bg-white border border-slate-300 hover:border-blue-500 text-slate-800 px-3 py-1.5 rounded-lg font-medium shadow-2xs">
              🎓 {lang === 'hi' ? 'बिहार की योजनाएं' : 'Bihar Schemes'}
            </Link>
            <Link href="/category/farmers" className="bg-white border border-slate-300 hover:border-blue-500 text-slate-800 px-3 py-1.5 rounded-lg font-medium shadow-2xs">
              🚜 {lang === 'hi' ? 'किसान योजनाएं' : 'Farmer Schemes'}
            </Link>
            <Link href="/category/women" className="bg-white border border-slate-300 hover:border-blue-500 text-slate-800 px-3 py-1.5 rounded-lg font-medium shadow-2xs">
              👩 {lang === 'hi' ? 'महिला योजनाएं' : 'Women Schemes'}
            </Link>
          </div>
        </div>

        {/* FAQs Section */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>{lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQs)' : 'Frequently Asked Questions'}</span>
            </h3>

            <div className="space-y-4">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-base mb-2">
                    {lang === 'hi' ? faq.question_hi : faq.question_en}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {lang === 'hi' ? faq.answer_hi : faq.answer_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              {lang === 'hi' ? 'संबंधित अन्य लेख' : 'Related Articles'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow block group"
                >
                  <img
                    src={rel.featured_image}
                    alt={lang === 'hi' ? rel.title_hi : rel.title_en}
                    title={lang === 'hi' ? rel.title_hi : rel.title_en}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                    {lang === 'hi' ? rel.title_hi : rel.title_en}
                  </h4>
                  <span className="text-xs text-slate-400 block">{rel.updated_at}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
