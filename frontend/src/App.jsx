import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import CompanyDashboard from './pages/CompanyDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';
// import GovernmentAnalytics from './pages/GovernmentAnalytics'; // temporarily disabled
import JobDetails from './pages/JobDetails';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import CompanyJobs from './pages/CompanyJobs';

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('greennova_user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function handleLogin(userObj) {
    setUser(userObj);
    localStorage.setItem('greennova_user', JSON.stringify(userObj));
    if (userObj.role === 'government') navigate('/government');
    else navigate('/company');
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('greennova_user');
    localStorage.removeItem('greennova_token');
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      <Route element={<ProtectedRoute user={user} />}>
        {/* Company */}
        <Route
          path="/company"
          element={
            <DashboardLayout user={user} onLogout={handleLogout}>
              <CompanyDashboard user={user} />
            </DashboardLayout>
          }
        />
        <Route
          path="/company-jobs"
          element={
            <DashboardLayout user={user} onLogout={handleLogout}>
              <CompanyJobs />
            </DashboardLayout>
          }
        />

        {/* Government */}
        <Route
          path="/government"
          element={
            <DashboardLayout user={user} onLogout={handleLogout}>
              <GovernmentDashboard user={user} />
            </DashboardLayout>
          }
        />
        {/* Removed analytics for now */}
        {/*
        <Route
          path="/government-analytics"
          element={
            <DashboardLayout user={user} onLogout={handleLogout}>
              <GovernmentAnalytics />
            </DashboardLayout>
          }
        />
        */}

        {/* Common */}
        <Route
          path="/jobs/:id"
          element={
            <DashboardLayout user={user} onLogout={handleLogout}>
              <JobDetails />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout user={user} onLogout={handleLogout}>
              <Settings />
            </DashboardLayout>
          }
        />
      </Route>

      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
