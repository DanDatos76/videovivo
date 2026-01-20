import "./../styles/header.css";
import { UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      {/* LEFT */}
      <div className="header-left">
        <div className="header-logo">
          ⬤
        </div>
        <span className="header-title">MoviStyles</span>
      </div>

      {/* RIGHT */}
      <div className="header-right">
        <UserCircle className="header-icon" />
        <span className="header-user">Usuario Admin</span>
      </div>
    </header>
  );
}
