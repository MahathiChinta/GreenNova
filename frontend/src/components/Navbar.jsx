import React from 'react'

export default function Navbar({ user, onLogout }){
  return (
    <header className="flex items-center justify-between bg-green-800 text-white p-4">
      <div className="font-semibold">GreenNova Admin</div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block">{user?.name} ({user?.role})</div>
        <button className="bg-white/10 px-3 py-1 rounded" onClick={onLogout}>Logout</button>
      </div>
    </header>
  )
}