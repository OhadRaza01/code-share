import React from "react";
import {
  FaNewspaper,
  FaRegFileAlt,
  FaUserCircle,
  FaTerminal,
} from "react-icons/fa";

export default function DashboardSidebar() {
  return (
    <aside className="w-full md:w-64 shrink-0 px-2">
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-4 sticky top-16">
        <div className="space-y-3">
          {/* Feed */}
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl text-primary-700 font-semibold transition hover:scale-[1.02]">
            <FaNewspaper className="text-lg" />
            <span>Feed</span>
          </button>

          {/* My Posts */}
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 text-gray-200 hover:text-white font-medium transition duration-200">
            <FaRegFileAlt className="text-lg" />
            <span>My Posts</span>
          </button>

          {/* Profile */}
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 text-gray-200 hover:text-white font-medium transition duration-200">
            <FaUserCircle className="text-lg" />
            <span>Profile</span>
          </button>

          {/* Terminal */}
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 text-gray-200 hover:text-white font-medium transition duration-200">
            <FaTerminal className="text-lg" />
            <span>Terminal</span>
          </button>
        </div>
      </div>
    </aside>
  );
}