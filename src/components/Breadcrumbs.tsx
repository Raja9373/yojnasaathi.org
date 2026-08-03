import React from 'react';
import { Link } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface BreadcrumbItem {
  labelHi: string;
  labelEn: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { lang } = useLanguage();
  const baseUrl = 'https://yojnasaathi.org';

  const allItems: BreadcrumbItem[] = [
    { labelHi: 'होम', labelEn: 'Home', href: '/' },
    ...items,
  ];

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: lang === 'hi' ? item.labelHi : item.labelEn,
      item: item.href ? `${baseUrl}${item.href}` : window.location.href,
    })),
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      <nav
        aria-label="Breadcrumb"
        className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 my-4 flex items-center gap-1.5 flex-wrap"
      >
        {allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1;
          const label = lang === 'hi' ? item.labelHi : item.labelEn;

          return (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />}
              {isLast || !item.href ? (
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">
                  {idx === 0 && <Home className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />}
                  {label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-medium"
                >
                  {idx === 0 && <Home className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{label}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
};
