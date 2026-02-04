import { useNavigate } from "react-router-dom";
import "../styles/cta.css";

function TestCTA() {
  const navigate = useNavigate();
  return (
    <section className="test-cta">
      <h2>Ready to take a test? 😏</h2>
      <p>Only one person can pass this.</p>
      <button onClick={() => navigate("/qa")}>
        Start Love Test ❤️
      </button>
    </section>
  );
}

export default TestCTA;
