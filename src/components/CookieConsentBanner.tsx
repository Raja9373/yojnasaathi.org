import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CookieConsentBanner: React.FC = () => {
  const { lang } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('yojna_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('yojna_cookie_consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 text-white p-4 border-t border-slate-700 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <p className="text-slate-300">
            {lang === 'hi'
              ? 'योजना साथी आपकी गोपनीयता का सम्मान करता है। हम उपयोगकर्ता अनुभव और विज्ञापन अनुकूलन के लिए कुकीज़ का उपयोग करते हैं।'
              : 'YojnaSaathi respects your privacy. We use cookies to enhance user experience and personalized information.'}{' '}
            <Link href="/privacy-policy" className="underline text-blue-400 hover:text-blue-300">
              {lang === 'hi' ? 'गोपनीयता नीति पढ़ें' : 'Read Privacy Policy'}
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleAccept}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl transition-colors text-xs"
          >
            {lang === 'hi' ? 'स्वीकार करें' : 'Accept All'}
          </button>
          <button
            onClick={() => setShow(false)}
            className="text-slate-400 hover:text-white p-1"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
