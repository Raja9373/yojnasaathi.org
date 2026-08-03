import React, { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { Calendar, Clock, User, ArrowRight, Tag, BookOpen, Search } from 'lucide-react';

export function BlogListPage() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(BLOG_ARTICLES.map(a => a.category)))];

  const filteredArticles = BLOG_ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      article.title_hi.toLowerCase().includes(query) ||
      article.title_en.toLowerCase().includes(query) ||
      article.excerpt_hi.toLowerCase().includes(query) ||
      article.excerpt_en.toLowerCase().includes(query) ||
      article.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Schema.org Blog List Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "योजना साथी सरकारी योजना ब्लॉग - YojnaSaathi Blog",
          "url": "https://www.yojnasaathi.org/blog",
          "description": "भारत सरकार व राज्य सरकारों की नवीनतम योजनाओं, सब्सिडी, छात्रवृत्ति, किसान सम्मान निधि, और महिला कल्याण गाइड की विस्तृत जानकारी।",
          "publisher": {
            "@type": "Organization",
            "name": "YojnaSaathi",
            "url": "https://www.yojnasaathi.org"
          }
        })}
      </script>

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">
            {lang === 'hi' ? 'होम' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">
            {lang === 'hi' ? 'ब्लॉग व गाइड' : 'Blog & Articles'}
          </span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-blue-400/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'सरकारी योजना गाइड एवं समाचार' : 'Government Scheme Guides & News'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {lang === 'hi'
                ? 'सरकारी योजनाएं, सब्सिडी एवं पात्रता ब्लॉग'
                : 'Government Schemes, Subsidies & Eligibility Blog'}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mb-8">
              {lang === 'hi'
                ? 'पीएम किसान, आयुष्मान भारत, महिला सम्मान, दिल्ली योजनाएं और बिना गारंटी लोन की 100% सटीक, विस्तृत एवं आसान गाइड।'
                : '100% accurate, detailed, and easy-to-understand guides on PM-Kisan, Ayushman Bharat, Women Welfare, and State Schemes.'}
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'hi'
                    ? 'लेख या विषय खोजें (जैसे: पीएम किसान, दिल्ली योजना, आयुष्मान)...'
                    : 'Search articles (e.g. PM Kisan, Delhi Schemes, Ayushman)...'
                }
                className="w-full bg-white text-slate-900 pl-11 pr-4 py-3.5 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 font-medium text-sm sm:text-base"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? (lang === 'hi' ? 'सभी लेख' : 'All Articles') : cat}
            </button>
          ))}
        </div>

        {/* Featured / Hero Article */}
        {filteredArticles.length > 0 && selectedCategory === 'all' && !searchQuery && (
          <div className="mb-12 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow group grid md:grid-cols-12 gap-0">
            <div className="md:col-span-7 relative min-h-[280px] overflow-hidden">
              <img
                src={filteredArticles[0].featured_image}
                alt={lang === 'hi' ? filteredArticles[0].title_hi : filteredArticles[0].title_en}
                title={lang === 'hi' ? filteredArticles[0].title_hi : filteredArticles[0].title_en}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
                {lang === 'hi' ? 'विशेष लेख' : 'Featured Article'}
              </div>
            </div>
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1 font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {filteredArticles[0].category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {filteredArticles[0].read_time_minutes} min read
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                  <Link href={`/blog/${filteredArticles[0].slug}`}>
                    {lang === 'hi' ? filteredArticles[0].title_hi : filteredArticles[0].title_en}
                  </Link>
                </h2>
                <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                  {lang === 'hi' ? filteredArticles[0].excerpt_hi : filteredArticles[0].excerpt_en}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {filteredArticles[0].updated_at}
                </span>
                <Link
                  href={`/blog/${filteredArticles[0].slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  <span>{lang === 'hi' ? 'पूरा लेख पढ़ें' : 'Read Full Article'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map(article => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={article.featured_image}
                    alt={lang === 'hi' ? article.title_hi : article.title_en}
                    title={lang === 'hi' ? article.title_hi : article.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-md">
                    {article.category}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.updated_at}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.read_time_minutes} min read
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2.5 line-clamp-2 leading-snug">
                    <Link href={`/blog/${article.slug}`}>
                      {lang === 'hi' ? article.title_hi : article.title_en}
                    </Link>
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 mb-4">
                    {lang === 'hi' ? article.excerpt_hi : article.excerpt_en}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-0 mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium truncate max-w-[160px]">
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{article.author}</span>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="text-xs font-bold text-blue-600 group-hover:text-blue-800 flex items-center gap-1 shrink-0"
                >
                  <span>{lang === 'hi' ? 'पढ़ें' : 'Read'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {lang === 'hi' ? 'कोई लेख नहीं मिला' : 'No articles found'}
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              {lang === 'hi'
                ? 'कृपया अपने खोज शब्द को बदलें या अन्य श्रेणी का चयन करें।'
                : 'Try adjusting your search terms or filter.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              {lang === 'hi' ? 'सभी लेख देखें' : 'View All Articles'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
