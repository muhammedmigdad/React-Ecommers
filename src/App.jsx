import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import About from './pages/About'
import Orders from './pages/Orders'
import Placeorder from './pages/Placeorder'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Navbar from './compontents/Navbar'
import Footer from './compontents/Footer'
import SearchBar from './compontents/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/collection'  element={<Collection/>} />
        <Route path='/contact'  element={<Contact/>} />
        <Route path='/about'  element={<About/>} />
        <Route path='/orders'  element={<Orders/>} />
        <Route path='/placeorder'  element={<Placeorder/>} />
        <Route path='/login'  element={<Login/>} />
        <Route path='/cart'  element={<Cart/>} />
        <Route path='/product/:productId'  element={<Product/>} />
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
