import React from 'react'

export default function FeatureNumber({number}) {
    return (
        <div className='w-fit px-3 text-xs md:text-sm lg:text-md border rounded-2xl py-2 border-orange-500 text-orange-400 flex justify-center items-center
        gap-1.5 hover:bg-gray-900 transition-all duration-200 cursor-pointer'>
            <span className='animate-pulse'>•</span>Feature {number}
        </div>
    )
}
