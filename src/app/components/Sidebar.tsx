 "use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Importamos useRouter
import "../styles/sidebar.css";

import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart3,
  Wrench,
  Plug,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Inicializamos el router

  const isActive = (path: string) => pathname === path;

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Si usas cookies o localStorage para el login, deberías borrarlos aquí
    // Ejemplo: localStorage.removeItem("token");
    
    router.push("/"); // Redirige a la página de inicio/login
  };

  return (
    <aside className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <LayoutDashboard className="icon" />
        <span className="title">Dashboard</span>
      </div>

      {/* MENU */}
      <nav className="sidebar-nav">
        <Link
          href="/inicio"
          className={`sidebar-item ${isActive("/inicio") ? "active" : ""}`}
        >
          <LayoutDashboard className="icon" />
          <span>Inicio</span>
        </Link>

         <Link
          href="/taller"
          className={`sidebar-item ${isActive("/taller") ? "active" : ""}`}
        >
          <Wrench className="icon" />
          <span>Emisor</span>
        </Link>

         <Link
          href="/llamada"
          className={`sidebar-item ${isActive("/taller") ? "active" : ""}`}
        >
          <Wrench className="icon" />
          <span>LLAMADA</span>
        </Link>



        <Link
          href="/visor"
          className={`sidebar-item ${isActive("/crm") ? "active" : ""}`}
        >
          <Users className="icon" />
          <span>Receptor</span>
        </Link>

        

       

        

         
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut className="icon" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}