import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import EmailVerificationAlert from '../components/EmailVerificationAlert/EmailVerificationAlert'
import logo from "./../assets/logo.png"

export default function LoginPage() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [emailNotVerified, setEmailNotVerified] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSignIn() {
        try {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!email) { setError("Email is required"); return }
            if (!regex.test(email)) { setError("Invalid email format"); return }
            if (!password) { setError("Password is required"); return }

            setLoading(true)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            if (userCredential.user.emailVerified) {
                setLoading(false)
                navigate('/dashboard')
            } else {
                setLoading(false)
                setEmailNotVerified(true)
                await sendEmailVerification(userCredential.user)
            }
        } catch (err) {
            if (err.code === 'auth/invalid-credential') {
                setError("Invalid email or password.")
                setLoading(false)
            }
            else if (err.code === 'auth/missing-password') {
                setError("Password is missing.")
                setLoading(false)
            }
            else if (err.code === 'auth/network-request-failed') {
                setError("Please check your connection.")
                setLoading(false)
            }
            else{
                setError(err.message)
                setLoading(false)
            } 
        }
    }

    return (
        <div className="relative min-h-screen bg-black text-white flex justify-center items-center px-4 overflow-hidden">

            {/* Noise */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(234,88,12,0.08) 0%, transparent 65%)" }}
            />

            {emailNotVerified && (
                <EmailVerificationAlert onCancel = {()=>setEmailNotVerified(false)} message="Access denied. Your email is not verified yet. Please check your inbox (and spam folder) for the verification link before logging in." />
            )}

            {/* Card */}
            <div className="relative z-10 w-full max-w-md bg-[#111] border border-[#1f1f1f] rounded-2xl p-7 space-y-5 shadow-2xl">

                {/* Header */}
                <div className="flex flex-col items-center gap-2 pb-1">
                    <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center mb-1">
                        <img src={logo} alt="logo" className="w-5 invert opacity-90" />
                    </div>
                    <h1
                        className="text-xl font-extrabold text-white"
                    >
                        Welcome Back
                    </h1>
                    <p className="text-[12px] text-gray-400">Sign in to your account</p>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label className="text-[12px] text-gray-400 tracking-wide uppercase">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-black border border-[#1f1f1f] text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-orange-600/50 focus:ring-1 focus:ring-orange-600/20 transition-all placeholder:text-gray-700"
                        onChange={(e) => { setEmail(e.target.value.trim()); setError("") }}
                    />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <label className="text-[12px] text-gray-400 tracking-wide uppercase">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full bg-black border border-[#1f1f1f] text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-orange-600/50 focus:ring-1 focus:ring-orange-600/20 transition-all placeholder:text-gray-700"
                        onChange={(e) => { setPassword(e.target.value); setError("") }}
                    />
                    <label className="flex items-center gap-2 cursor-pointer w-fit">
                        <input
                            type="checkbox"
                            className="accent-orange-600 w-3.5 h-3.5 cursor-pointer"
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <span className=" text-[11px] text-gray-400">Show password</span>
                    </label>
                </div>

                {/* Error */}
                {error && (
                    <div className="w-full text-center font-mono text-xs text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
                        {error}
                    </div>
                )}

                {/* Submit */}
                <button
                    onClick={handleSignIn}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-all duration-200  active:scale-[0.98]"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Signing in
                        </>
                    ) :
                        <span>Sign In</span>


                    }

                </button>

                {/* Sign up link */}
                <p className="text-center text-[12px] text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-orange-500 hover:text-orange-400 transition-colors duration-200">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    )
}