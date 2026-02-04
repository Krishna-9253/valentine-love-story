import "../styles/modal.css";

function LoveModal({ show, type, message, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-bg">
      <div className={`modal ${type}`}>
        <div className="modal-emoji">
          {type === "love" ? "💖🥰" : "😤💢"}
        </div>

        <p>{message}</p>

        <button className="modal-btn" onClick={onClose}>
          OK 😌
        </button>
      </div>
    </div>
  );
}

export default LoveModal;
