import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing(){
  const nav = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-6">
      <div className="max-w-2xl text-center bg-white rounded-2xl p-12 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">🌱 Welcome to GreenNova</h1>
        <p className="text-gray-600 mb-6">Carbon-aware scheduling and monitoring for companies & government</p>
        <div className="flex justify-center gap-4">
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg" onClick={()=>nav('/login')}>Get Started</button>
        </div>
      </div>
    </div>
  )
}
