// Conversaciones.tsx
"use client";

import Header from "../components/Header";
import "../styles/conversaciones.css";
import { Search } from "lucide-react";

export default function Conversaciones() {
  return (
    <div className="conversaciones-page">
      <Header />

      <div className="conversaciones-container">
        {/* LISTADO */}
        <aside className="chat-list">
          <h3>Conversaciones</h3>
          <p className="subtitle">Gestión de contactos y clientes</p>

          <div className="search-box">
            <Search size={14} />
            <input placeholder="Buscar por nombre o teléfono..." />
          </div>

          <div className="filters">
            <select><option>Todos los canales</option></select>
            <select><option>Todos los estados</option></select>
          </div>

          <div className="chat-item active">
            <strong>Juan Pérez</strong>
            <span className="channel whatsapp">WhatsApp</span>
            <p>Me interesa la CF 450 SR</p>
            <span className="status open">abierto</span>
          </div>

          <div className="chat-item">
            <strong>María González</strong>
            <span className="channel instagram">Instagram</span>
            <p>¿Tienen financiación?</p>
            <span className="status open">abierto</span>
          </div>
           <div className="chat-item active">
            <strong>Juan Pérez</strong>
            <span className="channel whatsapp">WhatsApp</span>
            <p>Me interesa la CF 450 SR</p>
            <span className="status open">abierto</span>
          </div>
          <div className="chat-item">
            <strong>María González</strong>
            <span className="channel instagram">Instagram</span>
            <p>¿Tienen financiación?</p>
            <span className="status open">abierto</span>
          </div>
        </aside>

        {/* CHAT */}
        <section className="chat-window">
          <div className="chat-header">
            <div>
              <h4>Juan Pérez</h4>
              <span className="channel whatsapp">WhatsApp</span>
            </div>

            <div className="chat-actions">
              <button className="btn green">Tomar Conversación</button>
              <button className="btn blue">Cerrar Conversación</button>
            </div>
          </div>

          <div className="chat-messages">
            <div className="message client">
              <p>Hola! me interesa la CF 450 SR</p>
              <span>10:30</span>
            </div>

            <div className="message agent">
              <p>¡Hola! Gracias por contactarnos. ¿Podrías decirme tu nombre?</p>
              <span>10:30</span>
            </div>

            <div className="message client">
              <p>Me llamo Juan Pérez</p>
              <span>10:31</span>
            </div>

            <div className="message system">
              <p>
                ⚠️ La IA detectó una consulta compleja. Cliente solicitó información de precio y disponibilidad.
              </p>
              <button className="btn orange">Atender Cliente</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
