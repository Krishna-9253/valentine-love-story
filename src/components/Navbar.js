import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Our Story</Link>
        <Link to="/qa">Love Test 💌</Link>
      </div>

      {/* 🔓 Emoji Logout */}
      <span
        className="logout-emoji"
        onClick={onLogout}
        title="Logout"
      >
        🌙
      </span>
    </nav>
  );
}

export default Navbar;