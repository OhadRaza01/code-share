import React from "react";

const posts = [
  {
    id: 1,
    name: "Alex Johnson",
    time: "2 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    text: "Just finished this amazing hike in the mountains! The view was absolutely breathtaking. Nature always helps me clear my mind and find new inspiration for my projects.",
    likes: 124,
    comments: 23,
  },
  {
    id: 2,
    name: "Sarah Williams",
    time: "5 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    text: "Check out this delicious vegan recipe I tried today! It's packed with nutrients and so easy to make.",
    likes: 89,
    comments: 14,
  },
  {
    id: 3,
    name: "Tech Insights",
    time: "1 day ago",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
    image:
      "https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    text: "The future of AI is here! Machine learning models are becoming smarter and more efficient every day.",
    likes: 256,
    comments: 42,
  },
];

export default function Feed() {
  return (
    <main className="flex-1 max-w-3xl px-4">
      {/* Create Post */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-sm p-5 mb-8">
        <div className="flex items-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
            alt="User"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100"
          />

          <div className="flex-1">
            <textarea
              rows={3}
              placeholder="What's on your mind?"
              className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
                  <i className="fas fa-image"></i>
                  <span className="text-sm font-medium">Photo</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition">
                  <i className="fas fa-video"></i>
                  <span className="text-sm font-medium">Video</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-600 transition">
                  <i className="fas fa-link"></i>
                  <span className="text-sm font-medium">Link</span>
                </button>
              </div>

              <button className="px-6 py-2.5 bg-primary-600 rounded-xl font-semibold shadow hover:bg-primary-700 hover:scale-105 transition-all duration-200">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {post.name}
                    </h3>
                    <p className="text-sm text-gray-500">{post.time}</p>
                  </div>
                </div>

                <button className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-500 transition">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>

              <p className="mt-4 text-gray-700 leading-relaxed text-[15px]">
                {post.text}
              </p>
            </div>

            {/* Post Image */}
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Actions */}
            <div className="px-5 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition group">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-red-50 transition">
                    <i className="far fa-heart text-lg"></i>
                  </div>

                  <span className="font-medium">{post.likes}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition group">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-blue-50 transition">
                    <i className="far fa-comment text-lg"></i>
                  </div>

                  <span className="font-medium">{post.comments}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition group">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-green-50 transition">
                    <i className="fas fa-share text-lg"></i>
                  </div>

                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}