import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import About from './pages/About';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';

// Components
import Navbar from './compontents/Navbar';
import Footer from './compontents/Footer';
import SearchBar from './compontents/SearchBar';

function App() {
  return (
    <div>
      {/* Toast Notification */}
      <ToastContainer />

      {/* Header */}
      <Navbar />
      <SearchBar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
