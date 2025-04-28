import React from "react";
import { assets } from "../assets/assets";

function BestSeller() {
  const data = [
    {
      title: "Wild Lands",
      description: "Explore bold fits with ease",
      image: assets.p_img37, // Direct reference to the image path
    },
    {
      title: "Relax Mode",
      description: "Chill-ready fits for everyday ease",
      image: assets.contact_img, // Assuming another image exists for this
    },
    {
      title: "Backyard Explorer",
      description: "Nature vibes, made for play",
      image: assets.about_img, // Assuming another image exists for this
    },
    {
      title: "Global Blues",
      description: "Lee Cooper’s trend-forward classics",
      image: assets.logo, // Assuming another image exists for this
    },
  ];

  return (
    <div className="flex justify-center items-center p-6"> {/* Center the content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full"> {/* Adjust grid and max width */}
        {data.map((item, index) => (
          <div key={index} className="relative group shadow-lg rounded overflow-hidden">
            <div className="aspect-w-16 aspect-h-9"> {/* Maintain image aspect ratio */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <button className="mt-2 text-blue-600 font-semibold text-sm hover:underline">
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSeller;