import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { FileCode, AlertTriangle, ShieldCheck, Scale } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6">
      <SEOHead
        title={t('नियम एवं शर्तें (Terms & Conditions) - YojanaSaathi.org', 'Terms & Conditions - YojanaSaathi.org')}
        description={t(
          'YojanaSaathi.org के उपयोग संबंधी नियम व शर्तें। हमारा पोर्टल केवल जन हितार्थ सूचनात्मक उद्देश्यों के लिए है।',
          'Terms & Conditions governing the use of YojanaSaathi.org portal. Non-governmental informational services guidelines.'
        )}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>{t('उपयोग की शर्तें', 'Terms of Use')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('नियम एवं शर्तें (Terms & Conditions)', 'Terms & Conditions')}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl leading-relaxed">
            {t(
              'YojanaSaathi.org का उपयोग करने से पूर्व कृपया निम्नलिखित शर्तों को ध्यानपूर्वक पढ़ें।',
              'Welcome to YojanaSaathi.org. These terms outline the rules and regulations for the use of our website.'
            )}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              {t('1. गैर-सरकारी सूचनात्मक सेवा (Informational Purpose Only)', '1. Informational Purpose Disclaimer')}
            </h2>
            <p>
              {t(
                'YojanaSaathi.org केवल एक जन कल्याणकारी सूचनात्मक वेब पोर्टल है। हम किसी भी केंद्र अथवा राज्य सरकार के मंत्रालय से संबद्ध नहीं हैं। वेबसाइट पर प्रस्तुत सभी योजना विवरण, पात्रता एवं दिशानिर्देश आधिकारिक राजपत्रों व myScheme.gov.in से संकलित किए गए हैं।',
                'YojanaSaathi.org is an independent private educational and informational resource. We are not owned, operated, or endorsed by the Government of India or any State Government.'
              )}
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              {t('2. बौद्धिक संपदा अधिकार (Intellectual Property)', '2. Intellectual Property Rights')}
            </h2>
            <p>
              {t(
                'जब तक अन्यथा न कहा जाए, YojanaSaathi.org और/या इसके लाइसेंसधारक YojanaSaathi.org पर मौजूद सभी सामग्रियों के बौद्धिक संपदा अधिकारों के मालिक हैं। सभी बौद्धिक संपदा अधिकार सुरक्षित हैं।',
                'Unless otherwise stated, YojanaSaathi.org owns the intellectual property rights for all material on this website. All intellectual property rights are reserved.'
              )}
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              {t('3. बाहरी लिंक (Hyperlinking to Third-Party Content)', '3. External Third-Party Links')}
            </h2>
            <p>
              {t(
                'हमारी वेबसाइट उपयोगकर्ताओं की सुविधा के लिए आधिकारिक सरकारी वेब पोर्टलों (.gov.in / .nic.in) के बाहरी लिंक प्रदान करती है। हम इन बाहरी वेबसाइटों की सामग्री के लिए उत्तरदायी नहीं हैं।',
                'Our web pages contain links to external government websites (.gov.in) for user convenience. We have no control over the content or availability of third-party sites.'
              )}
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>{t('अस्वीकरण (Limitation of Liability):', 'Limitation of Liability:')}</strong>
              <p className="mt-0.5">
                {t(
                  'यद्यपि हम जानकारी को अद्यतन और सही रखने का प्रयास करते हैं, हम वेबसाइट पर मौजूद किसी भी जानकारी की पूर्णता, सटीकता या विश्वसनीयता के बारे में कोई वारंटी नहीं देते हैं। अंतिम पुष्टि हेतु हमेशा आधिकारिक सरकारी पोर्टल पर जाएँ।',
                  'In no event shall YojanaSaathi.org be liable for any loss or damage arising out of or in connection with the use of this website. Always verify rules on official government gazettes.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
