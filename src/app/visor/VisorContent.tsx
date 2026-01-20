"use client";

import React, { useEffect, useState, useRef } from 'react';
import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import './visor.css';
import { Eye, Radio, ShieldCheck, LogOut, Activity } from 'lucide-react';

// --- CONFIGURACIÓN ---
const APP_ID = "abc48027b9684c29af68fb3377af80b5"; 
const CHANNEL = "taller-online";

export default function VisorContent() {
  const [isWatching, setIsWatching] = useState(false);
  const [hostActive, setHostActive] = useState(false);
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const subscribeUser = async (
    user: IAgoraRTCRemoteUser, 
    mediaType: "video" | "audio", 
    agoraClient: IAgoraRTCClient
  ) => {
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

      agoraClient.on("user-published", async (user, mediaType) => {
        if (mediaType === "video" || mediaType === "audio") {
          await subscribeUser(user, mediaType, agoraClient);
        }
      });

      agoraClient.on("user-unpublished", () => setHostActive(false));
      agoraClient.on("user-left", () => setHostActive(false));

      await agoraClient.join(APP_ID, CHANNEL, null, null);
      setClient(agoraClient);
      setIsWatching(true);

      if (agoraClient.remoteUsers.length > 0) {
        agoraClient.remoteUsers.forEach(user => {
          if (user.hasVideo) subscribeUser(user, "video", agoraClient);
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar al visor.");
    }
  };

  const stopWatching = async () => {
    if (client) await client.leave();
    setClient(null);
    setIsWatching(false);
    setHostActive(false);
  };

  useEffect(() => {
    return () => { if (client) client.leave(); };
  }, [client]);

  return (
    <div className="visor-root">
      <header className="visor-header">
        <div className="header-left">
          <ShieldCheck className="logo-icon" size={24} />
          <di
