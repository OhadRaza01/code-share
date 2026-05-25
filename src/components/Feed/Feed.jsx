import React from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";

const posts = [
  {
    id: 1,
    name: "Ohad Raza",
    time: "2 hours ago",
    avatar: null,
    title: "Custom useEffect Hook for API calls",
    code: `function useFetch(url) {\n  const [data, setData] = useState(null)\n  const [loading, setLoading] = useState(true)\n\n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(data => {\n        setData(data)\n        setLoading(false)\n      })\n  }, [url])\n\n  return { data, loading }\n}`,
    language: "JavaScript",
    upvotes: 24,
    downvotes: 2,
    comments: 8,
  },
  {
    id: 2,
    name: "Sarah Dev",
    time: "5 hours ago",
    avatar: null,
    title: "Python list comprehension trick",
    code: `# Filter even numbers from a list\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8]\neven = [n for n in numbers if n % 2 == 0]\nprint(even)  # [2, 4, 6, 8]`,
    language: "Python",
    upvotes: 41,
    downvotes: 1,
    comments: 5,
  },
]

export default function Feed() {
  return (
    <main className="flex-1 max-w-3xl px-4">

      <CreatePost />

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Post key={post.id} char ={post.name.charAt(0)} name = {post.name} time ={post.time}  language ={post.language}  title ={post.title}
           code ={post.code} upvotes = {post.upvotes} downvotes = {post.downvotes} comments ={post.comments}/>
        ))}
      </div>
    </main>
  )
}