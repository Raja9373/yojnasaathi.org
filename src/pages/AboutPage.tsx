import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Target, Users, BookOpen, Landmark, CheckCircle2, Award, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6">
      <SEOHead
        title={t('हमारे बारे में (About Us) - YojnaSaathi.org', 'About Us - YojnaSaathi.org')}
        description={t(
          'YojnaSaathi.org का मुख्य उद्देश्य भारत के सभी नागरिकों तक 4,772+ सरकारी योजनाओं व राज्य सब्सिडी की सटीक और निष्पक्ष जानकारी पहुंचाना है।',
          'Learn about YojnaSaathi.org mission to empower 1.4 billion Indian citizens with verified information on 4,772+ government schemes & subsidies.'
        )}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Landmark className="w-3.5 h-3.5" />
            <span>{t('मिशन एवं परिचय', 'Mission & Credentials')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('हमारे बारे में (About YojnaSaathi.org)', 'About YojnaSaathi.org')}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl leading-relaxed">
            {t(
              'भारत सरकार एवं सभी 36 राज्यों व केंद्र शासित प्रदेशों की जन कल्याणकारी योजनाओं व सब्सिडी अनुदानों को सरल, सुगम एवं पारदर्शी भाषा में हर नागरिक तक पहुंचाना हमारा संकल्प है।',
              'Connecting every Indian citizen with accurate, simplified, and verified information about 4,772+ central & state welfare schemes.'
            )}
          </p>
        </div>

        {/* Content Cards */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-700" />
              <span>{t('हमारा उद्देश्य (Our Mission)', 'Our Core Mission')}</span>
            </h2>
            <p>
              {t(
                'भारत में हजारों सरकारी योजनाएं और सब्सिडी अनुदान उपलब्ध हैं, परंतु सही जानकारी और जटिल पात्रता नियमों के कारण देश के करोड़ों गरीब, किसान, महिलाएं एवं युवा इन लाभों से वंचित रह जाते हैं। YojnaSaathi.org एक स्वतंत्र, गैर-सरकारी सूचनात्मक डिजिटल मंच है जो myScheme.gov.in एवं आधिकारिक गजट नोटिफिकेशन के आधार पर 4,772+ योजनाओं का संपूर्ण विवरण हिंदी व अंग्रेजी में प्रदान करता है।',
                'While the Central and State Governments of India operate thousands of welfare schemes, millions of citizens miss out due to information asymmetry and complex application procedures. YojnaSaathi.org bridges this gap as an independent informational directory compiling verified eligibility, required documents, and step-by-step application guides.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {t('100% नि:शुल्क एवं निष्पक्ष', '100% Free & Transparent')}
              </h3>
              <p className="text-xs text-slate-600">
                {t(
                  'हम नागरिकों से किसी भी प्रकार की फीस या कमीशन नहीं लेते। हमारी सभी सेवाएं 100% निशुल्क हैं।',
                  'We never charge any fees or commissions. Our informational directory is 100% free for public welfare.'
                )}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {t('सत्यापित डेटाबेस (4,772+ DB)', 'Verified Database (4,772+ DB)')}
              </h3>
              <p className="text-xs text-slate-600">
                {t(
                  'हमारी शोध टीम प्रतिदिन सरकारी पोर्टलों और मंत्रालयों के नोटिफिकेशन की जांच करके डेटा को अपडेट रखती है।',
                  'Our research team continuously monitors official government gazettes to update eligibility norms and deadlines.'
                )}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>{t('हम क्या प्रदान करते हैं? (Key Services)', 'What We Offer')}</span>
            </h2>

            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>{t('स्मार्ट पात्रता जाँचक (Smart Eligibility Tool):', 'Smart Eligibility Checker:')}</strong> {t('अपनी आयु, आय, राज्य व व्यवसाय भरकर अपनी योग्य योजनाएं सेकेंडों में खोजें।', 'Input your profile to find matching schemes instantly.')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>{t('राज्य विशेष सब्सिडी (State Subsidies):', 'State Subsidies Directory:')}</strong> {t('सोलर, ईवी, कृषि यंत्र व पशुपालन हेतु 50% से 90% तक सरकारी सब्सिडी की जानकारी।', 'Detailed guides for Solar, EV, Tractor, and Dairy subsidies.')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>{t('स्टेप-बाय-स्टेप आवेदन गाइड:', 'Step-by-Step Application Guides:')}</strong> {t('आवश्यक दस्तावेज, पात्रता मानदंड एवं आधिकारिक पोर्टल डायरेक्ट अप्लाई लिंक।', 'List of documents required and direct official application portal links.')}</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-3">
            <Heart className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>{t('महत्वपूर्ण नोट (Non-Government Disclaimer):', 'Important Note (Non-Govt Notice):')}</strong>
              <p className="mt-1">
                {t(
                  'YojnaSaathi.org एक निजी जन कल्याणकारी सूचनात्मक वेब पोर्टल है। यह किसी भी सरकारी संस्था, मंत्रालय अथवा विभाग से आधिकारिक रूप से संबद्ध नहीं है। हम कोई भी सरकारी आवेदन पत्र जमा नहीं करते और न ही कोई वित्तीय लेन-देन करते हैं।',
                  'YojnaSaathi.org is an independent private informational project and is NOT affiliated with any government body or ministry. For submitting official scheme applications, citizens must always use official .gov.in portals.'
                )}
              </p>
            </div>
          </div>

          {/* Frequently Asked Questions (FAQ) Section */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              {t('अक्सर पूछे जाने वाले प्रश्न (Frequently Asked Questions)', 'Frequently Asked Questions (FAQ)')}
            </h2>
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm">
                  {t('1. YojnaSaathi (योजनासाथी) का आधिकारिक पोर्टल कौन सा है?', '1. What is the official portal for YojnaSaathi?')}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {t(
                    'हमारा आधिकारिक एवं एकमात्र वेब पोर्टल https://www.yojnasaathi.org है। यदि आप Yojna Saathi, Yojana Saathi, Yojanasaathi, Yojan Saathi, YojnaSathi, या YojanaSathi नाम से खोजते हैं, तो आप हमारे इसी प्रामाणिक पोर्टल YojnaSaathi.org पर पहुँचते हैं।',
                    'The official and only website is https://www.yojnasaathi.org under the official brand name YojnaSaathi. Common search variations like Yojna Saathi, Yojana Saathi, Yojanasaathi, Yojan Saathi, YojnaSathi, and YojanaSathi all guide you safely to our single canonical portal.'
                  )}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm">
                  {t('2. YojnaSaathi पोर्टल पर कौन-कौन सी योजनाएं उपलब्ध हैं?', '2. What government schemes are indexed on YojnaSaathi?')}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {t(
                    'यहाँ भारत सरकार की पीएम किसान, आयुष्मान भारत, पीएम आवास, लाड़ली बहना, छात्रवृत्ति एवं सभी राज्यों की 4,770+ सक्रिय योजनाएं व सब्सिडी उपलब्ध हैं।',
                    'YojnaSaathi indexes over 4,770+ active Central and State Government schemes including PM Kisan, Ayushman Bharat, PM Awas Yojana, state subsidies, and educational scholarships.'
                  )}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm">
                  {t('3. YojnaSaathi टीम से संपर्क कैसे करें?', '3. How to contact the official YojnaSaathi team?')}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {t(
                    'आप आधिकारिक संपर्क ईमेल contact@yojnasaathi.org के माध्यम से हमारी सहायता टीम से सीधे संपर्क कर सकते हैं।',
                    'You can write directly to our official support team at contact@yojnasaathi.org for any scheme inquiries or information updates.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
