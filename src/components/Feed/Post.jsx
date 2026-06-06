import { arrayRemove, arrayUnion, doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { db } from '../../firebase'
import { useAuth } from '../Context/AuthContext'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Post({ upvotedBy, downvotedBy, postId, char, name, time, language, title, code, upvotes, downvotes, comments }) {

    const { user } = useAuth()
    const navigate = useNavigate()
    const codeReference = useRef(null)

    async function handleUpvote() {
        const postRef = doc(db, "posts", postId);

        const alreadyUpvoted = upvotedBy?.includes(user.uid);
        const alreadyDownvoted = downvotedBy?.includes(user.uid);

        let updates = {};

        if (alreadyUpvoted) {
            updates.upvotes = increment(-1);
            updates.upvotedBy = arrayRemove(user.uid);
        } else {
            updates.upvotes = increment(1);
            updates.upvotedBy = arrayUnion(user.uid);

            if (alreadyDownvoted) {
                updates.downvotes = increment(-1);
                updates.downvotedBy = arrayRemove(user.uid);
            }
        }

        await updateDoc(postRef, updates);
    }

    async function handleDownvote() {
        const postRef = doc(db, "posts", postId);

        const alreadyDownvoted = downvotedBy?.includes(user.uid);
        const alreadyUpvoted = upvotedBy?.includes(user.uid);

        const updates = {}

        if (alreadyDownvoted) {
            updates.downvotes = increment(-1),
                updates.downvotedBy = arrayRemove(user.uid)
        }
        else {
            updates.downvotes = increment(1),
                updates.downvotedBy = arrayUnion(user.uid)

            if (alreadyUpvoted) {
                updates.upvotes = increment(-1),
                    updates.upvotedBy = arrayRemove(user.uid)
            }
        }
        await updateDoc(postRef, updates)

    }

    const copyCodeToClipboard = () => {
        const element = codeReference.current;

        // selection banani hai
        const range = document.createRange();
        range.selectNodeContents(element);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // copy bhi kar do
        navigator.clipboard.writeText(code);
    }


    return (
        <div className="bg-[#121111] border border-[#333] rounded-md overflow-hidden hover:border-gray-700 transition-all duration-200">

            {/* Header */}
            <Link to={`/dashboard/post/${postId}`} >

                <div className="p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full text-white bg-green-600 flex items-center justify-center font-bold text-sm">
                                {char}
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-white">{name}</h3>
                                <p className="text-xs text-gray-500">{time}</p>
                            </div>
                        </div>
                        <span className="text-xs bg-orange-600/20 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full">
                            {language}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-3 text-white font-medium">{title}</h2>
                </div>
            </Link>

            {/* Code Block */}
            <div className="mx-5 border border-[#2D2D2D] rounded-md overflow-hidden mb-2 bg-[#1A1A1A]">
                <div className="flex items-center justify-between gap-2 px-4 py-2 bg-[#111827] border-b border-[#2D2D2D]">
                    <span className="text-xs text-gray-300">{language}</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        onClick={copyCodeToClipboard}
                        className="w-5 h-5 p-0.5 rounded-full text-gray-500 cursor-pointer hover:bg-gray-800 active:scale-90 transition-transform duration-150"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2m4 4h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>

                <SyntaxHighlighter
                    ref={codeReference}
                    language={language.toLowerCase()}
                    style={nightOwl}
                    customStyle={{
                        background: '#0D0D0D',
                        margin: 0,
                        fontSize: '13px'
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>

            {/* Actions */}
            <div className="px-5 py-3 border-t border-gray-700 flex items-center gap-6">

                {/* Upvote */}
                <button onClick={handleUpvote} className="flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition text-sm">
                    <span>▲</span>
                    <span>{upvotes}</span>
                </button>

                {/* Downvote */}
                <button onClick={handleDownvote} className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition text-sm">
                    <span>▼</span>
                    <span>{downvotes}</span>
                </button>

                {/* Comments */}
                <NavLink to={`/dashboard/post/${postId}`} className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition text-sm">
                    <span>💬</span>
                    <span>{comments} comments</span>
                </NavLink>

            </div>
        </div>
    )
}
