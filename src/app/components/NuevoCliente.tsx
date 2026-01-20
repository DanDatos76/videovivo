 "use client";

import { useState } from "react";
import { X } from "lucide-react";
import Ficha from "../components/ficha";
import "../styles/NuevoCliente.css";

interface NuevoClienteProps {
  open: boolean;
  onClose: () => void;
}

export default function NuevoCliente({ open, onClose }: NuevoClienteProps) {
  const [showFicha, setShowFicha] = useState(false);

  if (!open && !showFicha) return null;

  return (
    <>
      {/* MODAL NUEVO CLIENTE */}
      {open && (
        <div className="modal-overlay" onClick={onClose}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="modal-header">
              <div>
                <h2>Nuevo Contacto</h2>
                <p>Registra un nuevo cliente o lead en el sistema</p>
              </div>
              <button className="close-btn" onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body">
              <h4>Datos Básicos</h4>

              <div className="form-grid">
                <div>
                  <label>Nombre Completo *</label>
                  <input placeholder="Ej: Juan Pérez" />
                </div>
                <div>
                  <label>Teléfono *</label>
                  <input placeholder="+54 9 11 2345-6789" />
                </div>
                <div>
                  <label>Email</label>
                  <input placeholder="cliente@gmail.com" />
                </div>
                <div>
                  <label>Vendedor Asignado *</label>
                  <input />
                </div>
              </div>

              <h4>Marca y Origen</h4>

              <div className="brand-options">
                <button className="brand-btn active">CF</button>
                <button className="brand-btn">Zontes</button>
                <button className="brand-btn">Usados</button>
              </div>

              <div className="form-grid">
                <div>
                  <label>Origen del Lead *</label>
                  <input disabled value="Instagram (automático)" />
                </div>
                <div>
                  <label>Estado *</label>
                  <input />
                </div>
              </div>

              <h4>Etiquetas Adicionales</h4>
              <div className="tags-select">
                <span className="tag">Interesado CF</span>
                <span className="tag">Cliente Usado</span>
                <span className="tag">Alta intención</span>
                <span className="tag">Consulta precio</span>
              </div>

              <div className="info-box">
                Se agregará automáticamente la etiqueta <b>Instagram</b>
              </div>

              <h4>Notas Internas</h4>
              <textarea placeholder="Información interna..." />
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button className="btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  onClose();          // cerrás NuevoCliente
                  setShowFicha(true); // abrís Ficha
                }}
              >
                Crear Contacto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP FICHA */}
      {showFicha && (
        <Ficha
          onClose={() => {
            setShowFicha(false);
          }}
        />
      )}
    </>
  );
}
