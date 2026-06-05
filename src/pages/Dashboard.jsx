import React from 'react'
import DashboardNav from '../components/DashboardNav/DashboardNav'
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar'
import Feed from '../components/Feed/Feed'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../components/Context/AuthContext'

export default function Dashboard() {
  return (

    <>
      <AuthProvider>
        <DashboardNav />
        <div className='flex flex-col md:flex-row min-h-screen bg-[#000]'>
          <DashboardSidebar />
          <Outlet />
        </div>
      </AuthProvider>
    </>
  )
}
