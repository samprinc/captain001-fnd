import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingWhatsapp from "./components/FloatingWhatsapp";

// Pages
import Home from "./pages/Home";
import News from "./pages/News";
import SingleNews from "./pages/SingleNews";
import Author from "./pages/Authors";
import AuthorDetail from "./pages/AuthorDetail";
import CategoriesPage from "./pages/CategoriesPage";
import Services from "./pages/Services";
import Events from "./pages/Events";
import Ads from "./pages/Ads";
import Partners from "./pages/Partners";
import AdvertiseWithUs from "./pages/AdvertiseWithUs";
import Book from "./pages/Book";
import Feedback from "./pages/Feedback";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs"; 
import NotFound from "./pages/NotFound";

function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsapp />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<SingleNews />} />
          <Route path="/author" element={<Author />} />
          <Route path="/authors/:id" element={<AuthorDetail />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/advertise" element={<AdvertiseWithUs />} />
          <Route path="/book" element={<Book />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
