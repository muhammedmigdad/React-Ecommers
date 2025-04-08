import React from "react";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faFacebook, faTwitter, faInstagram, faMapMarkerAlt, faPhone, faEnvelope);

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0">
          <img src={assets.image1} className="mb-4 w-32" alt="Forever Logo" />
          <p className="text-gray-400 text-sm">
            Discover timeless styles and exceptional quality. We are dedicated to
            providing you with a curated collection that lasts.
          </p>
          {/* Social Icons */}
          <div className="mt-4 flex space-x-4">
            <a href="#" className="hover:text-indigo-500 transition-colors">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#" className="hover:text-indigo-500 transition-colors">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#" className="hover:text-indigo-500 transition-colors">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                Shipping & Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
          <ul className="text-gray-400 space-y-2">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3" />
              <span>123 Main Street, Anytown, USA</span>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-3" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
              <span>info@foreveryou.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-2">
            Subscribe to our newsletter and get 10% off your first purchase!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-gray-700 border border-gray-600 rounded-l-md py-2 px-3 text-white focus:outline-none focus:border-indigo-500 flex-grow"
            />
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-r-md focus:outline-none transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Forever You. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;