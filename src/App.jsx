import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Services from "./pages/Services";
import News from "./pages/News";
import SingleNews from "./pages/SingleNews";
import ServiceCard from "./components/ServiceCard";
import Book from "./pages/Book";
import Bookings from "./pages/Book";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Ads from "./pages/Ads";
import Feedback from "./pages/Feedback";
import Partners from "./pages/Partners";
import NotFound from "./pages/NotFound";
import Author from "./pages/Authors";
import CategoriesPage from "./pages/CategoriesPage";

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
            <Route path="/author/:id" element={<Author />} />
            <Route path="/news/:id" element={<SingleNews />} />
            <Route path="/book" element={<Book />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/service/:id" element={<ServiceCard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </BrowserRouter>
  );
}

export default App;
