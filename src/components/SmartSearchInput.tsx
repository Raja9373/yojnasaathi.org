import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Search, Mic, MicOff, Clock, TrendingUp, Sparkles, X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MASTER_SCHEMES_DATABASE } from '../data/schemeDatabase';

interface SmartSearchInputProps {
  placeholderEn?: string;
  placeholderHi?: string;
  className?: string;
  autoFocus?: boolean;
  onSelect?: (query: string) => void;
}

const POPULAR_SEARCHES = [
  { hi: 'पीएम किसान सम्मान निधि', en: 'PM Kisan Samman Nidhi' },
  { hi: 'सोलर रूफटॉप सब्सिडी', en: 'Solar Rooftop Subsidy' },
  { hi: 'आयुष्मान भारत कार्ड', en: 'Ayushman Bharat Card' },
  { hi: 'लाडली बहना योजना', en: 'Ladli Behna Yojana' },
  { hi: 'पीएम आवास योजना', en: 'PM Awas Yojana' },
  { hi: 'छात्रवृत्ति योजना', en: 'Scholarship Schemes' },
];

const ALIAS_MAP: Record<string, string> = {
  'ayusman': 'Ayushman Bharat',
  'kisan': 'PM Kisan',
  'awas': 'PM Awas',
  'pmjay': 'Ayushman Bharat',
  'solar': 'Solar Rooftop',
  'bijli': 'PM Surya Ghar',
  'pension': 'Pension',
  'ladli': 'Ladli Behna',
  'vishwakarma': 'PM Vishwakarma',
};

export const SmartSearchInput: React.FC<SmartSearchInputProps> = ({
  placeholderEn = 'Search 4,700+ Schemes or Subsidies...',
  placeholderHi = '4,700+ योजनाएं एवं सब्सिडी खोजें...',
  className = '',
  autoFocus = false,
  onSelect,
}) => {
  const { lang } = useLanguage();
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('yojna_search_history');
      return saved ? JSON.parse(saved) : ['पीएम किसान', 'सोलर सब्सिडी', 'आयुष्मान कार्ड'];
    } catch {
      return ['पीएम किसान', 'सोलर सब्सिडी', 'आयुष्मान कार्ड'];
    }
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveToHistory = (term: string) => {
    if (!term.trim()) return;
    const clean = term.trim();
    const updated = [clean, ...searchHistory.filter((item) => item !== clean)].slice(0, 8);
    setSearchHistory(updated);
    try {
      localStorage.setItem('yojna_search_history', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('yojna_search_history');
  };

  // Typo check suggestion
  let typoCorrection = '';
  const cleanQ = query.toLowerCase().trim();
  for (const [key, target] of Object.entries(ALIAS_MAP)) {
    if (cleanQ.includes(key) && !cleanQ.includes(target.toLowerCase())) {
      typoCorrection = target;
      break;
    }
  }

  // Live Instant Suggestions from Master Database
  const suggestions = query.trim().length > 1
    ? MASTER_SCHEMES_DATABASE.filter((s) => {
        const titleHi = s.title_hi.toLowerCase();
        const titleEn = s.title_en.toLowerCase();
        const q = query.toLowerCase();
        return titleHi.includes(q) || titleEn.includes(q) || s.tags.some(t => t.toLowerCase().includes(q));
      }).slice(0, 6)
    : [];

  const handleSearch = (searchTerm: string) => {
    saveToHistory(searchTerm);
    setIsOpen(false);
    if (onSelect) {
      onSelect(searchTerm);
    } else {
      setLocation(`/yojanas?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Voice Search Handler
  const toggleVoiceSearch = () => {
    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: new () => any;
      webkitSpeechRecognition?: new () => any;
    };

    const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(lang === 'hi' ? 'आपका ब्राउज़र वॉयस सर्च का समर्थन नहीं करता है।' : 'Voice search is not supported on this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setQuery(speechResult);
      handleSearch(speechResult);
    };

    recognition.start();
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) handleSearch(query);
        }}
        className="relative flex items-center"
      >
        <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-4 pointer-events-none" />
        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={lang === 'hi' ? placeholderHi : placeholderEn}
          className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm sm:text-base pl-12 pr-24 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium transition-all"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={toggleVoiceSearch}
            title={lang === 'hi' ? 'बोलकर खोजें' : 'Voice Search'}
            className={`p-2 rounded-xl transition-colors ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>
      </form>

      {/* Autocomplete & Instant Dropdown */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto">
          {/* Typo Correction Bar */}
          {typoCorrection && (
            <div className="bg-amber-50 dark:bg-amber-900/30 px-4 py-2.5 border-b border-amber-200 dark:border-amber-800/50 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-amber-800 dark:text-amber-300 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {lang === 'hi' ? 'क्या आपका मतलब था:' : 'Did you mean:'}{' '}
                <strong className="underline cursor-pointer" onClick={() => handleSearch(typoCorrection)}>
                  {typoCorrection}
                </strong>
              </span>
            </div>
          )}

          {/* Instant Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-3 border-b border-slate-100 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                {lang === 'hi' ? 'त्वरित सुझाव (Instant Schemes)' : 'Instant Suggestions'}
              </div>
              <div className="space-y-1">
                {suggestions.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() => {
                      setLocation(`/yojana/${scheme.slug}`);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700/60 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                        {lang === 'hi' ? scheme.title_hi : scheme.title_en}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span>{scheme.type === 'central' ? 'Central Scheme' : scheme.state}</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {lang === 'hi' ? scheme.benefit_amount_hi : scheme.benefit_amount_en}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Search History */}
          {searchHistory.length > 0 && (
            <div className="p-3 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2 px-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {lang === 'hi' ? 'हालिया खोजें' : 'Recent Searches'}
                </span>
                <button
                  type="button"
                  onClick={clearHistory}
                  className="text-xs text-slate-400 hover:text-red-500"
                >
                  {lang === 'hi' ? 'साफ़ करें' : 'Clear'}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {searchHistory.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(term)}
                    className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-slate-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular & Trending Searches */}
          <div className="p-3 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
              {lang === 'hi' ? 'लोकप्रिय ट्रेंडिंग खोजें' : 'Popular & Trending Searches'}
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((item, idx) => {
                const label = lang === 'hi' ? item.hi : item.en;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSearch(label)}
                    className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs"
                  >
                    🔥 {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
