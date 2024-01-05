import { Square } from "./Square";

export default function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const WinnerText = winner === false ? "Empate" : "Gano";
  return (
    <section className="winner">
      <div className="text">
        <h2>{WinnerText}</h2>

        <header className="win">
          {winner && <Square className="win">{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
