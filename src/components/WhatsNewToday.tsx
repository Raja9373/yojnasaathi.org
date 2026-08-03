import React, { useState } from 'react';
import { Link } from 'wouter';
import { Sparkles, Calendar, ArrowRight, Bell, Clock, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';
import { BLOG_ARTICLES } from '../data/blogArticles';

export const WhatsNewToday: React.FC = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'schemes' | 'updates' | 'blogs'>('all');

  // Today's date string format e.g. "03 Aug 2026"
  const todayStr = '03 Aug 2026';

  // Extract newly launched schemes (first 5 of database)
  const newlyLaunched = MASTER_SCHEMES_DATABASE.slice(0, 4);

  // Extract updated schemes
  const recentlyUpdated = MASTER_SCHEMES_DATABASE.slice(4, 8);

  // Extract latest blogs
  const latestBlogs = BLOG_ARTICLES.slice(0, 3);

  return (
    <section className="bg-gradient-to-b from-blue-50/60 to-white dark:from-slate-900 dark:to-slate-900/50 py-12 px-4 sm:px-6 lg:px-8 border-y border-slate-200/60 dark:border-slate-800 my-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'hi' ? `आज का नया अपडेट (${todayStr})` : `What's New Today (${todayStr})`}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lang === 'hi' ? 'ताज़ा सरकारी योजनाएं एवं अधिसूचनाएं' : 'Latest Government Notifications & Schemes'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {lang === 'hi'
                ? 'आज जारी नई योजनाएं, संशोधित दिशानिर्देश एवं सरकारी सब्सिडी समाचार।'
                : 'Newly launched schemes, revised subsidy guidelines, and official updates.'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'hi' ? 'सभी अपडेट्स' : 'All Updates'}
            </button>
            <button
              onClick={() => setActiveTab('schemes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === 'schemes'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'hi' ? 'नई योजनाएं' : 'New Schemes'}
            </button>
            <button
              onClick={() => setActiveTab('updates')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === 'updates'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'hi' ? 'संशोधन एवं अपडेट्स' : 'Revised Schemes'}
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === 'blogs'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'hi' ? 'ब्लॉग व गाइड' : 'Latest Blogs'}
            </button>
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'all' || activeTab === 'schemes') &&
            newlyLaunched.map((s) => (
              <div
                key={`new-${s.id}`}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Bell className="w-3 h-3 text-emerald-600" />
                      {lang === 'hi' ? 'नया लॉन्च' : 'Newly Launched'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{s.updated_at}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 line-clamp-2">
                    {lang === 'hi' ? s.title_hi : s.title_en}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 mb-4">
                    {lang === 'hi' ? s.summary_hi : s.summary_en}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {lang === 'hi' ? s.benefit_amount_hi : s.benefit_amount_en}
                  </span>
                  <Link
                    href={`/yojana/${s.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <span>{lang === 'hi' ? 'विवरण देखें' : 'View Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}

          {(activeTab === 'all' || activeTab === 'updates') &&
            recentlyUpdated.map((s) => (
              <div
                key={`upd-${s.id}`}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-600" />
                      {lang === 'hi' ? 'पात्रता अद्यतन' : 'Updated Guidelines'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{s.updated_at}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 line-clamp-2">
                    {lang === 'hi' ? s.title_hi : s.title_en}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 mb-4">
                    {lang === 'hi' ? s.summary_hi : s.summary_en}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {s.state === 'all' ? 'Central Govt' : s.state}
                  </span>
                  <Link
                    href={`/yojana/${s.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <span>{lang === 'hi' ? 'विवरण देखें' : 'View Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}

          {(activeTab === 'all' || activeTab === 'blogs') &&
            latestBlogs.map((b) => (
              <div
                key={`blog-${b.id}`}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Tag className="w-3 h-3 text-purple-600" />
                      {b.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{b.updated_at}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 line-clamp-2">
                    {lang === 'hi' ? b.title_hi : b.title_en}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 mb-4">
                    {lang === 'hi' ? b.excerpt_hi : b.excerpt_en}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{b.read_time_minutes} min read</span>
                  <Link
                    href={`/blog/${b.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 dark:text-purple-400 hover:underline"
                  >
                    <span>{lang === 'hi' ? 'गाइड पढ़ें' : 'Read Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
