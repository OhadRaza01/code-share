import { arrayRemove, arrayUnion, doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { useAuth } from '../Context/AuthContext'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Post({ upvotedBy, downvotedBy, postId, char, name, time, language, title, code, upvotes, downvotes, comments }) {

    const { user } = useAuth()
    const navigate = useNavigate()
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

                {/* Code Block */}
                <div className="mx-5 border border-[#2D2D2D] rounded-md overflow-hidden mb-2 bg-[#1A1A1A]">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#111827] border-b border-[#2D2D2D]">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span className="text-xs text-gray-300 ml-2">{language}</span>
                    </div>

                    <SyntaxHighlighter
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

            </Link>
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
