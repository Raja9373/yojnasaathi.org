import React, { useState, useEffect } from 'react';
import { useRoute, useLocation, Link } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarksContext';
import { SEOHead } from '../components/SEOHead';
import { SchemeCard } from '../components/SchemeCard';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { getSchemeBySlug, MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';
import { CATEGORIES } from '../data/statesAndCategories';
import { Scheme } from '../types';
import { 
  Building2, 
  Calendar, 
  Printer, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  CheckSquare, 
  ShieldAlert, 
  Copy, 
  Check,
  Sparkles,
  Zap,
  Bookmark,
  Clock,
  Tag,
  MapPin
} from 'lucide-react';

export const YojanaDetailPage: React.FC = () => {
  const [match, params] = useRoute<{ slug: string }>('/yojana/:slug');
  const [, navigate] = useLocation();
  const { lang, t } = useLanguage();
  const { isBookmarked, toggleBookmark, addRecentlyViewed } = useBookmarks();

  const slug = match && params ? params.slug : '';
  const scheme = getSchemeBySlug(slug) || MASTER_SCHEMES_DATABASE.find((s) => s.slug === slug);

  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (slug) {
      addRecentlyViewed(slug);
    }
  }, [slug]);

  const todayDate = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  if (!scheme) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <ShieldAlert className="w-16 h-16 text-rose-500" />
        <h1 className="text-2xl font-bold text-slate-800">
          {t('योजना नहीं मिली', 'Scheme Not Found')}
        </h1>
        <p className="text-sm text-slate-600 max-w-md">
          {t('माफ़ कीजिये, आपके द्वारा मांगी गई योजना इस समय उपलब्ध नहीं है या URL गलत है।', 'Sorry, the requested scheme page does not exist or has been moved.')}
        </p>
        <button
          onClick={() => navigate('/yojanas')}
          className="bg-[#1E40AF] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-blue-900 transition cursor-pointer"
        >
          {t('सभी योजनाएं देखें', 'Browse All Schemes')}
        </button>
      </div>
    );
  }

  const categoryObj = CATEGORIES.find((c) => c.slug === scheme.category);
  const relatedSchemes = MASTER_SCHEMES_DATABASE
    .filter((s) => s.id !== scheme.id && (s.category === scheme.category || s.type === scheme.type))
    .slice(0, 3);

  // Construct JSON-LD GovernmentService Schema for Search Engine Snippet Boost
  const govtServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    'name': lang === 'hi' ? scheme.title_hi : scheme.title_en,
    'description': lang === 'hi' ? scheme.summary_hi : scheme.summary_en,
    'provider': {
      '@type': 'GovernmentOrganization',
      'name': lang === 'hi' ? scheme.ministry_hi : scheme.ministry_en
    },
    'serviceType': 'Welfare Scheme & Grant',
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': scheme.type === 'central' ? 'India' : scheme.state
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: lang === 'hi' ? scheme.title_hi : scheme.title_en,
    description: lang === 'hi' ? scheme.summary_hi : scheme.summary_en,
    image: [scheme.image],
    dateModified: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'YojnaSaathi.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.yojnasaathi.org/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.yojnasaathi.org/yojana/${scheme.slug}`
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: scheme.faqs.map((f) => ({
      '@type': 'Question',
      name: lang === 'hi' ? f.question_hi : f.question_en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: lang === 'hi' ? f.answer_hi : f.answer_en
      }
    }))
  };

  const combinedSchema = [govtServiceSchema, articleSchema, faqSchema];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `${t(scheme.title_hi, scheme.title_en)} - पूरी जानकारी व पात्रता देखें: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const bookmarked = isBookmarked(scheme.slug);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 py-6 px-4 sm:px-6">
      <ReadingProgressBar />
      <SEOHead
        title={t(scheme.title_hi, scheme.title_en)}
        description={t(scheme.summary_hi, scheme.summary_en)}
        ogImage={scheme.image}
        jsonLdSchema={combinedSchema}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Automatic Breadcrumbs with JSON-LD Schema */}
        <Breadcrumbs
          items={[
            {
              labelHi: scheme.type === 'central' ? 'केन्द्रीय योजनाएं' : 'राज्य योजनाएं',
              labelEn: scheme.type === 'central' ? 'Central Schemes' : 'State Schemes',
              href: `/yojanas?type=${scheme.type}`
            },
            {
              labelHi: scheme.title_hi,
              labelEn: scheme.title_en
            }
          ]}
        />

        {/* Header Summary Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-md relative print-container">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="space-y-3 flex-1">
              {/* Badges & Automatic Last Updated Info */}
              <div className="flex items-center flex-wrap gap-2 text-xs font-bold">
                <span className={`px-3 py-1 rounded-full uppercase tracking-wider ${
                  scheme.type === 'central'
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                    : 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-200 dark:border-amber-700'
                }`}>
                  {scheme.type === 'central' ? t('केन्द्रीय योजना', 'Central Scheme') : `${t('राज्य', 'State')}: ${scheme.state}`}
                </span>

                {categoryObj && (
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                    {t(categoryObj.name_hi, categoryObj.name_en)}
                  </span>
                )}

                {/* Requirement 1: AUTOMATIC LAST UPDATED */}
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t(`अंतिम अद्यतन: ${scheme.updated_at || todayDate}`, `Last Updated: ${scheme.updated_at || todayDate}`)}</span>
                </span>

                <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 text-[10px] font-mono border border-blue-200 dark:border-slate-600">
                  Version: v2.6
                </span>
              </div>

              {/* H1 Title with Bookmark Button */}
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {t(scheme.title_hi, scheme.title_en)}
                </h1>

                <button
                  onClick={() => toggleBookmark(scheme.slug)}
                  title={bookmarked ? 'Remove Bookmark' : 'Save Scheme'}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer shrink-0 ${
                    bookmarked
                      ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400'
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 dark:bg-slate-700 dark:border-slate-600'
                  }`}
                >
                  <Bookmark className={`w-6 h-6 ${bookmarked ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Ministry & Meta Info */}
              <div className="flex items-center flex-wrap gap-4 text-xs font-medium text-slate-600 pt-1">
                <p className="flex items-center gap-1.5 text-blue-800 font-semibold">
                  <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{t(scheme.ministry_hi, scheme.ministry_en)}</span>
                </p>
                <span>•</span>
                <p className="flex items-center gap-1.5 text-orange-700 font-semibold">
                  <Calendar className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{t('अंतिम तिथि', 'Last Date')}: {t(scheme.last_date_hi, scheme.last_date_en)}</span>
                </p>
              </div>

              {/* Highlight Benefit Box */}
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider">
                    {t('मुख्य लाभ राशि (Benefit Amount)', 'Primary Benefit Amount')}
                  </span>
                  <p className="text-lg sm:text-xl font-extrabold text-emerald-900 mt-0.5">
                    💰 {t(scheme.benefit_amount_hi, scheme.benefit_amount_en)}
                  </p>
                </div>

                <button
                  onClick={handlePrint}
                  className="no-print flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl border border-slate-300 shadow-xs cursor-pointer transition shrink-0"
                >
                  <Printer className="w-4 h-4 text-blue-700" />
                  <span>{t('PDF/प्रिंट निकालें', 'Print to PDF')}</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full lg:w-80 h-52 rounded-2xl overflow-hidden shadow-md shrink-0 border border-slate-200 bg-slate-100">
              <img
                src={scheme.image}
                alt={lang === 'hi' ? scheme.title_hi : scheme.title_en}
                title={lang === 'hi' ? scheme.title_hi : scheme.title_en}
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* AdSense Top Banner */}
        <AdSenseSlot type="article-banner" format="horizontal" slotId="5544332211" />

        {/* Main Grid: Left Detailed Content + Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Main Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Table of Contents Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm no-print">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>{t('विषय सूची (Table of Contents)', 'Table of Contents')}</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium text-blue-700">
                <a href="#parichay" className="hover:underline p-1.5 rounded bg-slate-50 hover:bg-blue-50">1. {t('परिचय (Overview)', '1. Overview')}</a>
                <a href="#labh" className="hover:underline p-1.5 rounded bg-slate-50 hover:bg-blue-50">2. {t('मुख्य लाभ (Benefits)', '2. Key Benefits')}</a>
                <a href="#patrata" className="hover:underline p-1.5 rounded bg-slate-50 hover:bg-blue-50">3. {t('पात्रता (Eligibility)', '3. Eligibility')}</a>
                <a href="#dastavej" className="hover:underline p-1.5 rounded bg-slate-50 hover:bg-blue-50">4. {t('आवश्यक दस्तावेज़', '4. Documents')}</a>
                <a href="#aavedan" className="hover:underline p-1.5 rounded bg-slate-50 hover:bg-blue-50">5. {t('आवेदन प्रक्रिया', '5. Apply Process')}</a>
                <a href="#faqs" className="hover:underline p-1.5 rounded bg-slate-50 hover:bg-blue-50">6. {t('अक्सर पूछे जाने वाले प्रश्न', '6. FAQs')}</a>
              </div>
            </div>

            {/* Section 1: Overview / Parichay */}
            <section id="parichay" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 print-page-break">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-700"></span>
                <span>{t('1. योजना का परिचय (Scheme Introduction)', '1. Scheme Introduction')}</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {t(scheme.introduction_hi, scheme.introduction_en)}
              </p>
            </section>

            {/* Section 2: Key Labh (Benefits) */}
            <section id="labh" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 print-page-break">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <span>{t('2. योजना के प्रमुख लाभ व विशेषताएं (Key Benefits)', '2. Key Benefits & Highlights')}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(lang === 'hi' ? scheme.benefits_hi : scheme.benefits_en).map((benefit, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-emerald-950 leading-normal">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* In-feed AdSense Slot */}
            <AdSenseSlot type="in-feed" format="fluid" slotId="1122334455" />

            {/* Section 3: Patrata (Eligibility Criteria) */}
            <section id="patrata" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 print-page-break">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                <span>{t('3. पात्रता एवं योग्यता की शर्तें (Eligibility Criteria)', '3. Eligibility Criteria')}</span>
              </h2>

              <ul className="space-y-3 pt-2 text-xs text-slate-700">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-purple-50 border border-purple-200">
                  <CheckSquare className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-900 font-bold block">{t('आयु सीमा (Age Limits):', 'Age Limit:')}</strong>
                    <span>
                      {scheme.eligibility.min_age !== undefined ? `${scheme.eligibility.min_age} ${t('वर्ष से', 'years to')}` : ''} {scheme.eligibility.max_age !== undefined && scheme.eligibility.max_age < 100 ? `${scheme.eligibility.max_age} ${t('वर्ष', 'years')}` : t('सभी आयु वर्ग', 'All ages')}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <CheckSquare className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-900 font-bold block">{t('वार्षिक आय सीमा (Income Limit):', 'Income Limit:')}</strong>
                    <span>
                      {scheme.eligibility.max_income !== undefined && scheme.eligibility.max_income < 99999999
                        ? `${t('परिवार की आय ₹', 'Family income less than ₹')}${scheme.eligibility.max_income.toLocaleString('en-IN')} ${t('से कम होनी चाहिए', 'per annum')}`
                        : t('कोई निश्चित आय सीमा नहीं', 'No fixed income cap')}
                    </span>
                  </div>
                </li>

                {(lang === 'hi' ? scheme.eligibility.other_hi : scheme.eligibility.other_en)?.map((other, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckSquare className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                    <span>{other}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 4: Dastavej (Required Documents) */}
            <section id="dastavej" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 print-page-break">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                <span>{t('4. आवश्यक दस्तावेज़ सूची (Required Documents)', '4. Required Documents Checklist')}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(lang === 'hi' ? scheme.documents_hi : scheme.documents_en).map((doc, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-950 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] shrink-0 font-bold">
                      {idx + 1}
                    </span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Aavedan Prakriya (Application Process) */}
            <section id="aavedan" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 print-page-break">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-800"></span>
                <span>{t('5. आवेदन करने की स्टेप-बाय-स्टेप प्रक्रिया (How to Apply)', '5. Step-by-Step Application Process')}</span>
              </h2>

              <div className="space-y-3 pt-2">
                {(lang === 'hi' ? scheme.apply_steps_hi : scheme.apply_steps_en).map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#1E40AF] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed mt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Official Website Banner CTA Button */}
              <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base">
                    {t('आधिकारिक सरकारी पोर्टल पर आवेदन करें', 'Apply on Official Government Portal')}
                  </h4>
                  <p className="text-xs text-blue-200 mt-1">
                    {t('किसी भी दलाल के चक्कर में न पड़ें, सीधे आधिकारिक वेबसाइट पर जाएँ।', 'Always apply directly on the verified government portal without middlemen.')}
                  </p>
                </div>

                <a
                  href={scheme.official_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs px-6 py-3 rounded-xl flex items-center gap-2 transition shrink-0 shadow-lg cursor-pointer"
                >
                  <span>{t('आधिकारिक पोर्टल खोलें', 'Visit Official Portal')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </section>

            {/* Section 6: FAQ Accordion */}
            <section id="faqs" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 print-page-break">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-orange-600" />
                <span>{t('6. अक्सर पूछे जाने वाले प्रश्न (FAQs)', '6. Frequently Asked Questions')}</span>
              </h2>

              <div className="space-y-3 pt-2">
                {scheme.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden transition"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-4 bg-slate-50 hover:bg-blue-50/50 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 cursor-pointer"
                      >
                        <span>Q{idx + 1}. {lang === 'hi' ? faq.question_hi : faq.question_en}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-blue-700 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white text-xs sm:text-sm text-slate-700 border-t border-slate-200 leading-relaxed font-normal">
                          {lang === 'hi' ? faq.answer_hi : faq.answer_en}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Sidebar (1 Column) */}
          <div className="space-y-6 no-print">
            {/* Quick Action Box */}
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-600 shadow-md space-y-4 sticky top-20">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-base">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>{t('ऑनलाइन आवेदन लिंक', 'Official Application Link')}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'इस योजना के लिए सरकार की आधिकारिक पोर्टल पर मुफ़्त ऑनलाइन रजिस्ट्रेशन की सीधी लिंक:',
                  'Direct portal link to register online directly with the government department:'
                )}
              </p>

              <a
                href={scheme.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1E40AF] hover:bg-blue-900 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                <span>{t('ऑफिसियल पोर्टल पर जाएँ', 'Go to Official Website')}</span>
                <ExternalLink className="w-4 h-4 text-amber-300" />
              </a>

              {/* Sidebar AdSense Banner */}
              <AdSenseSlot type="sidebar" format="rectangle" slotId="6677889900" />

              {/* Share Buttons */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                  {t('सोशल मीडिया पर शेयर करें', 'Share Scheme with Friends')}
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <button
                    onClick={handleShareWhatsApp}
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t('कॉपी हुआ!', 'Copied!') : t('लिंक कॉपी करें', 'Copy Link')}</span>
                  </button>
                </div>
              </div>

              {/* Related Yojanas List */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {t('संबंधित अन्य योजनाएं', 'Related Schemes')}
                </h4>

                <div className="space-y-2">
                  {relatedSchemes.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => navigate(`/yojana/${rel.slug}`)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition flex items-center gap-3"
                    >
                      <img
                        src={rel.image}
                        alt={t(rel.title_hi, rel.title_en)}
                        title={t(rel.title_hi, rel.title_en)}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {t(rel.title_hi, rel.title_en)}
                        </h5>
                        <span className="text-[10px] text-blue-700 font-semibold block">
                          💰 {t(rel.benefit_amount_hi, rel.benefit_amount_en)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
