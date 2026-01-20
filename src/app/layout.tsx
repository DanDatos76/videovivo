 import "./globals.css"
import "./styles/layout.css"
import Sidebar from "./components/Sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <div className="app-layout">
         {/*   <Sidebar /> Sidebar component for navigation */}
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
