import React from 'react';
import { Link } from 'wouter';
import { PlusCircle, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';

export const RecentlyAddedSchemes: React.FC = () => {
  const { lang } = useLanguage();

  // Get recently added schemes (latest 6)
  const recentSchemes = MASTER_SCHEMES_DATABASE.slice(0, 6);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'hi' ? 'हाल ही में जोड़ी गई योजनाएं' : 'Recently Added Schemes'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'पोर्टल पर हाल में शामिल की गई नई केंद्रीय व राज्य स्तरीय योजनाएं।'
              : 'Newly listed schemes across all categories and states.'}
          </p>
        </div>

        <Link
          href="/yojanas"
          className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <span>{lang === 'hi' ? 'सभी देखें' : 'View All'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recentSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 font-bold px-2.5 py-0.5 rounded-md uppercase">
                  {scheme.category}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {scheme.updated_at}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 line-clamp-2">
                {lang === 'hi' ? scheme.title_hi : scheme.title_en}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-3 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{scheme.type === 'central' ? 'Central Govt (All India)' : scheme.state}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {lang === 'hi' ? scheme.benefit_amount_hi : scheme.benefit_amount_en}
              </span>

              <Link
                href={`/yojana/${scheme.slug}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                {lang === 'hi' ? 'विवरण देखें' : 'View Details'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
