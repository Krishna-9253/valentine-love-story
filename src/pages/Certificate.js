function Certificate() {
  const yesTime = localStorage.getItem("yesTime");

  return (
    <div className="certificate-page">
      <h1>💍 Certificate of Forever</h1>

      <p>
        This certifies that<br />
        <strong>You’re locked with me for every lifetime 😌💖</strong>
      </p>

      {yesTime && (
        <p className="time">
          Since<br />
          <strong>
            {new Date(yesTime).toLocaleString("en-IN", {
              dateStyle: "long",
              timeStyle: "short"
            })}
          </strong>
        </p>
      )}

      <div className="certificate-hint">
        📱 On mobile: Tap Share → Save to Files / Save as PDF  
        🖥 On desktop: Print → Save as PDF
      </div>
    </div>
  );
}

export default Certificate;
