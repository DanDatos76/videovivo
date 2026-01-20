 "use client";

import React, { useEffect, useState, useRef } from 'react';
// CORRECCIÓN: Se usa IAgoraRTCRemoteUser en lugar de IRemoteUser
import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import '../styles/visor.css';
import { Eye, Radio, ShieldCheck, LogOut, Activity } from 'lucide-react';

// --- REEMPLAZA CON TU APP ID REAL ---
const APP_ID = "abc48027b9684c29af68fb3377af80b5"; 
const CHANNEL = "taller-online";

export default function VisorPage() {
  const [isWatching, setIsWatching] = useState(false);
  const [hostActive, setHostActive] = useState(false);
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  // CORRECCIÓN: El tipo de dato del 'user' ahora es IAgoraRTCRemoteUser
  const subscribeUser = async (user: IAgoraRTCRemoteUser, mediaType: "video" | "audio", agoraClient: IAgoraRTCClient) => {
    await agoraClient.subscribe(user, mediaType);

    if (mediaType === "video") {
      setHostActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          user.videoTrack?.play(videoRef.current);
        }
      }, 500);
    }
    if (mediaType === "audio") {
      user.audioTrack?.play();
    }
  };

  const startWatching = async () => {
    try {
      const agoraClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      await agoraClient.setClientRole("audience");

      // Eventos de red
      agoraClient.on("user-published", (user, mediaType) => subscribeUser(user, mediaType, agoraClient));
      agoraClient.on("user-unpublished", () => setHostActive(false));
      agoraClient.on("user-left", () => setHostActive(false));

      await agoraClient.join(APP_ID, CHANNEL, null, null);
      setClient(agoraClient);
      setIsWatching(true);

      // Detectar si el mecánico ya estaba transmitiendo al entrar
      if (agoraClient.remoteUsers.length > 0) {
        const host = agoraClient.remoteUsers[0];
        if (host.hasVideo) {
          subscribeUser(host, "video", agoraClient);
        }
      }

    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar al servidor de video.");
    }
  };

  const stopWatching = async () => {
    if (client) {
      await client.leave();
    }
    setClient(null);
    setIsWatching(false);
    setHostActive(false);
  };

  useEffect(() => {
    return () => { 
      if (client) {
        client.leave();
      }
    };
  }, [client]);

  return (
    <div className="visor-root">
      <header className="visor-header">
        <div className="header-left">
          <ShieldCheck className="logo-icon" size={24} />
          <div>
            <h1>MoviStyles <span className="live-tag">LIVE</span></h1>
            <p>Monitoreo Técnico en Tiempo Real</p>
          </div>
        </div>
        <div className="header-right">
          <div className={`status-pill ${hostActive ? 'online' : 'offline'}`}>
            <Activity size={14} /> {hostActive ? "MECÁNICO EN VIVO" : "MECÁNICO OFFLINE"}
          </div>
        </div>
      </header>

      <main className="visor-main-content">
        {!isWatching ? (
          <div className="welcome-area">
            <div className="welcome-card">
              <Eye size={50} className="icon-eye" />
              <h2>Centro de Monitoreo</h2>
              <p>Conéctese para visualizar el progreso del servicio en el taller.</p>
              <button className="btn-connect-main" onClick={startWatching}>
                INGRESAR AL VISOR
              </button>
            </div>
          </div>
        ) : (
          <div className="stream-layout">
            <div className="video-area">
              {hostActive ? (
                <div ref={videoRef} className="agora-remote-player" />
              ) : (
                <div className="waiting-signal">
                  <Radio size={50} className="pulse-icon" />
                  <h3>Esperando señal del mecánico...</h3>
                  <p>La conexión es exitosa. El video aparecerá cuando el taller inicie la transmisión.</p>
                </div>
              )}
              
              {hostActive && (
                <div className="video-overlay-info">
                  <div className="red-dot" /> TRANSMITIENDO EN DIRECTO
                </div>
              )}
            </div>

            <aside className="details-sidebar">
              <div className="sidebar-top">
                <h3>Información del Servicio</h3>
                <div className="data-row">
                  <label>CLIENTE</label>
                  <span>Juan Pérez</span>
                </div>
                <div className="data-row">
                  <label>VEHÍCULO</label>
                  <span>CF 450 SR - Service</span>
                </div>
                <div className="data-row">
                  <label>UBICACIÓN</label>
                  <span>Box de Mecánica 1</span>
                </div>
              </div>
              <button className="btn-exit" onClick={stopWatching}>
                <LogOut size={18} /> Finalizar Sesión
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
