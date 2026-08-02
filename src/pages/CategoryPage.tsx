import React from 'react';
import { useRoute, useLocation } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { SchemeCard } from '../components/SchemeCard';
import { searchSchemesDatabase } from '../data/schemeDatabase';
import { CATEGORIES } from '../data/statesAndCategories';
import { 
  Sprout, 
  HeartHandshake, 
  Baby, 
  GraduationCap, 
  Briefcase, 
  Home as HomeIcon, 
  UserCheck, 
  Activity,
  Percent,
  ArrowLeft
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Sprout,
  HeartHandshake,
  Baby,
  GraduationCap,
  Briefcase,
  Home: HomeIcon,
  UserCheck,
  Activity,
  Percent
};

export const CategoryPage: React.FC = () => {
  const [match, params] = useRoute<{ slug: string }>('/category/:slug');
  const [, navigate] = useLocation();
  const { lang, t } = useLanguage();

  const categorySlug = match && params ? params.slug : '';
  const categoryInfo = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!categoryInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">
          {t('श्रेणी नहीं मिली', 'Category Not Found')}
        </h1>
        <button
          onClick={() => navigate('/yojanas')}
          className="bg-[#1E40AF] text-white text-xs font-bold px-6 py-2 rounded-xl"
        >
          {t('सभी योजनाएं देखें', 'View All Schemes')}
        </button>
      </div>
    );
  }

  const categorySchemes = searchSchemesDatabase({
    category: categorySlug
  });

  const IconComp = iconMap[categoryInfo.icon] || Sprout;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <SEOHead
        title={t(`${categoryInfo.name_hi} सरकारी योजनाएं व सब्सिडी - YojanaSaathi.org`, `${categoryInfo.name_en} Govt Schemes & Subsidies`)}
        description={t(categoryInfo.description_hi, categoryInfo.description_en)}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb & Back button */}
        <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 hover:text-blue-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('होम', 'Home')}</span>
          </button>
          <span>/</span>
          <span className="font-bold text-slate-900">{t(categoryInfo.name_hi, categoryInfo.name_en)}</span>
        </div>

        {/* Category Header Banner */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${categoryInfo.bgColor}`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center ${categoryInfo.textColor}`}>
              <IconComp className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {t(categoryInfo.name_hi, categoryInfo.name_en)}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t(categoryInfo.description_hi, categoryInfo.description_en)}
              </p>
              <span className="inline-block mt-2 text-xs font-bold px-3 py-1 bg-white rounded-full text-slate-800 shadow-xs border border-slate-200">
                {categorySchemes.length} {t('सक्रिय योजनाएं व सब्सिडी उपलब्ध', 'Active Schemes & Subsidies')}
              </span>
            </div>
          </div>
        </div>

        {/* Schemes Grid */}
        {categorySchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorySchemes.slice(0, 30).map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
            {t('इस श्रेणी में फ़िलहाल कोई योजना दर्ज नहीं है।', 'No schemes currently listed under this category.')}
          </div>
        )}
      </div>
    </div>
  );
};
