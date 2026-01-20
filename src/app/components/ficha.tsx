import React from "react";
import Header from "../components/Header";
import "../styles/ficha.css";

export default function Ficha({ onClose }: { onClose?: () => void }) {
  return (
    <div className="ficha-overlay">
      <div className="ficha-modal">
        <Header />

        <div className="ficha-header">
          <span className="back">← Nuevo Contacto</span>
          <span className="subtitle">Gestión de contactos y clientes</span>
        </div>

        <div className="ficha-content">
          {/* COLUMNA IZQUIERDA */}
          <div className="ficha-left">
            <div className="avatar">👤</div>

            <h3>Juan Pérez</h3>
            <span className="tag blue">CF</span>

            <div className="info">
              <span>📞 +54 9 11 2345-6789</span>
              <span>📷 Origen: Instagram</span>
              <span>👤 Vendedor: Juan</span>
              <span>
                Estado: <strong className="status idle">Idle</strong>
              </span>
            </div>

            <div className="labels">
              <span className="pill">Interesado CF</span>
              <span className="pill">Alta intención</span>
            </div>

            <button className="btn-primary full">Editar información</button>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="ficha-right">
            <h4>Historial Integrado</h4>

            <div className="timeline">
              <TimelineItem
                color="green"
                title="Conversación WhatsApp"
                desc="Cliente consultó por modelo CF 450 SR..."
                date="Hace 2 horas"
              />

              <TimelineItem
                color="orange"
                title="Servicio de Taller"
                desc="Servicio 1000km completado - Cambio de aceite y filtros"
                date="15 Mar 2024"
              />

              <TimelineItem
                color="blue"
                title="Mensaje Instagram"
                desc="Primer contacto - Interesado en modelos CF"
                date="10 Mar 2024"
              />

              <TimelineItem
                color="purple"
                title="Compra de Repuesto"
                desc="Filtro de aire, pastillas de freno - $15.000"
                date="5 Mar 2024"
              />
            </div>

            <div className="notes">
              <label>Notas internas</label>
              <textarea placeholder="Agregar notas internas..." />
              <button className="btn-success">Guardar Nota</button>
            </div>
          </div>
        </div>

        {onClose && (
          <button className="close" onClick={onClose}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

/* ======================
   SUBCOMPONENTES
   ====================== */

function TimelineItem({
  color,
  title,
  desc,
  date,
}: {
  color: "green" | "orange" | "blue" | "purple";
  title: string;
  desc: string;
  date: string;
}) {
  return (
    <div className={`timeline-item ${color}`}>
      <div className="line" />
      <div className="content">
        <div className="row">
          <strong>{title}</strong>
          <span className="date">{date}</span>
        </div>
        <p>{desc}</p>
      </div>
    </div>
  );
}
