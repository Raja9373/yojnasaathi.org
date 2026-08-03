import React from 'react';
import { Link } from 'wouter';
import { Bookmark, Clock, X, Trash2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarksContext';
import { MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';

interface SavedSchemesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedSchemesModal: React.FC<SavedSchemesModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const { bookmarkedSlugs, toggleBookmark, recentlyViewedSlugs, clearRecentlyViewed } = useBookmarks();

  if (!isOpen) return null;

  const savedSchemes = MASTER_SCHEMES_DATABASE.filter((s) => bookmarkedSlugs.includes(s.slug));
  const recentlyViewedSchemes = MASTER_SCHEMES_DATABASE.filter((s) => recentlyViewedSlugs.includes(s.slug));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-600 fill-blue-600" />
            <h2 className="font-bold text-slate-900 dark:text-white text-lg">
              {lang === 'hi' ? 'सेव की गई योजनाएं' : 'Saved Schemes'} ({savedSchemes.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* Saved Section */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {lang === 'hi' ? 'बुकमार्क योजनाएं' : 'Bookmarked Schemes'}
            </h3>

            {savedSchemes.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
                <p className="text-xs text-slate-500">
                  {lang === 'hi'
                    ? 'आपकी पसंदीदा योजनाएं यहाँ दिखाई देंगी। कार्ड्स पर दिल (❤️) आइकन दबाकर सेव करें।'
                    : 'No saved schemes yet. Click the bookmark icon on any scheme to save it for later.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedSchemes.map((s) => (
                  <div
                    key={s.id}
                    className="p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <Link
                        href={`/yojana/${s.slug}`}
                        onClick={onClose}
                        className="font-bold text-slate-900 dark:text-white text-xs hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1"
                      >
                        {lang === 'hi' ? s.title_hi : s.title_en}
                      </Link>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {lang === 'hi' ? s.benefit_amount_hi : s.benefit_amount_en}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBookmark(s.slug)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recently Viewed Section */}
          {recentlyViewedSchemes.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {lang === 'hi' ? 'हाल ही में देखी गई' : 'Recently Viewed'}
                </h3>
                <button
                  onClick={clearRecentlyViewed}
                  className="text-[11px] text-slate-400 hover:text-red-500"
                >
                  {lang === 'hi' ? 'साफ़ करें' : 'Clear'}
                </button>
              </div>

              <div className="space-y-2">
                {recentlyViewedSchemes.slice(0, 5).map((s) => (
                  <Link
                    key={`rv-${s.id}`}
                    href={`/yojana/${s.slug}`}
                    onClick={onClose}
                    className="block p-2.5 bg-slate-50 dark:bg-slate-700/30 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {lang === 'hi' ? s.title_hi : s.title_en}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center">
          <Link
            href="/yojanas"
            onClick={onClose}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            <span>{lang === 'hi' ? 'सभी 4,700+ योजनाएं खोजें' : 'Browse All 4,700+ Schemes'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
