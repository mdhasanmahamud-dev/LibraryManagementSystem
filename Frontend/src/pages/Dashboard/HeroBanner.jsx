import React from "react";
import { FaBook, FaMosque } from "react-icons/fa";

const HeroBanner = () => {
  return (
    <div className="w-full relative p-8 bg-gradient-to-r from-blue-900 to-teal-500 text-white rounded-lg shadow-lg overflow-hidden">
      {/* Left big logo */}
      <div className="hidden md:flex flex-col items-center absolute left-6 top-1/2 transform -translate-y-1/2 select-none">
        <FaMosque
          className="text-6xl md:text-8xl lg:text-9xl opacity-50"
          aria-hidden="true"
        />
      </div>

      {/* Right big logo */}
      <div className="hidden md:flex flex-col items-center absolute right-6 top-1/2 transform -translate-y-1/2 select-none">
        <FaMosque
          className="text-6xl md:text-8xl lg:text-9xl opacity-50"
          aria-hidden="true"
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            মাদ্রাসা ম্যানেজমেন্ট ড্যাশবোর্ড
          </h1>

          {/* <p className="text-md md:text-lg font-light mb-6 opacity-95">
            ইসলামী জ্ঞানের আলো ছড়িয়ে দিতে আধুনিক প্রযুক্তির ব্যবহারই আমাদের
            লক্ষ্য। শিক্ষা হোক নৈতিকতার পথে, উন্নতির প্রতিটি ধাপে।
          </p> */}

          <p className="text-md md:text-lg font-light mb-6 opacity-95">
            ইসলামিক শিক্ষাকে ডিজিটাল রূপে সহজ, সুন্দর ও কার্যকর করার এক নতুন
            প্রচেষ্টা। আধুনিক প্রযুক্তির মাধ্যমে শিক্ষা হোক আরও প্রেরণাদায়ক ও
            সুশৃঙ্খল।
          </p>

          <div className="flex items-center justify-center gap-3">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded transition duration-300">
              এখনই শুরু করুন
            </button>

            <button className="bg-transparent border border-white/40 hover:border-white text-white font-medium py-3 px-6 rounded transition duration-300">
              আরও জানুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
