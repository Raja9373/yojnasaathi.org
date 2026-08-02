import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { SmartFilterBox } from '../components/SmartFilterBox';
import { SchemeCard } from '../components/SchemeCard';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';
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
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building,
  Landmark
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

export const HomePage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [, navigate] = useLocation();

  const [activeTab, setActiveTab] = useState<'all' | 'central' | 'state' | 'subsidy'>('all');

  const filteredSchemes = MASTER_SCHEMES_DATABASE.filter((s) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'central') return s.type === 'central';
    if (activeTab === 'state') return s.type === 'state';
    if (activeTab === 'subsidy') {
      return s.tags.some(t => t.includes('सब्सिडी') || t.includes('subsidy')) || s.title_hi.includes('सब्सिडी') || s.title_en.toLowerCase().includes('subsidy');
    }
    return true;
  });

  // Schema.org Structured Data for Google Rich Snippets & Page #1 Ranking
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'YojanaSaathi.org',
    'url': 'https://yojanasaathi.org',
    'description': 'Information & Eligibility Portal for 4,772+ Indian Central and State Government Schemes & Subsidies',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://yojanasaathi.org/yojanas?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title={t('हर सरकारी योजना व सब्सिडी - 4,772+ योजनाएं | YojanaSaathi.org', 'Har Sarkari Yojana Aap Tak - 4,772+ Schemes & Subsidies')}
        description={t(
          'YojanaSaathi.org भारत सरकार व सभी 36 राज्यों/यूटी की 4,772+ सरकारी योजनाओं व राज्य सब्सिडी की जानकारी और पात्रता जाँचने का 100% नि:शुल्क पोर्टल है।',
          'YojanaSaathi.org offers verified details & smart eligibility checking for 4,772+ Indian Central and State government schemes & subsidies.'
        )}
        jsonLdSchema={homeSchema}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-slate-900 text-white pt-10 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Decorative background grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-4">
          {/* Top Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-bold text-amber-300 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t('4,772+ सरकारी योजनाएं व सब्सिडी | Har Yojana, Har Nagrik Tak', '4,772+ Schemes & Subsidies | Har Yojana, Har Nagrik Tak')}</span>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {t(
              'हर सरकारी योजना व सब्सिडी आप तक - अपनी पात्रता के अनुसार खोजें',
              'Har Sarkari Yojana Aap Tak - Discover 4,772+ Schemes & Subsidies'
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto font-normal leading-relaxed">
            {t(
              'पीएम किसान, सोलर रूफटॉप, ईवी व्हीकल, ट्रैक्टर सब्सिडी, लाडली बहना, आयुष्मान व मुद्रा लोन सहित केंद्र व सभी 36 राज्यों/UTs की 4,772+ योजनाओं की सटीक जानकारी व सब्सिडी खोजें।',
              'Explore verified eligibility, application steps, and state subsidy grants across all 4,772+ central and state schemes.'
            )}
          </p>

          {/* Embedded Smart Filter Box */}
          <div className="pt-6">
            <SmartFilterBox />
          </div>
        </div>
      </section>

      {/* AdSense Leaderboard Banner below Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSenseSlot type="leaderboard" format="horizontal" slotId="9876543210" />
      </div>

      {/* State Subsidies Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-6 relative z-20">
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-6 shadow-xl text-slate-950 border border-amber-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
                <Percent className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('राज्य विशेष सरकारी सब्सिडी निर्देशिका', 'State Government Subsidy Grants')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                {t('सोलर, ईवी, कृषि उपकरण, सिंचाई व डेयरी पर 50% से 90% तक सरकारी सब्सिडी!', 'Get 50% to 90% Govt Subsidy on Solar, EV, Tractors & Dairy Farming!')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-900 font-medium">
                {t(
                  'भारत के सभी 36 राज्यों व यूटी द्वारा दी जाने वाली विभिन्न सब्सिडी योजनाओं की पूर्ण सूची, आवश्यक कागजात एवं ऑनलाइन आवेदन लिंक उपलब्ध हैं।',
                  'Full directory of state-wise capital subsidies, equipment grants & revolving SHG funds.'
                )}
              </p>
            </div>

            <button
              onClick={() => navigate('/yojanas?subsidy=true')}
              className="bg-slate-950 hover:bg-slate-900 text-amber-300 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-2 transition shrink-0"
            >
              <Percent className="w-4 h-4 text-amber-400" />
              <span>{t('सब्सिडी योजनाएं खोजें', 'Explore State Subsidies')}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 9 Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                <span>{t('योजना व सब्सिडी श्रेणियां (Browse Categories)', 'Browse by Categories')}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('अपनी आवश्यकता के अनुसार श्रेणी चुनें और सभी संबंधित 4,770+ योजनाएं देखें', 'Select a category to explore relevant government schemes & subsidies')}
              </p>
            </div>
            <Link
              href="/yojanas"
              className="text-xs font-bold text-[#1E40AF] hover:text-blue-900 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>{t('सभी 4,770+ योजनाएं देखें', 'View All 4,770+ Schemes')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {CATEGORIES.map((cat) => {
              const IconComp = iconMap[cat.icon] || Sprout;
              const count = MASTER_SCHEMES_DATABASE.filter((s) => s.category === cat.slug).length;

              return (
                <div
                  key={cat.slug}
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col items-center text-center space-y-2 hover:shadow-md hover:-translate-y-1 ${cat.bgColor}`}
                >
                  <div className={`p-2.5 rounded-full bg-white shadow-sm ${cat.textColor}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {t(cat.name_hi, cat.name_en)}
                    </h3>
                    <span className="text-[10px] font-semibold text-slate-500 mt-1 block">
                      {count}+ {t('योजनाएं', 'Schemes')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Yojanas Listing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>{t('नवीनतम एवं ट्रेंडिंग (4,770+ डेटाबेस)', 'Latest & Popular (4,770+ DB)')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('प्रमुख सरकारी योजनाएं एवं सब्सिडी 2026', 'Popular Govt Schemes & Subsidies 2026')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t('भारत सरकार व सभी 36 राज्यों की सबसे लोकप्रिय एवं सक्रिय जन कल्याणकारी योजनाएं', 'Most popular active central & state welfare schemes in India')}
            </p>
          </div>

          {/* Tabs for Central / State / Subsidy */}
          <div className="flex items-center p-1 bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                activeTab === 'all' ? 'bg-[#1E40AF] text-white shadow' : 'hover:text-slate-900'
              }`}
            >
              {t('सभी (All)', 'All')}
            </button>
            <button
              onClick={() => setActiveTab('central')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                activeTab === 'central' ? 'bg-[#1E40AF] text-white shadow' : 'hover:text-slate-900'
              }`}
            >
              {t('केन्द्रीय योजनाएं', 'Central Schemes')}
            </button>
            <button
              onClick={() => setActiveTab('state')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                activeTab === 'state' ? 'bg-[#1E40AF] text-white shadow' : 'hover:text-slate-900'
              }`}
            >
              {t('राज्य योजनाएं', 'State Schemes')}
            </button>
            <button
              onClick={() => setActiveTab('subsidy')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                activeTab === 'subsidy' ? 'bg-amber-600 text-white shadow' : 'hover:text-slate-900 text-amber-800'
              }`}
            >
              <Percent className="w-3 h-3" />
              <span>{t('सब्सिडी योजनाएं', 'Subsidies')}</span>
            </button>
          </div>
        </div>

        {/* Scheme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.slice(0, 9).map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/yojanas')}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-md transition cursor-pointer"
          >
            <span>{t('सभी 4,770+ योजनाएं व सब्सिडी देखें (View All 4,770+ Schemes)', 'View All 4,770+ Schemes & Subsidies')}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </section>

      {/* Central vs State Yojana Comparison Section */}
      <section className="bg-slate-100 py-14 px-4 sm:px-6 mb-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('केन्द्रीय योजना बनाम राज्य योजना', 'Central vs State Schemes')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {t(
                'जानिए केन्द्रीय और राज्य स्तरीय सरकारी योजनाओं में क्या मुख्य अंतर होता है और आप दोनों का लाभ कैसे ले सकते हैं।',
                'Understand the difference between Central Sector & State Welfare schemes to maximize benefits.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Central Box */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900">
                    {t('केन्द्रीय योजनाएं (Central Schemes)', 'Central Sector Schemes')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('भारत सरकार द्वारा 100% या 60:40 अनुपात में वित्तपोषित', '100% or partially funded by Govt. of India')}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t('देश के सभी राज्यों एवं केंद्र शासित प्रदेशों के नागरिक समान रूप से पात्र।', 'Citizens from all states and UTs across India are eligible.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t('जैसे: पीएम किसान (₹6,000), आयुष्मान भारत (₹5 लाख), सोलर रूफटॉप योजना।', 'e.g. PM Kisan (₹6,000), Ayushman Bharat (₹5 Lakhs), PM Surya Ghar.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t('एक ही स्थान पर myScheme या संबंधित मंत्रालय के पोर्टल से सीधा आवेदन।', 'Direct application on myScheme portal or respective Ministry websites.')}</span>
                </li>
              </ul>

              <Link
                href="/yojanas?type=central"
                className="inline-block text-xs font-bold text-blue-700 hover:text-blue-900 underline"
              >
                {t('सभी केन्द्रीय योजनाएं देखें →', 'Explore All Central Schemes →')}
              </Link>
            </div>

            {/* State Box */}
            <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-900">
                    {t('राज्य योजनाएं व सब्सिडी (State Schemes)', 'State Welfare Schemes & Subsidies')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('संबंधित राज्य सरकार के बजट द्वारा संचालित कल्याणकारी योजनाएं', 'Funded by respective State Government budgets')}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t('केवल उसी विशिष्ट राज्य के मूल निवासी नागरिकों के लिए ही सीमित।', 'Restricted to permanent domicile residents of that specific state.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t('जैसे: लाडली बहना (MP), कन्या सुमंगला (UP), ईवी सब्सिडी, कृषि यंत्र अनुदान।', 'e.g. Ladli Behna (MP), Kanya Sumangala (UP), EV Subsidies, Tractor Subsidy.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t('राज्य सरकार के नागरिक सेवा पोर्टल अथवा ग्राम पंचायत शिविरों में आवेदन।', 'Applied through state portals or Gram Panchayat camps.')}</span>
                </li>
              </ul>

              <Link
                href="/yojanas?type=state"
                className="inline-block text-xs font-bold text-amber-700 hover:text-amber-900 underline"
              >
                {t('सभी राज्य योजनाएं देखें →', 'Explore All State Schemes →')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quick Stats Banner */}
      <section className="bg-white border-y border-slate-200 py-10 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-3xl font-extrabold text-[#1E40AF]">4,770+</span>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {t('सत्यापित योजनाएं व सब्सिडी', 'Indexed Schemes & Subsidies')}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-3xl font-extrabold text-orange-600">36</span>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {t('सभी राज्य व यूटी शामिल', 'States & UTs Covered')}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-3xl font-extrabold text-emerald-600">100%</span>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {t('नि:शुल्क व निष्पक्ष जानकारी', 'Free & Verified Data')}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-3xl font-extrabold text-purple-600">50 Cr+</span>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {t('लक्ष्य लाभार्थी नागरिक', 'Target Beneficiaries')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
