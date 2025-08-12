import React, { useState } from 'react'
import api from '../utils/api'

export default function Login({ onLogin }){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState('')

  async function submit(e){
    e.preventDefault(); setErr('')
    try{
      const res = await api.post('/auth/login',{ email, password })
      const { user, token } = res.data
      localStorage.setItem('greennova_token', token)
      onLogin(user)
    }catch(err){ setErr(err.response?.data?.error || 'Login failed') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <label className="block mb-2">Email</label>
        <input className="w-full mb-3 p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="block mb-2">Password</label>
        <input type="password" className="w-full mb-4 p-2 border rounded" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="flex justify-between items-center">
          <button className="bg-emerald-600 text-white px-4 py-2 rounded">Sign in</button>
          <div className="text-sm text-gray-500">Use gov@greennova.com / gov123 or company@greennova.com / company123</div>
        </div>
      </form>
    </div>
  )
}
