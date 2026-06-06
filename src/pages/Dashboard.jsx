import React from 'react'
import DashboardNav from '../components/DashboardNav/DashboardNav'
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar'
import Feed from '../components/Feed/Feed'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../components/Context/AuthContext'
import Footer from '../components/Footer/Footer'

export default function Dashboard() {
  return (

    <>
      <AuthProvider>
        <DashboardNav />
        <div className='flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-black'>
          <DashboardSidebar />
          <Outlet />
        </div>

      </AuthProvider>
    </>
  )
}
