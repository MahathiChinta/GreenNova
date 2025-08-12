import React, { useState } from 'react';
import api from '../utils/api';

export default function AddJob({ onAdded }) {
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('south');

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/jobs', { title, company: 'Example Company', region });
    setTitle('');
    onAdded && onAdded();
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-3">Add Job</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job title"
        className="w-full p-2 my-2 border rounded"
      />
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      >
        <option value="south">South</option>
        <option value="north">North</option>
        <option value="west">West</option>
        <option value="east">East</option>
      </select>
      <button className="bg-emerald-600 text-white px-3 py-1 rounded">
        Add
      </button>
    </form>
  );
}
