import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import schemesData from '../data/schemes.json';
import { Scheme } from '../types';
import { Code, Download, FileCode, Check, Copy } from 'lucide-react';

export const SitemapRobotsPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const schemes = schemesData as unknown as Scheme[];

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots'>('sitemap');

  const baseUrl = 'https://yojanasaathi.org';

  // Generate XML Sitemap Content
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/yojanas</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/find-yojana</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/disclaimer</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
${schemes
  .map(
    (s) => `  <url>
    <loc>${baseUrl}/yojana/${s.slug}</loc>
    <lastmod>${s.updated_at}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  // Generate Robots.txt Content
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`;

  const activeContent = activeTab === 'sitemap' ? sitemapXml : robotsTxt;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === 'sitemap' ? 'sitemap.xml' : 'robots.txt';
    const blob = new Blob([activeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <SEOHead
        title={t('Sitemap & Robots.txt - YojanaSaathi.org', 'Sitemap & Robots.txt')}
        description="XML Sitemap and Robots.txt generator for YojanaSaathi.org SEO compliance."
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-[#1E3A8A] text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              SEO Optimization
            </span>
            <h1 className="text-2xl font-extrabold mt-1">
              Sitemap.xml & Robots.txt Viewer
            </h1>
            <p className="text-xs text-blue-200 mt-1">
              {t(
                'खोज इंजन (Google, Bing) के लिए स्वचालित रूप से जनरेट किया गया XML साइटमैप',
                'Automatically generated XML sitemap and robots.txt for search engine crawlers.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('sitemap')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'sitemap' ? 'bg-amber-400 text-slate-900' : 'bg-blue-900 text-white'
              }`}
            >
              sitemap.xml
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'robots' ? 'bg-amber-400 text-slate-900' : 'bg-blue-900 text-white'
              }`}
            >
              robots.txt
            </button>
          </div>
        </div>

        {/* Code View Card */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
            <span className="text-amber-400 font-bold">{activeTab === 'sitemap' ? 'sitemap.xml' : 'robots.txt'}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-200 cursor-pointer transition border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-bold cursor-pointer transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl overflow-x-auto text-emerald-400 leading-relaxed max-h-96">
            {activeContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
