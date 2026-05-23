import React, { useEffect, useState } from 'react'
import logo from "./../assets/logo.png"
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

export default function SignUpPage() {

  let [password, setPassword] = useState("")
  let [passwordLength, setPasswordLength] = useState(0)
  let [specialCharCheck, setSpecialCharCheck] = useState(false)
  let [email, setEmail] = useState("")
  let [error, setError] = useState("")
  let [showPassword , setShowPassword] = useState(false)

  function checkSpecialCharacters(password) {
    const special_chars = ["!", "@", "#", "$", "%", "^", "*", "&"]
    const hasSpecial = password.split('').some(chr => special_chars.includes(chr))
    setSpecialCharCheck(hasSpecial)
  }

  useEffect(() => {
    checkSpecialCharacters(password)
  }, [password])

  async function handleSignUp() {
    try {
      
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        setError("Email is required")
        return
      }
      
      if (!(regex.test(email))){
        setError("Invalid Email Format")
        return
      }
      
      if (passwordLength >= 8 && specialCharCheck) {
        
        let userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(userCredential.user)
        
        alert("email verification send")
      
      }
      else if (passwordLength < 8 || !specialCharCheck) {
        
        setError("Password must be 8+ characters with a special character")
      
      }
    }
    catch (err) {
      
      if (err.code === 'auth/email-already-in-use') {
        setError("This Email is already registered")
      } 
      else {
        setError(err.message)
      }
    }
  }

  return (
    <div className='bg-linear-to-br from-gray-950 via-gray-900 to-black text-sm md:text-md w-full h-screen text-white flex justify-center items-center px-4'>

      <div className='w-full max-w-md rounded-2xl bg-gray-900/80 backdrop-blur-lg border border-gray-800 shadow-xl p-6 space-y-5'>

        {/* Logo and Title */}
        <div className='flex flex-col justify-center items-center gap-2'>
          <img src={logo} alt="logo" className='w-8 invert opacity-90' />
          <h1 className='text-xl font-semibold tracking-wide'>Create an Account</h1>
          <p className=' text-gray-400'>Join and start sharing code</p>
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
              setPasswordLength(e.target.value.length)
              setError("")
            }}

          />
          <div className='flex gap-3 p-1'>
            <input id="showpass" type="checkbox" 
            className='accent-green-500 w-3.5 '
            onChange={(e)=>{
              setShowPassword(!showPassword)
            }}
            />
            <label htmlFor="showpass" className='text-gray-400'>Show Password</label>

          </div>
        </div>

        {/* error div  */}
        {error && <div className=' w-full text-center text-md text-red-600 -mt-2' >{error}</div>}

        <div className="space-y-2 ">

          <div className="flex items-center gap-2 text-gray-400">
            <span className={`w-5 h-5 flex items-center ${passwordLength >= 8 ? "bg-green-500 text-black" : ""} justify-center rounded-full border border-gray-600`}>
              ✓
            </span>
            <p>At least 8 characters</p>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <span className={`w-5 h-5 flex items-center justify-center ${specialCharCheck ? "bg-green-500 text-black" : ""} rounded-full border border-gray-600`}>
              ✓
            </span>
            <p>One special character</p>
          </div>

        </div>

        <button onClick={handleSignUp} className='w-full bg-green-600 hover:bg-green-500 transition font-medium py-2.5 rounded-xl shadow-md'>
          Sign Up
        </button>

        <p className='text-center text-gray-400'>
          Already have an account?{" "}
          <a to="/" className='text-green-500 hover:underline'>
            Sign in
          </a>
        </p>

      </div>
    </div>
  )
}