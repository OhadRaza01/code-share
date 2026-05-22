import React from 'react'

export default function FeatureNumber({number}) {
    return (
        <div className='w-fit pl-4 pr-4 border rounded-2xl pt-2 pb-2 border-green-500 text-green-400 flex justify-center items-center
        gap-1.5 hover:bg-gray-900 transition-all duration-200 cursor-pointer'>
            <span className='animate-pulse'>•</span>Feature {number}
        </div>
    )
}
