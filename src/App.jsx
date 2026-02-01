import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ForumX from './components/ForumX.jsx';
import RoundTable from './components/RoundTable.jsx';
import PreJoin from './components/PreJoin.jsx';
import Supervisor from './components/Supervisor.jsx';
import Auth from './components/Auth.jsx';
import ProtectedRoute from './components/Protectedroute.jsx';

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

      {/* Pre-join page - user lands here first when clicking join link or start session */}
      <Route
        path="/table/:roomId"
        element={
          <ProtectedRoute>
            <PreJoin />
          </ProtectedRoute>
        }
      />

      {/* Actual round table meeting room - accessed after pre-join */}
      <Route
        path="/room/:roomId"
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