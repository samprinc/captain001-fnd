// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdvertiseWithUs from "./pages/AdvertiseWithUs";
import FloatingWhatsapp from "./components/FloatingWhatsapp";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

// Page Components
import Home from "./pages/Home";
import Services from "./pages/Services";
import News from "./pages/News";
import SingleNews from "./pages/SingleNews";
import Book from "./pages/Book";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Ads from "./pages/Ads";
import Feedback from "./pages/Feedback";
import Partners from "./pages/Partners";
import Author from "./pages/Authors";
import CategoriesPage from "./pages/CategoriesPage";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs"; 
import "./styles/styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<SingleNews />} />
            <Route path="/author" element={<Author />} />
            <Route path="/categories" element={<CategoriesPage />} />
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
        </main>
        <Footer />
        <FloatingWhatsapp />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </BrowserRouter>
  );
}

export default App;