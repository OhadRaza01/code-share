import React from 'react'
import { useState, useEffect } from 'react'
import { getDocs, collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../Context/AuthContext'
import Post from '../Feed/Post'

export default function MyPosts() {

    const { user } = useAuth()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const q = query(
            collection(db, "posts"),
            where("userId", "==", user.uid)
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const postsArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPosts(postsArray);
            setLoading(false);
        });

        return () => unsub(); // cleanup
    }, []);

    return (
        <main className="flex-1 max-w-3xl px-4">
            {/* Posts Feed */}
            <div className="space-y-6">
            <h1 className='text-sm font-medium pl-1 mt-3 text-orange-400'>My Posts</h1>
                {loading ? (
                    <div className="text-gray-400 text-center py-10">Loading posts...</div>
                ) : (
                    posts.map((post) => (
                        <Post upvotedBy={post.upvotedBy}
                            downvotedBy={post.downvotedBy}
                            postId={post.id} key={post.id} char={post.username.charAt(0)} name={post.username} time={post.createdAt?.toDate().toLocaleDateString()} language={post.codeLanguage} title={post.title}
                            code={post.code} upvotes={post.upvotes} downvotes={post.downvotes} comments={post.comments} />
                    ))
                )}
            </div>
        </main>
    )
}
