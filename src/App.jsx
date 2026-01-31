import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ForumX from './components/ForumX.jsx';
import RoundTable from './components/RoundTable.jsx';
import Supervisor from './components/Supervisor.jsx';
import Auth from './components/Auth.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const currentUser = localStorage.getItem("currentUser");

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={currentUser ? <Navigate to="/" replace /> : <Auth />} 
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ForumX />
          </ProtectedRoute>
        }
      />

      <Route
        path="/table"
        element={
          <ProtectedRoute>
            <RoundTable />
          </ProtectedRoute>
        }
      />

      <Route
        path="/supervisor"
        element={
          <ProtectedRoute>
            <Supervisor />
          </ProtectedRoute>
        }
      />

      <Route 
        path="*" 
        element={<Navigate to={currentUser ? "/" : "/auth"} replace />} 
      />
    </Routes>
  );
}

export default App;