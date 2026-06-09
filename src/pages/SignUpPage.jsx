import React, { useEffect, useState } from 'react'
import logo from "./../assets/logo.png"
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import EmailVerificationAlert from '../components/EmailVerificationAlert/EmailVerificationAlert'

export default function SignUpPage() {

  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(0)
  const [specialCharCheck, setSpecialCharCheck] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)

  function checkSpecialCharacters(password) {
    const special_chars = ["!", "@", "#", "$", "%", "^", "*", "&"]
    setSpecialCharCheck(password.split('').some(chr => special_chars.includes(chr)))
  }

  useEffect(() => {
    checkSpecialCharacters(password)
  }, [password])

  async function handleSignUp() {
    try {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!username) { setError("Username is required"); return }
      if (username.length <= 3) { setError("Username is too short"); return }
      if (!email) { setError("Email is required"); return }
      if (!regex.test(email)) { setError("Invalid email format"); return }
      if (passwordLength < 8 || !specialCharCheck) {
        setError("Password must be 8+ characters with a special character"); return
      }
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(userCredential.user)
      await updateProfile(userCredential.user, { displayName: username })
      setLoading(false)
      setEmail("")
      setUsername("")
      setPassword("")
      setPasswordLength(0)
      setRegisterSuccess(true)
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use' ? "This email is already registered" : err.message)
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex justify-center items-center px-4 overflow-hidden">


      {registerSuccess && (
        <EmailVerificationAlert onCancel = {()=>{setRegisterSuccess(false)}} message="Registration successful! We have sent a verification link to your email. Please check your inbox and verify your email before logging in." />
      )}

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#111] border border-[#1f1f1f] rounded-2xl p-7 space-y-5 shadow-2xl">

        {/* Header */}
        <div className="flex flex-col items-center gap-2 pb-1">
          <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center mb-1">
            <img src={logo} alt="logo" className="w-5 invert opacity-90" />
          </div>
          <h1
            className="text-xl font-extrabold tracking-tight text-white"
          >
            Create an Account
          </h1>
          <p className="text-[12px] text-gray-400">Join and start sharing code</p>
        </div>

        {/* Username */}
        <div className="space-y-1.5">
          <label className="text-[12px] text-gray-400 tracking-wide uppercase">Username</label>
          <input
            type="text"
            value={username}
            placeholder="your_username"
            className="w-full bg-black border border-[#1f1f1f] text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-orange-600/50 focus:ring-1 focus:ring-orange-600/20 transition-all placeholder:text-gray-700"
            onChange={(e) => { setUsername(e.target.value.trim()); setError("") }}
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[12px] text-gray-400 tracking-wide uppercase">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            className="w-full bg-black border border-[#1f1f1f] text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-orange-600/50 focus:ring-1 focus:ring-orange-600/20 transition-all placeholder:text-gray-700"
            onChange={(e) => { setEmail(e.target.value.trim()); setError("") }}
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-[12px] text-gray-500 tracking-wide uppercase">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="••••••••"
            className="w-full bg-black border border-[#1f1f1f] text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-orange-600/50 focus:ring-1 focus:ring-orange-600/20 transition-all placeholder:text-gray-700"
            onChange={(e) => { setPassword(e.target.value); setPasswordLength(e.target.value.length); setError("") }}
          />
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="checkbox"
              className="accent-orange-600 w-3.5 h-3.5 cursor-pointer"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className="text-[11px] text-gray-400">Show password</span>
          </label>
        </div>

        {/* Password checks */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200 ${passwordLength >= 8 ? "bg-orange-600 border-orange-600" : "border-[#2a2a2a]"}`}>
              {passwordLength >= 8 && (
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className={` text-[11px] transition-colors duration-200 ${passwordLength >= 8 ? "text-orange-500" : "text-gray-500"}`}>
              At least 8 characters
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200 ${specialCharCheck ? "bg-orange-600 border-orange-600" : "border-[#2a2a2a]"}`}>
              {specialCharCheck && (
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className={`text-[11px] transition-colors duration-200 ${specialCharCheck ? "text-orange-500" : "text-gray-500"}`}>
              One special character
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="w-full text-center font-mono text-xs text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSignUp}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-all duration-200 active:scale-[0.98]"
        >

          {loading ? (
            <>
              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Creating account
            </>
          ) :
            <span>Create Account</span>
          }
        </button>

        {/* Sign in link */}
        <p className="text-center text-[12px] text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 hover:text-orange-400 transition-colors duration-200">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}