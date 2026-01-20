 import React from 'react';
import Header from '../components/Header';
import '../styles/rendimiento.css';

export default function Rendimiento() {
  return (
    // Cambiamos app-root por rendimiento para que coincida con tu CSS
    <div className="rendimiento">
       
      <main className="main-section">
        <section className="content">
          <h1>Rendimiento</h1>
          <p className="subtitle">Gestión de contactos y clientes</p>
        </section>
      </main>
    </div>
  );
}