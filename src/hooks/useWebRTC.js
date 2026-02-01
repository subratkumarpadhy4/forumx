import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Configuration
const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  // Add TURN servers here for production
  // { urls: 'turn:your-turn-server.com', username: 'user', credential: 'pass' }
];

// Generate unique user ID
const generateUserId = () => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useWebRTC = (roomId, userName, initialMuted = false) => {
  const [localStream, setLocalStream] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isMicActive, setIsMicActive] = useState(!initialMuted);
  const [connectionState, setConnectionState] = useState('disconnected');

  const socketRef = useRef(null);
  const peersRef = useRef({});
  const localStreamRef = useRef(null);
  const userIdRef = useRef(generateUserId());

  // Colors for participants
  const colors = ['#22c55e', '#ef4444', '#3b82f6', '#eab308', '#a855f7', '#ec4899', '#06b6d4'];

  // Initialize participants with current user
  useEffect(() => {
    setParticipants([{
      id: userIdRef.current,
      name: userName,
      status: 'idle',
      color: colors[0],
      avatar: 'https://i.pravatar.cc/150?img=6',
      isMe: true
    }]);
  }, [userName]);

  // Initialize microphone and WebRTC connection
  useEffect(() => {
    const initializeWebRTC = async () => {
      try {
        // Get local media stream
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

        localStreamRef.current = stream;
        setLocalStream(stream);

        // Mute if initially muted
        if (initialMuted) {
          stream.getAudioTracks()[0].enabled = false;
        }

        // Connect to signaling server
        connectToSignalingServer(stream);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Could not access microphone. Please check permissions.');
      }
    };

    initializeWebRTC();

    // Cleanup on unmount
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      Object.values(peersRef.current).forEach((peer) => peer.close());
    };
  }, [roomId, userName, initialMuted]);

  // Connect to signaling server
  const connectToSignalingServer = (stream) => {
    // TODO: Replace with your actual signaling server URL
    const SIGNALING_SERVER_URL = process.env.REACT_APP_SIGNALING_SERVER || 'ws://localhost:3001';
    
    socketRef.current = io(SIGNALING_SERVER_URL);

    socketRef.current.on('connect', () => {
      console.log('Connected to signaling server');
      setConnectionState('connected');

      // Join the room
      socketRef.current.emit('join-room', {
        roomId,
        userName,
        userId: userIdRef.current,
      });
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from signaling server');
      setConnectionState('disconnected');
    });

    // Handle existing participants in room
    socketRef.current.on('existing-participants', (existingUsers) => {
      console.log('Existing participants:', existingUsers);
      
      existingUsers.forEach((user, index) => {
        const participant = {
          id: user.userId,
          name: user.userName,
          status: 'idle',
          color: colors[(index + 1) % colors.length],
          avatar: `https://i.pravatar.cc/150?img=${(index + 2)}`,
          isMe: false
        };
        
        setParticipants((prev) => [...prev, participant]);
        createPeerConnection(user.userId, user.userName, stream, true);
      });
    });

    // Handle new user joining
    socketRef.current.on('user-joined', ({ userId, userName: newUserName }) => {
      console.log('User joined:', newUserName);
      
      setParticipants((prev) => {
        const newIndex = prev.length;
        const participant = {
          id: userId,
          name: newUserName,
          status: 'idle',
          color: colors[newIndex % colors.length],
          avatar: `https://i.pravatar.cc/150?img=${(newIndex + 1)}`,
          isMe: false
        };
        return [...prev, participant];
      });
      
      createPeerConnection(userId, newUserName, stream, false);
    });

    // Handle user leaving
    socketRef.current.on('user-left', ({ userId }) => {
      console.log('User left:', userId);
      
      if (peersRef.current[userId]) {
        peersRef.current[userId].close();
        delete peersRef.current[userId];
      }
      
      setParticipants((prev) => prev.filter((p) => p.id !== userId));
    });

    // Handle WebRTC signaling
    socketRef.current.on('offer', async ({ offer, from }) => {
      console.log('Received offer from:', from);
      const peer = peersRef.current[from];
      if (peer) {
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socketRef.current.emit('answer', { answer, to: from });
      }
    });

    socketRef.current.on('answer', async ({ answer, from }) => {
      console.log('Received answer from:', from);
      const peer = peersRef.current[from];
      if (peer) {
        await peer.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socketRef.current.on('ice-candidate', async ({ candidate, from }) => {
      const peer = peersRef.current[from];
      if (peer && candidate) {
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    // Handle user status updates (talking, queued, etc.)
    socketRef.current.on('user-status-update', ({ userId, status }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.id === userId ? { ...p, status } : p))
      );
    });
  };

  // Create peer connection
  const createPeerConnection = (remoteUserId, remoteUserName, stream, isInitiator) => {
    const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    // Add local stream tracks
    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    // Handle incoming remote stream
    peer.ontrack = (event) => {
      console.log('Received remote stream from:', remoteUserName);
      const remoteStream = event.streams[0];
      playRemoteAudio(remoteUserId, remoteStream);
    };

    // Handle ICE candidates
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('ice-candidate', {
          candidate: event.candidate,
          to: remoteUserId,
        });
      }
    };

    // Handle connection state changes
    peer.onconnectionstatechange = () => {
      console.log(`Connection state with ${remoteUserName}:`, peer.connectionState);
    };

    peersRef.current[remoteUserId] = peer;

    // If we're the initiator, create and send offer
    if (isInitiator) {
      createAndSendOffer(peer, remoteUserId);
    }
  };

  // Create and send offer
  const createAndSendOffer = async (peer, remoteUserId) => {
    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socketRef.current.emit('offer', { offer, to: remoteUserId });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  // Play remote audio
  const playRemoteAudio = (userId, stream) => {
    let audioElement = document.getElementById(`audio-${userId}`);
    
    if (!audioElement) {
      audioElement = document.createElement('audio');
      audioElement.id = `audio-${userId}`;
      audioElement.autoplay = true;
      document.body.appendChild(audioElement);
    }
    
    audioElement.srcObject = stream;
  };

  // Toggle mute
  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicActive(audioTrack.enabled);
      }
    }
  };

  // Update user status (talking, queued)
  const updateUserStatus = (status) => {
    if (socketRef.current) {
      socketRef.current.emit('update-status', { status });
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === userIdRef.current ? { ...p, status } : p
        )
      );
    }
  };

  return {
    localStream,
    participants,
    isMicActive,
    connectionState,
    toggleMute,
    updateUserStatus,
  };
};