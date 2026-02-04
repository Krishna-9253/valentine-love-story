import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoveQA from "./pages/LoveQA";
import Navbar from "./components/Navbar";
import Certificate from "./pages/Certificate";

function App() {
  return (
    <div className="floating-bg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qa" element={<LoveQA />} />
        <Route path="/certificate" element={<Certificate />} />
      </Routes>
    </div>
  );
}

export default App;
