/* eslint-disable */
import React, { useState } from 'react';
import './Supervisor.css';

const Supervisor = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="supervisor-container">
      <div className="layout-grid">
        {/* SideNavBar */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <div className="sidebar-top">
              <div className="brand-section">
                <div className="brand-icon">
                  <span className="material-symbols-outlined filled">grid_view</span>
                </div>
                <div className="brand-text">
                  <h1 className="brand-title">ForumX</h1>
                  <p className="brand-subtitle">Supervisor Hub</p>
                </div>
              </div>

              <nav className="nav-menu">
                <div className="nav-item active">
                  <span className="material-symbols-outlined">dashboard</span>
                  <p className="nav-label">Observability</p>
                </div>
                <div className="nav-item">
                  <span className="material-symbols-outlined">groups</span>
                  <p className="nav-label">Team Directory</p>
                </div>
                <div className="nav-item">
                  <span className="material-symbols-outlined">analytics</span>
                  <p className="nav-label">Historical Data</p>
                </div>
                <div className="nav-item">
                  <span className="material-symbols-outlined">notifications</span>
                  <p className="nav-label">Alert Logs</p>
                  <span className="nav-badge">12</span>
                </div>
              </nav>

              <div className="notifications-section">
                <p className="section-title">Priority Notifications</p>
                <div className="notifications-list">
                  <div className="notification-card primary">
                    <p className="notification-title">Team Gamma</p>
                    <p className="notification-text">Consensus reached on &quot;Q3 Goals&quot;</p>
                  </div>
                  <div className="notification-card warning">
                    <p className="notification-title">Team Delta</p>
                    <p className="notification-text">Moderator assistance requested</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-bottom">
              <div className="bottom-item">
                <span className="material-symbols-outlined">settings</span>
                <p className="bottom-label">System Settings</p>
              </div>
              <div className="bottom-item danger">
                <span className="material-symbols-outlined">logout</span>
                <p className="bottom-label">Exit Session</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {/* TopNavBar */}
          <header className="top-header">
            <div className="header-left-section">
              <h2 className="page-title">Supervisor Overview</h2>
              <div className="divider"></div>
              <div className="live-status">
                <span className="status-dot"></span>
                <span className="status-label">Live System Feed</span>
              </div>
            </div>

            <div className="header-right-section">
              <div className="search-container">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                  className="search-input"
                  placeholder="Search teams or users..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="filter-button">
                <span className="material-symbols-outlined">tune</span>
              </button>
              <div className="profile-section">
                <div className="profile-info">
                  <p className="profile-name">Alex Rivera</p>
                  <p className="profile-role">Lead Supervisor</p>
                </div>
                <img
                  className="profile-avatar"
                  alt="User profile avatar of Alex Rivera"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXCFHigz_Bh4w-V1MD9a-GzuEIA7rvvkX3flGNiGuR1ER52MRTPTm8fKiO_E-y6ZuS_2lP23KrBOPUa_9-9ZTAybrdXax-W9T47O__NaSJXT_-XiJ0NZo6LrcGRy-PrDMVSZDuh-xevzRK11zGDUIsnax5JKEBGfKzVj99NDZOv0GXNzuYa4OevwxaDdSKD2g_tI0RHT6D2Yqj_dxt7qq5wyj6RA0k_X7qAXv5jKmNcLmQ1Dgu6Hk-k5H_NlNwIrAvEM5EvWrri-E"
                />
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="scrollable-content">
            {/* Stats Row */}
            <div className="stats-grid">
              <div className="stat-card">
                <p className="stat-label">Total Active Users</p>
                <div className="stat-value-row">
                  <span className="stat-number">1,248</span>
                  <span className="stat-change positive">+12%</span>
                </div>
              </div>
              <div className="stat-card">
                <p className="stat-label">Live Discussions</p>
                <div className="stat-value-row">
                  <span className="stat-number">24</span>
                  <span className="stat-change positive">+3%</span>
                </div>
              </div>
              <div className="stat-card">
                <p className="stat-label">Avg. Consensus Time</p>
                <div className="stat-value-row">
                  <span className="stat-number">18m</span>
                  <span className="stat-change negative">-5%</span>
                </div>
              </div>
              <div className="stat-card">
                <p className="stat-label">Priority Alerts</p>
                <div className="stat-value-row">
                  <span className="stat-number">2</span>
                  <span className="stat-change warning">Pending</span>
                </div>
              </div>
            </div>

            {/* Active Tables Section */}
            <div className="section-header">
              <h3 className="section-title-large">Active Discussion Tables</h3>
              <button className="view-all-button">
                <span>View All</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            {/* Team Cards Grid */}
            <div className="team-grid">
              {/* Team Table Card 1 */}
              <div className="team-card">
                <div className="card-header">
                  <div>
                    <h4 className="card-title">Design Ops - Alpha</h4>
                    <p className="card-subtitle">Q3 Branding Discussion</p>
                  </div>
                  <div className="participant-count">
                    <span className="material-symbols-outlined">person</span>
                    <span className="count-text">12/12</span>
                  </div>
                </div>

                <div className="table-visual">
                  <div className="table-ring">
                    <div className="table-core">
                      <span className="core-text">CORE</span>
                    </div>
                    <div className="active-segment"></div>
                    <div className="marker marker-active marker-bottom"></div>
                    <div className="marker marker-right"></div>
                    <div className="marker marker-top"></div>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="status-text active">
                    <span className="status-indicator"></span> Active Discussion
                  </span>
                  <span className="elapsed-time">Elapsed: 22m</span>
                </div>

                <div className="card-overlay">
                  <p className="overlay-title">Ongoing Design Review</p>
                  <button className="overlay-button">
                    <span className="material-symbols-outlined">visibility</span> Peek Into Table
                  </button>
                </div>
              </div>

              {/* Team Table Card 2 */}
              <div className="team-card">
                <div className="card-header">
                  <div>
                    <h4 className="card-title">Engineering - Beta</h4>
                    <p className="card-subtitle">Sprint Backlog Review</p>
                  </div>
                  <div className="participant-count">
                    <span className="material-symbols-outlined">person</span>
                    <span className="count-text">5/8</span>
                  </div>
                </div>

                <div className="table-visual">
                  <div className="table-ring">
                    <div className="table-core">
                      <span className="core-text">CORE</span>
                    </div>
                    <div className="progress-segment"></div>
                    <div className="marker marker-progress marker-bottom"></div>
                    <div className="marker marker-inactive marker-left"></div>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="status-text stable">
                    <span className="status-indicator"></span> Stable Flow
                  </span>
                  <span className="elapsed-time">Elapsed: 15m</span>
                </div>

                <div className="card-overlay">
                  <p className="overlay-title">Engineering Sync</p>
                  <button className="overlay-button">
                    <span className="material-symbols-outlined">visibility</span> Peek Into Table
                  </button>
                </div>
              </div>

              {/* Team Table Card 3 - Critical */}
              <div className="team-card critical">
                <div className="card-header">
                  <div>
                    <div className="title-with-warning">
                      <h4 className="card-title danger">Team Delta</h4>
                      <span className="material-symbols-outlined warning-icon">warning</span>
                    </div>
                    <p className="card-subtitle">Incident Retrospective</p>
                  </div>
                  <div className="participant-count danger">
                    <span className="material-symbols-outlined">person</span>
                    <span className="count-text">10/10</span>
                  </div>
                </div>

                <div className="table-visual">
                  <div className="table-ring critical-ring">
                    <div className="table-core critical-core">
                      <span className="core-text danger">HELP</span>
                    </div>
                    <div className="critical-border"></div>
                    <div className="marker marker-critical marker-top"></div>
                    <div className="marker marker-critical marker-bottom"></div>
                    <div className="marker marker-critical marker-left"></div>
                    <div className="marker marker-critical marker-right"></div>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="status-text critical">
                    <span className="status-indicator ping"></span> Critical Support
                  </span>
                  <span className="elapsed-time">Elapsed: 08m</span>
                </div>

                <div className="card-overlay critical-overlay">
                  <p className="overlay-title">Support Required</p>
                  <button className="overlay-button danger">
                    <span className="material-symbols-outlined">support_agent</span> Join as Moderator
                  </button>
                </div>
              </div>

              {/* Team Card 4 - Simple */}
              <div className="team-card">
                <div className="card-header">
                  <div>
                    <h4 className="card-title">Marketing - Gamma</h4>
                    <p className="card-subtitle">Brand Strategy</p>
                  </div>
                  <div className="participant-count">
                    <span className="material-symbols-outlined">person</span>
                    <span className="count-text">4/6</span>
                  </div>
                </div>

                <div className="simple-visual">
                  <div className="waiting-indicator">
                    <span className="material-symbols-outlined">hourglass_empty</span>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="status-text waiting">Waiting for consensus</span>
                </div>

                <div className="card-overlay">
                  <button className="overlay-button">
                    <span className="material-symbols-outlined">visibility</span> Peek
                  </button>
                </div>
              </div>

              {/* Team Card 5 - Simple */}
              <div className="team-card">
                <div className="card-header">
                  <div>
                    <h4 className="card-title">UX Research</h4>
                    <p className="card-subtitle">Usability Interviews</p>
                  </div>
                  <div className="participant-count">
                    <span className="material-symbols-outlined">person</span>
                    <span className="count-text">2/2</span>
                  </div>
                </div>

                <div className="simple-visual">
                  <div className="in-session-indicator">
                    <div className="session-inner">
                      <span className="material-symbols-outlined">record_voice_over</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="status-text in-session">In Session</span>
                </div>

                <div className="card-overlay">
                  <button className="overlay-button">
                    <span className="material-symbols-outlined">visibility</span> Peek
                  </button>
                </div>
              </div>

              {/* Add Table Placeholder */}
              <div className="add-table-card">
                <div className="add-icon">
                  <span className="material-symbols-outlined">add</span>
                </div>
                <div className="add-text">
                  <p className="add-title">Start New Session</p>
                  <p className="add-subtitle">Manual Override</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Supervisor;
