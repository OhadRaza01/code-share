import React, { useState, useEffect } from 'react'

export default function EmailVerificationAlert({ message }) {

    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Mount hone ke baad animate karo
        setTimeout(() => setShow(true), 10)
    }, [])

    function handleClose() {
        setShow(false)
        setTimeout(() => setVisible(false), 300) // animation khatam hone ke baad hide karo
    }

    if (!visible) return null;

    return (
        <div className="absolute inset-x-0 top-0 flex justify-end px-4 py-6 z-50">
            <div className={`max-w-sm w-full shadow-lg px-4 py-3 rounded relative bg-green-600 border-l-4 border-green-700 text-white
                transition-all duration-300 ease-in-out
                ${show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                <div className="p-2">
                    <div className="flex items-start">
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm leading-5 font-medium">
                                {message}
                            </p>
                        </div>
                        <div className="ml-4 shrink-0 flex">
                            <button
                                onClick={handleClose}
                                className="inline-flex text-white transition ease-in-out duration-150"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}