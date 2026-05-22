import React from 'react'
import logo from "../../assets/logo.png"

export default function NavBar() {
    return (

        <header className='sticky top-0 left-0 z-50'>
            <nav className='flex justify-between items-center p-4 bg-gray-900 text-white h-18 '>
                <div className='flex justify-center items-center gap-3 cursor-pointer font-bold opacity-85 text-xl '>
                    <img src={logo} alt="Code share logo" width={24} className='invert md:w-7' />
                    Code Share
                </div>
                <div className='md:hidden text-2xl'>
                    &#9776;
                </div>
                <div className='justify-center items-center gap-6 hidden md:flex font-medium'>
                    <button className='pl-4 pr-4 pt-2 pb-2 border border-green-500/60 text-green-400 rounded-lg cursor-pointer  active:scale-95 hover:bg-white/10'>
                        Log In
                    </button>
                    <button className='bg-green-600  pl-4 pr-4 pt-2 pb-2 rounded-lg cursor-pointer hover:bg-green-700 font-medium transition-all active:scale-95'>
                        Sign Up
                    </button>
                </div>
            </nav>
        </header>

    )
}
