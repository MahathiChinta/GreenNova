import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ role }) {
  return (
    <aside className="w-64 bg-emerald-900 text-white p-6">
      <div className="mb-8">
        <div className="text-2xl">🌱 GreenNova</div>
        <div className="text-xs text-white/80">Carbon-aware scheduling</div>
      </div>
      <nav className="flex flex-col gap-2">
        {/* Government */}
        {role === 'government' && (
          <>
            <NavLink
              to="/government"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${isActive ? 'bg-white/10' : ''}`
              }
            >
              Dashboard
            </NavLink>
            {/* Analytics temporarily removed */}
            {/*
            <NavLink
              to="/government-analytics"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${isActive ? 'bg-white/10' : ''}`
              }
            >
              Analytics
            </NavLink>
            */}
          </>
        )}

        {/* Company */}
        {role === 'company' && (
          <>
            <NavLink
              to="/company"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${isActive ? 'bg-white/10' : ''}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/company-jobs"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${isActive ? 'bg-white/10' : ''}`
              }
            >
              My Jobs
            </NavLink>
          </>
        )}

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${isActive ? 'bg-white/10' : ''}`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
