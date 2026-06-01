import React, { useEffect, useState } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function Feed() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsArray);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <main className="flex-1 max-w-3xl px-4">

      <CreatePost />

      {/* Posts Feed */}
      <div className="space-y-6">
        <h1 className="text-md text-white font-medium pl-1">Feed</h1>
        {loading ? (
          <div className="text-gray-400 text-center py-10">Loading posts...</div>
        ) : (
          posts.map((post) => (
            <Post 
            upvotedBy = {post.upvotedBy}
            downvotedBy = {post.downvotedBy}
            postId={post.id} key={post.id} char={post.username.charAt(0)} name={post.username} time={post.createdAt?.toDate().toLocaleDateString()} language={post.codeLanguage} title={post.title}
              code={post.code} upvotes={post.upvotes} downvotes={post.downvotes} comments={post.comments} />
          ))
        )}
      </div>
    </main>
  )
}