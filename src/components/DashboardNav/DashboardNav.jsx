import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import { useAuth } from '../Context/AuthContext'
import LogoutAlert from './LogoutAlert'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'

export default function DashboardNav() {
    const [showLogout, setShowLogout] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <>
            <header className="sticky top-0 left-0 z-50">
                <nav className="flex justify-between items-center px-5 bg-[#121111] border-b border-[#1f1f1f] text-white h-16">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="CodeShare logo" width={20} className="invert opacity-90" />
                        <span
                            className="text-white font-extrabold text-lg tracking-tight"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                            Code<span className="text-orange-600">Share</span>
                        </span>
                    </div>

                    {/*mobile*/}
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-gray-300 hover:text-gray-300 hover:bg-white/5 transition-all duration-200"
                    >
                        {showSidebar ? (
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        )}
                    </button>

                    {/*desktop*/}
                    <div className="hidden md:flex items-center gap-3">

                        {/* Search */}
                        <div className="flex items-center gap-2 bg-black border border-[#1f1f1f] rounded-lg px-3 py-1.5">
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="text-gray-600 shrink-0">
                                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent text-sm text-gray-300 placeholder-gray-700 outline-none w-40"
                            />
                        </div>

                        {/* Avatar */}
                        <NavLink to="/dashboard/profile">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-sm font-semibold text-white">
                                {user?.displayName?.charAt(0)?.toUpperCase()}
                            </div>
                        </NavLink>

                        {/* Logout */}
                        <button
                            onClick={() => setShowLogout(true)}
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-white hover:text-orange-500 hover:bg-orange-600/10 transition-all duration-200"
                            title="Sign out"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile sidebar*/}
                <div className={`md:hidden ${showSidebar ? "block" : "hidden"}`}>
                    <DashboardSidebar display={showSidebar} onLogout = {() => setShowLogout(true)} />
                </div>
            </header>

            {/* Logout alert — full screen overlay */}
            {showLogout && (
                <LogoutAlert
                    onCancel={() => setShowLogout(false)}
                    onConfirm={async () => {
                        await signOut(auth)
                        setShowLogout(false)
                        navigate("/")
                    }}
                />
            )}
        </>
    )
}