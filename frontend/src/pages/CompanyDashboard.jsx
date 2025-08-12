import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import AgentAssistant from "../components/AgentAssistant";
import AddJob from "./AddJob";

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    const res = await api.get('/jobs').catch(() => ({ data: { jobs: [] } }));
    setJobs(res.data.jobs || []);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Company Dashboard</h2>
      <AddJob onAdded={loadJobs} />
      <AgentAssistant />
    </div>
  );
}
