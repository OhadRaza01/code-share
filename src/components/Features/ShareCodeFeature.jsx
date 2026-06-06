import React from "react";
import { Link } from "react-router-dom";
import FeatureNumber from "./FeatureNumber";

export default function ShareCodeFeature() {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center px-6 py-20 md:px-16 overflow-hidden">

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Orange glow — left */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(234,88,12,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Left */}
        <div className="flex flex-col gap-6">

          <FeatureNumber number={1} />

          <div className="flex flex-col gap-4">
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-none tracking-[-0.03em] text-white"
            >
              Share your code{" "}
              <span className="text-orange-600">Instantly</span>
            </h2>

            <p className="text-gray-400 font-mono text-[14px] leading-relaxed">
              Post snippets with syntax highlighting. Share your solutions, experiments, and projects with the community.
            </p>

            <Link
              to="/signup"
              className="w-fit flex items-center gap-2 px-6 py-3 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-all duration-200 active:scale-[0.97]"
            >
              Start Sharing
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10m0 0L8 3m5 5-5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right — Code card */}
        <div className="w-full">
          <div className="bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden transition-all duration-300 hover:border-orange-600/20 hover:shadow-[0_0_40px_rgba(234,88,12,0.06)]">

            {/* Card top bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d0d] border-b border-[#1f1f1f]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-orange-500/70" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-gray-600">main.jsx</span>
                <span className="font-mono text-xs bg-orange-600/15 text-orange-500 px-2 py-0.5 rounded-[4px] border border-orange-600/20">
                  JavaScript
                </span>
              </div>
              <div className="w-16" />
            </div>

            {/* Code body */}
            <div className="p-5 md:p-7 font-mono text-sm leading-7">
              <div className="space-y-0.5">
                <div className="flex gap-4">
                  <span className="text-gray-700 select-none w-6 text-right shrink-0">1</span>
                  <span><span className="text-purple-400">import</span><span className="text-gray-300"> React </span><span className="text-purple-400">from</span><span className="text-orange-400"> 'react'</span><span className="text-gray-600">;</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700 select-none w-6 text-right shrink-0">2</span>
                  <span>&nbsp;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700 select-none w-6 text-right shrink-0">3</span>
                  <span><span className="text-purple-400">const</span><span className="text-blue-400"> App</span><span className="text-gray-400"> = () =&gt; {"{"}</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700 select-none w-6 text-right shrink-0">4</span>
                  <span className="pl-6"><span className="text-purple-400">const</span><span className="text-blue-400"> [code, setCode]</span><span className="text-gray-400"> = useState(</span><span className="text-orange-400">''</span><span className="text-gray-400">);</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700 select-none w-6 text-right shrink-0">5</span>
                  <span className="pl-6"><span className="text-purple-400">return</span><span className="text-gray-400"> (</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700 select-none w-6 text-right shrink-0">6</span>
                  <span className="pl-12"><span className="text-yellow-500">&lt;div</span><span className="text-blue-400"> className</span><span className="text-gray-400">=</span><span className="text-orange-400">"editor"</span><span className="text-yellow-500">&gt;</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700 select-none w-6 text-right shrink-0">7</span>
                  <span className="pl-16"><span className="text-gray-400">&lt;CodeEditor</span><span className="text-blue-400"> value</span><span className="text-gray-400">={"{code}"} /&gt;</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700 select-none w-6 text-right shrink-0">8</span>
                  <span className="pl-12"><span className="text-yellow-500">&lt;/div&gt;</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700 select-none w-6 text-right shrink-0">9</span>
                  <span className="pl-6"><span className="text-gray-400">);</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700 select-none w-6 text-right shrink-0">10</span>
                  <span className="text-gray-400">{"}"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#1f1f1f]">
                <div className="w-2 h-4 bg-orange-600 animate-pulse rounded-sm" />
                <span className="font-mono text-xs text-gray-700">Ready to share</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}