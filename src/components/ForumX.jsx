import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ForumX.css';

const ForumX = () => {
  const navigate = useNavigate();
  return (
    <div className="forum-x-container">
      {/* Subtle Background Elements */}
      <div className="aurora-bg"></div>
      
      <div className="layout-container">
        {/* Header / Navigation */}
        <header className="header">
          <div className="header-left">
            <div className="logo">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_543)">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_543">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="brand-name">ForumX</h2>
          </div>
          <div className="header-right">
            <button className="icon-button">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <button className="icon-button">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="hero-section">
            <h1 className="hero-title">
              Welcome to the Table.
            </h1>
            <p className="hero-description">
              Select your entry point to start a structured, distraction-free discussion session.
            </p>
          </div>

          {/* Action Grid */}
          <div className="action-grid">
            {/* Join Table */}
            <div className="glass-card">
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

            {/* Create Table */}
            <div className="glass-card primary-card" onClick={() => navigate('/table')}>
              <div className="recommended-badge">
                <span>Recommended</span>
              </div>
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

          {/* Visualization Hint */}
          <div className="platform-overview">
            <div className="section-divider">
              <div className="divider-line"></div>
              <span className="divider-text">Platform Overview</span>
              <div className="divider-line"></div>
            </div>
            <div className="visualization-container">
              <div className="visualization-content">
                <div className="circle-outer"></div>
                <div className="circle-middle"></div>
                <div className="circle-center"></div>
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
    </div>
  );
};

export default ForumX;
