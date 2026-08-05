import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllFaqsPage from "./pages/AllFaqsPage";
import FaqDetailPage from "./pages/FaqDetailPage";
import YojanaPage from "./pages/YojanaPage";
import YojanasPage from "./pages/YojanasPage";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/yojanas" element={<YojanasPage />} />
        <Route path="/yojana/:slug" element={<YojanaPage />} />
        <Route path="/blog" element={<BlogPage />} />
        
        {/* FAQ System - 1000 Pages */}
        <Route path="/faqs" element={<AllFaqsPage />} />
        <Route path="/faq" element={<AllFaqsPage />} />
        <Route path="/faq/:slug" element={<FaqDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
