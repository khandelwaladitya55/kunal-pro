'use client';

import React, { useState } from "react";

function stripHtmlTags(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}

export default function ProductCard({ data }) {
  const [hovered, setHovered] = useState(false);

  const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/${data.main_image}`;

  return (
    <div
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl m-2.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <img
        className="w-full h-[290px] object-cover"
        src={imageUrl}
        alt="Product"
      />

      {/* Hover Overlay with Close Button */}
      {hovered && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-10 transition-opacity duration-500">
          <img
            src={imageUrl}
            alt="Zoom"
            className="max-w-[80%] max-h-[80%] object-contain rounded-lg shadow-2xl transition duration-500"
          />
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              setHovered(false);
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Product Info */}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>
        <p className="text-gray-600 text-sm mt-1">{stripHtmlTags(data.description)}</p>
        <div className="md:flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-blue-600">₹{data.final_price}</span>
          <button
            className="bg-blue-600 text-[12px] mx-auto block mt-2 md:mt-1 md:text-[16px] text-white px-2 md:px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-blue-700"
            onClick={(e) => e.stopPropagation()}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
