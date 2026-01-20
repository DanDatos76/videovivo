 import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";
import {
  MessageCircle,
  CheckCircle,
  Clock,
  CalendarCheck
} from "lucide-react";




export default function DashboardPage() {
  return (
    <> 
       
      

      <section className="dashboard">
        

        {/* MÉTRICAS SUPERIORES */}
        <div className="dashboard-cards">
          <div className="card card-blue">
            <div className="card-icon">
              <MessageCircle />
            </div>
            <span className="card-label">Conversaciones <br></br> activas</span>
            <strong className="card-value">24 </strong> <p>en curso</p>
          </div>

          <div className="card card-green">
            <div className="card-icon">
              <CheckCircle />
            </div>
            <span className="card-label">Conversaciones  <br></br> cerradas</span>
            <strong className="card-value">312  </strong> <p>esta semana</p>
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
            <strong className="card-value">18 </strong> <p>programados</p>
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
