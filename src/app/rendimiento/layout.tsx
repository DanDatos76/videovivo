 import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/layout.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-layout">
      
      <Sidebar />
       

      <div className="app-main">
        <Header />
       
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
