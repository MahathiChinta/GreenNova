import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api'

export default function JobDetails(){
  const { id } = useParams()
  const [job,setJob] = useState(null)
  useEffect(()=>{ if(id) api.get(`/jobs/${id}`).then(r=>setJob(r.data.job)).catch(()=>{}) },[id])
  if(!job) return <div>Loading...</div>
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
      <p>Company: {job.company}</p>
      <p>Region: {job.region}</p>
      <p>Status: {job.status}</p>
      <p>Priority: {job.priority}</p>
    </div>
  )
}