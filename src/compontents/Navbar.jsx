import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuVariants = {
    closed: { x: "100%", opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex justify-between items-center py-5 font-medium relative">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["Collection", "About", "Contact"].map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase()}`}
            className="flex flex-col items-center gap-1"
          >
            <p>{item.toUpperCase()}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        <div className="relative z-50 dropdown-container">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          />
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-40">
              <div className="flex flex-col gap-2 py-3 px-5 text-gray-500">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                {isAuthenticated ? (
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                ) : (
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setMobileMenuOpen(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full bg-white shadow-lg z-50 w-64 sm:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-4 p-4 cursor-pointer"
            >
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180"
                alt="Close menu"
              />
              <p className="text-sm">Close</p>
            </motion.div>

            <motion.ul
              className="flex flex-col text-gray-600"
              initial="closed"
              animate="open"
            >
              {["Collection", "About", "Contact"].map((item) => (
                <motion.li key={item} variants={itemVariants}>
                  <NavLink
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 pl-6 border-b hover:bg-gray-100 block"
                    to={`/${item.toLowerCase()}`}
                  >
                    {item.toUpperCase()}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;