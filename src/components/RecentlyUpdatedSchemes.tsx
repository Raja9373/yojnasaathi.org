import React from 'react';
import { Link } from 'wouter';
import { RefreshCw, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';

export const RecentlyUpdatedSchemes: React.FC = () => {
  const { lang } = useLanguage();

  // Get recently updated schemes (items 6 to 12)
  const updatedSchemes = MASTER_SCHEMES_DATABASE.slice(6, 12);

  const mockUpdatedFieldsList = [
    { hi: 'पात्रता आय सीमा बढ़ाई गई (Income Eligibility Revised)', en: 'Income Eligibility Threshold Revised' },
    { hi: 'नया डीबीटी पोर्टल आवेदन लिंक जोड़ा गया', en: 'New DBT Online Direct Portal Link Added' },
    { hi: 'आवश्यक दस्तावेज सूची अपडेट (Aadhaar Seeded mandatory)', en: 'Required Documents List Updated' },
    { hi: 'आवेदन की अंतिम तिथि विस्तारित 2026', en: 'Application Deadline Extended for 2026' },
    { hi: 'सब्सिडी दर में 15% वृद्धि', en: 'Subsidy Percentage Increased' },
    { hi: 'हेल्पलाइन व नोडल अधिकारी संपर्क सूची अद्यतन', en: 'Helpline & Nodal Contact Directory Updated' },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <span>{lang === 'hi' ? 'हाल ही में अद्यतन (Updated) योजनाएं' : 'Recently Updated Schemes'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'hi'
              ? 'जिन योजनाओं के नियमों, डीबीटी पोर्टल या दिशा-निर्देशों में हाल ही में संशोधन किया गया है।'
              : 'Schemes with recently revised guidelines, portal links, or eligibility changes.'}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {updatedSchemes.map((scheme, idx) => {
          const fieldUpdate = mockUpdatedFieldsList[idx % mockUpdatedFieldsList.length];
          const updateText = lang === 'hi' ? fieldUpdate.hi : fieldUpdate.en;

          return (
            <div
              key={scheme.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    {scheme.updated_at}
                  </span>
                  <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    {scheme.type === 'central' ? 'Central' : scheme.state}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 line-clamp-2">
                  {lang === 'hi' ? scheme.title_hi : scheme.title_en}
                </h3>

                <div className="bg-blue-50/70 dark:bg-slate-700/50 p-2.5 rounded-xl text-xs text-slate-700 dark:text-slate-300 mb-4 border border-blue-100 dark:border-slate-600">
                  <div className="font-bold text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                    <span>{lang === 'hi' ? 'क्या अपडेट हुआ:' : 'Updated Fields:'}</span>
                  </div>
                  <p className="line-clamp-2 text-slate-600 dark:text-slate-300 font-medium">
                    {updateText}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {lang === 'hi' ? scheme.benefit_amount_hi : scheme.benefit_amount_en}
                </span>

                <Link
                  href={`/yojana/${scheme.slug}`}
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  {lang === 'hi' ? 'विवरण देखें' : 'View Details'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
