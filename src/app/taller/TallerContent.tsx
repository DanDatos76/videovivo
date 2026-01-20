"use client";

import React, { useState, useRef, useEffect } from 'react';
import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import '../styles/talleres.css';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Video, 
  PlayCircle,
  X,
  Radio,
  Activity
} from 'lucide-react';

// --- CONFIGURACIÓN ---
const APP_ID = "7769e7f1d44040a9829871578332155c"; 
const CHANNEL = "taller-online";

export default function TallerContent() {
  const [isLive, setIsLive] = useState(false);
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [localTracks, setLocalTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(null);
  
  const videoRef = useRef<HTMLDivElement>(null);

  const startStreaming = async () => {
    try {
      const agoraClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      await agoraClient.setClientRole("host");
      
      await agoraClient.join(APP_ID, CHANNEL, null, null);

      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      
      setClient(agoraClient);
      setLocalTracks(tracks);
      setIsLive(true);

      await agoraClient.publish(tracks);

      if (videoRef.current) {
        tracks[1].play(videoRef.current);
      }
    } catch (error) {
      console.error("Error al iniciar streaming:", error);
      alert("No se pudo iniciar la transmisión.");
    }
  };

  const stopStreaming = async () => {
    if (localTracks) {
      localTracks[0].stop();
      localTracks[0].close();
      localTracks[1].stop();
      localTracks[1].close();
    }
    if (client) {
      await client.leave();
    }
    setClient(null);
    setLocalTracks(null);
    setIsLive(false);
  };

  useEffect(() => {
    return () => {
      if (client) client.leave();
      if (localTracks) {
        localTracks[0].close();
        localTracks[1].close();
      }
    };
  }, [client, localTracks]);

  return (
    <div className="app-root">
      <main className="main">
        <section className="content">
          <h1>Talleres y Pos venta</h1>
          <div className="live-status-bar">
             <div className={`indicator ${isLive ? 'on' : 'off'}`} />
             <span>Sistema {isLive ? 'Transmitiendo en Vivo' : 'Offline'}</span>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-bg blue"><Calendar size={18} /></div>
              <div><p className="stat-label">Turnos Hoy</p><p className="stat-val">3</p></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-bg orange"><Clock size={18} /></div>
              <div><p className="stat-label">En Proceso</p><p className="stat-val">2</p></div>
            </div>
          </div>

          <div className="section-block">
            <h2 className="block-title">Servicios en Proceso</h2>
            <div className="service-card-ui">
              <div className="info">
                <h3>Juan Pérez</h3>
                <p>CF 450 SR | Transmisión Online</p>
              </div>
              <div className="actions">
                <button className={`btn-live ${isLive ? 'active' : ''}`} onClick={isLive ? stopStreaming : startStreaming}>
                  <Radio size={18} /> {isLive ? 'Detener En Vivo' : 'Transmitir En Vivo'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {isLive && (
        <div className="camera-fullscreen">
          <div className="camera-modal-xl">
            <div className="camera-top-bar live">
              <div className="rec-status">
                <div className="dot-blink" /> <span> TRANSMITIENDO ONLINE </span>
              </div>
              <button className="btn-close-xl" onClick={stopStreaming}><X size={30} /></button>
            </div>
            <div ref={videoRef} className="video-main-container agora-video" />
            <div className="camera-bottom-bar">
              <button className="btn-main-rec stop" onClick={stopStreaming}>FINALIZAR TRANSMISIÓN</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
