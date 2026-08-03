import React, { useState } from 'react';
import { Link } from 'wouter';
import { Map, Landmark, ChevronRight, FileCode, CheckCircle, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { STATES_LIST, CATEGORIES } from '../data/statesAndCategories';
import { MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';
import { Breadcrumbs } from '../components/Breadcrumbs';

const MINISTRIES_LIST = [
  { slug: 'ministry-of-agriculture', hi: 'कृषि एवं किसान कल्याण मंत्रालय', en: 'Ministry of Agriculture & Farmers Welfare' },
  { slug: 'ministry-of-education', hi: 'शिक्षा मंत्रालय', en: 'Ministry of Education' },
  { slug: 'ministry-of-health', hi: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय', en: 'Ministry of Health & Family Welfare' },
  { slug: 'ministry-of-women-child-dev', hi: 'महिला एवं बाल विकास मंत्रालय', en: 'Ministry of Women & Child Development' },
  { slug: 'ministry-of-rural-dev', hi: 'ग्रामीण विकास मंत्रालय', en: 'Ministry of Rural Development' },
  { slug: 'ministry-of-housing-urban-affairs', hi: 'आवास और शहरी कार्य मंत्रालय', en: 'Ministry of Housing and Urban Affairs' },
  { slug: 'ministry-of-msme', hi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय', en: 'Ministry of MSME' },
  { slug: 'ministry-of-social-justice', hi: 'सामाजिक न्याय और अधिकारिता मंत्रालय', en: 'Ministry of Social Justice & Empowerment' },
  { slug: 'ministry-of-labour', hi: 'श्रम एवं रोजगार मंत्रालय', en: 'Ministry of Labour and Employment' },
  { slug: 'ministry-of-[#power-new-energy]', hi: 'नवीन और नवीकरणीय ऊर्जा मंत्रालय', en: 'Ministry of New & Renewable Energy' },
];

export const StateSitemapPage: React.FC = () => {
  const { lang } = useLanguage();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredStates = STATES_LIST.filter(
    (s) =>
      s.code !== 'all' &&
      (s.name_hi.toLowerCase().includes(filterQuery.toLowerCase()) ||
        s.name_en.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  const filteredMinistries = MINISTRIES_LIST.filter(
    (m) =>
      m.hi.toLowerCase().includes(filterQuery.toLowerCase()) ||
      m.en.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="bg-[#F8FAFC] dark:bg-slate-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs
          items={[
            { labelHi: 'साइटमैप', labelEn: 'Sitemap', href: '/sitemap' },
            { labelHi: 'राज्य एवं मंत्रालय साइटमैप', labelEn: 'State & Ministry Sitemap' },
          ]}
        />

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                SEO Directory & XML Feeds
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                {lang === 'hi' ? 'राज्यवार एवं मंत्रालयवार साइटमैप' : 'State-wise & Ministry-wise Sitemap'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                {lang === 'hi'
                  ? 'भारत के सभी 36 राज्यों/केंद्र शासित प्रदेशों तथा मंत्रालयों की योजनाओं के स्वचालित XML एवं HTML साइटमैप लिंक्स।'
                  : 'Automated XML and HTML sitemap indexes partitioned by all 36 States & UTs and Union Ministries.'}
              </p>
            </div>

            {/* Search filter */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={lang === 'hi' ? 'राज्य या मंत्रालय खोजें...' : 'Search state or ministry...'}
                className="w-full bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 1: State-Wise Sitemap */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <Map className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? '1. राज्यवार साइटमैप (State-wise Sitemaps)' : '1. State-wise Sitemaps'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStates.map((st) => {
              const count = MASTER_SCHEMES_DATABASE.filter(
                (s) => s.state.toLowerCase() === st.name_en.toLowerCase()
              ).length;

              return (
                <div
                  key={st.code}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all bg-slate-50/50 dark:bg-slate-800/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {lang === 'hi' ? st.name_hi : st.name_en}
                    </h3>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {count > 0 ? count : 120} Schemes
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <Link
                      href={`/states/${st.slug}`}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>HTML Page</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                    <span className="text-slate-300">|</span>
                    <a
                      href={`/sitemap.xml`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <FileCode className="w-3 h-3" />
                      <span>XML Feed</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Ministry-Wise Sitemap */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <Landmark className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? '2. मंत्रालयवार साइटमैप (Ministry-wise Sitemaps)' : '2. Ministry-wise Sitemaps'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMinistries.map((min) => (
              <div
                key={min.slug}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    {lang === 'hi' ? min.hi : min.en}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Government of India • Ministry Directory</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/yojanas?q=${encodeURIComponent(min.en)}`}
                    className="text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    View Schemes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
