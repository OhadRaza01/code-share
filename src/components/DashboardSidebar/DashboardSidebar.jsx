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
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-[#121111] border-b border-r border-[#333] rounded-br-md text-white hadow-xl p-4 sticky top-16">
        <div className="space-y-3">
          {/* Feed */}
          <NavLink
            to="/dashboard" // Apni marzi ka path daal lein
            end
            className={({ isActive }) =>
              `${isActive ? "text-orange-400" : "text-white"} w-full flex items-center space-x-3 p-3 rounded-xl font-semibold transition hover:bg-gray-500/20`
            }
          >
            <FaNewspaper className="text-lg" />
            <span>Feed</span>
          </NavLink>

          {/* 2. My Posts Link */}
          <NavLink
            to="/dashboard/myposts"
            className={({ isActive }) =>
              `${isActive ? "text-orange-400" : "text-white"} w-full flex items-center space-x-3 p-3 rounded-xl font-medium transition hover:bg-gray-500/20`
            }
          >
            <FaRegFileAlt className="text-lg" />
            <span>My Posts</span>
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `${isActive ? "text-orange-400" : "text-white"} w-full flex items-center space-x-3 p-3 rounded-xl font-medium transition hover:bg-gray-500/20`
            }>
            <FaUserCircle className="text-lg" />
            <span>Profile</span>
          </NavLink>

          {/* Terminal */}
          <NavLink
          to={"terminal"}
          className={({ isActive }) =>
              `${isActive ? "text-orange-400" : "text-white"} w-full flex items-center space-x-3 p-3 rounded-xl font-semibold transition hover:bg-gray-500/20`
            }>
            <FaTerminal className="text-lg" />
            <span>Terminal</span>
          </NavLink>
        </div>
      </div>
    </aside >
  );
}