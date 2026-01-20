 "use client";

import React, { useState, useRef, useEffect } from 'react';
import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import '../styles/talleres.css';
import { Calendar, Clock, CheckCircle2, Video, PlayCircle, Camera, X, Radio } from 'lucide-react';

// --- CONFIGURACIÓN DE AGORA ---
const APP_ID = "abc48027b9684c29af68fb3377af80b5"; // Pega aquí tu App ID de Agora
const CHANNEL = "taller-online"; // Nombre del canal donde todos se conectan

export default function WorkshopDashboard() {
  const [isLive, setIsLive] = useState(false);
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [localTracks, setLocalTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(null);
  
  const videoRef = useRef<HTMLDivElement>(null);

  // 1. INICIAR TRANSMISIÓN EN VIVO
  const startStreaming = async () => {
    try {
      const agoraClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      agoraClient.setClientRole("host"); // El mecánico es el anfitrión
      
      await agoraClient.join(APP_ID, CHANNEL, null, null);

      // Crear pistas de audio y video
      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      
      setClient(agoraClient);
      setLocalTracks(tracks);
      setIsLive(true);

      // Publicar para que otros vean
      await agoraClient.publish(tracks);

      // Mostrar mi propia cámara en el div
      if (videoRef.current) {
        tracks[1].play(videoRef.current);
      }
    } catch (error) {
      console.error("Error al iniciar streaming:", error);
      alert("No se pudo iniciar la transmisión en vivo.");
    }
  };

  // 2. DETENER TRANSMISIÓN
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

  return (
    <div className="app-root">
      <main className="main">
        <section className="content">
          <h1>Talleres y Pos venta</h1>
          <div className="live-status-bar">
             <div className={`indicator ${isLive ? 'on' : 'off'}`} />
             <span>Sistema {isLive ? 'Transmitiendo en Vivo' : 'Offline'}</span>
          </div>

          {/* ... (Tus Estadísticas y Calendario se mantienen igual) ... */}

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

      {/* --- MODAL DE STREAMING --- */}
      {isLive && (
        <div className="camera-fullscreen">
          <div className="camera-modal-xl">
            <div className="camera-top-bar live">
              <div className="rec-status">
                <div className="dot-blink" /> <span> TRANSMITIENDO ONLINE </span>
              </div>
              <button className="btn-close-xl" onClick={stopStreaming}><X size={30} /></button>
            </div>

            {/* AQUÍ SE RENDERIZA EL VIDEO DE AGORA */}
            <div ref={videoRef} className="video-main-container agora-video" />

            <div className="camera-bottom-bar">
              <p className="viewer-info">El cliente/administrador puede verte ahora en tiempo real.</p>
              <button className="btn-main-rec stop" onClick={stopStreaming}>
                FINALIZAR TRANSMISIÓN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}