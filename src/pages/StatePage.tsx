import React, { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { SchemeCard } from '../components/SchemeCard';
import { searchSchemesDatabase } from '../data/schemeDatabase';
import { STATES_LIST } from '../data/statesAndCategories';
import { MapPin, ArrowLeft, Building, Percent, Sparkles, Filter } from 'lucide-react';

export const StatePage: React.FC = () => {
  const [match, params] = useRoute<{ slug: string }>('/state/:slug');
  const [, navigate] = useLocation();
  const { lang, t } = useLanguage();

  const stateSlug = match && params ? params.slug : '';
  const stateObj = STATES_LIST.find((s) => s.slug === stateSlug);

  const [activeTab, setActiveTab] = useState<'all' | 'subsidies'>('all');

  if (!stateObj) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">
          {t('राज्य की जानकारी नहीं मिली', 'State Not Found')}
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

  // Filter state specific schemes AND central schemes valid in state
  const allStateSchemes = searchSchemesDatabase({
    state: stateObj.name_en
  });

  const stateSubsidies = allStateSchemes.filter(s => 
    s.tags.some(t => t.includes('सब्सिडी') || t.includes('subsidy')) || 
    s.title_hi.includes('सब्सिडी') || 
    s.title_en.toLowerCase().includes('subsidy')
  );

  const displayedSchemes = activeTab === 'subsidies' ? stateSubsidies : allStateSchemes;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <SEOHead
        title={t(`${stateObj.name_hi} सरकारी योजनाएं व सब्सिडी - YojnaSaathi.org`, `${stateObj.name_en} Govt Schemes & Subsidies`)}
        description={t(
          `${stateObj.name_hi} राज्य की सभी प्रमुख सरकारी योजनाओं एवं सोलर, कृषि उपकरण, ईवी व डेयरी सब्सिडी की जानकारी।`,
          `Explore all active state schemes and government subsidies available in ${stateObj.name_en}.`
        )}
        canonicalUrl={`https://www.yojnasaathi.org/state/${stateSlug}`}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 hover:text-blue-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('होम', 'Home')}</span>
          </button>
          <span>/</span>
          <span className="font-bold text-slate-900">{t(stateObj.name_hi, stateObj.name_en)}</span>
        </div>

        {/* State Banner */}
        <div className="bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-extrabold shadow-md shrink-0">
                <Building className="w-9 h-9 text-blue-900" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t('राज्य पोर्टल', 'State Welfare Directory')}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold">
                  {t(stateObj.name_hi, stateObj.name_en)} {t('की सरकारी योजनाएं व सब्सिडी', 'Govt Schemes & Subsidies')}
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 mt-1">
                  {t(
                    `${stateObj.name_hi} राज्य सरकार एवं केंद्र सरकार द्वारा राज्य के नागरिकों हेतु संचालित सभी योजनाएं एवं सब्सिडी अनुदान।`,
                    `All active welfare schemes, agricultural grants & subsidies offered in ${stateObj.name_en}.`
                  )}
                </p>
              </div>
            </div>

            <div className="bg-blue-950/80 p-3.5 rounded-2xl border border-blue-700/80 text-center shrink-0 w-full sm:w-auto">
              <span className="text-2xl font-extrabold text-amber-300 block">{allStateSchemes.length}</span>
              <span className="text-[11px] font-semibold text-blue-200">
                {t('सक्रिय योजनाएं व सब्सिडी', 'Active Schemes & Subsidies')}
              </span>
            </div>
          </div>
        </div>

        {/* State Subsidies Spotlight Banner */}
        <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-2xl space-y-3 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-base font-bold text-amber-950">
                {t(`${stateObj.name_hi} में दी जाने वाली प्रमुख सरकारी सब्सिडी (State Subsidies)`, `Government Subsidies Offered in ${stateObj.name_en}`)}
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-amber-200 text-amber-900 rounded-full">
              ⚡ {t('50% से 90% तक सरकारी अनुदान', '50% to 90% Govt Grant')}
            </span>
          </div>

          <p className="text-xs text-amber-900 leading-relaxed">
            {t(
              `${stateObj.name_hi} सरकार द्वारा सोलर पैनल (रूफटॉप सोलर), इलेक्ट्रिक वाहन (EV), कृषि यंत्र (ट्रैक्टर/रोटावेटर), सूक्ष्म सिंचाई (ड्रिप/स्प्रिंकलर), पॉलीहाउस निर्माण और डेयरी मवेशी पालन हेतु विशेष सब्सिडी दी जा रही है।`,
              `${stateObj.name_en} Government offers high capital subsidies for Rooftop Solar, Electric Vehicles (EV), Farm Equipment, Micro-Irrigation, Polyhouses & Dairy Farming.`
            )}
          </p>

          {/* Toggle Tabs */}
          <div className="flex items-center gap-2 pt-2 border-t border-amber-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-300'
              }`}
            >
              {t(`सभी ${allStateSchemes.length} योजनाएं देखें`, `Show All ${allStateSchemes.length} Schemes`)}
            </button>

            <button
              onClick={() => setActiveTab('subsidies')}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'subsidies'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-amber-900 hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>{t(`केवल ${stateSubsidies.length} सब्सिडी योजनाएं देखें`, `Show ${stateSubsidies.length} State Subsidies Only`)}</span>
            </button>
          </div>
        </div>

        {/* Schemes Display Grid */}
        {displayedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSchemes.slice(0, 30).map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
            <Filter className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {t('कोई योजना नहीं मिली', 'No Schemes Found')}
            </h3>
            <button
              onClick={() => setActiveTab('all')}
              className="bg-[#1E40AF] text-white text-xs font-bold px-6 py-2 rounded-xl"
            >
              {t('सभी राज्य योजनाएं देखें', 'View All State Schemes')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
