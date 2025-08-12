import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  BarChart, Bar
} from 'recharts';

export default function GovernmentAnalytics() {
  const [jobs, setJobs] = useState([]);
  const [grid, setGrid] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const jobsRes = await api.get('/jobs');
      const gridRes = await api.get('/grid');
      setJobs(jobsRes.data.jobs || []);
      setGrid(gridRes.data.gridData || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(); // first load
    const interval = setInterval(loadData, 20000); // auto-refresh every 20 sec
    return () => clearInterval(interval); // cleanup
  }, []);

  // High carbon jobs (threshold > 200)
  const highCarbonJobs = jobs.filter(j =>
    (j.carbon_intensity || j.carbonIntensity || j.carbon || 0) > 200
  );

  // Carbon Intensity Over Time
  const carbonOverTime = jobs
    .filter(j =>
      j.carbon_intensity != null || j.carbonIntensity != null || j.carbon != null
    )
    .map(j => ({
      time: new Date(j.created_at || j.createdAt || Date.now())
        .toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
      carbon: j.carbon_intensity ?? j.carbonIntensity ?? j.carbon ?? 0,
    }));

  // Jobs by Region
  const jobsByRegion = Object.values(
    jobs.reduce((acc, j) => {
      const region = j.region || 'unknown';
      if (!acc[region]) acc[region] = { region, count: 0 };
      acc[region].count++;
      return acc;
    }, {})
  );

  // Average carbon per region
  const avgCarbonPerRegion = Object.values(
    jobs.reduce((acc, j) => {
      const region = j.region || 'unknown';
      const carbon = j.carbon_intensity ?? j.carbonIntensity ?? j.carbon ?? 0;
      if (!acc[region]) acc[region] = { region, total: 0, count: 0 };
      acc[region].total += carbon;
      acc[region].count++;
      return acc;
    }, {})
  ).map(r => ({
    region: r.region,
    avgCarbon: r.count ? Number((r.total / r.count).toFixed(1)) : 0
  }));

  // Renewable % trend
  const renewableTrend = grid
    .filter(g => g.renewable_percentage != null || g.renewablePercent != null || g.renewable != null)
    .map(g => ({
      time: new Date(g.timestamp)
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      renewable: g.renewable_percentage ?? g.renewablePercent ?? g.renewable ?? 0
    }));

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Government Analytics</h2>

      {loading ? <div>Loading...</div> : (
        <>
          {/* High Carbon Jobs */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">
              Jobs with High Carbon Intensity (&gt; 200 gCO₂/kWh)
            </h3>
            <ul className="list-disc list-inside">
              {highCarbonJobs.length === 0 && <li>No high carbon jobs found</li>}
              {highCarbonJobs.map(job => (
                <li key={job._id}>
                  {job.title} — {job.carbon_intensity ?? job.carbonIntensity ?? job.carbon} gCO₂/kWh
                </li>
              ))}
            </ul>
          </div>

          {/* Carbon Intensity Over Time */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Carbon Intensity Over Time</h3>
            <LineChart width={600} height={300} data={carbonOverTime}>
              <Line type="monotone" dataKey="carbon" stroke="#16a34a" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>

          {/* Jobs by Region */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Jobs by Region</h3>
            <BarChart width={600} height={300} data={jobsByRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0284c7" />
            </BarChart>
          </div>

          {/* Average Carbon per Region */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Average Carbon Intensity per Region</h3>
            <BarChart width={600} height={300} data={avgCarbonPerRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgCarbon" fill="#f97316" />
            </BarChart>
          </div>

          {/* Renewable % Trend */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Renewable Energy Percentage Over Time</h3>
            <LineChart width={600} height={300} data={renewableTrend}>
              <Line type="monotone" dataKey="renewable" stroke="#10b981" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>
        </>
      )}
    </div>
  );
}
