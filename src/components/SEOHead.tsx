import React, { useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { useLanguage } from '../context/LanguageContext';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  jsonLdSchema?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80',
  jsonLdSchema
}) => {
  const { lang } = useLanguage();

  useEffect(() => {
    // Document Title
    document.title = title.includes('YojnaSaathi') ? title : `${title} | YojnaSaathi.org`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', description);
      document.head.appendChild(metaDesc);
    }

    // Open Graph Meta Tags
    const ogTags = [
      { property: 'og:title', content: title.includes('YojnaSaathi') ? title : `${title} | YojnaSaathi.org` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'YojnaSaathi.org' },
      { property: 'og:locale', content: lang === 'hi' ? 'hi_IN' : 'en_US' },
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    });

    // Canonical Tag - Always canonicalize to official domain https://www.yojnasaathi.org
    const currentBaseUrl = canonicalUrl || 'https://www.yojnasaathi.org' + window.location.pathname;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', currentBaseUrl);
    } else {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      canonicalTag.setAttribute('href', currentBaseUrl);
      document.head.appendChild(canonicalTag);
    }

    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"]').forEach((el) => el.remove());

    // Inject hreflang tags for all 23 supported languages according to Google International SEO standards
    SUPPORTED_LANGUAGES.forEach((l) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', l.code);
      link.setAttribute('href', `${currentBaseUrl}?lang=${l.code}`);
      document.head.appendChild(link);
    });

    // Default hreflang x-default
    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', currentBaseUrl);
    document.head.appendChild(xDefault);

    // JSON-LD Schema Script
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const defaultOrgSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.yojnasaathi.org/#organization",
          "name": "YojnaSaathi",
          "alternateName": [
            "Yojna Saathi",
            "Yojana Saathi",
            "Yojanasaathi",
            "Yojan Saathi",
            "YojnaSathi",
            "YojanaSathi",
            "YojnaSaathi.org",
            "YojanaSaathi.org"
          ],
          "url": "https://www.yojnasaathi.org",
          "logo": "https://www.yojnasaathi.org/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "contact@yojnasaathi.org",
            "contactType": "customer support",
            "availableLanguage": ["Hindi", "English"]
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://www.yojnasaathi.org/#website",
          "url": "https://www.yojnasaathi.org",
          "name": "YojnaSaathi",
          "alternateName": ["Yojna Saathi", "Yojana Saathi"],
          "publisher": {
            "@id": "https://www.yojnasaathi.org/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.yojnasaathi.org/yojanas?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    };

    const finalSchema = jsonLdSchema ? jsonLdSchema : defaultOrgSchema;

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      ...finalSchema,
      inLanguage: lang,
    });
    document.head.appendChild(script);
  }, [title, description, canonicalUrl, ogImage, jsonLdSchema, lang]);

  return null;
};

