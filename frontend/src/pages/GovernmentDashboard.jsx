// src/pages/GovernmentDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default function GovernmentDashboard() {
  const [summary, setSummary] = useState(null);
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    api.get('/government/summary')
      .then((r) => setSummary(r.data.summary))
      .catch(() => {});

    api.get('/grid-data')
      .then((r) => setGridData(r.data.gridData || []))
      .catch(() => {});
  }, []);

  // Build recent chart data from the last 24 entries
  const latest = gridData.slice(-24).map((g) => ({
    timestamp: g.timestamp,
    carbon: g.carbon_intensity
  }));

  const chartData = latest.map((item) => ({
    hour: new Date(item.timestamp).toLocaleString('default', { hour: '2-digit' }),
    carbon: item.carbon
  }));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Government Dashboard</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          Total Jobs
          <br />
          <div className="text-2xl font-bold">{summary?.totalJobs ?? '—'}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          Avg Carbon
          <br />
          <div className="text-2xl font-bold">
            {summary?.avgCarbon ?? '—'} gCO₂/kWh
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          Renewable % (Grid)
          <div className="text-2xl font-bold">{summary?.avgRenew ?? '—'}%</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-medium mb-2">Carbon Intensity (recent)</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="carbon"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
