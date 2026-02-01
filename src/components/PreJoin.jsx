import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PreJoin.css';

export default function PreJoin() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  const [userName, setUserName] = useState(currentUser?.name || '');
  const [isMuted, setIsMuted] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    requestMediaPermission();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const requestMediaPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      streamRef.current = stream;
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }
      setHasPermission(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setIsLoading(false);
      alert('Microphone access is required to join the meeting');
    }
  };

  const handleJoin = () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }
    
    if (!hasPermission) {
      alert('Please allow microphone access');
      return;
    }
    
    // Store join settings
    sessionStorage.setItem('prejoin_userName', userName);
    sessionStorage.setItem('prejoin_isMuted', isMuted);
    sessionStorage.setItem('prejoin_hasStream', 'true');
    
    // Navigate to actual room
    navigate(`/room/${roomId}`, {
      state: { 
        userName, 
        isMuted,
        fromPreJoin: true
      }
    });
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  return (
    <div className="pre-join-container">
      <div className="pre-join-card">
        <div className="pre-join-header">
          <img src="/logo.png" alt="ForumX" className="prejoin-logo" />
          <h2>Room {roomId}</h2>
        </div>

        <div className="audio-preview">
          <audio ref={audioRef} autoPlay muted />
          <div className={`mic-indicator ${hasPermission ? 'active' : ''}`}>
            {isLoading ? (
              <span>⏳ Requesting microphone access...</span>
            ) : hasPermission ? (
              <span>🎤 Microphone ready</span>
            ) : (
              <span>❌ Microphone access denied</span>
            )}
          </div>
        </div>

        <div className="pre-join-form">
          <div className="input-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
              disabled={isLoading}
            />
          </div>

          <div className="controls-group">
            <button 
              className={`control-btn ${isMuted ? 'muted' : ''}`}
              onClick={toggleMute}
              disabled={!hasPermission}
            >
              {isMuted ? '🔇 Muted' : '🔊 Unmuted'}
            </button>
          </div>

          <button 
            className="join-btn"
            onClick={handleJoin}
            disabled={isLoading || !hasPermission || !userName.trim()}
          >
            {isLoading ? 'Loading...' : 'Join Meeting'}
          </button>
        </div>

        {!hasPermission && !isLoading && (
          <div className="permission-help">
            <p>To join the meeting, please allow microphone access in your browser settings</p>
            <button onClick={requestMediaPermission}>Retry Permission Request</button>
          </div>
        )}
      </div>
    </div>
  );
}