import React, { useState } from 'react'
import api from '../utils/api'

export default function Settings(){
  const [res,setRes] = useState(null)
  const test = async ()=>{ try{ const r = await api.get('/grid-data'); setRes(r.data) }catch(e){ setRes({error:true}) } }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="bg-white p-6 rounded shadow">
        <button onClick={test} className="bg-emerald-600 text-white px-3 py-2 rounded">Test Grid API</button>
        {res && <pre className="mt-4 bg-emerald-50 p-3 rounded">{JSON.stringify(res, null, 2)}</pre>}
      </div>
    </div>
  )
}