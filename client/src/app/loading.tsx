"use client";

import React from "react";
import Link from "next/link";

export default function LandingPageLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 backdrop-blur-lg backdrop-saturate-150 w-full flex h-20 border-b border-[#ffffff1c] z-[999] shadow">
        <div className="w-[95%] md:w-[90%] 2xl:w-[85%] m-auto flex items-center justify-between">
          <div className="text-[25px] font-semibold">CodeWithSamuel</div>
          <div className="hidden md:flex gap-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-600/50 rounded-full w-16 animate-pulse"
              ></div>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="h-9 w-20 bg-gray-600/50 rounded-lg animate-pulse"></div>
            <div className="h-9 w-20 bg-blue-600/50 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="w-3/4 md:w-1/2 h-10 bg-gray-600/50 rounded-lg animate-pulse"></div>
            <div className="w-full md:w-2/3 h-6 bg-gray-600/50 rounded-lg animate-pulse"></div>
            <div className="w-full md:w-2/3 h-6 bg-gray-600/50 rounded-lg animate-pulse"></div>

            <div className="flex gap-4 mt-6">
              <div className="h-12 w-32 bg-blue-600/50 rounded-lg animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-600/50 rounded-lg animate-pulse"></div>
            </div>

            <div className="mt-12 w-full max-w-4xl h-[300px] bg-gray-600/50 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="w-full md:w-1/3 h-8 bg-gray-600/50 rounded-lg animate-pulse mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[350px] bg-gray-600/30 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-[#0f1729] py-8">
        <div className="container mx-auto px-4">
          <div className="w-full h-32 bg-gray-600/20 rounded-lg animate-pulse"></div>
        </div>
      </footer>
    </div>
  );
}
