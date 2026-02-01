import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useWebRTC } from '../hooks/useWebRTC';
import './RoundTable.css';

const RoundTable = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from pre-join
  const userName = sessionStorage.getItem('prejoin_userName') || location.state?.userName;
  const initialMuted = sessionStorage.getItem('prejoin_isMuted') === 'true' || location.state?.isMuted || false;
  
  // Redirect if no pre-join data
  useEffect(() => {
    if (!userName || !location.state?.fromPreJoin) {
      navigate(`/table/${roomId}`);
    }
  }, [userName, roomId, navigate, location.state]);

  // WebRTC Hook
  const { 
    participants: webRTCParticipants, 
    localStream, 
    toggleMute: webRTCToggleMute,
    isMicActive 
  } = useWebRTC(roomId, userName, initialMuted);

  // CRITICAL: Ref to store the audio stream
  const localStreamRef = useRef(null);
  const audioContextRef = useRef(null);

  // Update the stream ref when localStream changes
  useEffect(() => {
    if (localStream) {
      localStreamRef.current = localStream;
      
      // Log detailed stream info
      const audioTracks = localStream.getAudioTracks();
      console.log('=== STREAM INITIALIZED ===');
      console.log('Stream ID:', localStream.id);
      console.log('Audio Tracks:', audioTracks.length);
      
      if (audioTracks.length > 0) {
        const track = audioTracks[0];
        console.log('Track Label:', track.label);
        console.log('Track Enabled:', track.enabled);
        console.log('Track Ready State:', track.readyState);
        console.log('Track Muted:', track.muted);
      }
      console.log('========================');
    }
  }, [localStream]);

  // Active tab state
  const [activeTab, setActiveTab] = useState('overview');

  // Participant state - start with only current user
  const [participants, setParticipants] = useState([]);

  // Initialize with current user
  useEffect(() => {
    if (userName && participants.length === 0) {
      setParticipants([
        { 
          id: 'me', 
          name: userName || 'You', 
          status: 'idle', 
          color: '#22c55e', 
          avatar: 'https://i.pravatar.cc/150?img=6',
          isMe: true
        }
      ]);
    }
  }, [userName]);

  // Merge WebRTC participants with local state
  useEffect(() => {
    if (webRTCParticipants && webRTCParticipants.length > 0) {
      setParticipants(prev => {
        const currentUser = prev.find(p => p.isMe);
        const otherParticipants = webRTCParticipants.filter(p => p.id !== 'me' && !p.isMe);
        return currentUser ? [currentUser, ...otherParticipants] : webRTCParticipants;
      });
    }
  }, [webRTCParticipants]);

  // User control states
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [isQueued, setIsQueued] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Audio level monitoring
  useEffect(() => {
    if (!localStream) return;

    let audioContext;
    let analyser;
    let microphone;
    let javascriptNode;
    
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(localStream);
      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      javascriptNode.onaudioprocess = function() {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const values = array.reduce((a, b) => a + b, 0);
        const average = values / array.length;
        setAudioLevel(Math.round(average));
      };
      
      audioContextRef.current = audioContext;
      console.log('Audio monitoring started');
    } catch (error) {
      console.error('Error setting up audio monitoring:', error);
    }

    return () => {
      if (javascriptNode) javascriptNode.disconnect();
      if (analyser) analyser.disconnect();
      if (microphone) microphone.disconnect();
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [localStream]);

  // Hub state
  const [isHubExpanded, setIsHubExpanded] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([
    { id: 1, author: 'Elena', text: 'Have we considered the impact on the EMEA region specifically?', time: '10:42 AM', avatar: 'https://i.pravatar.cc/150?img=2', color: 'purple', isMe: false },
    { id: 2, author: 'Me', text: 'Yes, Marcus is about to present the regional breakdown. Check the shared file.', time: '10:43 AM', avatar: 'https://i.pravatar.cc/150?img=6', color: 'primary', isMe: true },
    { id: 3, author: 'David', text: 'Shared the Q2 retro notes in the hub. Check sticky note 3.', time: '10:45 AM', avatar: 'https://i.pravatar.cc/150?img=3', color: 'blue', isMe: false }
  ]);
  
  const [message, setMessage] = useState('');

  // ==========================================
  // MICROPHONE CONTROL FUNCTIONS - SIMPLIFIED
  // ==========================================

  const toggleMute = () => {
    console.log('\n=== TOGGLE MUTE CLICKED ===');
    
    const stream = localStreamRef.current;
    if (!stream) {
      console.error('❌ No stream available');
      alert('Microphone not available. Please allow microphone access and refresh.');
      return;
    }

    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) {
      console.error('❌ No audio track found');
      return;
    }

    const newMutedState = !isMuted;
    audioTrack.enabled = !newMutedState;
    setIsMuted(newMutedState);

    console.log('New State:', newMutedState ? 'MUTED 🔇' : 'UNMUTED 🎤');
    console.log('Track Enabled:', audioTrack.enabled);
    console.log('===========================\n');
  };

  const toggleQueue = () => {
    console.log('\n=== TOGGLE QUEUE CLICKED ===');
    
    const newQueueState = !isQueued;
    setIsQueued(newQueueState);
    
    setParticipants(prev => 
      prev.map(p => 
        p.isMe 
          ? { ...p, status: newQueueState ? 'queued' : 'idle' }
          : p
      )
    );

    console.log('Queue State:', newQueueState ? 'IN QUEUE ✋' : 'NOT IN QUEUE ❌');
    console.log('============================\n');
  };

  const handlePushToTalk = (isPressed) => {
    console.log('\n=== PUSH TO TALK ===');
    console.log('Action:', isPressed ? 'PRESSED ⬇️' : 'RELEASED ⬆️');
    
    const stream = localStreamRef.current;
    if (!stream) {
      console.error('❌ No stream available');
      alert('Microphone not available. Please allow microphone access and refresh.');
      return;
    }

    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) {
      console.error('❌ No audio track found');
      return;
    }

    // Set talking state
    setIsTalking(isPressed);

    // Enable mic when pressed, disable when released (respecting mute state)
    if (isPressed) {
      audioTrack.enabled = true; // Always enable when pressing
      console.log('🟢 MIC ENABLED - Speaking...');
    } else {
      audioTrack.enabled = !isMuted; // Respect mute state when released
      console.log('🔴 MIC STATE:', audioTrack.enabled ? 'ENABLED' : 'DISABLED');
    }

    // Update participant status
    setParticipants(prev => 
      prev.map(p => 
        p.isMe 
          ? { ...p, status: isPressed ? 'talking' : (isQueued ? 'queued' : 'idle') }
          : p
      )
    );

    console.log('Track Enabled:', audioTrack.enabled);
    console.log('====================\n');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      if (e.code === 'Space' && !isTalking) {
        e.preventDefault();
        handlePushToTalk(true);
      }
      
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      }
      
      if (e.key === 'q' || e.key === 'Q') {
        e.preventDefault();
        toggleQueue();
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.code === 'Space' && isTalking) {
        e.preventDefault();
        handlePushToTalk(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isTalking, isMuted, isQueued]);

  // Generate circle segments dynamically
  const generateSegments = () => {
    const numParticipants = participants.length;
    if (numParticipants === 0) return [];
    
    const segmentAngle = 360 / numParticipants;
    
    return participants.map((participant, index) => {
      const startAngle = index * segmentAngle - 90;
      const endAngle = startAngle + segmentAngle;
      
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = 50 + 50 * Math.cos(startRad);
      const y1 = 50 + 50 * Math.sin(startRad);
      const x2 = 50 + 50 * Math.cos(endRad);
      const y2 = 50 + 50 * Math.sin(endRad);
      
      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
      
      let pathData;
      if (numParticipants === 1) {
        pathData = `M 50,0 A 50,50 0 0,1 50,100 A 50,50 0 0,1 50,0 Z`;
      } else {
        pathData = `M 50,50 L ${x1},${y1} A 50,50 0 ${largeArcFlag},1 ${x2},${y2} Z`;
      }
      
      let fillOpacity = 0.5;
      let strokeWidth = 2;
      let strokeOpacity = 0.8;
      let className = '';
      
      if (participant.status === 'talking') {
        fillOpacity = 0.7;
        strokeWidth = 3;
        strokeOpacity = 1;
        className = 'segment-talking';
      } else if (participant.status === 'queued') {
        fillOpacity = 0.4;
        strokeWidth = 2;
        strokeOpacity = 0.9;
      }
      
      return {
        pathData,
        fill: participant.color,
        fillOpacity,
        stroke: participant.color,
        strokeWidth,
        strokeOpacity,
        className
      };
    });
  };

  // Generate label positions
  const generateLabelPositions = () => {
    const numParticipants = participants.length;
    const segmentAngle = 360 / numParticipants;
    
    return participants.map((participant, index) => {
      const angle = (index * segmentAngle - 90 + segmentAngle / 2) * (Math.PI / 180);
      const distance = 35;
      
      const x = 50 + distance * Math.cos(angle);
      const y = 50 + distance * Math.sin(angle);
      
      return {
        participant,
        style: {
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)'
        }
      };
    });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        author: 'Me',
        text: message,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        avatar: 'https://i.pravatar.cc/150?img=6',
        color: 'primary',
        isMe: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const segments = generateSegments();
  const labelPositions = generateLabelPositions();

  return (
    <div className="round-table-container">
      <div className="layout-wrapper">
        {/* Top Navigation */}
        <header className="top-header">
          <div className="header-left">
            <img src="/logo.png" alt="ForumX" className="header-logo" />
            <div>
              <p className="room-info">Round Table • Room {roomId}</p>
              <p className="user-name-info">{userName}</p>
            </div>
          </div>
          <div className="header-center">
            <div className="room-code-container">
              <span className="room-code-label">Share Code:</span>
              <span className="room-code">{roomId}</span>
              <button 
                className="copy-code-btn"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/table/${roomId}`);
                  alert('Room link copied to clipboard!');
                }}
              >
                <span className="material-symbols-outlined">content_copy</span>
              </button>
            </div>
          </div>
          <div className="header-right">
            <div className="nav-links">
              <a 
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </a>
              <a 
                className={`nav-link ${activeTab === 'files' ? 'active' : ''}`}
                onClick={() => setActiveTab('files')}
              >
                Files
              </a>
              <a 
                className={`nav-link ${activeTab === 'participants' ? 'active' : ''}`}
                onClick={() => setActiveTab('participants')}
              >
                Participants ({participants.length})
              </a>
            </div>
            <div className="header-actions">
              <button className="icon-btn" onClick={() => alert('Settings coming soon!')}>
                <span className="material-symbols-outlined">settings</span>
              </button>
              <button className="icon-btn" onClick={() => alert('No new notifications')}>
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="avatar-circle">
                <img 
                  className="avatar-img" 
                  alt="User avatar" 
                  src="https://i.pravatar.cc/150?img=6"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="main-container">
          <div className="content-area">
            <div className="round-table">
              <svg className="table-svg" viewBox="0 0 100 100">
                {segments.map((segment, index) => (
                  <path
                    key={index}
                    d={segment.pathData}
                    fill={segment.fill}
                    fillOpacity={segment.fillOpacity}
                    stroke={segment.stroke}
                    strokeWidth={segment.strokeWidth}
                    strokeOpacity={segment.strokeOpacity}
                    className={segment.className}
                  />
                ))}
              </svg>

              <div className="participants-overlay">
                {labelPositions.map(({ participant, style }) => (
                  <div 
                    key={participant.id} 
                    className={`participant-label ${participant.status === 'talking' ? 'talking' : ''}`}
                    style={style}
                  >
                    {participant.name.toUpperCase()}
                    {participant.status === 'talking' && ' (TALKING)'}
                    {participant.status === 'queued' && ' (QUEUED)'}
                  </div>
                ))}
              </div>

              <div className="inner-ring"></div>

              <div 
                className={`shared-hub ${isHubExpanded ? 'expanded' : ''}`}
                onClick={() => setIsHubExpanded(!isHubExpanded)}
              >
                <div className="hub-header">
                  <span className="hub-title">Shared Hub</span>
                  <span className="material-symbols-outlined hub-pin">
                    {isHubExpanded ? 'close_fullscreen' : 'open_in_full'}
                  </span>
                </div>

                <div className="hub-content">
                  <div className="sticky-note yellow rotate-1">
                    Q3 Revenue targets up by 15%
                  </div>
                  <div className="sticky-note blue rotate-minus-2">
                    New hiring freeze in Dev
                  </div>
                  <div className="file-item">
                    <span className="material-symbols-outlined file-icon">description</span>
                    <div className="file-info">
                      <p className="file-name">Project_Brief.pdf</p>
                      <p className="file-meta">2.4 MB • Updated 5m ago</p>
                    </div>
                  </div>
                  <div className="sticky-note purple rotate-1 full-width">
                    Feedback due by Friday EOD
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM CONTROLS - SMALLER & FUNCTIONAL */}
            <div className="bottom-controls">
              {/* MUTE BUTTON */}
              <button 
                className="control-group" 
                onClick={toggleMute}
                title="Toggle mute (M)"
              >
                <div className="control-icon">
                  <span className="material-symbols-outlined">
                    {isMuted ? 'mic_off' : 'mic'}
                  </span>
                </div>
                <span className="control-label">{isMuted ? 'Muted' : 'Unmuted'}</span>
              </button>
              
              {/* PUSH TO TALK BUTTON */}
              <button 
                className={`push-to-talk-btn ${isTalking ? 'active' : ''} ${isMuted ? 'muted-mode' : ''}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handlePushToTalk(true);
                }}
                onMouseUp={(e) => {
                  e.preventDefault();
                  handlePushToTalk(false);
                }}
                onMouseLeave={(e) => {
                  e.preventDefault();
                  if (isTalking) handlePushToTalk(false);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handlePushToTalk(true);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handlePushToTalk(false);
                }}
                title="Hold to talk (Space)"
                style={{
                  boxShadow: isTalking && audioLevel > 20 
                    ? `0 6px 30px rgba(34, 197, 94, ${0.5 + audioLevel / 200}), 0 0 ${30 + audioLevel / 2}px rgba(34, 197, 94, ${0.3 + audioLevel / 300})`
                    : undefined
                }}
              >
                <span className="material-symbols-outlined filled">podcasts</span>
                <span className="button-text">
                  {isTalking ? (
                    <span className="talking-indicator">
                      Talking
                      {audioLevel > 10 && (
                        <span className="audio-bars">
                          <span className={`bar ${audioLevel > 10 ? 'active' : ''}`}></span>
                          <span className={`bar ${audioLevel > 30 ? 'active' : ''}`}></span>
                          <span className={`bar ${audioLevel > 50 ? 'active' : ''}`}></span>
                        </span>
                      )}
                    </span>
                  ) : 'Push To Talk'}
                </span>
              </button>
              
              {/* QUEUE BUTTON */}
              <button 
                className="control-group reverse" 
                onClick={toggleQueue}
                title="Toggle queue (Q)"
              >
                <span className="control-label">{isQueued ? 'In Queue' : 'Queue'}</span>
                <div className="control-icon">
                  <span className="material-symbols-outlined">
                    {isQueued ? 'check_circle' : 'front_hand'}
                  </span>
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
              {messages.map((msg) => (
                <div key={msg.id} className={`message-wrapper ${msg.isMe ? 'right' : ''}`}>
                  <div className={`message-container ${msg.isMe ? 'right' : 'left'}`}>
                    <div className={`message-avatar ${msg.isMe ? 'primary' : ''}`}>
                      <img className="avatar-img" alt={`Avatar of ${msg.author}`} src={msg.avatar} />
                    </div>
                    <div className={`message-bubble ${msg.isMe ? 'me' : ''}`}>
                      <p className={`message-author ${msg.color}`}>{msg.author}</p>
                      <p className="message-text">{msg.text}</p>
                    </div>
                  </div>
                  <span className={`message-time ${msg.isMe ? 'right' : 'left'}`}>{msg.time}</span>
                </div>
              ))}
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