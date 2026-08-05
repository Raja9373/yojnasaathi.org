import React from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { Scheme } from '../types';
import { CATEGORIES } from '../data/statesAndCategories';
import { isSchemeNew } from '../data/schemeDatabase';
import { Calendar, ArrowRight, Building2, CheckCircle, Award, Sparkles } from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  const { lang, t } = useLanguage();
  const [, navigate] = useLocation();

  const categoryObj = CATEGORIES.find((c) => c.slug === scheme.category);
  const isNew = isSchemeNew(scheme);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative">
      {/* Top Banner Image with Overlay Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={scheme.image || scheme.imageUrl || '/fallback-yojana.jpg'}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1591439584134-05b0c7a55c5a?q=80&w=600&auto=format&fit=crop';
            e.currentTarget.onerror = null;
          }}
          alt={lang === 'hi' ? scheme.title_hi : scheme.title_en}
          title={lang === 'hi' ? scheme.title_hi : scheme.title_en}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Central vs State Badge & NEW Badge */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-md uppercase tracking-wider ${
              scheme.type === 'central'
                ? 'bg-blue-900/90 text-blue-100 border border-blue-400/40'
                : 'bg-amber-800/90 text-amber-100 border border-amber-400/40'
            }`}>
              {scheme.type === 'central'
                ? t('केन्द्रीय योजना', 'Central Scheme')
                : `${t('राज्य', 'State')}: ${scheme.state}`}
            </span>

            {isNew && (
              <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-lg border border-red-300 animate-pulse flex items-center gap-1 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{t('नया', 'NEW')}</span>
              </span>
            )}
          </div>

          {/* Category Tag */}
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-900/80 text-amber-300 border border-slate-700 backdrop-blur-md">
            {categoryObj ? t(categoryObj.name_hi, categoryObj.name_en) : scheme.category}
          </span>
        </div>

        {/* Bottom Image Overlay: Benefit Highlight */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="bg-emerald-900/90 border border-emerald-400/50 text-emerald-200 text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-xs shadow-md">
            💰 {t(scheme.benefit_amount_hi, scheme.benefit_amount_en)}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Ministry */}
          <p className="text-[11px] font-medium text-blue-800 flex items-center gap-1.5 line-clamp-1 mb-1">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-blue-600" />
            <span>{t(scheme.ministry_hi, scheme.ministry_en)}</span>
          </p>

          {/* Title */}
          <h3 
            onClick={() => navigate(`/yojana/${scheme.slug}`)}
            className="text-base font-bold text-slate-900 hover:text-blue-700 transition cursor-pointer line-clamp-2 leading-snug"
          >
            {t(scheme.title_hi, scheme.title_en)}
          </h3>

          {/* Summary */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {t(scheme.summary_hi, scheme.summary_en)}
          </p>
        </div>

        {/* Footer Meta Details */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-orange-500" />
            <span>{t('अंतिम तिथि', 'Last Date')}: {t(scheme.last_date_hi, scheme.last_date_en)}</span>
          </div>

          <button
            onClick={() => navigate(`/yojana/${scheme.slug}`)}
            className="flex items-center gap-1 text-xs font-bold text-[#1E40AF] hover:text-blue-900 cursor-pointer group-hover:translate-x-1 transition-transform"
          >
            <span>{t('विवरण देखें', 'View Details')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
