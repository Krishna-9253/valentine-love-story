function Certificate() {
  const yesTime = localStorage.getItem("yesTime");

  return (
    <section className="certificate">
      <div className="certificate-card">
        <h1 className="cert-title">Certificate of Forever</h1>

        <p className="cert-text">
          This certifies that
          <br />
          <strong>You’re locked with me for every lifetime 😌💖</strong>
        </p>

        <div className="cert-names">
          You & Me
        </div>

        {yesTime && (
          <p className="cert-date">
            Since
            <br />
            <strong>
              {new Date(yesTime).toLocaleString("en-IN", {
                dateStyle: "long",
                timeStyle: "short"
              })}
            </strong>
          </p>
        )}

        <div className="cert-footer">
          “Forever isn’t long enough with you.”
        </div>

        <button className="download-btn" onClick={() => window.print()}>
          💾 Save Certificate
        </button>

        <div className="certificate-hint">
          📱 Mobile: Share → Save as PDF<br />
          🖥 Desktop: Print → Save as PDF
        </div>
      </div>
    </section>
  );
}

export default Certificate;