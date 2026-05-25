import React from "react";
import {
  FaNewspaper,
  FaRegFileAlt,
  FaUserCircle,
  FaTerminal,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

export default function DashboardSidebar() {
  return (
    <aside className="w-full md:w-64 shrink-0 px-2">
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-4 sticky top-16">
        <div className="space-y-3">
          {/* Feed */}
          <NavLink
            to="/dashboard" // Apni marzi ka path daal lein
            end
            className={({ isActive }) =>
              `${isActive ? "text-blue-500" : "text-white"} w-full flex items-center space-x-3 p-3 rounded-xl font-semibold transition hover:bg-gray-800`
            }
          >
            <FaNewspaper className="text-lg" />
            <span>Feed</span>
          </NavLink>

          {/* 2. My Posts Link */}
          <NavLink
            to="/dashboard/myposts"
            className={({ isActive }) =>
              `${isActive ? "text-blue-500" : "text-white"} w-full flex items-center space-x-3 p-3 rounded-xl font-medium transition hover:bg-gray-800`
            }
          >
            <FaRegFileAlt className="text-lg" />
            <span>My Posts</span>
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `${isActive ? "text-blue-500" : "text-white"} w-full flex items-center space-x-3 p-3 rounded-xl font-medium transition hover:bg-gray-800`
            }>
            <FaUserCircle className="text-lg" />
            <span>Profile</span>


          </NavLink>

          {/* Terminal */}
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 text-gray-200 font-medium transition duration-200">
            <FaTerminal className="text-lg" />
            <span>Terminal</span>
          </button>
        </div>
      </div>
    </aside >
  );
}