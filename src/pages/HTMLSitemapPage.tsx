import React from 'react';
import { Link } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';
import { CATEGORIES, STATES_LIST } from '../data/statesAndCategories';
import { Layers, ArrowRight, Bookmark, Building2, MapPin, ShieldCheck } from 'lucide-react';

export const HTMLSitemapPage: React.FC = () => {
  const { lang, t } = useLanguage();

  const curatedSchemes = MASTER_SCHEMES_DATABASE;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6">
      <SEOHead
        title={t('एचटीएमएल साइटमैप (HTML Sitemap) - YojanaSaathi.org', 'HTML Sitemap - YojanaSaathi.org Index')}
        description={t(
          'YojanaSaathi.org के सभी 4,772+ योजनाओं, श्रेणियों, राज्यों एवं नीतियों का संपूर्ण इंडेक्स।',
          'Complete index of all 4,772+ government schemes, states, categories, and legal policy pages on YojanaSaathi.org.'
        )}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-[#1E3A8A] text-white p-8 rounded-3xl shadow-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('नेविगेशन इंडेक्स', 'Site Index')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('वेबसाइट साइटमैप (YojanaSaathi HTML Sitemap)', 'YojanaSaathi HTML Sitemap')}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl leading-relaxed">
            {t(
              'हमारी वेबसाइट के सभी मुख्य पृष्ठों, राज्यों की 4,772+ योजनाओं व श्रेणियों का सुव्यवस्थित सूचकांक।',
              'Structured visual sitemap indexing all 4,772+ central & state schemes, category hubs, and policy pages.'
            )}
          </p>
        </div>

        {/* Section 1: Main Pages & Policies */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            <span>{t('मुख्य पृष्ठ एवं नीतियां (Main Pages & Legal Policies)', 'Main Pages & Policies')}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs font-bold">
            <Link href="/" className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200 rounded-xl transition flex items-center justify-between">
              <span>{t('होम पेज', 'Home Page')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link href="/find-yojana" className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 rounded-xl transition flex items-center justify-between">
              <span>{t('पात्रता जाँच टूल', 'Eligibility Checker')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </Link>
            <Link href="/yojanas" className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200 rounded-xl transition flex items-center justify-between">
              <span>{t('सभी 4,772+ योजनाएं', 'All 4,772+ Schemes')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link href="/about" className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200 rounded-xl transition flex items-center justify-between">
              <span>{t('हमारे बारे में', 'About Us')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link href="/contact" className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200 rounded-xl transition flex items-center justify-between">
              <span>{t('संपर्क करें', 'Contact Us')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link href="/privacy-policy" className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200 rounded-xl transition flex items-center justify-between">
              <span>{t('गोपनीयता नीति', 'Privacy Policy')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link href="/terms-and-conditions" className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200 rounded-xl transition flex items-center justify-between">
              <span>{t('नियम एवं शर्तें', 'Terms & Conditions')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link href="/disclaimer" className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200 rounded-xl transition flex items-center justify-between">
              <span>{t('अस्वीकरण', 'Disclaimer')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Section 2: Popular Categories */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>{t('योजना श्रेणियां (Scheme Categories)', 'Browse by Category')}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs font-medium">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 rounded-xl transition flex items-center justify-between"
              >
                <span>{t(cat.name_hi, cat.name_en)}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 3: All 36 States & UTs */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-600" />
            <span>{t('राज्य एवं केंद्र शासित प्रदेश (36 States & UTs Hubs)', 'All 36 States & UTs Hubs')}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
            {STATES_LIST.filter(st => st.code !== 'all').map((st) => (
              <Link
                key={st.slug}
                href={`/state/${st.slug}`}
                className="p-2.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 rounded-lg transition flex items-center justify-between"
              >
                <span>{st.name_hi}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 4: Popular Schemes List */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600" />
            <span>{t('लोकप्रिय योजनाएं (Featured Popular Schemes)', 'Popular Schemes Index')}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {curatedSchemes.map((s) => (
              <Link
                key={s.id}
                href={`/yojana/${s.slug}`}
                className="p-3 bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-amber-950 border border-slate-200 rounded-xl transition flex items-start gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                <div>
                  <span className="font-bold block">{t(s.title_hi, s.title_en)}</span>
                  <span className="text-[10px] text-slate-500">{t(s.benefit_amount_hi, s.benefit_amount_en)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
