import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardNav from './components/DashboardNav/DashboardNav.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path = "/" element = {<LandingPage />} />
      <Route path = "/signup" element = {<SignUpPage />} />
      <Route path = "/login" element = {<LoginPage />} />
      <Route path = "/dashboard" element = {<Dashboard/>} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
