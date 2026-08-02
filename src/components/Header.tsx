import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  Globe, 
  Menu, 
  X, 
  Landmark, 
  Filter, 
  ShieldCheck, 
  FileText, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/yojanas?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: '/', labelHi: 'होम', labelEn: 'Home' },
    { href: '/yojanas', labelHi: 'सभी योजनाएं', labelEn: 'All Schemes' },
    { href: '/yojanas?type=central', labelHi: 'केन्द्रीय योजना', labelEn: 'Central Schemes' },
    { href: '/yojanas?type=state', labelHi: 'राज्य योजना', labelEn: 'State Schemes' },
    { href: '/find-yojana', labelHi: 'पात्रता जाँच (Smart Filter)', labelEn: 'Eligibility Checker', highlight: true },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path.split('?')[0]) && path !== '/') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
      {/* Top Official Banner Bar */}
      <div className="bg-[#1E3A8A] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-wide">
              {t(
                'भारत सरकार व राज्य सरकारों की जनकल्याणकारी योजनाओं का सूचना एवं पात्रता पोर्टल',
                'Information & Eligibility Portal for Indian Central and State Govt Schemes'
              )}
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-200 text-[11px] font-medium">
            <Link href="/about" className="hover:text-amber-300">
              {t('हमारे बारे में', 'About Us')}
            </Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-amber-300">
              {t('संपर्क', 'Contact')}
            </Link>
            <span>|</span>
            <Link href="/privacy-policy" className="hover:text-amber-300">
              {t('गोपनीयता नीति', 'Privacy')}
            </Link>
            <span>|</span>
            <Link href="/sitemap" className="hover:text-white underline decoration-dashed">
              Sitemap
            </Link>
            <span>|</span>
            <button 
              onClick={toggleLang} 
              className="flex items-center gap-1 font-semibold text-amber-300 hover:text-amber-200 cursor-pointer bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'English' : 'हिंदी (Hindi)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
            <Landmark className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E3A8A]">
                Yojana<span className="text-orange-600">Saathi</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded border border-blue-200">
                .org
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 tracking-wider">
              {t('हर योजना, हर नागरिक तक', 'Har Yojana, Har Nagrik Tak')}
            </p>
          </div>
        </Link>

        {/* Global Search Bar (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder={t('योजना का नाम खोजें (जैसे: PM Kisan, Ladli Behna)...', 'Search scheme name (e.g. PM Kisan, Ladli Behna)...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-24 py-2 text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800 placeholder-slate-400 shadow-inner transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#1E40AF] hover:bg-blue-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full cursor-pointer transition shadow-sm"
          >
            {t('खोजें', 'Search')}
          </button>
        </form>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Quick Eligibility CTA Button (Desktop) */}
          <button
            onClick={() => navigate('/find-yojana')}
            className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-full shadow-md shadow-orange-500/20 cursor-pointer transition transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{t('मेरी पात्रता जाँचें', 'Check Eligibility')}</span>
          </button>

          {/* Language Switch Button (Mobile Visible) */}
          <button
            onClick={toggleLang}
            className="md:hidden flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-700 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-blue-700" />
            <span>{lang === 'hi' ? 'EN' : 'हिन्दी'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar (Desktop) */}
      <nav className="hidden md:block bg-[#1E40AF] border-t border-blue-800 text-white text-sm font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 transition flex items-center gap-1.5 border-b-2 ${
                    active
                      ? 'border-amber-400 font-bold bg-blue-900/60 text-amber-300'
                      : 'border-transparent hover:bg-blue-800/80 hover:text-amber-200'
                  } ${link.highlight ? 'bg-amber-500/20 text-amber-300 font-semibold' : ''}`}
                >
                  {link.highlight && <Filter className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{t(link.labelHi, link.labelEn)}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-200 py-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t('100% नि:शुल्क व सटीक जानकारी', '100% Free & Verified Scheme Info')}</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/60 fixed inset-0 z-50 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="p-4 bg-[#1E3A8A] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-base">YojanaSaathi.org</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded bg-blue-900 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder={t('योजना खोजें...', 'Search schemes...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-16 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded"
                  >
                    {t('खोजें', 'Search')}
                  </button>
                </form>
              </div>

              {/* Navigation Links */}
              <div className="p-2 space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${
                        active
                          ? 'bg-blue-50 text-blue-800 font-bold border-l-4 border-blue-800'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{t(link.labelHi, link.labelEn)}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Checker Card */}
              <div className="p-4 m-3 bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{t('पात्रता जाँच टूल', 'Smart Eligibility Finder')}</span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  {t(
                    'अपनी आयु, राज्य, लिंग और व्यवसाय भरकर जानें कि आप किन सरकारी योजनाओं के लिए योग्य हैं।',
                    'Fill your age, state, gender and occupation to discover all schemes you qualify for.'
                  )}
                </p>
                <button
                  onClick={() => {
                    navigate('/find-yojana');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#1E40AF] text-white text-xs font-semibold py-2 rounded-lg text-center cursor-pointer shadow-sm"
                >
                  {t('अभी पात्रता जाँचें', 'Check Eligibility Now')}
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 text-center text-xs text-slate-500 bg-slate-50">
              <p>{t('योजनासाथी डॉट ओआरजी © 2026', 'YojanaSaathi.org © 2026')}</p>
              <p className="mt-1 text-[11px] text-slate-400">
                {t('गैर-सरकारी सूचनात्मक पोर्टल', 'Non-Government Informational Portal')}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
