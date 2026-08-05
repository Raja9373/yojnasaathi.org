import React from 'react';
import { Link } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, STATES_LIST } from '../data/statesAndCategories';
import { Landmark, ShieldAlert, Heart, ExternalLink, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-amber-500 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-amber-300 shadow">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Yojna<span className="text-orange-500">Saathi</span>.org
              </span>
            </Link>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              {t(
                'योजनासाथी.org देश का निष्पक्ष एवं नि:शुल्क पोर्टल है, जिसका उद्देश्य भारत सरकार तथा विभिन्न राज्य सरकारों की सभी जन कल्याणकारी योजनाओं की सटीक जानकारी और पात्रता जाँच की सुविधा हर नागरिक तक पहुँचाना है।',
                'YojnaSaathi.org is an independent & free portal aiming to bring verified details and smart eligibility verification for all Indian Central and State government schemes to every citizen.'
              )}
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{t('हर योजना, हर नागरिक तक', 'Har Yojana, Har Nagrik Tak')}</span>
            </div>
          </div>

          {/* Column 2: Popular Scheme Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-1 border-b border-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>{t('प्रमुख योजना श्रेणियां', 'Popular Categories')}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-amber-300 transition flex items-center gap-1.5 text-slate-300"
                  >
                    <span className="text-slate-500">›</span>
                    <span>{t(cat.name_hi, cat.name_en)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: State Level Schemes */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-1 border-b border-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{t('राज्य वार योजनाएं', 'State Schemes')}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {STATES_LIST.slice(1, 7).map((st) => (
                <li key={st.code}>
                  <Link
                    href={`/state/${st.slug}`}
                    className="hover:text-amber-300 transition flex items-center gap-1.5 text-slate-300"
                  >
                    <span className="text-slate-500">›</span>
                    <span>{t(st.name_hi, st.name_en)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-1 border-b border-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>{t('महत्वपूर्ण लिंक्स', 'Important Links')}</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/find-yojana" className="hover:text-amber-300 flex items-center gap-1.5 font-medium text-amber-400">
                  <span>›</span>
                  <span>{t('स्मार्ट पात्रता जाँच (Eligibility Checker)', 'Smart Eligibility Checker')}</span>
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-amber-300 flex items-center gap-1.5 font-bold text-amber-300">
                  <span>›</span>
                  <span>{t('सभी प्रश्नोत्तरी FAQs (1000+)', 'All FAQs (1000+)')}</span>
                </Link>
              </li>
              <li>
                <Link href="/pm-kisan-faqs" className="hover:text-amber-300 flex items-center gap-1.5 font-semibold text-emerald-400">
                  <span>›</span>
                  <span>{t('पीएम किसान FAQs (2026)', 'PM Kisan FAQs')}</span>
                </Link>
              </li>
              <li>
                <Link href="/yojanas" className="hover:text-amber-300 flex items-center gap-1.5">
                  <span>›</span>
                  <span>{t('सभी 4,772+ योजनाएं', 'All 4,772+ Schemes')}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 flex items-center gap-1.5">
                  <span>›</span>
                  <span>{t('हमारे बारे में (About Us)', 'About Us')}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 flex items-center gap-1.5">
                  <span>›</span>
                  <span>{t('संपर्क करें (Contact Us)', 'Contact Us')}</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-300 flex items-center gap-1.5">
                  <span>›</span>
                  <span>{t('गोपनीयता नीति (Privacy Policy)', 'Privacy Policy')}</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-amber-300 flex items-center gap-1.5">
                  <span>›</span>
                  <span>{t('नियम एवं शर्तें (Terms)', 'Terms & Conditions')}</span>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-amber-300 flex items-center gap-1.5">
                  <span>›</span>
                  <span>{t('अस्वीकरण (Disclaimer)', 'Disclaimer')}</span>
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-amber-300 flex items-center gap-1.5">
                  <span>›</span>
                  <span>{t('साइटमैप (HTML Sitemap)', 'HTML Sitemap')}</span>
                </Link>
              </li>
              <li>
                <Link href="/state-sitemap" className="hover:text-amber-300 flex items-center gap-1.5">
                  <span>›</span>
                  <span>{t('राज्यवार व मंत्रालय साइटमैप', 'State & Ministry Sitemap')}</span>
                </Link>
              </li>
              <li>
                <Link href="/seo-health" className="hover:text-amber-300 flex items-center gap-1.5 font-bold text-emerald-400">
                  <span>›</span>
                  <span>{t('SEO स्वास्थ्य ऑडिट रिपोर्ट', 'SEO Health Audit')}</span>
                </Link>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href="mailto:contact@yojnasaathi.org" className="hover:text-amber-300 transition-colors">
                  contact@yojnasaathi.org
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>New Delhi, India</span>
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Official Disclaimer Box */}
        <div className="my-6 p-4 bg-slate-800/90 border border-slate-700/80 rounded-xl flex flex-col sm:flex-row items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <h5 className="font-bold text-amber-300">
              {t('अस्वीकरण सूचना (Mandatory Govt Disclaimer Notice)', 'Mandatory Disclaimer Notice')}
            </h5>
            <p className="leading-relaxed">
              {t(
                'यह वेबसाइट (YojnaSaathi.org) एक निजी एवं स्वतंत्र सूचनात्मक पोर्टल है। यह भारत सरकार अथवा किसी भी राज्य सरकार के मंत्रालय या विभाग की आधिकारिक वेबसाइट नहीं है। यहाँ प्रदान की गई सभी जानकारियां सार्वजनिक रूप से उपलब्ध आधिकारिक स्रोतों व प्रेस विज्ञप्तियों पर आधारित हैं। योजना के आधिकारिक आवेदन हेतु हमेशा संबंधित विभाग की अधिकृत पोर्टल (जैसे myscheme.gov.in या pmkisan.gov.in) पर ही जाएं।',
                'YojnaSaathi.org is an independent informational website. It is NOT affiliated with or endorsed by the Government of India or any State Government. All information provided here is aggregated from publicly available official portals. Users are advised to verify and apply for schemes strictly on official government portals (e.g. myscheme.gov.in).'
              )}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 YojnaSaathi.org. All Rights Reserved. Designed for Citizens of India.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/about" className="hover:text-white underline">{t('हमारे बारे में', 'About Us')}</Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-white underline">{t('गोपनीयता नीति', 'Privacy Policy')}</Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-white underline">{t('नियम एवं शर्तें', 'Terms of Service')}</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white underline">{t('संपर्क करें', 'Contact Us')}</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-white underline">{t('अस्वीकरण', 'Disclaimer')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
