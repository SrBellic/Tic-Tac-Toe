import { WINNER_COMBOS } from "../constants";
export const checkWinnerFrom = (boardToCheck) => {
  /*Se revisan las combinaciones para ver
    si x u o ganó */

  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;

    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }

  //si no hay ganador
  return null;
};

export const checkEndGame = (newBoard) => {
  //Se evalua si hay empate
  return newBoard.every((square) => square !== null);
};
