import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../Feed/Post'
import { doc, onSnapshot, collection, addDoc, serverTimestamp, updateDoc, increment, arrayRemove, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../Context/AuthContext'

export default function PostDetail() {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(true)
    const [replyText, setReplyText] = useState({})
    const [showReply, setShowReply] = useState({})
    const [replies, setReplies] = useState({})
    const { user } = useAuth()

    useEffect(() => {
        const postRef = doc(db, "posts", postId)
        const unsubscribe = onSnapshot(postRef, (snapshot) => {
            setPost(snapshot.data())
            setLoading(false)
        })
        return () => unsubscribe()
    }, [postId])

    useEffect(() => {
        const commentsRef = collection(db, "posts", postId, "comments")
        const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
            const commentsArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setComments(commentsArray)
        })
        return () => unsubscribe()
    }, [postId])

    useEffect(() => {
        if (comments.length === 0) return
        const unsubscribers = comments.map((c) => {
            const repliesRef = collection(db, "posts", postId, "comments", c.id, "replies")
            return onSnapshot(repliesRef, (snapshot) => {
                const repliesArray = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setReplies(prev => ({ ...prev, [c.id]: repliesArray }))
            })
        })
        return () => unsubscribers.forEach(unsub => unsub())
    }, [comments])

    async function addComment() {
        if (comment.trim()) {
            await addDoc(collection(db, "posts", postId, "comments"), {
                userId: user.uid,
                username: user.displayName,
                text: comment,
                createdAt: serverTimestamp()
            })
            setComment("")
            await updateDoc(doc(db, "posts", postId), {
                comments: increment(1)
            })
        }
    }

    async function handleCommentUpvote(commentId, upvotedBy, downvotedBy) {
        const commentRef = doc(db, "posts", postId, "comments", commentId)
        const alreadyUpvoted = upvotedBy?.includes(user.uid)
        const alreadyDownvoted = downvotedBy?.includes(user.uid)
        let updates = {}
        if (alreadyUpvoted) {
            updates.upvotes = increment(-1)
            updates.upvotedBy = arrayRemove(user.uid)
        } else {
            updates.upvotes = increment(1)
            updates.upvotedBy = arrayUnion(user.uid)
            if (alreadyDownvoted) {
                updates.downvotes = increment(-1)
                updates.downvotedBy = arrayRemove(user.uid)
            }
        }
        await updateDoc(commentRef, updates)
    }

    async function handleCommentDownvote(commentId, upvotedBy, downvotedBy) {
        const commentRef = doc(db, "posts", postId, "comments", commentId)
        const alreadyDownvoted = downvotedBy?.includes(user.uid)
        const alreadyUpvoted = upvotedBy?.includes(user.uid)
        const updates = {}
        if (alreadyDownvoted) {
            updates.downvotes = increment(-1)
            updates.downvotedBy = arrayRemove(user.uid)
        } else {
            updates.downvotes = increment(1)
            updates.downvotedBy = arrayUnion(user.uid)
            if (alreadyUpvoted) {
                updates.upvotes = increment(-1)
                updates.upvotedBy = arrayRemove(user.uid)
            }
        }
        await updateDoc(commentRef, updates)
    }

    function toggleReply(commentId) {
        setShowReply(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }))
    }

    async function addReply(commentId) {
        const replyRef = collection(db, "posts", postId, "comments", commentId, "replies")
        if (replyText[commentId]?.trim()) {
            await addDoc(replyRef, {
                userId: user.uid,
                username: user.displayName,
                text: replyText[commentId],
                createdAt: serverTimestamp()
            })
            setReplyText(prev => ({ ...prev, [commentId]: "" }))
            toggleReply(commentId)
        }
    }

    return (
        <main className="flex-1 max-w-3xl px-4 py-1 space-y-6">

            {/* Post Card */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <Post
                    upvotedBy={post.upvotedBy}
                    downvotedBy={post.downvotedBy}
                    postId={postId}
                    char={post.username?.charAt(0)}
                    name={post.username}
                    time={post.createdAt?.toDate().toLocaleDateString()}
                    language={post.codeLanguage}
                    title={post.title}
                    code={post.code}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    comments={post.comments}
                />
            )}

            {/* Comments Section */}
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-md overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1f1f1f]">
                    <div className="flex items-center gap-2.5">
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                            <path d="M14 1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2v3l3-3h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm font-medium text-gray-300">Comments</span>
                        <span className="text-xs text-gray-400 bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded-full">
                            {comments.length}
                        </span>
                    </div>
                </div>

                <div className="p-5 space-y-5">

                    {/* Add Comment Box */}
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">
                            {user?.displayName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 space-y-2">
                            <textarea
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your thoughts or leave a review..."
                                className="w-full resize-none bg-black border border-[#1f1f1f] rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-orange-600/40 transition-colors"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={addComment}
                                    disabled={!comment.trim()}
                                    className="px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 active:scale-[.97] disabled:cursor-not-allowed"
                                    style={{
                                        background: comment.trim() ? "#ea580c" : "#1a1a1a",
                                        color: comment.trim() ? "#fff" : "#4b5563",
                                        border: "none"
                                    }}
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    {comments.length > 0 && <div className="border-t border-[#1a1a1a]" />}

                    {/* Empty state */}
                    {comments.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600 text-sm">No comments yet — be the first!</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {comments.map((c) => (
                                <div key={c.id} className="flex gap-3">

                                    {/* Avatar */}
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">
                                        {c.username?.charAt(0)?.toUpperCase()}
                                    </div>

                                    {/* Body */}
                                    <div className="flex-1 min-w-0">

                                        {/* Meta row */}
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-sm font-medium text-gray-200">{c.username}</span>
                                            <span className="text-gray-700">·</span>
                                            <span className="text-xs text-gray-700 font-mono">
                                                {c.createdAt?.toDate().toLocaleDateString(undefined, {
                                                    month: 'short', day: 'numeric', year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        {/* Text */}
                                        <p className="text-sm text-gray-300 leading-relaxed mb-2.5">{c.text}</p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleCommentUpvote(c.id, c.upvotedBy, c.downvotedBy)}
                                                className={`flex items-center gap-1.5 text-xs transition-colors ${c.upvotedBy?.includes(user.uid) ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
                                            >
                                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                                    <path d="M8 2L2 9h4v5h4V9h4L8 2Z" fill="currentColor"/>
                                                </svg>
                                                {c.upvotes || 0}
                                            </button>
                                            <button
                                                onClick={() => handleCommentDownvote(c.id, c.upvotedBy, c.downvotedBy)}
                                                className={`flex items-center gap-1.5 text-xs transition-colors ${c.downvotedBy?.includes(user.uid) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                                            >
                                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                                    <path d="M8 14L2 7h4V2h4v5h4L8 14Z" fill="currentColor"/>
                                                </svg>
                                                {c.downvotes || 0}
                                            </button>
                                            <button
                                                onClick={() => toggleReply(c.id)}
                                                className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                                            >
                                                {showReply[c.id] ? 'Cancel' : 'Reply'}
                                            </button>
                                        </div>

                                        {/* Reply Input */}
                                        {showReply[c.id] && (
                                            <div className="flex gap-2 mt-3">
                                                <div className="w-7 h-7 rounded-full bg-orange-200  flex items-center justify-center text-xs font-semibold text-gray-700 shrink-0 mt-0.5">
                                                    {user?.displayName?.charAt(0)?.toUpperCase()}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <textarea
                                                        rows={2}
                                                        value={replyText[c.id] || ""}
                                                        onChange={(e) => setReplyText(prev => ({ ...prev, [c.id]: e.target.value }))}
                                                        placeholder={`Reply to ${c.username}...`}
                                                        className="w-full resize-none bg-black border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-orange-600/40 transition-colors"
                                                    />
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={() => addReply(c.id)}
                                                            disabled={!replyText[c.id]?.trim()}
                                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-[.97] disabled:cursor-not-allowed"
                                                            style={{
                                                                background: replyText[c.id]?.trim() ? "#ea580c" : "#1a1a1a",
                                                                color: replyText[c.id]?.trim() ? "#fff" : "#4b5563",
                                                                border: "none"
                                                            }}
                                                        >
                                                            Reply
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Replies */}
                                        {replies[c.id]?.length > 0 && (
                                            <div className="mt-4 pl-4 border-l border-[#1f1f1f] space-y-4">
                                                {replies[c.id].map((reply) => (
                                                    <div key={reply.id} className="flex gap-2">
                                                        <div className="w-7 h-7 rounded-full bg-orange-200 flex items-center justify-center text-xs font-semibold text-gray-700 shrink-0 mt-0.5">
                                                            {reply.username?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-xs font-medium text-gray-300">{reply.username}</span>
                                                                <span className="text-gray-700">·</span>
                                                                <span className="text-xs text-gray-700 font-mono">
                                                                    {reply.createdAt?.toDate().toLocaleDateString(undefined, {
                                                                        month: 'short', day: 'numeric'
                                                                    })}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-300 leading-relaxed">{reply.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}