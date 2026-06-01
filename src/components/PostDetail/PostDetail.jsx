import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../Feed/Post'
import { doc, onSnapshot, collection, addDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../Context/AuthContext'

export default function PostDetail() {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(true)
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

    return (
        <main className="flex-1 max-w-3xl px-4">

            {/* Post Card */}
            {loading ? (
                <div className="flex items-center justify-center py-16">
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
            <div className="mt-6 bg-gray-900 border border-[#30363d] rounded-md p-5">

                <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
                    Comments ({comments.length})
                </h2>

                {/* Add Comment */}
                <div className="flex gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                        {user?.displayName?.charAt(0)}
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <textarea
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full resize-none bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            onClick={addComment}
                            disabled={!comment.trim()}
                            className="self-end px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                {comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        No comments yet — be the first!
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {comments.map((c) => (
                            <div key={c.id} className="flex gap-3">
                                <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                                    {c.username?.charAt(0)}
                                </div>
                                <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-white text-sm font-medium">{c.username}</p>
                                        <p className="text-gray-500 text-xs">
                                            {c.createdAt?.toDate().toLocaleDateString(undefined, {
                                                year: 'numeric', month: 'short', day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}