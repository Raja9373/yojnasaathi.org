import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { SchemeCard } from '../components/SchemeCard';
import { searchSchemesDatabase } from '../data/schemeDatabase';
import { STATES_LIST, OCCUPATIONS_LIST, CASTES_LIST, INCOME_SLABS, CATEGORIES } from '../data/statesAndCategories';
import { 
  Sparkles, 
  MapPin, 
  User, 
  Calendar, 
  Briefcase, 
  Filter, 
  CheckCircle2, 
  RotateCcw,
  SlidersHorizontal,
  Info,
  DollarSign,
  Search,
  ArrowRight,
  Percent
} from 'lucide-react';

export const FindYojanaPage: React.FC = () => {
  const { lang, t } = useLanguage();

  // Parse initial params from URL
  const searchParams = new URLSearchParams(window.location.search);

  const [state, setState] = useState(searchParams.get('state') || 'all');
  const [gender, setGender] = useState(searchParams.get('gender') || 'all');
  const [age, setAge] = useState(searchParams.get('age') || '');
  const [caste, setCaste] = useState(searchParams.get('caste') || 'all');
  const [occupation, setOccupation] = useState(searchParams.get('occupation') || 'all');
  const [incomeCode, setIncomeCode] = useState(searchParams.get('income') || 'all');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [onlySubsidy, setOnlySubsidy] = useState(searchParams.get('subsidy') === 'true');
  const [naturalQuery, setNaturalQuery] = useState('');

  // AI Natural Language Query Parser
  const parseNaturalLanguage = (query: string) => {
    const q = query.toLowerCase();
    
    // Parse State
    if (q.includes('delhi') || q.includes('दिल्ली')) setState('Delhi');
    else if (q.includes('up') || q.includes('uttar pradesh') || q.includes('उत्तर प्रदेश')) setState('Uttar Pradesh');
    else if (q.includes('mp') || q.includes('madhya pradesh') || q.includes('मध्य प्रदेश')) setState('Madhya Pradesh');
    else if (q.includes('bihar') || q.includes('बिहार')) setState('Bihar');
    else if (q.includes('rajasthan') || q.includes('राजस्थान')) setState('Rajasthan');
    else if (q.includes('maharashtra') || q.includes('महाराष्ट्र')) setState('Maharashtra');

    // Parse Gender
    if (q.includes('female') || q.includes('woman') || q.includes('women') || q.includes('लड़की') || q.includes('महिला') || q.includes('बेटी')) {
      setGender('female');
    } else if (q.includes('male') || q.includes('man') || q.includes('पुरुष')) {
      setGender('male');
    }

    // Parse Age
    const ageMatch = q.match(/(\d{1,2})\s*(year|yr|साल|वर्ष|आयु)/) || q.match(/(\d{1,2})\s*(old|आयु)/);
    if (ageMatch) {
      setAge(ageMatch[1]);
    }

    // Parse Occupation / Category
    if (q.includes('student') || q.includes('छात्र') || q.includes('पढ़ाई') || q.includes('scholarship')) {
      setOccupation('student');
      setCategory('shiksha');
    } else if (q.includes('farmer') || q.includes('किसान') || q.includes('कृषि')) {
      setOccupation('farmer');
      setCategory('kisan');
    } else if (q.includes('pension') || q.includes('पेंशन') || q.includes(' senior') || q.includes('बुजुर्ग')) {
      setOccupation('senior');
      setCategory('pension');
    } else if (q.includes('subsidy') || q.includes('सब्सिडी') || q.includes('सोलर') || q.includes('बिजली')) {
      setOnlySubsidy(true);
      setCategory('subsidy');
    }

    setSearchTrigger(prev => prev + 1);
  };

  const handleNaturalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (naturalQuery.trim()) {
      parseNaturalLanguage(naturalQuery.trim());
    }
  };

  // Trigger search trigger counter to force re-evaluation on explicit button submit
  const [searchTrigger, setSearchTrigger] = useState(0);

  // Matching Logic across all 4,770 schemes
  const matchedSchemes = useMemo(() => {
    const userAge = age !== '' ? parseInt(age, 10) : undefined;
    const incomeObj = INCOME_SLABS.find((s) => s.code === incomeCode);
    const maxInc = incomeObj?.max_value;

    return searchSchemesDatabase({
      state,
      gender,
      age: userAge,
      caste,
      occupation,
      incomeMax: maxInc,
      category,
      isSubsidyOnly: onlySubsidy
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, gender, age, caste, occupation, incomeCode, category, onlySubsidy, searchTrigger]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTrigger((prev) => prev + 1);

    // Update URL query string without reloading page
    const params = new URLSearchParams();
    if (state !== 'all') params.append('state', state);
    if (gender !== 'all') params.append('gender', gender);
    if (age) params.append('age', age);
    if (caste !== 'all') params.append('caste', caste);
    if (occupation !== 'all') params.append('occupation', occupation);
    if (incomeCode !== 'all') params.append('income', incomeCode);
    if (category !== 'all') params.append('category', category);
    if (onlySubsidy) params.append('subsidy', 'true');

    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setState('all');
    setGender('all');
    setAge('');
    setCaste('all');
    setOccupation('all');
    setIncomeCode('all');
    setCategory('all');
    setOnlySubsidy(false);
    setSearchTrigger((prev) => prev + 1);
    window.history.replaceState(null, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <SEOHead
        title={t('स्मार्ट पात्रता जाँच टूल - YojnaSaathi.org', 'Smart Eligibility Checker')}
        description={t(
          'अपनी आयु, राज्य, लिंग, वर्ग व आय भरकर जानें कि आप किन 4,770+ सरकारी योजनाओं व सब्सिडी (PM Kisan, Solar Rooftop, Ladli Behna etc.) के लिए योग्य हैं।',
          'Find all government schemes and state subsidies you qualify for across 4,770+ schemes.'
        )}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('4,772+ योजनाओं का स्मार्ट डेटाबेस Engine', 'Smart Engine covering 4,772+ Schemes')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t('सरकारी योजना पात्रता एवं सब्सिडी जाँच टूल', 'Smart Scheme & Subsidy Eligibility Checker')}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              {t(
                'अपनी सही जानकारी दर्ज करें और हमारा स्मार्ट सिस्टम myScheme.gov.in के तर्ज पर देश की सभी 4,772+ योजनाओं में से केवल आपकी योग्य योजनाएं व राज्य सब्सिडी दिखाएगा।',
                'Select your criteria to instantly discover matching schemes and government subsidies across all 36 States & UTs.'
              )}
            </p>

            {/* Natural Language Prompt Search Bar */}
            <form onSubmit={handleNaturalSubmit} className="pt-4 max-w-2xl">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={naturalQuery}
                  onChange={(e) => setNaturalQuery(e.target.value)}
                  placeholder={
                    lang === 'hi'
                      ? 'AI सहायता: "मैं दिल्ली की 22 साल की छात्रा हूँ..." या "यूपी के किसान की सब्सिडी"'
                      : 'AI Assistant: "I am a 22 year old female student from Delhi..."'
                  }
                  className="w-full bg-white text-slate-900 text-xs sm:text-sm pl-10 pr-24 py-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400 font-medium"
                />
                <Sparkles className="w-4 h-4 text-amber-500 absolute left-3.5" />
                <button
                  type="submit"
                  className="absolute right-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? 'AI खोजें' : 'AI Find'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Core Form Card with Always-Available Submit Button */}
        <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-700" />
              <h2 className="text-base font-bold text-slate-900">
                {t('पात्रता मानदंड एवं फ़िल्टर चुनें (Select Eligibility Criteria)', 'Select Eligibility Criteria')}
              </h2>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition cursor-pointer border border-rose-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('फ़िल्टर रीसेट करें', 'Reset Filters')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. State */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{t('राज्य / केंद्र शासित प्रदेश (State)', 'State / UT')}</span>
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
              >
                {STATES_LIST.map((st) => (
                  <option key={st.code} value={st.name_en === 'All States (Central Schemes)' ? 'all' : st.name_en}>
                    {t(st.name_hi, st.name_en)}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Gender */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-4 h-4 text-rose-600" />
                <span>{t('लिंग (Gender)', 'Gender')}</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
              >
                <option value="all">{t('सभी (All)', 'All')}</option>
                <option value="male">{t('पुरुष (Male)', 'Male')}</option>
                <option value="female">{t('महिला (Female)', 'Female')}</option>
                <option value="transgender">{t('ट्रांसजेंडर (Transgender)', 'Transgender')}</option>
              </select>
            </div>

            {/* 3. Age */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>{t('आयु (Age - Years)', 'Age (Years)')}</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder={t('अपनी आयु लिखें (जैसे: 28)', 'Enter age (e.g. 28)')}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
              />
            </div>

            {/* 4. Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-emerald-600" />
                <span>{t('योजना क्षेत्र (Category)', 'Category')}</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
              >
                <option value="all">{t('सभी श्रेणियां (All)', 'All Categories')}</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {t(cat.name_hi, cat.name_en)}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Caste / Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-indigo-600" />
                <span>{t('सामाजिक वर्ग (Caste Category)', 'Caste Category')}</span>
              </label>
              <select
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
              >
                {CASTES_LIST.map((c) => (
                  <option key={c.code} value={c.code}>
                    {t(c.label_hi, c.label_en)}
                  </option>
                ))}
              </select>
            </div>

            {/* 6. Occupation */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span>{t('व्यवसाय (Occupation)', 'Occupation')}</span>
              </label>
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
              >
                {OCCUPATIONS_LIST.map((occ) => (
                  <option key={occ.code} value={occ.code}>
                    {t(occ.label_hi, occ.label_en)}
                  </option>
                ))}
              </select>
            </div>

            {/* 7. Income Slab */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-700" />
                <span>{t('वार्षिक पारिवारिक आय (Annual Income)', 'Annual Income')}</span>
              </label>
              <select
                value={incomeCode}
                onChange={(e) => setIncomeCode(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600 text-slate-800"
              >
                {INCOME_SLABS.map((inc) => (
                  <option key={inc.code} value={inc.code}>
                    {t(inc.label_hi, inc.label_en)}
                  </option>
                ))}
              </select>
            </div>

            {/* 8. Subsidy Only Checkbox */}
            <div className="space-y-1.5 flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer bg-amber-50 p-2.5 rounded-xl border border-amber-300 w-full text-xs font-bold text-amber-950 hover:bg-amber-100 transition">
                <input
                  type="checkbox"
                  checked={onlySubsidy}
                  onChange={(e) => setOnlySubsidy(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                />
                <Percent className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t('केवल सरकारी सब्सिडी योजनाएं दिखाएं', 'Show Govt Subsidies Only')}</span>
              </label>
            </div>
          </div>

          {/* PERMANENT SEARCH & ENTER BUTTON (ALWAYS AVAILABLE FOR EVERY SEARCH) */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-semibold text-slate-600">
              {t(
                'नोट: किसी भी विकल्प को बदलने के बाद "योजना खोजें" बटन दबाएं या Enter दबाएं।',
                'Note: Click "Find Eligible Schemes" or press Enter after changing criteria.'
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReset}
                className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                {t('रीसेट (Reset)', 'Reset')}
              </button>

              <button
                type="submit"
                id="search-eligibility-btn"
                className="w-1/2 sm:w-auto bg-[#1E40AF] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-xl shadow-lg shadow-blue-900/20 cursor-pointer flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 shrink-0"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>{t('योजना व सब्सिडी खोजें (Search)', 'Find Eligible Schemes')}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </form>

        {/* Results Banner & Count */}
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md shrink-0">
              {matchedSchemes.length}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-emerald-950">
                {t(
                  `आपके लिए ${matchedSchemes.length} योग्य योजनाएं व सब्सिडी मिलीं!`,
                  `Found ${matchedSchemes.length} eligible schemes & subsidies for you!`
                )}
              </h2>
              <p className="text-xs text-emerald-800">
                {t(
                  'आपके द्वारा चुने गए राज्य, आयु, आय, व्यवसाय व श्रेणी मानदंड के अनुसार फ़िल्टर की गई योजनाएं नीचे दी गई हैं:',
                  'Schemes filtered based on your state, age, income & occupation criteria:'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-900 bg-emerald-200/80 px-3 py-1.5 rounded-lg border border-emerald-300">
              ✓ {t('4,770+ डेटाबेस से सत्यापित', 'Verified across 4,770+ DB')}
            </span>
          </div>
        </div>

        {/* Scheme Cards Results Grid */}
        {matchedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedSchemes.slice(0, 30).map((scheme) => (
              <div key={scheme.id} className="relative">
                {/* Eligible Match Badge Overlay */}
                <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('आप इसके लिए पात्र हैं', 'Eligible Scheme')}</span>
                </div>
                <SchemeCard scheme={scheme} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-slate-200">
            <Info className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">
              {t('कोई योजना नहीं मिली', 'No Schemes Matched')}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {t(
                'आपके चुने गए फ़िल्टर अत्यधिक सख्त हो सकते हैं। कृपया आयु, आय या राज्य फ़िल्टर बदलकर पुनः "योजना खोजें" बटन दबाएं।',
                'Your current filter criteria might be too strict. Please adjust filters and submit again.'
              )}
            </p>
            <button
              onClick={handleReset}
              className="bg-[#1E40AF] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-blue-900 transition cursor-pointer"
            >
              {t('फ़िल्टर साफ़ करें (Reset Filters)', 'Reset Filters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
