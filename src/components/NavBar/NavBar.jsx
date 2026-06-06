import React from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (

        <header className='sticky top-0 left-0 z-50'>
            <nav className='bg-[#121111] text-white h-18 '>
                <div className='flex justify-between items-center px-4 md:px-0 h-full w-full max-w-6xl mx-auto'>

                    <div className="flex items-center gap-2">
                        <img src={logo} alt="CodeShare logo" width={22} className="invert opacity-90" />
                        <span
                            className="text-white font-extrabold text-2xl tracking-tight"
                        >
                            Code<span className="text-orange-600">Share</span>
                        </span>
                    </div>
                    <div className='md:hidden text-2xl'>
                        &#9776;
                    </div>
                    <div className='justify-center items-center gap-6 hidden md:flex font-medium'>

                        <Link to="/login"
                            className='px-4 py-2 rounded-md border border-[#1f1f1f] hover:border-gray-300 text-gray-300 hover:text-gray-300 font-semibold tracking-wide transition-all duration-200 hover:-translate-y-px active:scale-[0.97]'>
                            Log In
                        </Link>

                        <Link to="/signup"
                            className='  px-2 py-2 rounded-md cursor-pointer bg-orange-600 hover:bg-orange-700 text-white font-medium transition-all active:scale-95'>
                            Sign Up
                        </Link>

                    </div>
                </div>
            </nav>
        </header>

    )
}
