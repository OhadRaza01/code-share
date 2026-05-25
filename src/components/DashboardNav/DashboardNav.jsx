import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png"
import logout from "../../assets/logout.png"

export default function DashboardNav() {
    return (
        <header className='sticky top-0 left-0 z-50'>
            <nav className='flex justify-between items-center text-md p-4 bg-gray-950 border-b border-b-gray-700 text-white h-16'>
                <div className='flex justify-center items-center gap-3 cursor-pointer font-bold opacity-85 text-xl '>
                    <img src={logo} alt="Code share logo" width={24} className='invert md:w-7' />
                    Code Share
                </div>
                <div className='md:hidden text-2xl'>
                    &#9776;
                </div>
                <div className='justify-center items-center gap-6 hidden md:flex'>

                    <input type="text"
                        placeholder='Search'
                        className='pl-2 pr-2 pt-0.5 pb-0.5 bg-gray-900 rounded-md'
                    />

                    <a href="">
                        
                        <div className='w-8 h-8 rounded-full bg-green-600 flex justify-center items-center font-bold text-sm'>
                            OR
                        </div>
                    </a>


                    <a href="/"
                        className='p-2  rounded-md cursor-pointer hover:bg-gray-800 font-medium transition-all active:scale-95 -ml-3'>
                        <img src={logout}
                            alt=" logout icon"
                            width={18}
                        />
                        {/* <span>
                            logout
                        </span> */}
                    </a>

                </div>
            </nav>
        </header>
    )
}
