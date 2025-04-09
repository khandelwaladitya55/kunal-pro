import React from "react";
import Image from "next/image";
import image from "@/images/phone.png";

// Example slider and gallery images (replace with actual images)
const sliderImages = [
  "/images/slider1.jpg",
  "/images/slider2.jpg",
  "/images/slider3.jpg",
];
const galleryImages = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
];

export default function HomePage() {
  return (
    <div className="text-center w-full bg-red-100">
      {/* Hero Section */}
      <div className="max-w-[1500px] mx-auto min-h-screen bg-gradient-to-r from-[#E71D3A] via-[#ECC7C1] via-45% via-[#EFCAC4] via-58% via-[#E4BDB8] via-70% to-[#42A8FE] flex flex-col justify-center items-center py-16 px-4">
        <h1 className="text-5xl font-bold text-white mb-8">Advik Enterprises</h1>
        <p className="text-xl text-white mb-6">Customize Your Memories with Elegant Photo Frames</p>
      </div>

    </div>
  );
}
