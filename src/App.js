import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import LoveQA from "./pages/LoveQA";
import Navbar from "./components/Navbar";
import Certificate from "./pages/Certificate";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem("valentineUnlocked");
    if (unlocked === "true") setIsLoggedIn(true);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("valentineUnlocked", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("valentineUnlocked");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="floating-bg">
     <Navbar onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qa" element={<LoveQA />} />
        <Route path="/certificate" element={<Certificate />} />
      </Routes>
    </div>
  );
}

export default App;