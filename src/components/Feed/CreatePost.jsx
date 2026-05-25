import React from 'react'

export default function CreatePost() {
    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-4">

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-sm shrink-0">
                    OR
                </div>

                <div className="flex-1 flex flex-col gap-3">

                    {/* Title input */}
                    <input
                        type="text"
                        placeholder="Post title..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />

                    {/* Code textarea */}
                    <textarea
                        rows={5}
                        placeholder="Paste your code here..."
                        className="w-full resize-none font-mono bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />

                    <div className="flex items-center justify-between">

                        {/* Language select */}
                        <select className="bg-gray-800 border border-gray-700 text-gray-400 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400">
                            <option>JavaScript</option>
                            <option>Python</option>
                            <option>TypeScript</option>
                            <option>Java</option>
                            <option>C++</option>
                            <option>Other</option>
                        </select>

                        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition active:scale-95">
                            Post
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
