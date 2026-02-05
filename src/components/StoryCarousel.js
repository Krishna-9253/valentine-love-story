import { useState, useRef, useEffect } from "react";
import story from "../data/story";
import { useNavigate } from "react-router-dom";
import "../styles/story.css";

function StoryCarousel() {
  const [index, setIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const startX = useRef(null);
  const navigate = useNavigate();

  // 🔊 audio instance + played flag
  const swipeAudio = useRef(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    swipeAudio.current = new Audio("/sounds/swipe.mp3");
    swipeAudio.current.volume = 0.25;
  }, []);

  const playOnce = () => {
    if (!swipeAudio.current || hasPlayed.current) return;

    swipeAudio.current.play();
    hasPlayed.current = true;
  };

  const isLast = index === story.length - 1;

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!startX.current) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    // Swipe LEFT → Next
    if (diff > 60 && index < story.length - 1) {
      playOnce();
      setIndex(index + 1);
    }

    // Swipe RIGHT → Previous + Hearts 💖
    if (diff < -60 && index > 0) {
      playOnce();
      setShowHearts(true);
      setIndex(index - 1);
      setTimeout(() => setShowHearts(false), 700);
    }

    startX.current = null;
  };

  return (
    <section className="story-carousel">
      <div
        className="story-card"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {showHearts && (
          <div className="heart-burst">
            <span>💖</span>
            <span>💗</span>
            <span>💞</span>
            <span>💕</span>
            <span>💘</span>
          </div>
        )}

        <img src={story[index].image} alt={story[index].title} />
        <h2>{story[index].title}</h2>
        <p>{story[index].text}</p>

        <div className="story-controls">
          {index > 0 && (
            <button
              className="secondary"
              onClick={() => {
                playOnce();
                setShowHearts(true);
                setIndex(index - 1);
                setTimeout(() => setShowHearts(false), 700);
              }}
            >
              ← Back
            </button>
          )}

          {!isLast ? (
            <button
              onClick={() => {
                playOnce();
                setIndex(index + 1);
              }}
            >
              Next →
            </button>
          ) : (
            <button onClick={() => navigate("/qa")}>
              Ready for the Love Test 💌
            </button>
          )}
        </div>

        {/* <p className="story-progress">
          {index + 1} / {story.length}
        </p> */}

        <p className="swipe-hint">← Swipe →</p>
      </div>
    </section>
  );
}

export default StoryCarousel;
