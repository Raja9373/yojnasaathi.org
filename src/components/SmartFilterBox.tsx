import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { STATES_LIST, OCCUPATIONS_LIST, CATEGORIES } from '../data/statesAndCategories';
import { Search, MapPin, User, Calendar, Briefcase, Filter, Sparkles, ArrowRight } from 'lucide-react';

export const SmartFilterBox: React.FC = () => {
  const { lang, t } = useLanguage();
  const [, navigate] = useLocation();

  const [state, setState] = useState('all');
  const [gender, setGender] = useState('all');
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('all');
  const [occupation, setOccupation] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (state !== 'all') params.append('state', state);
    if (gender !== 'all') params.append('gender', gender);
    if (age) params.append('age', age);
    if (category !== 'all') params.append('category', category);
    if (occupation !== 'all') params.append('occupation', occupation);

    navigate(`/find-yojana?${params.toString()}`);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-7 shadow-2xl border border-blue-100 max-w-5xl mx-auto text-slate-800">
      {/* Box Title Badge */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t('स्मार्ट योजना खोजक (Smart Scheme Finder)', 'Smart Scheme Finder')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('अपनी जानकारी चुनें और तुरंत अपनी योग्य योजनाएं खोजें', 'Select your details to instantly discover schemes you qualify for')}
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
          ⚡ {t('100% सटीक फ़िल्टर', '100% Verified Logic')}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* 1. Rajya (State) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('1. राज्य (State)', '1. Select State')}</span>
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800 focus:outline-none"
            >
              {STATES_LIST.map((st) => (
                <option key={st.code} value={st.name_en === 'All States (Central Schemes)' ? 'all' : st.name_en}>
                  {t(st.name_hi, st.name_en)}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Ling (Gender) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-rose-600" />
              <span>{t('2. लिंग (Gender)', '2. Gender')}</span>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800 focus:outline-none"
            >
              <option value="all">{t('सभी लिंग (All)', 'All Genders')}</option>
              <option value="male">{t('पुरुष (Male)', 'Male')}</option>
              <option value="female">{t('महिला (Female)', 'Female')}</option>
              <option value="transgender">{t('ट्रांसजेंडर (Transgender)', 'Transgender')}</option>
            </select>
          </div>

          {/* 3. Ayu (Age) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>{t('3. आयु (Age)', '3. Age (Years)')}</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder={t('जैसे: 25', 'e.g. 25')}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800 focus:outline-none"
            />
          </div>

          {/* 4. Category */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('4. श्रेणी (Category)', '4. Category')}</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800 focus:outline-none"
            >
              <option value="all">{t('सभी श्रेणियां (All)', 'All Categories')}</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {t(cat.name_hi, cat.name_en)}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Rozgar (Occupation) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('5. व्यवसाय (Occupation)', '5. Occupation')}</span>
            </label>
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800 focus:outline-none"
            >
              {OCCUPATIONS_LIST.map((occ) => (
                <option key={occ.code} value={occ.code}>
                  {t(occ.label_hi, occ.label_en)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit CTA Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#1E40AF] hover:bg-blue-900 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg shadow-blue-900/20 cursor-pointer flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4 text-amber-300" />
            <span>{t('योजना खोजें (Yojana Khoje)', 'Find Eligible Schemes')}</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </form>
    </div>
  );
};
