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

      <div className="content-area">
        <Header />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
