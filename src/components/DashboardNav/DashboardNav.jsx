import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import logout from "../../assets/logout.png"
import { useAuth } from '../Context/AuthContext'
import LogoutAlert from './LogoutAlert'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'

export default function DashboardNav() {

    const [showLogout, setShowLogout] = useState(false);

    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <header className='sticky top-0 left-0 z-50'>
            <nav className='flex justify-between items-center text-md p-4 bg-[#121111]  border-b border-b-[#333] text-white h-16'>
                <div className="flex items-center gap-2">
                    <img src={logo} alt="CodeShare logo" width={22} className="invert opacity-90" />
                    <span
                        className="text-white font-extrabold text-xl md:text-2xl tracking-tight"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        Code<span className="text-orange-600">Share</span>
                    </span>
                </div>
                <div className='md:hidden text-2xl'>
                    &#9776;
                </div>
                <div className='justify-center items-center gap-6 hidden md:flex'>

                    <input type="text"
                        placeholder='Search'
                        className='pl-2 pr-2 pt-0.5 pb-0.5 bg-black  rounded-md'
                    />

                    <NavLink to="/dashboard/profile">

                        <div className='w-8 h-8 rounded-full bg-green-600 flex justify-center items-center font-bold text-sm'>
                            {user.displayName.charAt(0)}
                        </div>
                    </NavLink>


                    <button
                        onClick={()=>setShowLogout(true)}
                        className='p-2  rounded-md cursor-pointer hover:bg-gray-800 font-medium transition-all active:scale-95 -ml-3'>
                        <img src={logout}
                            alt=" logout icon"
                            width={18}
                        />

                    </button>
                    {showLogout && (
                        <LogoutAlert
                            onCancel={() => setShowLogout(false)}
                            onConfirm={() => {
                                signOut(auth)
                                setShowLogout(false)
                                navigate("/")
                            }}
                        />
                    )}

                </div>
            </nav>
        </header>
    )
}
