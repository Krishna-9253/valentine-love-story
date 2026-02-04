import QA from "../components/QA";

function LoveQA() {
  return (
    <>
      <audio autoPlay loop>
        <source src="/music/love.mp3" type="audio/mpeg" />
      </audio>
      <QA />
    </>
  );
}

export default LoveQA;
