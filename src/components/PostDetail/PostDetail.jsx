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
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
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
            <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">

                {/* Header */}
                <div className="px-5 py-4 border-b border-[#30363d]">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <span className="text-gray-400">💬</span>
                        Comments
                        <span className="ml-1 px-2 py-0.5 bg-[#30363d] text-gray-400 text-xs rounded-full">{comments.length}</span>
                    </h2>
                </div>

                <div className="p-5 space-y-6">

                    {/* Add Comment */}
                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                            {user?.displayName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 space-y-2">
                            <textarea
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your thoughts or review..."
                                className="w-full resize-none bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={addComment}
                                    disabled={!comment.trim()}
                                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-[#30363d] disabled:text-gray-500 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    {comments.length > 0 && <div className="border-t border-[#30363d]" />}

                    {/* Comments List */}
                    {comments.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-sm">No comments yet — be the first!</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {comments.map((c) => (
                                <div key={c.id} className="flex gap-3">

                                    {/* Avatar */}
                                    <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                                        {c.username?.charAt(0)?.toUpperCase()}
                                    </div>

                                    {/* Comment Body */}
                                    <div className="flex-1 min-w-0">

                                        {/* Meta */}
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-white text-sm font-medium">{c.username}</span>
                                            <span className="text-gray-600 text-xs">·</span>
                                            <span className="text-gray-500 text-xs">
                                                {c.createdAt?.toDate().toLocaleDateString(undefined, {
                                                    month: 'short', day: 'numeric', year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        {/* Text */}
                                        <p className="text-gray-300 text-sm leading-relaxed mb-2">{c.text}</p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleCommentUpvote(c.id, c.upvotedBy, c.downvotedBy)}
                                                className={`flex items-center gap-1 text-xs transition-colors ${c.upvotedBy?.includes(user.uid) ? 'text-green-400' : 'text-gray-500 hover:text-green-400'}`}
                                            >
                                                ▲ <span>{c.upvotes || 0}</span>
                                            </button>
                                            <button
                                                onClick={() => handleCommentDownvote(c.id, c.upvotedBy, c.downvotedBy)}
                                                className={`flex items-center gap-1 text-xs transition-colors ${c.downvotedBy?.includes(user.uid) ? 'text-red-400' : 'text-gray-500 hover:text-red-400'}`}
                                            >
                                                ▼ <span>{c.downvotes || 0}</span>
                                            </button>
                                            <button
                                                onClick={() => toggleReply(c.id)}
                                                className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                                            >
                                                {showReply[c.id] ? 'Cancel' : 'Reply'}
                                            </button>
                                        </div>

                                        {/* Reply Input */}
                                        {showReply[c.id] && (
                                            <div className="flex gap-2 mt-3">
                                                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                                                    {user?.displayName?.charAt(0)?.toUpperCase()}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <textarea
                                                        rows={2}
                                                        value={replyText[c.id] || ""}
                                                        onChange={(e) => setReplyText(prev => ({ ...prev, [c.id]: e.target.value }))}
                                                        placeholder={`Reply to ${c.username}...`}
                                                        className="w-full resize-none bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                                    />
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={() => addReply(c.id)}
                                                            disabled={!replyText[c.id]?.trim()}
                                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-[#30363d] disabled:text-gray-500 disabled:cursor-not-allowed text-white text-xs font-medium rounded-md transition-colors"
                                                        >
                                                            Reply
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Replies */}
                                        {replies[c.id]?.length > 0 && (
                                            <div className="mt-3 pl-3 border-l-2 border-[#30363d] space-y-3">
                                                {replies[c.id].map((reply) => (
                                                    <div key={reply.id} className="flex gap-2">
                                                        <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                                                            {reply.username?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-white text-xs font-medium">{reply.username}</span>
                                                                <span className="text-gray-600 text-xs">·</span>
                                                                <span className="text-gray-500 text-xs">
                                                                    {reply.createdAt?.toDate().toLocaleDateString(undefined, {
                                                                        month: 'short', day: 'numeric'
                                                                    })}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-400 text-xs leading-relaxed">{reply.text}</p>
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