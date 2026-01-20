 import Header from "./components/Header";
import "./styles/dashboard.css";
import {
  MessageCircle,
  CheckCircle,
  Clock,
  CalendarCheck
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Header />

      <section className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* MÉTRICAS SUPERIORES */}
        <div className="dashboard-cards">
          <div className="card card-blue">
            <div className="card-icon">
              <MessageCircle />
            </div>
            <span className="card-label">Conversaciones activas</span>
            <strong className="card-value">24</strong>
          </div>

          <div className="card card-green">
            <div className="card-icon">
              <CheckCircle />
            </div>
            <span className="card-label">Conversaciones cerradas</span>
            <strong className="card-value">312</strong>
          </div>

          <div className="card card-orange">
            <div className="card-icon">
              <Clock />
            </div>
            <span className="card-label">Tiempo promedio</span>
            <strong className="card-value">6m 42s</strong>
          </div>

          <div className="card card-purple">
            <div className="card-icon">
              <CalendarCheck />
            </div>
            <span className="card-label">Turnos del día</span>
            <strong className="card-value">18</strong>
          </div>
        </div>

        {/* SECCIÓN INFERIOR */}
        <div className="dashboard-bottom">

          {/* GRÁFICO 1 */}
          <div className="panel">
            <h2 className="panel-title">Conversaciones por día</h2>
            <div className="chart-placeholder">
              Gráfico de líneas
            </div>
          </div>

          {/* GRÁFICO 2 */}
          <div className="panel">
            <h2 className="panel-title">Turnos por estado</h2>
            <div className="chart-placeholder">
              Gráfico de barras
            </div>
          </div>

          {/* ACTIVIDAD RECIENTE */}
          <div className="panel panel-full">
            <h2 className="panel-title">Actividad reciente</h2>
            <ul className="activity-feed">
              <li>🟢 Nueva conversación iniciada</li>
              <li>✅ Conversación cerrada por operador</li>
              <li>📅 Nuevo turno asignado</li>
              <li>⏱ Tiempo promedio actualizado</li>
              <li>🔧 Caso enviado a postventa</li>
            </ul>
          </div>

        </div>
      </section>
    </>
  );
}
