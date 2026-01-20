 "use client";

import "./styles/login.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); // evita recargar la página
    router.push("/inicio"); // redirige a /inicio
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
            <input type="text" />

            <label>Contraseña</label>
            <input type="password" />

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
