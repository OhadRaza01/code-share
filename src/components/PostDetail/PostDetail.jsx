import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../Feed/Post'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

export default function PostDetail() {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const postRef = doc(db, "posts", postId)

        const unsubscribe = onSnapshot(postRef, (snapshot) => {
            setPost(snapshot.data())
            setLoading(false)
        })

        return () => unsubscribe()  // cleanup
    }, [postId])
    return (
        <main className="flex-1 max-w-3xl px-4">

            {/* Post Card */}
            <div className='bg-gray-900 rounded-md'>

                {loading ? (
                    <div className="text-gray-400 text-center py-10">Loading posts...</div>
                ) :

                    <Post
                        upvotedBy={post.upvotedBy}
                        downvotedBy={post.downvotedBy}
                        postId={postId} key={post.id} char={post.username.charAt(0)} name={post.username} time={post.createdAt?.toDate().toLocaleDateString()} language={post.codeLanguage} title={post.title}
                        code={post.code} upvotes={post.upvotes} downvotes={post.downvotes} comments={post.comments} />

                }

                {/* Comments Section */}
                <div className="rounded-2xl p-5">

                    <h2 className="text-white font-semibold mb-5">Comments</h2>

                    {/* Add Comment */}
                    <div className="flex gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                            O
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <textarea
                                rows={2}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full resize-none bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button className="self-end px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition">
                                Comment
                            </button>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="flex flex-col gap-4">

                        {/* Single Comment */}
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                S
                            </div>
                            <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-white text-sm font-medium">Sarah Dev</p>
                                    <p className="text-gray-500 text-xs">1 hour ago</p>
                                </div>
                                <p className="text-gray-300 text-sm">Great implementation! You should also handle the cleanup function.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}