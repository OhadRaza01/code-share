import React from "react";
import { Link } from "react-router-dom";

export default function CtaSection() {
    return (
        <section className="min-h-screen flex justify-center items-center relative bg-black py-20 px-6 overflow-hidden">

            {/* Noise texture */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Orange center glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(234,88,12,0.1) 0%, transparent 65%)",
                }}
            />

            {/* Card */}
            <div className="relative z-10 w-full max-w-3xl">
                <div className="bg-[#111] border border-[#1f1f1f] rounded-md p-7 md:p-10 text-center hover:border-orange-600/20 hover:shadow-[0_0_60px_rgba(234,88,12,0.07)] transition-all duration-300">

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="w-12 h-12 rounded-full bg-orange-600/10 border border-orange-600/20 flex items-center justify-center">
                            <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                    </div>

                    {/* Heading */}
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-none tracking-[-0.03em] mb-4"
                    >
                        Ready to share
                        <br />
                        <span className="text-orange-600">your code?</span>
                    </h2>

                    {/* Subtext */}
                    <p className="text-gray-500 font-mono text-xs md:text-sm lg:text-md leading-relaxed max-w-lg mx-auto mb-6">
                        Join thousands of developers improving their skills through community feedback. Free, fast, and friendly.
                    </p>

                    {/* Divider */}
                    <div className="w-16 h-px bg-[#1f1f1f] mx-auto mb-6" />

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            to="/signup"
                            className="w-full sm:w-fit flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-all duration-200 active:scale-[0.97]"
                        >
                            Get Started — It's Free
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10m0 0L8 3m5 5-5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>

                        <Link
                            to="/explore"
                            className="w-full sm:w-fit flex items-center justify-center gap-2 px-6 py-3.5 rounded-[6px] bg-transparent border border-[#1f1f1f] hover:border-gray-700 text-gray-500 hover:text-gray-300 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.97]"
                        >
                            Browse snippets
                        </Link>
                    </div>

                    {/* Trust line */}
                    <p className="font-mono text-[11px] text-gray-600 mt-6 tracking-widest uppercase">
                        No credit card · No setup · Just code
                    </p>

                </div>
            </div>

            
        </section>
    );
}