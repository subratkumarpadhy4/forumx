import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForumX.css';

const ForumX = () => {
  const navigate = useNavigate();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  // Generate a random room code
  const generateRoomCode = () => {
    return Math.floor(100 + Math.random() * 900).toString(); // Generates 3-digit code like 455
  };

  const handleCreateNewTable = () => {
    const newRoomCode = generateRoomCode();
    navigate(`/table/${newRoomCode}`);
  };

  const handleJoinTable = () => {
    if (joinCode.trim()) {
      // Navigate to the table with the join code
      navigate(`/table/${joinCode}`);
    } else {
      alert('Please enter a valid table code');
    }
  };

  return (
    <div className="forum-x-container">
      {/* Subtle Background Elements */}
      <div className="aurora-bg"></div>
      
      <div className="layout-container">
        {/* Header / Navigation */}
        <header className="header">
          <div className="header-left">
            <img src="/logo.png" alt="ForumX" className="header-logo" />
          </div>
          <div className="header-right">
            <button className="icon-button" onClick={() => alert('Help documentation coming soon!')}>
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <button className="icon-button" onClick={() => alert('Settings page coming soon!')}>
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="hero-section">
            <h1 className="hero-title">
              Start your next discussion
            </h1>
            <p className="hero-description">
             Create a room and bring your team in
            </p>
          </div>

          {/* Action Grid */}
          <div className="action-grid">
            {/* Join Table */}
            <div className="glass-card" onClick={() => setShowJoinModal(true)}>
              <div className="card-icon">
                <span className="material-symbols-outlined">radio_button_checked</span>
              </div>
              <h3 className="card-title">Join an Existing Table</h3>
              <p className="card-description">
                Enter a unique code to participate in a live, facilitated discussion.
              </p>
              <div className="card-action">
                <div className="action-button secondary">
                  Enter Code
                </div>
              </div>
            </div>

            {/* Create Table - FIXED: Now generates room code */}
            <div className="glass-card primary-card" onClick={handleCreateNewTable}>
              <div className="card-icon primary-icon">
                <span className="material-symbols-outlined">add_circle</span>
              </div> 
              <h3 className="card-title">Create a New Table</h3>
              <p className="card-description">
                Set up a new structured session, define your topics, and invite others.
              </p>
              <div className="card-action">
                <div className="action-button primary">
                  Start Session
                </div>
              </div>
            </div>

            {/* Supervisor View */}
            <div className="glass-card" onClick={() => navigate('/supervisor')}>
              <div className="card-icon">
                <span className="material-symbols-outlined">monitoring</span>
              </div>
              <h3 className="card-title">Enter Supervisor View</h3>
              <p className="card-description">
                Monitor ongoing discussions, manage settings, and extract insights.
              </p>
              <div className="card-action">
                <div className="action-button secondary">
                  Access Dashboard
                </div>
              </div>
            </div>
          </div>

          
         
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-links">
            <a href="#" className="footer-link">Documentation</a>
            <a href="#" className="footer-link">Security Protocols</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Privacy Policy</a>
          </div>
          <p className="footer-copyright">© 2024 ForumX Platform. Designed for deep discourse.</p>
        </footer>
      </div>

      {/* Join Code Modal */}
      {showJoinModal && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Join an Existing Table</h3>
            <p>Enter the table code to join the discussion</p>
            <input
              type="text"
              placeholder="Enter table code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoinTable()}
              autoFocus
            />
            <div className="modal-actions">
              <button onClick={() => setShowJoinModal(false)} className="modal-button secondary">
                Cancel
              </button>
              <button onClick={handleJoinTable} className="modal-button primary">
                Join Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumX;