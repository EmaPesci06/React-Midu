import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constanst";
import { checkEndWinner, checkWinnerFrom } from "./logic/board";
import WinnerModal from "./components/WinnerModal";
import { saveGameToStorage } from "./logic/storage";

export default function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  // Null significa que no hay un ganador, false signfica que hay un empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };
  const updateBoard = (index) => {
    // No actualiza el tablero si ya tiene algo
    if (board[index] || winner) return;
    // Actualiza el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Guardar el turno por si se reseta la pagina
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndWinner(newBoard)) {
      setWinner(false); // Empate
    }
  };

  return (
    <main className="board">
      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}
