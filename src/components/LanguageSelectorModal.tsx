import React, { useState } from 'react';
import { Globe, Search, Check, X, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES, LanguageInfo } from '../data/languages';
import { Language } from '../types';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({ isOpen, onClose }) => {
  const { lang, setLang } = useLanguage();
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.nameEn.toLowerCase().includes(filterQuery.toLowerCase()) ||
      l.nameNative.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (l.region && l.region.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  const handleSelect = (code: string) => {
    setLang(code as Language);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-md">
              <Languages className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Choose your language</h2>
              <p className="text-xs text-blue-200 mt-0.5">
                Support for 22 Official Scheduled Indian Languages + English
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search language e.g. Tamil, Bengali, ગુજરાતી, हिन्दी..."
              className="w-full bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Language Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 flex-1">
          {filteredLanguages.map((l: LanguageInfo) => {
            const isSelected = lang === l.code;
            return (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-900/40 border-blue-600 dark:border-blue-400 ring-2 ring-blue-500/20'
                    : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                    <span>{l.nameNative}</span>
                    {l.flagEmoji && <span className="text-xs">{l.flagEmoji}</span>}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {l.nameEn} {l.region ? `• ${l.region}` : ''}
                  </div>
                </div>

                {isSelected && (
                  <div className="p-1 bg-blue-600 text-white rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center">
          Language selection is saved for future visits. Powered by YojnaSaathi Multilingual Engine.
        </div>
      </div>
    </div>
  );
};
