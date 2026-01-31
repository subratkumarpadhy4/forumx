import React, { useState } from 'react';
import './RoundTable.css';

const RoundTable = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="round-table-container">
      <div className="layout-wrapper">
        {/* Top Navigation */}
        <header className="top-header">
          <div className="header-left">
            <div className="logo-icon">
              <svg className="logo-svg" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              </svg>
            </div>
            <div>
              <h2 className="brand-title">ForumX</h2>
              <p className="room-info">Round Table • Room 402</p>
            </div>
          </div>
          <div className="header-right">
            <div className="nav-links">
              <a className="nav-link active" href="#">Overview</a>
              <a className="nav-link" href="#">Files</a>
              <a className="nav-link" href="#">Participants</a>
            </div>
            <div className="header-actions">
              <button className="icon-btn">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="avatar-circle">
                <img 
                  className="avatar-img" 
                  alt="User avatar of the moderator" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBqnrkf3mB1uUW21yzaAkzz-dssI-oCXLK8_pTEz7ezjysbefvv-Aq0RjfICeWyunT3u6w64HreDN-g8SS-EWIihuO7oYD2R6ZeWxrE6ywg0U5SQeZlge4Q6at73euXED2nNVflTgd0_eaOUkXZeYnEDtJkwBdiPYA7QhkhO62tMjjgSiFgq70JTGJRQDwvCIRthfSU3UTUdmjBFltlRLaY4NGVbkIWiQsWFLrADI2LXEbKnYZ8A-dv4xQFkWhVlbPEgNcpKLOOhE"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="main-container">
          {/* Main Content Area */}
          <div className="content-area">
            {/* Title Overlay */}
            <div className="title-overlay">
              <h1 className="discussion-title">Q3 Strategy Discussion</h1>
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span className="status-text">Live • 12 Members active</span>
              </div>
            </div>

            {/* THE ROUND TABLE */}
            <div className="round-table">
              {/* SVG Ring Segments */}
              <svg className="table-svg" viewBox="0 0 100 100">
                {/* Segment 1: Red */}
                <path 
                  d="M 50,50 L 50,0 A 50,50 0 0,1 97.5,34.5 Z" 
                  fill="rgba(239, 68, 68, 0.15)" 
                  stroke="rgba(239, 68, 68, 0.5)" 
                  strokeWidth="0.5"
                />
                {/* Segment 2: Purple */}
                <path 
                  d="M 50,50 L 97.5,34.5 A 50,50 0 0,1 80,90 Z" 
                  fill="rgba(168, 85, 247, 0.15)" 
                  stroke="rgba(168, 85, 247, 0.5)" 
                  strokeWidth="0.5"
                />
                {/* Segment 3: Blue (Queued) */}
                <path 
                  className="segment-queued" 
                  d="M 50,50 L 80,90 A 50,50 0 0,1 20,90 Z" 
                  fill="rgba(59, 130, 246, 0.25)" 
                  stroke="#3b82f6" 
                  strokeWidth="1"
                />
                {/* Segment 4: Yellow */}
                <path 
                  d="M 50,50 L 20,90 A 50,50 0 0,1 2.5,34.5 Z" 
                  fill="rgba(234, 179, 8, 0.15)" 
                  stroke="rgba(234, 179, 8, 0.5)" 
                  strokeWidth="0.5"
                />
                {/* Segment 5: Green (Talking) */}
                <path 
                  className="segment-talking" 
                  d="M 50,50 L 2.5,34.5 A 50,50 0 0,1 50,0 Z" 
                  fill="rgba(34, 197, 94, 0.4)" 
                  stroke="#22c55e" 
                  strokeWidth="1.5"
                />
              </svg>

              {/* Participant Labels */}
              <div className="participants-overlay">
                <div className="participant-label label-top">Marcus (Talking)</div>
                <div className="participant-label label-right">Elena</div>
                <div className="participant-label label-bottom-right">David</div>
                <div className="participant-label label-bottom-left">Sarah</div>
                <div className="participant-label label-left">Alex (Queued)</div>
              </div>

              {/* Inner Ring Cutout */}
              <div className="inner-ring"></div>

              {/* Floating Glassmorphic Hub */}
              <div className="shared-hub">
                <div className="hub-header">
                  <span className="hub-title">Shared Hub</span>
                  <span className="material-symbols-outlined hub-pin">push_pin</span>
                </div>

                {/* Mini Content Grid */}
                <div className="hub-content">
                  {/* Sticky Note 1 */}
                  <div className="sticky-note yellow rotate-1">
                    Q3 Revenue targets up by 15%
                  </div>
                  {/* Sticky Note 2 */}
                  <div className="sticky-note blue rotate-minus-2">
                    New hiring freeze in Dev
                  </div>
                  {/* File Icon */}
                  <div className="file-item">
                    <span className="material-symbols-outlined file-icon">description</span>
                    <div className="file-info">
                      <p className="file-name">Project_Brief.pdf</p>
                      <p className="file-meta">2.4 MB • Updated 5m ago</p>
                    </div>
                  </div>
                  {/* Sticky Note 3 */}
                  <div className="sticky-note purple rotate-1 full-width">
                    Feedback due by Friday EOD
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM CONTROLS */}
            <div className="bottom-controls">
              <button className="control-group">
                <div className="control-icon">
                  <span className="material-symbols-outlined">mic_off</span>
                </div>
                <span className="control-label">Muted</span>
              </button>
              
              <button className="push-to-talk-btn">
                <span className="material-symbols-outlined filled">podcasts</span>
                Push To Talk
              </button>
              
              <button className="control-group reverse">
                <span className="control-label">Queued</span>
                <div className="control-icon">
                  <span className="material-symbols-outlined">front_hand</span>
                </div>
              </button>
            </div>
          </div>

          {/* CHAT PANEL */}
          <aside className="chat-panel">
            <div className="chat-header">
              <h3 className="chat-title">Discussion Chat</h3>
              <div className="recording-badge">
                <span className="recording-dot"></span>
                Recording
              </div>
            </div>

            <div className="chat-messages">
              {/* Message 1 */}
              <div className="message-wrapper">
                <div className="message-container left">
                  <div className="message-avatar">
                    <img 
                      className="avatar-img" 
                      alt="Avatar of Elena" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRVlBaapkd-_jWlbMYYMEM7g0Sh_0FJQQssUDdj4ueug7sewOmmTlQS804WIY_Nv49tpV81EufOl7KAPTHSbYdEeWps1IpfZXS1Cg5Qh0kXKv_4qD0ckHkLrWUVmqqukgzy2zZ3OpJT7g8RzfTdhhgkLdF9FSRedpAiKz_RqgEZcAYISuisi9wlXF6pH2ICVDXRo0Qr-bPqjNWlpBbJgOMhoGaC--f9pooxN6KxHCz3R8EZlClLzUiRT3Je2IURuHtLv7j_3nUuag"
                    />
                  </div>
                  <div className="message-bubble">
                    <p className="message-author purple">Elena</p>
                    <p className="message-text">Have we considered the impact on the EMEA region specifically?</p>
                  </div>
                </div>
                <span className="message-time left">10:42 AM</span>
              </div>

              {/* Message 2 */}
              <div className="message-wrapper right">
                <div className="message-container right">
                  <div className="message-avatar primary">
                    <img 
                      className="avatar-img" 
                      alt="Avatar of the Moderator" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU5ntCiyPaX-Ans7UGE0Q5ot3K_uziBTnySTjJwLYJBetCwnWUtwNmXm2uRtMhwhJhnWnyKMKdw-amZY73bexZGDT2Byoh1dfhXYjBVjzZEW4SIznwOaQgB0sJzCGo0ALZZ0AQ2GdPUiWc3-wtAKtTFfL44nXT1P4XJS5oJ7KDQdFSTlZEXN3AdvzquMwiXubNiey04Bi18jwUnKK1lGle-krszCP5b8eSF2sIB9cFlSuVPeAlsfRseN8zOAep64icNm66B7ep3uc"
                    />
                  </div>
                  <div className="message-bubble me">
                    <p className="message-author primary">Me</p>
                    <p className="message-text">Yes, Marcus is about to present the regional breakdown. Check the shared file.</p>
                  </div>
                </div>
                <span className="message-time right">10:43 AM</span>
              </div>

              {/* Message 3 */}
              <div className="message-wrapper">
                <div className="message-container left">
                  <div className="message-avatar">
                    <img 
                      className="avatar-img" 
                      alt="Avatar of David" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmZkJ3_vWfSLfX91K3_mMQcALPoxD-ktJK8GuBx8TmgH5wT7i_ltvIwKRmihXfDYX_fyXbeJuDl2uffizJH1G5lJcO5FTNcgdL5zwChMlJQ4f2tfxVLM0VOu3jiuCOifYfRi79GusHgMZBwHvBXxkEj_qx7nxxZAXLj5UbOgBKFYZ8O-o0VZVfLQnE4B5nWqa44cpryc1yurjKhXjMvI39Mio5OBAi-n7oaJYyeVYSii5aCS-ag9p-QA33-TWVspogNTH185hYF4I"
                    />
                  </div>
                  <div className="message-bubble">
                    <p className="message-author blue">David</p>
                    <p className="message-text">Shared the Q2 retro notes in the hub. Check sticky note 3.</p>
                  </div>
                </div>
                <span className="message-time left">10:45 AM</span>
              </div>
            </div>

            <div className="chat-input-container">
              <div className="input-wrapper">
                <input 
                  className="chat-input" 
                  placeholder="Type a message..." 
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="send-button" onClick={handleSendMessage}>
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default RoundTable;
