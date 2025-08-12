import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs/my");

      setJobs(res.data.jobs || []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-medium mb-2">My Jobs</h3>
      {loading ? (
        <div>Loading...</div>
      ) : jobs.length === 0 ? (
        <div>No jobs found.</div>
      ) : (
        <table className="w-full text-left">
          <thead className="bg-emerald-50">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Region</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j._id} className="border-t">
                <td className="p-2">{j.title}</td>
                <td className="p-2">{j.region}</td>
                <td className="p-2">{j.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
