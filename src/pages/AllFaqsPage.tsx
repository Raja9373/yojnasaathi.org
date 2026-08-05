import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PMKisanFaqSection } from '../components/PMKisanFaqSection';
import { ALL_FAQS, FAQItem } from '../data/faqs/index';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Tag,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const PAGE_SIZE = 20;

export const AllFaqsPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const categoryNavRef = useRef<HTMLDivElement>(null);

  const faqsData: FAQItem[] = ALL_FAQS;

  // Calculate Category Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: faqsData.length };
    faqsData.forEach((item) => {
      counts[item.cat] = (counts[item.cat] || 0) + 1;
    });
    return counts;
  }, [faqsData]);

  const categories = [
    { id: 'All', label: t(`सभी सवाल (${faqsData.length}+)`, `All FAQs (${faqsData.length}+)`) },
    { id: 'PM Kisan', label: `PM Kisan (${categoryCounts['PM Kisan'] || 0})` },
    { id: 'Ladli Behna', label: `Ladli Behna (${categoryCounts['Ladli Behna'] || 0})` },
    { id: 'PM Awas & Ration Card', label: `PM Awas & Ration (${categoryCounts['PM Awas & Ration Card'] || 0})` },
    { id: 'Ayushman & Pension', label: `Ayushman & Pension (${categoryCounts['Ayushman & Pension'] || 0})` },
    { id: 'E-Shram & MGNREGA', label: `E-Shram & MGNREGA (${categoryCounts['E-Shram & MGNREGA'] || 0})` },
    { id: 'Mudra & MSME', label: `Mudra & MSME (${categoryCounts['Mudra & MSME'] || 0})` },
    { id: 'Kisan Schemes', label: `Kisan Schemes (${categoryCounts['Kisan Schemes'] || 0})` },
    { id: 'Scholarship & Skill', label: `Scholarship & Skill (${categoryCounts['Scholarship & Skill'] || 0})` },
    { id: 'General Process', label: `General Process (${categoryCounts['General Process'] || 0})` },
    { id: 'Helpline & State Yojanas', label: `Helpline & State (${categoryCounts['Helpline & State Yojanas'] || 0})` }
  ];

  // Scroll categories left or right
  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryNavRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      categoryNavRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filtered FAQs (supporting both Hindi and English fields)
  const filteredFaqs = useMemo(() => {
    return faqsData.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.cat === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query === '' ||
        item.q.toLowerCase().includes(query) ||
        item.a.toLowerCase().includes(query) ||
        (item.q_en && item.q_en.toLowerCase().includes(query)) ||
        (item.a_en && item.a_en.toLowerCase().includes(query)) ||
        item.cat.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });
  }, [faqsData, selectedCategory, searchQuery]);

  // Reset page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredFaqs.length / PAGE_SIZE) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentFaqs = useMemo(() => {
    return filteredFaqs.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredFaqs, startIndex]);

  // JSON-LD Schema for current page FAQs in active language
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: currentFaqs.map((f) => ({
      '@type': 'Question',
      name: lang === 'en' ? (f.q_en || f.q) : f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: lang === 'en' ? (f.a_en || f.a) : f.a
      }
    }))
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top of list container
      const listElement = document.getElementById('faqs-list-container');
      if (listElement) {
        listElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={t(
          '1,000+ सरकारी योजना FAQ Hub 2026: हर सवाल का verified उत्तर | YojnaSaathi.org',
          '1,000+ Sarkari Yojana FAQs Directory 2026: Official Answers'
        )}
        description={t(
          'PM Kisan, PM Awas, Ayushman Bharat, Ladli Behna, Mudra Loan, E-Shram, MGNREGA, aur sabhi sarkari yojanao ke 1000 verified FAQs aur solution guide.',
          'Comprehensive directory of 1,000+ verified FAQs for all Indian government schemes in 2026. PM Kisan, PM Awas, Ayushman Card, Ladli Behna, Mudra Loan & more.'
        )}
        canonicalUrl="https://www.yojnasaathi.org/faqs"
        jsonLdSchema={faqSchema}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: lang === 'hi' ? '1,000+ प्रश्नोत्तरी FAQs' : '1,000+ Yojana FAQs' }
          ]}
        />

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-blue-800/40 shadow-lg space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Yojana Knowledgebase 2026 (1,000 FAQs)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t(
              '1,000+ सरकारी योजनाओं के प्रश्न व समाधान (Sarkari Yojana FAQ Hub)',
              '1,000+ Government Schemes FAQs Directory 2026'
            )}
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {t(
              'पीएम किसान 17वीं किस्त, पीएम आवास 2026 लिस्ट, आयुष्मान 5 लाख कार्ड, लाडली बहना, ई-श्रम, मुद्रा लोन, फसल बीमा और सभी सरकारी योजनाओं के 1,000 से अधिक प्रश्नों के सटीक उत्तर।',
              'Explore 1,000+ verified FAQs across 10 scheme categories. Get instant solutions for application status, eKYC issues, land seeding, eligibility, and helpline numbers.'
            )}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('1,000 अनूठे सवाल व समाधान', '1,000 Unique Q&As')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-300 bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-800">
              <Layers className="w-4 h-4" />
              <span>{t('10 श्रेणीवार वर्गीकरण', '10 Scheme Categories')}</span>
            </div>
          </div>
        </div>

        {/* Highlighted Section: PM Kisan 20 FAQs Dedicated Module */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t('विशेष केंद्र बिंदु: पीएम किसान सम्मान निधि 2026 FAQs', 'Featured Module: PM Kisan Samman Nidhi 2026 FAQs')}
              </h2>
            </div>
            <a
              href="/pm-kisan-faqs"
              className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>{t('पीएम किसान विशेष पेज देखें', 'View Dedicated PM Kisan FAQ Page')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <PMKisanFaqSection />
        </div>

        {/* Global FAQs Search, Filter & Paginated Hub */}
        <div
          id="faqs-list-container"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{t('1,000+ सरकारी योजना डायरेक्टरी प्रश्नोत्तर', 'Browse 1,000+ Government Scheme FAQs')}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t('अपनी योजना या विषय का नाम टाइप करके या श्रेणी चुनकर 1000 सवालों में से सही उत्तर खोजें।', 'Search by keywords, scheme names or filter by category to find exact solutions.')}
              </p>
            </div>

            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3.5 py-2 rounded-xl shrink-0">
              {filteredFaqs.length} {t('सवाल मिले', 'FAQs Found')} (Page {currentPage} of {totalPages})
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('1,000 सवालों में खोजें (उदा. eKYC, kist date, Awas list, Mudra loan, Ayushman)...', 'Search across 1,000 FAQs (e.g., eKYC, kist date, Awas list, Mudra loan, Ayushman)...')}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Category Filter Chips with Horizontal Scroll and Navigation Arrows */}
          <div className="relative flex items-center gap-1">
            <button
              onClick={() => scrollCategories('left')}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer shrink-0 z-10 transition"
              title="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={categoryNavRef}
              className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide scroll-smooth w-full"
            >
              <div className="flex gap-2 min-w-max">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-sm font-bold'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollCategories('right')}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer shrink-0 z-10 transition"
              title="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* FAQ Accordion List (20 items per page) */}
          <div className="space-y-3 min-h-[300px]">
            {currentFaqs.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t('आपके द्वारा खोजा गया सवाल या विषय नहीं मिला।', 'No matching FAQs found for your search query.')}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                >
                  {t('सभी फ़िल्टर हटाएं और 1,000 सवाल देखें', 'Reset Filters & Show All 1,000 FAQs')}
                </button>
              </div>
            ) : (
              currentFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                const displayQuestion = lang === 'en' ? (faq.q_en || faq.q) : faq.q;
                const displayAnswer = lang === 'en' ? (faq.a_en || faq.a) : faq.a;

                return (
                  <div
                    key={faq.id}
                    id={faq.slug}
                    className={`border rounded-xl transition duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-blue-500 bg-blue-50/20 dark:bg-blue-950/20 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] font-bold">
                          <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                            #{faq.id}
                          </span>
                          <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-2.5 py-0.5 rounded-full">
                            {faq.cat}
                          </span>
                        </div>
                        <h3 className="text-sm md:text-base font-semibold leading-snug line-clamp-2 md:line-clamp-none break-words whitespace-normal text-slate-900 dark:text-white">
                          {displayQuestion}
                        </h3>
                      </div>

                      <div className="mt-1 shrink-0 p-1 rounded-full bg-slate-100 dark:bg-slate-700">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-5 pt-2 sm:px-5 border-t border-slate-200/80 dark:border-slate-700/80 space-y-3">
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal break-words">
                          {displayAnswer}
                        </p>

                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700/60 pt-2">
                          <span>Updated: August 2026 | Verified Source</span>
                          <Link
                            href={`/faq/${faq.slug}`}
                            className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <span>{t('पूरा सवाल और आधिकारिक समाधान देखें', 'View Dedicated FAQ Page')}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Controls (20 FAQs Per Page) */}
          {totalPages > 1 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Showing <span className="font-bold text-slate-900 dark:text-white">{startIndex + 1}</span> to{' '}
                <span className="font-bold text-slate-900 dark:text-white">
                  {Math.min(startIndex + PAGE_SIZE, filteredFaqs.length)}
                </span>{' '}
                of <span className="font-bold text-slate-900 dark:text-white">{filteredFaqs.length}</span> FAQs
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <div className="flex items-center gap-1 text-xs">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = currentPage - 3 + i;
                      if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-lg font-bold transition cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
