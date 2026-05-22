import React from "react";
import FeatureNumber from "./FeatureNumber";

export default function ReviewCodeFeature() {
    return (
        <section>

            <div className="relative  min-h-[calc(100vh-72px)] text-white flex flex-col md:flex-row gap-10 justify-center items-center p-5 md:p-10 mt-10 md:mt-0 ">

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(34,197,94,0.08),transparent_60%)]" />


                <div className="flex flex-col gap-6">

                    <FeatureNumber number={2} />

                    {/* review card  */}
                    <div className="flex-1 w-full lg:w-2xl z-10">
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-5">

                            {/* Review Card */}
                            <div className="space-y-3">
                                {/* Reviewer Info */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center text-green-400 text-sm font-medium">
                                        O
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">Ohad Raza</p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-green-400">⭐⭐⭐⭐⭐</span>
                                            <span className="text-xs text-gray-500">• Junior Dev</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    "Clean code! 🎉 Just add <span className="text-green-400">error handling</span> for the API call."
                                </p>

                                {/* Suggestion Box */}
                                <div className="bg-gray-950 rounded-lg p-3 border-l-2 border-green-500">
                                    <code className="text-xs text-gray-400 font-mono">
                                        try &#123; <br />
                                        &nbsp;&nbsp;await fetchData() <br />
                                        &#125; catch(err) &#123; <br />
                                        &nbsp;&nbsp;console.error(err) <br />
                                        &#125;
                                    </code>
                                </div>

                                {/* Helpful Button */}
                                <button className="text-xs text-gray-500 hover:text-green-400 transition">
                                    👍 Helpful (8)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col gap-3 md:gap-5 w-full max-w-xl">
                    <h1 className="text-3xl md:text-5xl font-medium">Get <span className="text-green-500">Quality Reviews</span></h1>

                    <p>
                        Receive constructive feedback from experienced developers.
                        Learn best practices, improve code quality, and write cleaner
                        code with actionable suggestions.
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="text-gray-300 text-sm md:text-base flex items-center gap-2 ">
                            <span className="text-green-500">•</span>
                            <span>Detailed code reviews within hours</span>
                        </li>
                        <li className="text-gray-300 text-sm md:text-base flex items-center gap-2 ">
                            <span className="text-green-500">•</span>
                            <span>Suggestions with real code examples</span>
                        </li>
                        <li className="text-gray-300 text-sm md:text-base flex items-center gap-2">
                            <span className="text-green-500">•</span>
                            <span>Build reputation with quality contributions</span>
                        </li>
                    </ul>

                    <button className="w-44 bg-green-600 hover:bg-green-700 text-white font-medium active:scale-95 transition-all duration-200 rounded-xl px-6 py-3">
                        Start Sharing
                    </button>
                </div>

            </div>
        </section>
    );
}