import React, { useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { useLanguage } from '../context/LanguageContext';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLdSchema?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://www.yojnasaathi.org/og-image.jpg',
  ogType = 'website',
  jsonLdSchema
}) => {
  const { lang } = useLanguage();

  useEffect(() => {
    const fullTitle = title.includes('YojnaSaathi') ? title : `${title} | YojnaSaathi.org`;
    const resolvedUrl = canonicalUrl || ('https://www.yojnasaathi.org' + window.location.pathname);
    
    // Resolve absolute HTTPS URL for OG Image
    let absoluteOgImage = ogImage;
    if (ogImage.startsWith('/')) {
      absoluteOgImage = `https://www.yojnasaathi.org${ogImage}`;
    } else if (!ogImage.startsWith('http://') && !ogImage.startsWith('https://')) {
      absoluteOgImage = `https://www.yojnasaathi.org/${ogImage}`;
    }

    const imageType = absoluteOgImage.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

    // Document Title
    document.title = fullTitle;

    // Helper to set or create meta tag by attribute
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, contentValue: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (tag) {
        tag.setAttribute('content', contentValue);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        tag.setAttribute('content', contentValue);
        document.head.appendChild(tag);
      }
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'YojnaSaathi Editorial Team');

    // Open Graph Meta Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', resolvedUrl);
    setMetaTag('property', 'og:image', absoluteOgImage);
    setMetaTag('property', 'og:image:secure_url', absoluteOgImage);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:type', imageType);
    setMetaTag('property', 'og:image:alt', fullTitle);
    setMetaTag('property', 'og:site_name', 'YojnaSaathi');
    setMetaTag('property', 'og:locale', lang === 'hi' ? 'hi_IN' : 'en_US');

    // Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@YojnaSaathi');
    setMetaTag('name', 'twitter:creator', '@YojnaSaathi');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', absoluteOgImage);
    setMetaTag('name', 'twitter:image:alt', fullTitle);

    // Link image_src fallback for SMS and older messaging apps
    let imageSrcTag = document.querySelector('link[rel="image_src"]');
    if (imageSrcTag) {
      imageSrcTag.setAttribute('href', absoluteOgImage);
    } else {
      imageSrcTag = document.createElement('link');
      imageSrcTag.setAttribute('rel', 'image_src');
      imageSrcTag.setAttribute('href', absoluteOgImage);
      document.head.appendChild(imageSrcTag);
    }

    // Canonical Tag - Always canonicalize to official domain https://www.yojnasaathi.org
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', resolvedUrl);
    } else {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      canonicalTag.setAttribute('href', resolvedUrl);
      document.head.appendChild(canonicalTag);
    }

    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"]').forEach((el) => el.remove());

    // Inject hreflang tags for all 23 supported languages according to Google International SEO standards
    SUPPORTED_LANGUAGES.forEach((l) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', l.code);
      link.setAttribute('href', `${resolvedUrl}?lang=${l.code}`);
      document.head.appendChild(link);
    });

    // Default hreflang x-default
    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', resolvedUrl);
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
          "logo": "https://www.yojnasaathi.org/og-image.jpg",
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
  }, [title, description, canonicalUrl, ogImage, ogType, jsonLdSchema, lang]);

  return null;
};

