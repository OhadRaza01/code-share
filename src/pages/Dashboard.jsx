import React from 'react'
import DashboardNav from '../components/DashboardNav/DashboardNav'
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar'
import Feed from '../components/Feed/Feed'

export default function Dashboard() {
  return (
    
    <>
    <DashboardNav />
    <div className='flex flex-col md:flex-row gap-6 py-6 bg-gray-950'>
        <DashboardSidebar />
        <Feed />
    </div>
    </>
  )
}
