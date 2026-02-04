import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Our Story</Link>
      <Link to="/qa">Love Test 💌</Link>
    </nav>
  );
}

export default Navbar;
