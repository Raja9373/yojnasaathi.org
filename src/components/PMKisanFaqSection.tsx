import React, { useState } from 'react';
import pmKisanFaqs from '../data/pm-kisan-faqs.json';
import pmKisanFaqSchema from '../data/pm-kisan-faq-schema.json';
import { Search, ChevronDown, ChevronUp, Tag, HelpCircle, Calendar, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PMKisanFaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [openFaqId, setOpenFaqId] = useState<number | null>(1); // Open 1st FAQ by default

  const allTags = ['ALL', 'PM Kisan Status', 'PM Kisan Registration', 'PM Kisan eKYC', 'PM Kisan Beneficiary List', 'PM Kisan 2026', 'PM Kisan Online Apply'];

  const filteredFaqs = pmKisanFaqs.filter((faq) => {
    const matchesTag = selectedTag === 'ALL' || faq.tags.includes(selectedTag);
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      faq.answer_html.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      {/* Inject Schema JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pmKisanFaqSchema) }}
      />

      {/* Section Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PM Kisan Samman Nidhi 2026 FAQ Hub</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>{t('पीएम किसान योजना: 20 सबसे महत्वपूर्ण सवाल व उत्तर (May 2026)', 'PM Kisan Yojana: 20 Most Searched FAQs & Solutions (May 2026)')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {t(
              '17th kist status, eKYC, new registration, land seeding, aur bank account link se jude sabhi prasno ke aadhikarik samadhan.',
              'Verified step-by-step guides for PM Kisan 17th installment, eKYC status, beneficiary list, and Aadhaar bank seeding.'
            )}
          </p>
        </div>

        <div className="text-right shrink-0 hidden sm:block">
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 font-bold px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Official Source Verified</span>
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('PM Kisan status, eKYC, ya kist se juda apna sawal khojen...', 'Search PM Kisan FAQs by keyword (e.g. eKYC, status, 17th kist)...')}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tag === 'ALL' ? t('सभी सवाल (20)', 'All Questions (20)') : tag}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3 pt-2">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('Aapke dwara khoja gaya sawal nahi mila.', 'No matching FAQ found for your query.')}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('ALL');
              }}
              className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
            >
              {t('सभी 20 सवाल पुनः देखें', 'Reset Filters & View All 20 FAQs')}
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                id={faq.slug}
                className={`border rounded-xl transition duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-blue-500/80 bg-blue-50/20 dark:bg-blue-950/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                }`}
              >
                {/* FAQ Header Button */}
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-bold">
                        Q{faq.id}
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                      {faq.tags.slice(0, 2).map((t) => (
                        <span key={t} className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <Tag className="w-2.5 h-2.5 text-blue-500" />
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {faq.question}
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

                {/* FAQ Expanded HTML Answer */}
                {isOpen && (
                  <div className="px-4 pb-5 pt-2 sm:px-5 border-t border-slate-200/80 dark:border-slate-700/80 space-y-4">
                    {/* HTML Content */}
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal
                        [&_p]:mb-2 [&_p]:leading-relaxed
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ul]:space-y-1
                        [&_li]:text-slate-800 dark:[&_li]:text-slate-200
                        [&_b]:text-slate-900 dark:[&_b]:text-white
                        [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:font-semibold [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: faq.answer_html }}
                    />

                    {/* Metadata Footer bar */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Updated: {faq.last_updated}
                        </span>
                        <span>•</span>
                        <a
                          href={faq.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                        >
                          Source: pmkisan.gov.in
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {faq.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded text-[10px]"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
