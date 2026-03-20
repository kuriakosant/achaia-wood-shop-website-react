import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsWoodPage from './pages/ProductsWoodPage';
import ProductsGalleryPage from './pages/ProductsGalleryPage';
import ContactPage from './pages/ContactPage';
import OrderPage from './pages/OrderPage';
import AboutPage from './pages/AboutPage';
import ProductDetail from './components/ProductDetail';
import AddProductPage from './pages/AddProductPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/wood" element={<ProductsWoodPage />} />
          <Route path="/gallery" element={<ProductsGalleryPage />} />
          <Route path="/products/add" element={<AddProductPage />} />
          <Route path="/wood/:id" element={<ProductDetail />} />
          <Route path="/gallery/:id" element={<ProductDetail />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
