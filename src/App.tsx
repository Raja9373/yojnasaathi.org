import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarksProvider } from './context/BookmarksContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LiveUpdateTicker } from './components/LiveUpdateTicker';
import { BackToTop } from './components/BackToTop';
import { CookieConsentBanner } from './components/CookieConsentBanner';

import { HomePage } from './pages/HomePage';
import { FindYojanaPage } from './pages/FindYojanaPage';
import { ListingPage } from './pages/ListingPage';
import { YojanaDetailPage } from './pages/YojanaDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { StatePage } from './pages/StatePage';
import { SitemapRobotsPage } from './pages/SitemapRobotsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { HTMLSitemapPage } from './pages/HTMLSitemapPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { StateSitemapPage } from './pages/StateSitemapPage';
import { SEOHealthPage } from './pages/SEOHealthPage';
import { LinkCheckerPage } from './pages/LinkCheckerPage';
import { AllFaqsPage } from './pages/AllFaqsPage';
import { PMKisanFAQPage } from './pages/PMKisanFAQPage';

// Scroll to top helper component on location change
function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BookmarksProvider>
        <LanguageProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Header */}
            <Header />

            {/* Live Auto-Updated News Ticker */}
            <LiveUpdateTicker />

            {/* Main Route Content */}
            <main className="flex-1">
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/find-yojana" component={FindYojanaPage} />
                <Route path="/yojanas" component={ListingPage} />
                <Route path="/yojana" component={ListingPage} />
                <Route path="/schemes" component={ListingPage} />
                <Route path="/all-schemes" component={ListingPage} />
                <Route path="/states" component={ListingPage} />
                <Route path="/yojana/:slug" component={YojanaDetailPage} />
                <Route path="/yojanas/:slug" component={YojanaDetailPage} />
                <Route path="/scheme/:slug" component={YojanaDetailPage} />
                <Route path="/category/:slug" component={CategoryPage} />
                <Route path="/categories/:slug" component={CategoryPage} />
                <Route path="/state/:slug" component={StatePage} />
                <Route path="/states/:slug" component={StatePage} />
                <Route path="/sitemap.xml" component={SitemapRobotsPage} />
                <Route path="/sitemap" component={HTMLSitemapPage} />
                <Route path="/sitemap.html" component={HTMLSitemapPage} />
                <Route path="/state-sitemap" component={StateSitemapPage} />
                <Route path="/seo-health" component={SEOHealthPage} />
                <Route path="/link-checker" component={LinkCheckerPage} />

                {/* NEW FAQ ROUTES - 1000 FAQs */}
                <Route path="/faqs" component={AllFaqsPage} />
                <Route path="/all-faqs" component={AllFaqsPage} />
                <Route path="/yojana-faqs" component={AllFaqsPage} />
                <Route path="/sarkari-yojana-faqs" component={AllFaqsPage} />
                <Route path="/pm-kisan-faqs" component={PMKisanFAQPage} />
                <Route path="/pm-kisan-faq" component={PMKisanFAQPage} />

                <Route path="/blog" component={BlogListPage} />
                <Route path="/blogs" component={BlogListPage} />
                <Route path="/blog/:slug" component={BlogDetailPage} />
                <Route path="/blogs/:slug" component={BlogDetailPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/about-us" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/contact-us" component={ContactPage} />
                <Route path="/privacy-policy" component={PrivacyPolicyPage} />
                <Route path="/privacy" component={PrivacyPolicyPage} />
                <Route path="/terms" component={TermsPage} />
                <Route path="/terms-and-conditions" component={TermsPage} />
                <Route path="/terms-of-service" component={TermsPage} />
                <Route path="/disclaimer" component={DisclaimerPage} />

                {/* Fallback to Home */}
                <Route component={HomePage} />
              </Switch>
            </main>

            {/* Back To Top Button */}
            <BackToTop />

            {/* Cookie Consent Banner */}
            <CookieConsentBanner />

            {/* Footer */}
            <Footer />
          </div>
        </LanguageProvider>
      </BookmarksProvider>
    </ThemeProvider>
  );
}