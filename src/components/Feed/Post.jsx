import { arrayRemove, arrayUnion, doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase'
import { useAuth } from '../Context/AuthContext'

export default function Post({ upvotedBy, downvotedBy, postId, char, name, time, language, title, code, upvotes, downvotes, comments }) {

    const { user } = useAuth()

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
        
        if(alreadyDownvoted){
            updates.downvotes = increment(-1),
            updates.downvotedBy = arrayRemove(user.uid)
        }
        else{
            updates.downvotes = increment(1),
            updates.downvotedBy = arrayUnion(user.uid)

            if(alreadyUpvoted){
                updates.upvotes = increment(-1),
                updates.upvotedBy = arrayRemove(user.uid)
            }
        }
        await updateDoc(postRef , updates)
        
    }

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-200">

            {/* Header */}
            <div className="p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center font-bold text-sm">
                            {char}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">{name}</h3>
                            <p className="text-xs text-gray-500">{time}</p>
                        </div>
                    </div>
                    <span className="text-xs bg-green-600/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full">
                        {language}
                    </span>
                </div>

                {/* Title */}
                <h2 className="mt-3 text-white font-medium">{title}</h2>
            </div>

            {/* Code Block */}
            <div className="mx-5 mb-4 bg-gray-950 border border-gray-700 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-500 ml-2">{language}</span>
                </div>
                <pre className="p-4 text-sm text-gray-300 font-mono overflow-x-auto">
                    <code>{code}</code>
                </pre>
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
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition text-sm">
                    <span>💬</span>
                    <span>{comments} comments</span>
                </button>

            </div>
        </div>
    )
}
