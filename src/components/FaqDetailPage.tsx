import React, { useState, useMemo, useEffect } from 'react';
import { useRoute, useLocation, Link } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from './SEOHead';
import { Breadcrumbs } from './Breadcrumbs';
import { ALL_FAQS, FAQItem } from '../data/faqs/index';
import {
  HelpCircle,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Search,
  ThumbsUp,
  ThumbsDown,
  Tag,
  BookOpen,
  ChevronRight,
  MessageSquare,
  Globe,
  Clock
} from 'lucide-react';

interface FaqDetailPageProps {
  slug?: string;
  onBack?: () => void;
}

export const FaqDetailPage: React.FC<FaqDetailPageProps> = ({ slug: propSlug, onBack }) => {
  const { lang, t } = useLanguage();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/faq/:slug');

  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract active slug from wouter params or props
  const activeSlug = propSlug || (match && params && 'slug' in params ? (params as { slug: string }).slug : '') || '';

  // Find active FAQ item
  const faq: FAQItem | undefined = useMemo(() => {
    if (!activeSlug) return undefined;
    return ALL_FAQS.find(
      (item) => item.slug === activeSlug || item.id.toString() === activeSlug
    );
  }, [activeSlug]);

  // Related FAQs in same category
  const relatedFaqs = useMemo(() => {
    if (!faq) return [];
    return ALL_FAQS.filter(
      (item) => item.category === faq.category && item.id !== faq.id
    ).slice(0, 6);
  }, [faq]);

  // Filtered FAQs for search inside detail page
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ALL_FAQS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  // Scroll to top when active slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFeedback(null);
    setCopied(false);
  }, [activeSlug]);

  const currentUrl = typeof window !== 'undefined'
    ? `https://www.yojnasaathi.org/faq/${faq?.slug || activeSlug}`
    : `https://www.yojnasaathi.org/faq/${activeSlug}`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = (platform: 'whatsapp' | 'telegram' | 'twitter' | 'facebook') => {
    if (!faq) return;
    const shareText = encodeURIComponent(`${faq.question}\n\nRead Official Solution on YojnaSaathi.org:`);
    const encodedUrl = encodeURIComponent(currentUrl);

    let url = '';
    if (platform === 'whatsapp') url = `https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`;
    if (platform === 'telegram') url = `https://t.me/share/url?url=${encodedUrl}&text=${shareText}`;
    if (platform === 'twitter') url = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`;
    if (platform === 'facebook') url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!faq) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <SEOHead
          title="Sarkari Yojana FAQ Not Found | YojnaSaathi.org"
          description="The requested government scheme FAQ could not be located. Browse 1,000+ verified scheme FAQs on YojnaSaathi.org."
          canonicalUrl="https://www.yojnasaathi.org/faqs"
        />
        <div className="max-w-3xl mx-auto text-center space-y-6 bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('प्रश्न नहीं मिला', 'FAQ Solution Not Found')}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md mx-auto">
            {t(
              'आपके द्वारा खोजा गया सवाल या तो अद्यतन किया जा चुका है या अन्य श्रेणी में स्थानांतरित हो गया है।',
              'The requested FAQ could not be found or has been merged into our 1,000+ FAQ Directory.'
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('सभी 1,000 सवाल देखें', 'Browse All 1,000 FAQs')}</span>
            </Link>
            <Link
              href="/pm-kisan-faqs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold rounded-xl transition"
            >
              <span>PM Kisan FAQs</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Generate dynamic FAQ JSON-LD Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: lang === 'hi' ? faq.q : (faq.q_en || faq.q),
        acceptedAnswer: {
          '@type': 'Answer',
          text: lang === 'hi' ? faq.a : (faq.a_en || faq.a)
        }
      }
    ]
  };

  const breadcrumbItems = [
    { label: lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home', href: '/' },
    { label: lang === 'hi' ? '1,000+ प्रश्नोत्तर' : '1,000+ FAQs', href: '/faqs' },
    { label: faq.category, href: `/faqs?cat=${encodeURIComponent(faq.category)}` },
    { label: faq.question.length > 35 ? faq.question.substring(0, 35) + '...' : faq.question }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={`${faq.question} | YojnaSaathi.org 2026 FAQ Guide`}
        description={faq.answer.substring(0, 160)}
        canonicalUrl={currentUrl}
        ogImage="https://www.yojnasaathi.org/og-image.jpg"
      />

      {/* JSON-LD Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Breadcrumbs items={breadcrumbItems} />
          <button
            onClick={() => {
              if (onBack) {
                onBack();
              } else if (window.history.length > 1) {
                window.history.back();
              } else {
                setLocation('/faqs');
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('पीछे जाएं', 'Back to FAQs')}</span>
          </button>
        </div>

        {/* Main FAQ Detail Box */}
        <article className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-6 sm:p-8 space-y-4 relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
                <Tag className="w-3.5 h-3.5" />
                <span>{faq.category}</span>
              </span>

              {/* .gov.in Verified Source Badge */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>.gov.in Official Source Verified</span>
              </div>
            </div>

            {/* Question Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {faq.question}
            </h1>

            {/* Sub-Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-blue-800/60">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Last Updated: August 5, 2026</span>
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Verified DBT & Govt Portal Info</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>FAQ ID: #{faq.id}</span>
              </span>
            </div>
          </div>

          {/* Answer Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-blue-50/70 dark:bg-slate-700/50 p-5 rounded-2xl border-l-4 border-blue-600 dark:border-blue-500 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-extrabold text-sm uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('आधिकारिक उत्तर एवं गाइड (Official Answer & Guide)', 'Official Verified Answer')}</span>
              </div>
              <p className="text-slate-800 dark:text-slate-100 font-medium text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {faq.answer}
              </p>
            </div>

            {/* English Answer Toggle Section */}
            {faq.a_en && faq.a_en !== faq.answer && (
              <div className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  English Reference Guide
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {faq.a_en}
                </p>
              </div>
            )}

            {/* Action Bar: Share, Copy & Helpful Feedback */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Social Share Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  {t('सोशल मीडिया पर शेयर करें', 'Share Verified Solution')}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleShare('telegram')}
                    className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Telegram</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="px-3.5 py-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>X (Twitter)</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-2 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t('कॉपी हो गया!', 'Link Copied!') : t('लिंक कॉपी करें', 'Copy Link')}</span>
                  </button>
                </div>
              </div>

              {/* Feedback Widget */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  {t('क्या यह उत्तर मददगार था?', 'Was this answer helpful?')}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFeedback('yes')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                      feedback === 'yes'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-emerald-50'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{t('हाँ, मददगार था', 'Yes, Helpful')}</span>
                  </button>
                  <button
                    onClick={() => setFeedback('no')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                      feedback === 'no'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-rose-50'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>{t('नहीं', 'No')}</span>
                  </button>
                </div>
                {feedback && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold animate-fade-in">
                    {t('आपकी प्रतिक्रिया के लिए धन्यवाद!', 'Thank you for your feedback!')}
                  </p>
                )}
              </div>
            </div>

            {/* Keyword Tags */}
            {faq.keywords && faq.keywords.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {t('टैग्स:', 'Related Topics:')}
                </span>
                {faq.keywords.map((kw, i) => (
                  <Link
                    key={i}
                    href={`/faqs?search=${encodeURIComponent(kw)}`}
                    className="text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 hover:text-blue-700 dark:hover:text-blue-300 px-2.5 py-1 rounded-lg transition"
                  >
                    #{kw}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Search across 1,000 FAQs Widget */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {t('अन्य 1,000 सरकारी योजना सवालों में खोजें', 'Search Across 1,000 Government Scheme FAQs')}
              </h3>
              <p className="text-xs text-blue-100">
                {t('eKYC, PM Kisan kist, Awas list, Ayushman Card ya Mudra Loan khojen...', 'Search instant verified answers for any query...')}
              </p>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('यहाँ अपना सवाल या कीवर्ड लिखें (उदा. eKYC, kist date, Awas list)...', 'Type your query or scheme name (e.g., eKYC, Ladli Behna, Awas list)...')}
              className="w-full bg-white text-slate-900 pl-11 pr-4 py-3.5 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium text-sm sm:text-base placeholder:text-slate-400"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-4" />
          </div>

          {/* Quick Search Dropdown Results */}
          {searchResults.length > 0 && (
            <div className="bg-white text-slate-900 rounded-2xl p-3 space-y-2 shadow-2xl divide-y divide-slate-100">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/faq/${item.slug}`}
                  onClick={() => setSearchQuery('')}
                  className="block p-2.5 hover:bg-blue-50 rounded-xl transition group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700">
                      {item.question}
                    </p>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0" />
                  </div>
                  <span className="text-[10px] text-blue-600 font-semibold uppercase">{item.category}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related Category FAQs */}
        {relatedFaqs.length > 0 && (
          <section className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{faq.category} {t('श्रेणी के अन्य महत्वपूर्ण सवाल', 'Related FAQs in')}</span>
              </h3>
              <Link
                href={`/faqs?cat=${encodeURIComponent(faq.category)}`}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>{t('सभी देखें', 'View All')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {relatedFaqs.map((relItem) => (
                <Link
                  key={relItem.id}
                  href={`/faq/${relItem.slug}`}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50/80 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-600/60 transition space-y-2 group block"
                >
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 line-clamp-2">
                    {relItem.question}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {relItem.answer}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-bold">
                    <span>Read Solution</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Hub CTA */}
        <div className="text-center pt-4">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-2xl shadow-md transition text-xs sm:text-sm"
          >
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>{t('सभी 1,000+ सवाल-उत्तर डायरेक्टरी खोलें', 'Explore Full 1,000+ Scheme FAQ Directory')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FaqDetailPage;
