import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { updateProfile } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
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
      await updateProfile(auth.currentUser, {
        displayName: name
      })
      await updateUserProfile()
      setIsEditing(false)
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function UpadetDetailsONEveryPost() {

    await updateDoc(doc(db, "posts", user.uid))
    username: name

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
    // async function getUserProfile() {
    //   const userDoc = await getDoc(doc(db, "users", user.uid))
    //   if (userDoc.exists()) {
    //     setUserInfo(userDoc.data())
    //   }
    // }
    // getUserProfile()
    const unsub = onSnapshot(doc(db, "users", user.uid),(snapshot)=>{
      setUserInfo(snapshot.data())
    })
    return () => unsub();
  }, [])

  return (
    <main className="flex-1 max-w-3xl px-4 py-8">

      {/* Cover */}
      <div className="w-full h-32 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl mb-4" />

      <div className="flex flex-col gap-4 px-2">

        {/* Avatar + Edit button */}
        <div className="flex items-end justify-between -mt-10">
          <div className="w-20 h-20 rounded-full bg-blue-600 border-4 border-[#0d1117] flex items-center justify-center text-2xl font-bold text-white">
            {user?.displayName?.charAt(0).toUpperCase()}
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-1.5 border border-gray-600 text-gray-300 text-sm rounded-lg hover:border-gray-400 transition">
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 border border-gray-600 text-gray-300 text-sm rounded-lg hover:border-gray-400 transition">
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition">
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* Info — view or edit */}
        {!isEditing ? (
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-white">{user?.displayName}</h1>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            {userInfo?.bio && <p className="text-gray-300 text-sm">{userInfo.bio}</p>}
            <div className="flex gap-4 text-gray-500 text-sm">
              {userInfo?.location && <span>📍 {userInfo.location}</span>}
              {userInfo?.website && <a href={userInfo.website} target="_blank" className="text-blue-400 hover:underline">🔗 {userInfo.website}</a>}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Karachi, Pakistan"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Website</label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourportfolio.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex gap-6 border-t border-gray-800 pt-4 mt-2">
          <div className="text-center">
            <p className="text-white font-bold text-lg">0</p>
            <p className="text-gray-500 text-xs">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">0</p>
            <p className="text-gray-500 text-xs">Upvotes</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">0</p>
            <p className="text-gray-500 text-xs">Comments</p>
          </div>
        </div>
      </div>

      {/* Posts placeholder */}
      <div className="mt-8 border border-gray-800 rounded-xl p-6 text-gray-500">
        {/* No posts yet. Share your first code snippet! */}
        <MyPosts />
      </div>


    </main>
  )
}