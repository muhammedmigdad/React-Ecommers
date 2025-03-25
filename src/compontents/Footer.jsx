import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div className="bg-gray-900 rounded-md text-white">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] pt-8 gap-14 my-10 mt-40 text-sm max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-opacity-80">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Forever Logo" />
          <p className="w-full md:w-2/3 text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam minima consequuntur laboriosam rerum quae inventore error provident aspernatur suscipit maxime nam dolores, praesentium omnis nulla!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li className="hover:text-white transition-colors cursor-pointer">Home</li>
            <li className="hover:text-white transition-colors cursor-pointer">About</li>
            <li className="hover:text-white transition-colors cursor-pointer">Delivery</li>
            <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>+1-212-456-8684</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 bg-opacity-90">
        <p className="py-5 text-sm text-center text-gray-400">
          Copyright 2024@ forever.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;