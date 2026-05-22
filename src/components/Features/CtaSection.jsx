import React from "react";

export default function CtaSection() {
    return (
        <section className="min-h-[calc(100vh-72px)] flex justify-center items-center relative bg-gray-950 py-20 px-4 md:px-6 overflow-hidden">
           
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,197,94,0.1),transparent_60%)]" />

            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-size-[40px_40px]" />

            <div className="relative z-10 max-w-3xl">
                {/* Card */}
                <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl">

                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Ready to share your code?
                    </h2>

                    <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of developers who are improving their coding skills
                        through community feedback. It's free, fast, and friendly.
                    </p>

                    <div className="flex flex-row gap-4 md:justify-center">
                        <button className="group flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium active:scale-95 transition-all duration-200 rounded-xl px-8 py-3 text-lg shadow-lg shadow-green-600/20 hover:shadow-green-500/30">
                            Get Started — It's Free
                            <svg className="group-hover:translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
}