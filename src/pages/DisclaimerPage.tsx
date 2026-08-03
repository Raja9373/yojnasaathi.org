import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { ShieldAlert, Landmark, CheckCircle2, Mail, Info } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6">
      <SEOHead
        title={t('अस्वीकरण व हमारे बारे में - YojnaSaathi.org', 'Disclaimer & About Us')}
        description="Information, Disclaimer, Privacy Policy and About Us page for YojnaSaathi.org portal."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-[#1E3A8A] text-white p-8 rounded-3xl shadow-md space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold">
            <Info className="w-4 h-4" />
            <span>{t('पोर्टल सूचना व अस्वीकरण', 'About & Legal Disclaimer')}</span>
          </div>
          <h1 className="text-3xl font-extrabold">
            {t('अस्वीकरण, गोपनीयता नीति व हमारे बारे में', 'Disclaimer, Privacy Policy & About Us')}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200">
            YojnaSaathi.org - Har Yojana, Har Nagrik Tak
          </p>
        </div>

        {/* Section 1: About Us */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-blue-700" />
            <span>{t('1. हमारे बारे में (About YojnaSaathi.org)', '1. About YojnaSaathi.org')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {t(
              'योजनासाथी.org एक स्वतंत्र एवं निष्पक्ष डिजिटल सूचना मंच है। हमारा प्राथमिक उद्देश्य भारत सरकार (Government of India) तथा राज्य सरकारों (State Governments) द्वारा चलाए जा रहे समस्त जन-कल्याणकारी कार्यक्रमों, पेंशन योजनाओं, किसान सहायताओं, महिला सशक्तिकरण अभियानों और छात्रवृत्तियों की सही, सटीक एवं सरल भाषा में जानकारी हर नागरिक तक पहुँचाना है।',
              'YojnaSaathi.org is an independent digital information platform aimed at simplifying and aggregating public welfare schemes launched by the Central and State Governments in India. We empower citizens by helping them check eligibility and find official apply links.'
            )}
          </p>
        </div>

        {/* Section 2: Official Disclaimer */}
        <div className="bg-amber-50/90 border-2 border-amber-300 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-amber-950 border-b border-amber-200 pb-3 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-amber-600" />
            <span>{t('2. महत्वपूर्ण कानूनी अस्वीकरण (Official Disclaimer Notice)', '2. Mandatory Legal Disclaimer')}</span>
          </h2>
          <div className="text-xs sm:text-sm text-amber-950 leading-relaxed space-y-3">
            <p className="font-bold">
              {t(
                'यह स्पष्ट रूप से सूचित किया जाता है कि YojnaSaathi.org एक गैर-सरकारी (Non-Governmental) वेबसाइट है।',
                'It is hereby explicitly clarified that YojnaSaathi.org is a private, non-governmental informational portal.'
              )}
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                {t(
                  'हम किसी भी सरकारी मंत्रालय, विभाग अथवा सरकारी अधिकारी से प्रत्यक्ष या अप्रत्यक्ष रूप से जुड़े हुए नहीं हैं।',
                  'We are NOT associated with, operated by, or endorsed by any government ministry or department.'
                )}
              </li>
              <li>
                {t(
                  'हम नागरिकों से किसी भी योजना हेतु कोई आवेदन शुल्क, गुप्त शुल्क या व्यक्तिगत बैंक विवरण नहीं मांगते हैं।',
                  'We do NOT charge any fees, processing charges, or collect private banking credentials.'
                )}
              </li>
              <li>
                {t(
                  'इस वेबसाइट पर प्रकाशित सभी जानकारियां केवल जन जागरूकता एवं शैक्षणिक उद्देश्य से हैं। योजना का अंतिम आवेदन हमेशा संबंधित विभाग की आधिकारिक सरकारी पोर्टल (जैसे myscheme.gov.in या pmkisan.gov.in) पर ही करें।',
                  'All content is for informational purposes only. Official applications must be submitted exclusively on official government portals (e.g. myscheme.gov.in).'
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3: Privacy Policy */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{t('3. गोपनीयता नीति (Privacy Policy)', '3. Privacy Policy')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {t(
              'YojnaSaathi.org अपने उपयोगकर्ताओं की निजता का पूर्ण सम्मान करता है। हम उपयोगकर्ता का कोई भी संवेदनशील व्यक्तिगत डेटा (जैसे आधार नंबर, बैंक खाता संख्या या ओटीपी) संग्रहीत नहीं करते हैं। हमारी वेबसाइट पर उपयोग किया जाने वाला स्मार्ट पात्रता जाँचक पूरी तरह से क्लाइंट-साइड ब्राउज़र पर कार्य करता है।',
              'We respect user privacy and do not collect sensitive credentials such as Aadhaar numbers or OTPs. All smart eligibility checks run locally in your browser.'
            )}
          </p>
        </div>

        {/* Section 4: Contact Support */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            <span>{t('सम्पर्क करें (Contact Support)', 'Contact Us')}</span>
          </h2>
          <p className="text-xs text-slate-300">
            {t(
              'यदि आपके पास इस पोर्टल के विषय में कोई सुझाव, त्रुटि सुधार अथवा प्रश्न है, तो कृपया हमें ईमेल करें:',
              'For queries, content feedback, or corrections regarding scheme details, feel free to contact us:'
            )}
          </p>
          <a
            href="mailto:contact@yojnasaathi.org"
            className="inline-block text-sm font-bold text-amber-300 hover:underline"
          >
            contact@yojnasaathi.org
          </a>
        </div>
      </div>
    </div>
  );
};
