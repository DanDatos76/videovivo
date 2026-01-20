"use client";

import React, { useState, useRef, useEffect } from 'react';
import AgoraRTC, { 
  IAgoraRTCClient, 
  ICameraVideoTrack, 
  IMicrophoneAudioTrack, 
  IAgoraRTCRemoteUser 
} from "agora-rtc-sdk-ng";
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, User } from 'lucide-react';
import './../styles/llamada.css'; 

const APP_ID = "abc48027b9684c29af68fb3377af80b5"; // Asegúrate de que sea tu ID
const CHANNEL = "taller-online";

export default function LlamadaContent() {
  const [joined, setJoined] = useState(false);
  const [remoteUser, setRemoteUser] = useState<IAgoraRTCRemoteUser | null>(null);
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);

  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localTracksRef = useRef<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(null);
  
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  const joinCall = async () => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    clientRef.current = client;

    client.on("user-published", async (user, mediaType) => {
      // Filtro para evitar errores de datachannel en TS
      if (mediaType === "video" || mediaType === "audio") {
        await client.subscribe(user, mediaType);
        
        if (mediaType === "video") {
          setRemoteUser(user);
          setTimeout(() => {
            if (remoteVideoRef.current) {
              user.videoTrack?.play(remoteVideoRef.current);
            }
          }, 100);
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      }
    });

    client.on("user-left", () => {
      setRemoteUser(null);
    });

    try {
      await client.join(APP_ID, CHANNEL, null, null);
      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      localTracksRef.current = tracks;
      
      await client.publish(tracks);
      
      if (localVideoRef.current) {
        tracks[1].play(localVideoRef.current);
      }
      
      setJoined(true);
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo acceder a los dispositivos.");
    }
  };

  const leaveCall = async () => {
    localTracksRef.current?.forEach(track => {
      track.stop();
      track.close();
    });
    if (clientRef.current) {
      await clientRef.current.leave();
    }
    setJoined(false);
    setRemoteUser(null);
  };

  const toggleMic = () => {
    if (localTracksRef.current) {
      localTracksRef.current[0].setEnabled(!micActive);
      setMicActive(!micActive);
    }
  };

  const toggleVideo = () => {
    if (localTracksRef.current) {
      localTracksRef.current[1].setEnabled(!videoActive);
      setVideoActive(!videoActive);
    }
  };

  useEffect(() => {
    return () => {
      leaveCall();
    };
  }, []);

  return (
    <div className="call-container">
      {!joined ? (
        <div className="join-screen">
          <div className="join-card">
            <h1>MoviStyles Connect</h1>
            <p>Iniciar videollamada de soporte técnico</p>
            <button className="btn-join" onClick={joinCall}>
              <Phone size={20} /> ENTRAR A LA LLAMADA
            </button>
          </div>
        </div>
      ) : (
        <div className="active-call">
          <div className="remote-viewport">
            <div ref={remoteVideoRef} className="video-player-full" />
            {!remoteUser && (
              <div className="waiting-overlay">
                <div className="loader" />
                <p>Esperando a la otra parte...</p>
              </div>
            )}
          </div>

          <div className="local-miniature">
            <div ref={localVideoRef} className="video-player-mini" />
            {!videoActive && <div className="video-off-placeholder"><User size={40} /></div>}
            <span className="name-tag">Tú</span>
          </div>

          <div className="controls-bar">
            <button className={`control-btn ${!micActive ? 'off' : ''}`} onClick={toggleMic}>
              {micActive ? <Mic /> : <MicOff />}
            </button>
            <button className="control-btn hangup" onClick={leaveCall}>
              <PhoneOff />
            </button>
            <button className={`control-btn ${!videoActive ? 'off' : ''}`} onClick={toggleVideo}>
              {videoActive ? <Video /> : <VideoOff />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
