import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { updateProfile } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import MyPosts from '../MyPosts/MyPosts'

export default function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.displayName || "")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [website, setWebsite] = useState("")
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [userInfo, setUserInfo] = useState(null)

  async function handleUpdate() {
    try {
      setLoading(true)
      await updateProfile(auth.currentUser, { displayName: name })
      updateUserProfile()
      setIsEditing(false)
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateUserProfile() {
    await setDoc(doc(db, "users", user.uid), {
      username: name,
      bio: bio,
      location: location,
      website: website
    }, { merge: true })
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      const data = snapshot.data()
      if (data) {
        setUserInfo(data)
        if (data.bio) setBio(data.bio)
        if (data.location) setLocation(data.location)
        if (data.website) setWebsite(data.website)
      }
    })
    return () => unsub()
  }, [])

  const avatar = user?.displayName?.charAt(0).toUpperCase()

  return (
    <main className="flex-1 max-w-lg px-4 py-2 md:py-0">
      <div className="bg-[#111] border border-[#1f1f1f] rounded-md overflow-hidden">

        {/* View mode */}
        {!isEditing ? (
          <div>
            <div className="p-6">

              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-full border border-[#2a2a2a] bg-green-600 flex items-center justify-center text-xl font-semibold text-white">
                  {avatar}
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 border border-[#2a2a2a] px-3 py-1.5 rounded-md hover:border-orange-600/40 hover:text-orange-500 transition-all duration-200"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H3v-2L11.5 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Edit profile
                </button>
              </div>

              {/* Name + email */}
              <p className="text-[17px] font-semibold text-white mb-0.5">{user?.displayName}</p>
              <p className="text-xs text-gray-700 font-mono mb-3">{user?.email}</p>

              {/* Bio */}
              {userInfo?.bio && (
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{userInfo.bio}</p>
              )}

              {/* Meta */}
              {(userInfo?.location || userInfo?.website) && (
                <div className="flex flex-wrap gap-3">
                  {userInfo?.location && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-600">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3.25 4.5 8.5 4.5 8.5S12.5 9.25 12.5 6A4.5 4.5 0 0 0 8 1.5Zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="currentColor" />
                      </svg>
                      {userInfo.location}
                    </span>
                  )}
                  {userInfo?.website && (
                    <a
                      href={userInfo.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-orange-500 hover:text-orange-400 transition-colors duration-200"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5m0 0v5m0-5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {userInfo.website}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-[#1f1f1f]" />

            {/* Stats */}
            <div className="flex">
              {[
                { value: "0", label: "POSTS" },
                { value: "0", label: "UPVOTES" },
                { value: "0", label: "COMMENTS" },
              ].map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex-1 py-4 text-center ${i !== 0 ? "border-l border-[#1f1f1f]" : ""}`}
                >
                  <span className="block text-lg font-bold text-white">{value}</span>
                  <span className="block text-[10px] text-gray-700 tracking-widest mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Edit mode */
          <div className="p-6 flex flex-col gap-4">

            {[
              { label: "Name", value: name, setter: setName, placeholder: "Your name", tag: "input" },
              { label: "Location", value: location, setter: setLocation, placeholder: "Karachi, Pakistan", tag: "input" },
              { label: "Website", value: website, setter: setWebsite, placeholder: "https://yourportfolio.com", tag: "input" },
            ].map(({ label, value, setter, placeholder }) => (
              <div key={label}>
                <label className="block text-[10px] uppercase tracking-[0.08em] text-gray-600 mb-1.5">
                  {label}
                </label>
                <input
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-black border border-[#1f1f1f] text-gray-200 font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-orange-600/40 transition-all placeholder:text-gray-800"
                />
              </div>
            ))}

            <div>
              <label className="block text-[10px] uppercase tracking-[0.08em] text-gray-600 mb-1.5">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full bg-black border border-[#1f1f1f] text-gray-200 font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-orange-600/40 transition-all placeholder:text-gray-800 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-1">
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs text-gray-500 border border-[#2a2a2a] px-4 py-2 rounded-md hover:border-gray-600 hover:text-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 px-5 py-2 rounded-md transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saving...
                  </>
                ) : "Save changes"}
              </button>
            </div>

          </div>
        )}
      </div>
    </main>
  )
}