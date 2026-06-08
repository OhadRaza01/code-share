import React from "react";

export default function LogoutAlert({ onConfirm, onCancel }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
            <div
                className="w-full max-w-90 mx-4 rounded-md p-7 flex flex-col items-center gap-5 text-center"
                style={{ background: "#111", border: "0.5px solid #222" }}
            >
                {/* Icon */}
                <div
                    className="w-13 h-13 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(234,88,12,.08)", border: "1px solid rgba(234,88,12,.2)" }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                    <p className="text-base font-semibold text-[#f9fafb]">Sign out?</p>
                    <p className="text-[13px] text-gray-600 leading-relaxed max-w-65">
                        You'll be signed out of your account. You can always sign back in anytime.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2.5 w-full">
                    <button
                        onClick={onCancel}
                        className="flex-1 text-[13px] font-medium text-gray-500 py-2.5 rounded-lg transition-all duration-200"
                        style={{ background: "transparent", border: "0.5px solid #2a2a2a" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.color = "#9ca3af" }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "" }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 text-[13px] font-semibold text-white py-2.5 rounded-lg transition-all duration-200 active:scale-[.97]"
                        style={{ background: "#ea580c", border: "none" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#c2410c"}
                        onMouseLeave={e => e.currentTarget.style.background = "#ea580c"}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    )
}