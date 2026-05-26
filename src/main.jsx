import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { AuthProvider } from './components/Context/AuthContext.jsx'
import Feed from './components/Feed/Feed.jsx'
import MyPosts from './components/MyPosts/MyPosts.jsx'
import Profile from './components/Profile/Profile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index={true} element={<Feed />} />
        <Route path='/dashboard/myposts' element={<MyPosts />} />
        <Route path='/dashboard/profile' element={<Profile />} />
      </Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
