import { WINNER_COMBOS } from "../constanst";

export const checkWinnerFrom = (boardToCheck) => {
    // revisamos todos las combinaciones ganadoras
    // para ver si x o o gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
        return boardToCheck[a];
    }
    // si no hay ganador
    return null;
  };

  export const checkEndWinner = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };
