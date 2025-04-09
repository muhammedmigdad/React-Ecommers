// src/compontents/Navbar.jsx
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
    const [wishlistItemsCount, setWishlistItemsCount] = useState(0); // State for wishlist count
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token);
    }, []);

    // Placeholder for fetching wishlist count - Replace with your actual logic
    useEffect(() => {
        // Replace this with your API call to get the number of wishlist items
        const fetchWishlistCount = async () => {
            try {
                // const response = await axiosInstance.get('/wishlist/count', {
                //     headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                // });
                // setWishlistItemsCount(response.data.count);
                // For now, setting a static value or 0 if API is not ready
                setWishlistItemsCount(0);
            } catch (error) {
                console.error("Error fetching wishlist count:", error);
                setWishlistItemsCount(0);
            }
        };

        if (isAuthenticated) {
            fetchWishlistCount();
        } else {
            setWishlistItemsCount(0);
        }
    }, [isAuthenticated]);

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
        <div className="flex bg-[#ffffff] justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 font-medium relative">
            <Link to="/" className="block">
                <img src={assets.image1} alt="Logo" className="w-28 sm:w-32 md:w-36" />
            </Link>

            <ul className="hidden md:flex gap-3 lg:gap-5 text-sm text-gray-700">
                {["Collection", "About", "Contact"].map((item) => (
                    <NavLink
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className="flex flex-col items-center gap-1"
                    >
                        <p className="text-xs sm:text-sm">{item.toUpperCase()}</p>
                        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                    </NavLink>
                ))}
            </ul>

            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                <img
                    onClick={() => setShowSearch(true)}
                    src={assets.search_icon}
                    className="w-4 sm:w-4.5 md:w-5 cursor-pointer"
                    alt="Search"
                />

                <div className="relative z-50 dropdown-container">
                    <img
                        src={assets.profile_icon}
                        className="w-4 sm:w-4.5 md:w-5 cursor-pointer"
                        alt="Profile"
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                    />
                    {dropdownVisible && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-32 sm:w-36 md:w-40">
                            <div className="flex flex-col gap-1.5 sm:gap-2 py-2 sm:py-3 px-3 sm:px-5 text-gray-500 text-xs sm:text-sm">
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
                <Link to="/wishlist" className="relative">
                    <img src={assets.like} className="w-4 sm:w-4.5 md:w-5 min-w-[16px]" alt="like" />
                    <p className="absolute right-[-3px] bottom-[-3px] w-3.5 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                        {wishlistItemsCount}
                    </p>
                </Link>

                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} className="w-4 sm:w-4.5 md:w-5 min-w-[16px]" alt="Cart" />
                    <p className="absolute right-[-3px] bottom-[-3px] w-3.5 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                        {getCartCount()}
                    </p>
                </Link>

                <img
                    onClick={() => setMobileMenuOpen(true)}
                    src={assets.menu_icon}
                    className="w-4 sm:w-4.5 md:w-5 cursor-pointer md:hidden"
                    alt="Menu"
                />
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed top-0 right-0 h-full bg-white shadow-lg z-50 w-64 sm:w-80 md:hidden"
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
                            className="flex flex-col text-gray-600 text-sm"
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