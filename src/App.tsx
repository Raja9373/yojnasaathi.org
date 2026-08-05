import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AllFaqsPage from "./pages/AllFaqsPage";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/ContactPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import FindYojanaPage from "./pages/FindYojanaPage";
import HTMLSitemapPage from "./pages/HTMLSitemapPage";
import LinkCheckerPage from "./pages/LinkCheckerPage";
import ListingPage from "./pages/ListingPage";
import PMKisanFAQPage from "./pages/PMKisanFAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<AllFaqsPage />} />
        <Route path="/faq" element={<AllFaqsPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/find-yojana" element={<FindYojanaPage />} />
        <Route path="/sitemap" element={<HTMLSitemapPage />} />
        <Route path="/link-checker" element={<LinkCheckerPage />} />
        <Route path="/yojana/:slug" element={<ListingPage />} />
        <Route path="/pm-kisan-faq" element={<PMKisanFAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
