import React, { useState } from 'react'
import { db } from "../../firebase"
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../Context/AuthContext'

export default function CreatePost() {

    let [title, setTitle] = useState("")
    let [language, setLanguage] = useState("Javascript")
    let [code, setCode] = useState("")

    const { user } = useAuth()

    async function createPost() {
        await addDoc(collection(db, "posts"), {
            userId: user.uid,
            username: user.displayName,
            title: title,
            code: code,
            codeLanguage: language,
            upvotes: 0,
            downvotes: 0,
            comments: 0,
            createdAt: serverTimestamp()
        })
        setTitle("")
        setCode("")
        setLanguage("JavaScript")
    }
    return (
        <>
            <div className='text-sm font-medium pl-1 text-orange-400 my-3'>Create Post</div>
            <div className="bg-[#121111] border border-[#333] rounded-md p-5 mb-6">

                <div className="flex items-start gap-4">

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full text-white bg-green-600 flex items-center justify-center font-bold text-sm shrink-0">
                        {user.displayName.charAt(0)}
                    </div>

                    <div className="flex-1 flex flex-col gap-3">

                        {/* Title input */}
                        <input
                            type="text"
                            placeholder="Post title..."
                            className="w-full border bg-[#0D0D0D]  border-gray-700 rounded-xl px-4 py-2.5 text-sm md:text-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-400"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />

                        {/* Code textarea */}
                        <textarea
                            rows={5}
                            placeholder="Paste your code here..."
                            className="w-full resize-none font-mono bg-[#0D0D0D]  border border-gray-700 rounded-xl px-4 py-3 text-sm md:text-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-400"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value)
                            }}
                        />

                        <div className="flex items-center justify-between">

                            {/* Language select */}
                            <select className="bg-[#0D0D0D]  border border-gray-700 text-gray-400 text-sm lmd:text-md rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="JavaScript" >JavaScript</option>
                                <option value="Python" >Python</option>
                                <option value="TypeScript" >TypeScript</option>
                                <option value="Java" >Java</option>
                                <option value="C++" >C++</option>
                                <option value="Other" >Other</option>
                            </select>

                            <button onClick={createPost} className="px-6 py-1.5 md:py-2 bg-orange-600 hover:bg-orange-700 cursor-pointer text-white text-sm md:text-md font-medium rounded-xl transition active:scale-95">
                                Post
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
