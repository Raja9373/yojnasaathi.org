import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, BellRing, ArrowRight, Zap } from 'lucide-react';

export const LiveUpdateTicker: React.FC = () => {
  const { lang, t } = useLanguage();

  const todayDate = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const updatesList = [
    {
      hi: 'पीएम किसान 19वीं किश्त की डीबीटी तिथि जारी - किसान सम्मान निधि स्टेटस चेक करें!',
      en: 'PM Kisan 19th Installment DBT date announced - Check beneficiary status live!'
    },
    {
      hi: 'पीएम सूर्यघर मुफ़्त बिजली योजना 2026: सोलर रूफटॉप सब्सिडी राशि ₹78,000 खातों में भेजी जा रही है।',
      en: 'PM Surya Ghar Free Electricity 2026: Solar Rooftop subsidy up to ₹78,000 being disbursed.'
    },
    {
      hi: 'ई-वाहन (EV) व कृषि ट्रैक्टर सब्सिडी पोर्टल खुला - 50% से 80% सरकारी अनुदान हेतु आवेदन करें।',
      en: 'EV & Agricultural Tractor subsidy portal open - Apply for 50% to 80% Govt grant.'
    },
    {
      hi: 'लाडली बहना एवं महिला स्वरोजगार योजना 2026 की नई मासिक किश्त सूची अपडेट कर दी गई है।',
      en: 'Ladli Behna & Women Self-Employment Scheme 2026 new monthly payout list updated.'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 py-2 px-4 shadow-sm border-b border-amber-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold">
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0 bg-slate-950 text-amber-300 px-3 py-1 rounded-full shadow-inner">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span className="uppercase tracking-wider font-extrabold text-[11px]">
            {t(`आज का लाइव अपडेट (${todayDate})`, `Live Update (${todayDate})`)}
          </span>
        </div>

        {/* Moving Ticker Text / Rotating Updates */}
        <div className="overflow-hidden flex-1 relative max-w-3xl">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-8 text-slate-950 font-extrabold text-[12px]">
            {updatesList.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                <span>{t(item.hi, item.en)}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right CTA */}
        <a
          href="/yojanas?subsidy=true"
          className="shrink-0 flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-950 px-3 py-1 rounded-full text-[11px] font-extrabold border border-amber-300 shadow-xs cursor-pointer transition"
        >
          <span>{t('नवीनतम योजनाएं देखें', 'View Latest Schemes')}</span>
          <ArrowRight className="w-3 h-3 text-amber-700" />
        </a>
      </div>
    </div>
  );
};
