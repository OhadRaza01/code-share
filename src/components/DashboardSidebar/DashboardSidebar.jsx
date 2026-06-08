import React from "react";
import {
  FaNewspaper,
  FaRegFileAlt,
  FaUserCircle,
  FaTerminal,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

export default function DashboardSidebar({ display, onLogout }) {
  return (
    <aside className={`w-full md:block md:w-64 shrink-0 ${display ? "block" : "hidden"}`}>
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
          {onLogout && (
            <div className="mt-4 pt-4 border-t-2 border-[#1f1f1f] md:hidden">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:text-orange-500 hover:bg-orange-600/10 transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside >
  );
}