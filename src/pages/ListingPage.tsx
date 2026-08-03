import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { SchemeCard } from '../components/SchemeCard';
import { searchSchemesDatabase, MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';
import { CATEGORIES, STATES_LIST } from '../data/statesAndCategories';
import { getDidYouMeanSuggestion } from '../utils/searchEngine';
import { Search, Filter, RotateCcw, ChevronLeft, ChevronRight, LayoutGrid, Percent, Sparkles, HelpCircle } from 'lucide-react';

export const ListingPage: React.FC = () => {
  const { lang, t } = useLanguage();

  // Parse initial query params from URL
  const searchParams = new URLSearchParams(window.location.search);
  const initialType = searchParams.get('type') || 'all';
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSubsidy = searchParams.get('subsidy') === 'true';

  const [type, setType] = useState(initialType);
  const [category, setCategory] = useState(initialCategory);
  const [selectedState, setSelectedState] = useState('all');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [onlySubsidy, setOnlySubsidy] = useState(initialSubsidy);
  const [sortBy, setSortBy] = useState<'newest' | 'title'>('newest');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // 21 schemes per page for clean 3-column grid

  // Filter Logic across 4,770 schemes
  const filteredSchemes = useMemo(() => {
    let result = searchSchemesDatabase({
      query: searchQuery,
      category,
      type,
      state: selectedState,
      isSubsidyOnly: onlySubsidy
    });

    if (sortBy === 'title') {
      result = [...result].sort((a, b) => a.title_en.localeCompare(b.title_en));
    } else {
      result = [...result].sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));
    }

    return result;
  }, [type, category, selectedState, searchQuery, onlySubsidy, sortBy]);

  // Pagination Logic
  const totalPages = Math.max(Math.ceil(filteredSchemes.length / itemsPerPage), 1);
  const paginatedSchemes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSchemes.slice(start, start + itemsPerPage);
  }, [filteredSchemes, currentPage, itemsPerPage]);

  const handleReset = () => {
    setType('all');
    setCategory('all');
    setSelectedState('all');
    setSearchQuery('');
    setOnlySubsidy(false);
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <SEOHead
        title={t('सभी 4,770+ सरकारी योजनाएं व सब्सिडी निर्देशिका 2026 - YojnaSaathi.org', 'All 4,770+ Govt Schemes & Subsidies 2026')}
        description={t(
          'भारत सरकार एवं सभी 36 राज्यों व केंद्र शासित प्रदेशों की सभी 4,770+ सरकारी योजनाओं व सब्सिडी की सूची।',
          'Explore and search through all 4,770+ central and state government schemes & subsidies in India.'
        )}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Title Banner */}
        <div className="bg-[#1E3A8A] text-white p-6 sm:p-8 rounded-3xl shadow-md relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {t('राष्ट्रीय योजना एवं सब्सिडी पोर्टल', 'National Scheme & Subsidy Directory')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t('सभी 4,770+ सरकारी योजनाएं व सब्सिडी (All 4,770+ Schemes)', 'All 4,770+ Government Schemes & Subsidies')}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-3xl">
            {t(
              'केन्द्रीय एवं सभी राज्य सरकारों (उत्तर प्रदेश, बिहार, मध्य प्रदेश, राजस्थान, महाराष्ट्र, तमिलनाडु आदि) की सभी सक्रिय योजनाएं और सब्सिडी अनुदान।',
              'Search, filter and find detailed application steps for all 4,770+ central and state government schemes.'
            )}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-blue-900/80 px-3.5 py-1.5 rounded-full border border-blue-700/80 text-xs text-amber-300 font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t('कुल पंजीकृत योजनाएं: 4,770+', 'Total Indexed Schemes: 4,770+')}</span>
          </div>
        </div>

        {/* Filters Bar Box */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={t('योजना या सब्सिडी का नाम खोजें...', 'Search scheme or subsidy...')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Type Selector */}
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
            >
              <option value="all">{t('सभी प्रकार (All Types)', 'All Types')}</option>
              <option value="central">{t('केन्द्रीय योजनाएं (Central)', 'Central Schemes')}</option>
              <option value="state">{t('राज्य योजनाएं (State)', 'State Schemes')}</option>
            </select>

            {/* Category Selector */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
            >
              <option value="all">{t('सभी श्रेणियां (All Categories)', 'All Categories')}</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {t(cat.name_hi, cat.name_en)}
                </option>
              ))}
            </select>

            {/* State Selector */}
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
            >
              {STATES_LIST.map((st) => (
                <option key={st.code} value={st.name_en === 'All States (Central Schemes)' ? 'all' : st.name_en}>
                  {t(st.name_hi, st.name_en)}
                </option>
              ))}
            </select>

            {/* Sort Selector & Reset */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
              >
                <option value="newest">{t('नवीनतम (Newest First)', 'Newest First')}</option>
                <option value="title">{t('नाम (A to Z)', 'Title A-Z')}</option>
              </select>

              <button
                onClick={handleReset}
                title={t('फ़िल्टर साफ़ करें', 'Reset Filters')}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 cursor-pointer transition shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subsidy Quick Toggle Bar */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
            <label className="flex items-center gap-2 cursor-pointer bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 text-amber-900 hover:bg-amber-100 transition">
              <input
                type="checkbox"
                checked={onlySubsidy}
                onChange={(e) => {
                  setOnlySubsidy(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 text-amber-600 rounded border-slate-300"
              />
              <Percent className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('केवल सब्सिडी योजनाएं दिखाएं (Govt Subsidies)', 'Show Govt Subsidies Only')}</span>
            </label>

            <div className="text-slate-600 flex items-center gap-2">
              <span className="font-bold text-blue-900">
                {t(
                  `4,772 में से ${filteredSchemes.length} परिणाम मिले`,
                  `Showing ${filteredSchemes.length} of 4,772 schemes`
                )}
              </span>
              <span>•</span>
              <span>
                {t(`पृष्ठ ${currentPage} / ${totalPages}`, `Page ${currentPage} of ${totalPages}`)}
              </span>
            </div>
          </div>
        </div>

        {/* Did You Mean Banner */}
        {(() => {
          const didYouMean = getDidYouMeanSuggestion(searchQuery);
          if (!didYouMean) return null;
          return (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">
                    Did you mean: <button onClick={() => setSearchQuery(didYouMean.suggestion)} className="text-blue-700 underline font-extrabold hover:text-blue-900 cursor-pointer">{didYouMean.suggestion}</button>?
                  </p>
                  <p className="text-slate-600 text-xs mt-0.5">{didYouMean.explanationText}</p>
                </div>
              </div>
              <button
                onClick={() => setSearchQuery(didYouMean.suggestion)}
                className="bg-[#1E40AF] hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer shadow-xs shrink-0"
              >
                Search "{didYouMean.suggestion}"
              </button>
            </div>
          );
        })()}

        {/* Scheme Cards Grid */}
        {paginatedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-slate-200">
            <Filter className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {t('कोई परिणाम नहीं मिला', 'No Schemes Found')}
            </h3>
            <p className="text-xs text-slate-500">
              {t('कृपया अपनी खोज शब्दावली अथवा फ़िल्टर बदलें।', 'Please try adjusting your search terms or filters.')}
            </p>
            <button
              onClick={handleReset}
              className="bg-[#1E40AF] text-white text-xs font-bold px-6 py-2 rounded-xl"
            >
              {t('फ़िल्टर रीसेट करें', 'Reset Filters')}
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 bg-white p-4 rounded-2xl shadow-sm">
            <div className="text-xs text-slate-600 font-medium">
              {t(
                `कुल ${filteredSchemes.length} योजनाओं में से ${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, filteredSchemes.length)} प्रदर्शित`,
                `Displaying ${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, filteredSchemes.length)} of ${filteredSchemes.length} total schemes`
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs font-bold text-slate-700"
              >
                {t('प्रथम (First)', 'First')}
              </button>

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Number Pills */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                  let pageNum = currentPage;
                  if (currentPage <= 3) {
                    pageNum = idx + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + idx;
                  } else {
                    pageNum = currentPage - 2 + idx;
                  }
                  if (pageNum < 1 || pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#1E40AF] text-white shadow-md'
                          : 'bg-white hover:bg-slate-100 border border-slate-300 text-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-slate-700"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs font-bold text-slate-700"
              >
                {t('अंतिम (Last)', 'Last')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
