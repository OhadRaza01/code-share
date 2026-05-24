import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-size-[40px_40px] opacity-60" />
      <main className="h-[calc(100vh-72px)] relative z-10 flex flex-col justify-center items-center px-4 md:px-6 text-white text-center">

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight md:leading-snug max-w-4xl">
          Share Code. Get Reviewed. Grow Together.
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-lg mt-4 md:mt-6">
          CodeShare is a platform where developers share code snippets,
          get community feedback, and level up together.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-10">

          <Link to="/signup"
            className="group flex items-center justify-center gap-2 active:scale-95 bg-green-600 hover:bg-green-700 font-medium transition-all duration-200 rounded-xl px-6 py-3">
            Get started
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <button className="border border-green-500/60 text-green-400  hover:bg-white/10 hover:border-green-400 active:scale-95 transition-all duration-200 rounded-xl px-7 py-3 font-medium backdrop-blur-sm">
            Explore
          </button>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>

      </main>
    </section>
  );
}