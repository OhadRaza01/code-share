import React from "react";
import FeatureNumber from "./FeatureNumber";

export default function ShareCodeFeature() {
    return (
        <section>
            <div className="relative min-h-[calc(100vh-72px)] text-white flex flex-col md:flex-row gap-10 justify-center items-center p-5 md:p-10 mt-10 md:mt-0 ">

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(34,197,94,0.08),transparent_60%)]" />

                {/* left side text  */}

                <div className="flex  flex-col gap-6 z-10">

                    <FeatureNumber number={1} />

                    <div className="flex flex-col gap-3 md:gap-5 w-full max-w-xl">
                        <h1 className="text-3xl md:text-5xl font-medium">Share your code <span className="text-green-500">Instantly</span></h1>

                        <p>
                            "Post code snippets with syntax highlighting. Share your solutions, experiments, and projects with the community.
                        </p>

                        <button className="w-44 bg-green-600 hover:bg-green-700 text-white font-medium active:scale-95 transition-all duration-200 rounded-xl px-6 py-3">
                            Start Sharing
                        </button>
                    </div>
                </div>


                {/* right side */}
                <div className="flex-1 w-full max-w-2xl z-10">
                    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl shadow-green-600/5 hover:shadow-green-600/10 transition-all duration-300 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-800">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">main.jsx</span>
                                <span className="text-xs bg-green-600/20 text-green-400 px-2 py-0.5 rounded">JavaScript</span>
                            </div>
                            <div className="w-16" />
                        </div>

                        <div className="p-4 md:p-6 font-mono text-sm">
                            <div className="space-y-2">
                                {/* Line 1 */}
                                <div className="flex gap-4 group">
                                    <span className="text-gray-600 select-none w-8 text-right">1</span>
                                    <span className="text-purple-400">import</span>
                                    <span className="text-gray-300"> React </span>
                                    <span className="text-purple-400">from</span>
                                    <span className="text-green-400"> 'react'</span>
                                    <span className="text-gray-400">;</span>
                                </div>

                                {/* Line 2 */}
                                <div className="flex gap-4 group">
                                    <span className="text-gray-600 select-none w-8 text-right">2</span>
                                    <span className="text-gray-400"></span>
                                </div>

                                {/* Line 3 */}
                                <div className="flex gap-4 group">
                                    <span className="text-gray-600 select-none w-8 text-right">3</span>
                                    <span className="text-purple-400">const</span>
                                    <span className="text-blue-400"> App</span>
                                    <span className="text-gray-400"> = () =&gt; {"{"}</span>
                                </div>

                                {/* Line 4 */}
                                <div className="flex gap-4 group">
                                    <span className="text-gray-600 select-none w-8 text-right">4</span>
                                    <span className="text-gray-500 pl-4"></span>
                                    <span className="text-purple-400">const</span>
                                    <span className="text-blue-400"> [code, setCode]</span>
                                    <span className="text-gray-400"> = useState(</span>
                                    <span className="text-green-400">''</span>
                                    <span className="text-gray-400">);</span>
                                </div>

                                {/* Line 5 */}
                                <div className="flex gap-4 group">
                                    <span className="text-gray-600 select-none w-8 text-right">5</span>
                                    <span className="text-gray-500 pl-4"></span>
                                    <span className="text-purple-400">return</span>
                                    <span className="text-gray-400"> (</span>
                                </div>

                                {/* Line 6 */}
                                <div className="flex gap-4 group">
                                    <span className="text-gray-600 select-none w-8 text-right">6</span>
                                    <span className="text-gray-500 pl-8"></span>
                                    <span className="text-yellow-400">&lt;div</span>
                                    <span className="text-blue-400"> className</span>
                                    <span className="text-gray-400">=</span>
                                    <span className="text-green-400">"editor"</span>
                                    <span className="text-yellow-400">&gt;</span>
                                </div>

                                {/* Line 7 */}
                                <div className="flex gap-4 group">
                                    <span className="text-gray-600 select-none w-8 text-right">7</span>
                                    <span className="text-gray-500 pl-12"></span>
                                    <span className="text-gray-400">{'<'}CodeEditor</span>
                                    <span className="text-blue-400"> value</span>
                                    <span className="text-gray-400">=</span>
                                    <span className="text-gray-400">{'{code}'}</span>
                                    <span className="text-gray-400"> /{'>'}</span>
                                </div>

                                {/* Line 8 */}
                                <div className="flex gap-4 group">
                                    <span className="text-gray-600 select-none w-8 text-right">8</span>
                                    <span className="text-gray-500 pl-8"></span>
                                    <span className="text-yellow-400">&lt;/div&gt;</span>
                                </div>

                                {/* Line 9 */}
                                <div className="flex gap-4 group">
                                    <span className="text-gray-600 select-none w-8 text-right">9</span>
                                    <span className="text-gray-500 pl-4"></span>
                                    <span className="text-gray-400">);</span>
                                </div>

                                {/* Line 10 */}
                                <div className="flex gap-4 group">
                                    <span className="text-gray-600 select-none w-8 text-right">10</span>
                                    <span className="text-gray-400">{"}"}</span>
                                </div>
                            </div>

                            {/* Blinking cursor effect */}
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800">
                                <div className="w-2 h-4 bg-green-500 animate-pulse rounded-sm" />
                                <span className="text-gray-500 text-xs">Ready to share</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}