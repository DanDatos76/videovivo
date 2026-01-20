 "use client";

import React from "react"; // 1. Importación necesaria
import { useRouter } from "next/navigation";
import "./styles/login.css"; // Ajusta esta ruta si tu CSS está en otro lado

export default function Login() {
  const router = useRouter();

  // 2. CORRECCIÓN CLAVE: Se agrega ": React.FormEvent"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    router.push("/inicio"); 
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-left">
          <img
            src="/logo.png"
            alt="Login Illustration"
            className="login-illustration"
          />
          <p className="login-description">
            La vida con una moto
            Conducir es una pasión y te sientes libre del Mundo.
          </p>
        </div>

        <div className="login-right">
          <span className="welcome">Bienvenido</span>
          <h2>Ingresar a su Cuenta</h2>

          <form onSubmit={handleSubmit}>
            <label>Usuario</label>
            <input type="text" required />

            <label>Contraseña</label>
            <input type="password" required />

            <button type="submit">Iniciar sesión</button>
          </form>

          <a href="#" className="forgot">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
}
