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
        <div className='flex flex-col md:flex-row gap-6 py-6 min-h-screen bg-gray-950'>
          <DashboardSidebar />
          <Outlet />
        </div>
      </AuthProvider>
    </>
  )
}
