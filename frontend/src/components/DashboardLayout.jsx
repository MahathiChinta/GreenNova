import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function DashboardLayout({ children, user, onLogout }){
  return (
    <div className={`${user && user.role === 'government' ? '' : ''} flex h-screen`}> 
      <Sidebar role={user?.role} />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} onLogout={onLogout} />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}