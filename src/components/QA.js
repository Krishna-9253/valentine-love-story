import { useState, useRef, useEffect } from "react";
import qa from "../data/qa";
import LoveModal from "./LoveModal";
import "../styles/qa.css";
import "../styles/certificate.css";

function QA() {
  // screen: "qa" | "proposal" | "celebration"
  const [screen, setScreen] = useState("qa");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [modal, setModal] = useState(null);
  const [yesTime, setYesTime] = useState(null);

  // 🔊 QA sound (play once)
  const qaAudio = useRef(null);
  const qaPlayed = useRef(false);

  /* ===============================
     INIT
  =============================== */
  useEffect(() => {
    qaAudio.current = new Audio("/sounds/qa.mp3");
    qaAudio.current.volume = 0.3;

    const alreadySaidYes = localStorage.getItem("saidYes");
    const storedTime = localStorage.getItem("yesTime");

    if (alreadySaidYes === "true") {
      setYesTime(storedTime);
      setScreen("celebration");
    }
  }, []);

  const playOnce = () => {
    if (!qaAudio.current || qaPlayed.current) return;
    qaAudio.current.play();
    qaPlayed.current = true;
  };

  /* ===============================
     ANSWER HANDLER
  =============================== */
  const handleAnswer = (optionIndex) => {
    playOnce();

    const question = qa[currentIndex];
    const isCorrect = optionIndex === question.correctIndex;

    if (isCorrect) setScore((prev) => prev + 1);

    setModal({
      type: isCorrect ? "love" : "angry",
      message: isCorrect ? question.loveMessage : question.angryMessage
    });
  };

  /* ===============================
     RESET QA (RETAKE)
  =============================== */
  const resetQA = () => {
    setCurrentIndex(0);
    setScore(0);
    setModal(null);
    qaPlayed.current = false;
    setScreen("qa");
  };

  const formatYesTime = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "short"
    });
  };

  return (
    <section className="qa">

      {/* ===============================
          QUESTIONS
      =============================== */}
      {screen === "qa" && (
        <>
          <p className="progress">
            Question {currentIndex + 1} of {qa.length}
          </p>

          <h2>💌 Love Test</h2>
          <p className="score">
            Score: {score} / {qa.length}
          </p>

          <div className="qa-card">
            <p className="question">{qa[currentIndex].q}</p>

            <div className="options">
              {qa[currentIndex].options.map((opt, i) => (
                <button
                  key={i}
                  className="option-btn"
                  onClick={() => handleAnswer(i)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ===============================
          PROPOSAL
      =============================== */}
      {screen === "proposal" && (
        <div className="proposal-glass">
          <h2>💍 One last thing…</h2>
          <p>Will you marry me, every lifetime?</p>

          <div className="proposal-actions">
            <button
              className="yes-btn"
              onClick={() => {
                const now = new Date();

                localStorage.setItem("saidYes", "true");
                localStorage.setItem("yesTime", now.toISOString());

                setYesTime(now.toISOString());
                setScreen("celebration");
              }}
            >
              YES ❤️
            </button>

            <button
              className="no-btn"
              onMouseEnter={(e) => {
                const x = Math.random() * 200 - 100;
                const y = Math.random() * 80 - 40;
                e.target.style.transform = `translate(${x}px, ${y}px)`;
              }}
            >
              NO 🙈
            </button>
          </div>
        </div>
      )}

      {/* ===============================
        CELEBRATION / CERTIFICATE
=============================== */}
{screen === "celebration" && (
  <div className="celebration-overlay">
    <div className="celebration-content">
  <h1 className="celebration-icon">💍💖</h1>

  <h2 className="celebration-title">
    Certificate of Forever
  </h2>

  <p className="celebration-text">
    This officially certifies that
    <br />
    <strong>You’re locked with me for every lifetime 😌💖</strong>
  </p>

  {/* SIGNATURES + STAMP */}
<div className="signature-section">
  <div className="signature">
    <span className="signature-name">Krishnapriya</span>
    <span className="signature-label">His Soul</span>
  </div>

  {/* STAMP IN THE MIDDLE */}
  <div className="destiny-stamp">
    Approved by Destiny
  </div>

  <div className="signature">
    <span className="signature-name">Adarsh</span>
    <span className="signature-label">Her Heart</span>
  </div>
</div>
  {yesTime && (
    <p className="yes-time-sub">
      Since
      <br />
      <strong>{formatYesTime(yesTime)}</strong>
    </p>
  )}

  <div className="certificate-hint">
    📸 Screenshot this page — proof of being officially taken forever 😏💍
  </div>

  <div className="celebration-actions">
    <button className="restart-btn" onClick={resetQA}>
      🔁 Take Love Test Again
    </button>
  </div>
</div>

    {/* floating hearts */}
    {[...Array(25)].map((_, i) => (
      <span key={i} className="heart">💖</span>
    ))}

    {/* celebration sound */}
    <audio autoPlay>
      <source src="/sounds/celebrate.mp3" type="audio/mpeg" />
    </audio>
  </div>
)}
      {/* ===============================
          MODAL
      =============================== */}
      {modal && (
        <LoveModal
          show={true}
          type={modal.type}
          message={modal.message}
          onClose={() => {
            setModal(null);

            if (currentIndex + 1 < qa.length) {
              setCurrentIndex((prev) => prev + 1);
            } else {
              setScreen("proposal");
            }
          }}
        />
      )}

    </section>
  );
}

export default QA;
