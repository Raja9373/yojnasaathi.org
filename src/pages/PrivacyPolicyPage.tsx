import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Lock, Eye, FileText, Globe, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6">
      <SEOHead
        title={t('गोपनीयता नीति (Privacy Policy) - YojanaSaathi.org', 'Privacy Policy - YojanaSaathi.org')}
        description={t(
          'YojanaSaathi.org की गोपनीयता नीति (Privacy Policy) - जानें कि हम कुकीज़, Google AdSense विज्ञापनों और उपयोगकर्ता डेटा की सुरक्षा कैसे करते हैं।',
          'Official Privacy Policy for YojanaSaathi.org. Read how we protect user privacy, handle Google AdSense advertising cookies, and log data.'
        )}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>{t('कानूनी दस्तावेज़', 'Legal Compliance')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('गोपनीयता नीति (Privacy Policy)', 'Privacy Policy')}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl leading-relaxed">
            {t(
              'YojanaSaathi.org आपके डेटा व निजता की सुरक्षा के लिए पूर्णतः प्रतिबद्ध है। यह नीति स्पष्ट करती है कि हम जानकारी कैसे एकत्र और सुरक्षित करते हैं।',
              'Last Updated: July 31, 2026. At YojanaSaathi.org, accessible from https://yojanasaathi.org, user privacy is one of our top priorities.'
            )}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-700" />
              <span>{t('1. सामान्य परिचय (General Overview)', '1. General Information')}</span>
            </h2>
            <p>
              {t(
                'YojanaSaathi.org एक स्वतंत्र, गैर-सरकारी सूचनात्मक पोर्टल है। यह गोपनीयता नीति दस्तावेज़ में उन प्रकार की जानकारियों का उल्लेख है जो YojanaSaathi.org द्वारा एकत्र और रिकॉर्ड की जाती हैं तथा हम इसका उपयोग कैसे करते हैं।',
                'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at support@yojanasaathi.org.'
              )}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>{t('2. गूगल एडसेंस व कुकीज़ नीति (Google AdSense & Cookies)', '2. Google AdSense & Cookies Policy')}</span>
            </h2>
            <p>
              {t(
                'YojanaSaathi.org तृतीय-पक्ष विज्ञापनों (जैसे Google AdSense) का प्रदर्शन कर सकता है। Google एक तृतीय-पक्ष विक्रेता के रूप में हमारी साइट पर विज्ञापन देने के लिए कुकीज़ (Cookies) का उपयोग करता है। Google द्वारा DART कुकी का उपयोग हमारी वेबसाइट और इंटरनेट पर अन्य साइटों के आपके दौरों के आधार पर उपयोगकर्ताओं को विज्ञापन परोसने में सक्षम बनाता है।',
                'Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.yojanasaathi.org and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads'
              )}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>{t('3. लॉग फाइलें (Log Files)', '3. Log Files')}</span>
            </h2>
            <p>
              {t(
                'YojanaSaathi.org लॉग फाइलों का उपयोग करने की एक मानक प्रक्रिया का पालन करता है। ये फाइलें वेबसाइट पर आने वाले आगंतुकों को तब लॉग करती हैं जब वे वेबसाइटों पर जाते हैं। सभी होस्टिंग कंपनियां ऐसा करती हैं और यह होस्टिंग सेवाओं के विश्लेषण का एक हिस्सा है। लॉग फाइलों द्वारा एकत्र की गई जानकारी में इंटरनेट प्रोटोकॉल (IP) पते, ब्राउज़र का प्रकार, इंटरनेट सेवा प्रदाता (ISP), दिनांक और समय टिकट, संदर्भ/निकास पृष्ठ शामिल हैं।',
                'YojanaSaathi.org follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.'
              )}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              <span>{t('4. गोपनीयता अधिकार (CCPA & GDPR Rights)', '4. Privacy Rights (DPDP, GDPR & CCPA)')}</span>
            </h2>
            <p>
              {t(
                'हम यह सुनिश्चित करना चाहते हैं कि आप अपने सभी डेटा सुरक्षा अधिकारों से पूरी तरह अवगत हैं। प्रत्येक उपयोगकर्ता निम्नलिखित का हकदार है: डेटा तक पहुंच का अधिकार, डेटा सुधारने का अधिकार, एवं डेटा हटाने का अनुरोध।',
                'Under the Digital Personal Data Protection (DPDP) Act of India, GDPR, and CCPA, users have rights to request access, rectification, or erasure of any personal data submitted via our contact forms.'
              )}
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 space-y-1">
            <strong>{t('बच्चों की सुरक्षा (Children\'s Information):', 'Children\'s Online Privacy Protection:')}</strong>
            <p>
              {t(
                'हम 13 वर्ष से कम उम्र के बच्चों से जानबूझकर कोई भी व्यक्तिगत पहचान योग्य जानकारी एकत्र नहीं करते हैं।',
                'YojanaSaathi.org does not knowingly collect any Personal Identifiable Information from children under the age of 13.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
