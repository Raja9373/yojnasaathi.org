import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PMKisanFaqSection } from '../components/PMKisanFaqSection';
import pmKisanFaqSchema from '../data/pm-kisan-faq-schema.json';
import { HelpCircle, ExternalLink, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export const PMKisanFAQPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={t(
          'PM Kisan Samman Nidhi 2026: 20 FAQs, Status & eKYC Guide | YojnaSaathi.org',
          'PM Kisan Yojana 2026: 20 Most Asked FAQs, 17th Kist Status & eKYC'
        )}
        description={t(
          'PM Kisan 17th kist kab aayegi? Status kaise check kare? eKYC aur Land Seeding problem ke 100% verified solutions. 20 sabse zyada khoje gaye sawal w uttar.',
          'Comprehensive 20 FAQs for PM Kisan Samman Nidhi Yojana 2026. Get verified answers for 17th installment status, eKYC, registration, and Aadhaar bank seeding.'
        )}
        canonicalUrl="https://www.yojnasaathi.org/pm-kisan-faqs"
        jsonLdSchema={pmKisanFaqSchema}
      />

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: lang === 'hi' ? 'पीएम किसान योजना' : 'PM Kisan Yojana', href: '/yojana/pm-kisan-yojana' },
            { label: lang === 'hi' ? '20 महत्वपूर्ण सवाल-जवाब' : '20 FAQs' }
          ]}
        />

        {/* Top Hero Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-blue-800/40 space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full border border-orange-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PM Kisan Official Knowledge Base 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {t(
              'पीएम किसान सम्मान निधि योजना 2026: 20 सबसे महत्वपूर्ण सवाल व उत्तर',
              'PM Kisan Samman Nidhi Yojana 2026: 20 Most Searched FAQs & Solutions'
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {t(
              '17वीं किस्त की स्थिति, eKYC प्रक्रिया, ऑनलाइन आवेदन, लैंड सीडिंग (Land Seeding NO) और आधार बैंक खाता लिंक करने से जुड़े सभी प्रश्नों के सटीक और आधिकारिक समाधान यहाँ देखें।',
              'Verified answers for PM Kisan 17th installment release date, eKYC completion, new registration, land seeding fixes, and Aadhaar bank seeding.'
            )}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-medium">
            <a
              href="/yojana/pm-kisan-yojana"
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl transition shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>{t('पीएम किसान पूर्ण योजना गाइड', 'Read Full PM Kisan Guide')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://pmkisan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-slate-200 font-semibold px-4 py-2 rounded-xl border border-white/20 transition"
            >
              <span>PM Kisan Portal (pmkisan.gov.in)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 20 FAQs Component */}
        <PMKisanFaqSection />

        {/* Footer Info Box */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-5 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-2">
          <h3 className="font-bold flex items-center gap-2 text-amber-900 dark:text-amber-100">
            <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{t('महत्वपूर्ण सूचना (Disclaimer):', 'Important Information (Disclaimer):')}</span>
          </h3>
          <p className="leading-relaxed text-amber-800 dark:text-amber-300">
            {t(
              'YojnaSaathi.org एक स्वतंत्र सूचनात्मक पोर्टल है। हम किसी भी सरकारी एजेंसी का प्रतिनिधित्व नहीं करते हैं। पीएम किसान योजना का आधिकारिक पोर्टल pmkisan.gov.in है। किसी भी वित्तीय या बैंकिंग समस्या के लिए अपने निकटतम कृषि कार्यालय या पीएम किसान हेल्पलाइन नंबर 155261 / 1800115526 पर संपर्क करें।',
              'YojnaSaathi.org is an independent informational portal. We are not affiliated with any government department. Official website for PM Kisan is pmkisan.gov.in. For official grievances, call PM Kisan Helpline 155261 / 1800115526.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
