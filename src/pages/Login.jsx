import React, { useEffect, useState } from 'react'
import logo from "./../assets/logo.png"
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import EmailVerificationAlert from '../components/EmailVerificationAlert/EmailVerificationAlert'

export default function Login() {

    let [password, setPassword] = useState("")
    let [email, setEmail] = useState("")
    let [error, setError] = useState("")
    let [showPassword, setShowPassword] = useState(false)
    let [emailIsVerfied , setEmailIsVerfied] = useState(false)

    async function handleSignIn() {
        try {

            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                setError("Email is required")
                return
            }

            if (!(regex.test(email))) {
                setError("Invalid Email Format")
                return
            }

            let userCredential = await signInWithEmailAndPassword(auth, email, password)
            if(userCredential.user.isVerified){
                // dashboard
            }
            else{
                setEmailIsVerfied(true)
                return
            }

        }
        catch (err) {

            if (err.code === 'auth/invalid-credential') {
                setError("Invalid email or password.")
            }
            else if(err.code === "auth/missing-password"){
                setError("Password is missing.")
            }
            else {
                setError(err.message)
            }
        }
    }

    return (
        <div className='relative bg-linear-to-br from-gray-950 via-gray-900 to-black text-sm md:text-md w-full h-screen text-white flex justify-center items-center px-4'>

            {emailIsVerfied && <EmailVerificationAlert message={"Access denied. Your email is not verified yet. Please check your inbox (and spam folder) for the verification link before logging in."} />}

            <div className='w-full max-w-md rounded-2xl bg-gray-900/80 backdrop-blur-lg border border-gray-800 shadow-xl p-6 space-y-5'>

                {/* Logo and Title */}
                <div className='flex flex-col justify-center items-center gap-2'>
                    <img src={logo} alt="logo" className='w-8 invert opacity-90' />
                    <h1 className='text-xl font-semibold tracking-wide'>Sign In</h1>
                    <p className=' text-gray-400'>Sign in to your account</p>
                </div>

                {/* Email */}
                <div className='space-y-1'>
                    <label className=' text-gray-300'>Email</label>
                    <input
                        type="email"
                        placeholder='your@email.com'
                        className='w-full bg-gray-800/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition'
                        onChange={(e) => {
                            setEmail(e.target.value.trim())
                            setError("")
                        }}
                        required
                    />
                </div>

                {/* Password */}
                <div className='space-y-1'>
                    <label className=' text-gray-300'>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='••••••••'
                        className='w-full bg-gray-800/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition'
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError("")
                        }}

                    />
                    <div className='flex gap-3 p-1'>
                        <input id="showpass" type="checkbox"
                            className='accent-green-500 w-3.5 '
                            onChange={(e) => {
                                setShowPassword(!showPassword)
                            }}
                        />
                        <label htmlFor="showpass" className='text-gray-400'>Show Password</label>

                    </div>
                </div>

                {/* error div  */}
                {error && <div className=' w-full text-center text-md text-red-600 -mt-2' >{error}</div>}

                <button onClick={handleSignIn} className='w-full bg-green-600 hover:bg-green-500 transition font-medium py-2.5 rounded-xl shadow-md'>
                    Sign In
                </button>

                <p className='text-center text-gray-400'>
                    Dont have an account?{" "}
                    <a to="/" className='text-green-500 hover:underline'>
                        Sign up
                    </a>
                </p>

            </div>
        </div>
    )
}