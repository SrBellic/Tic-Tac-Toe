import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/Winner";

export function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board"); //guardar el tablero
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  }); //Tablero de juego vacío

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn"); //guardar el turno
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null); //null es que no hay ganador, false es un empate

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem("board"); //guardar el borrado del tablero
    window.localStorage.removeItem("turn"); //guardar el borrado del turno
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return; //Evita la sobreescritura. El return no devuelve nada

    //actualizar tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //Guardar partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
    //revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      setWinner((prevWinner) => {
        confetti();
        return newWinner;
      });
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //Empante
    }
  };

  return (
    <main className="board">
      <h1>La vieja</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {/*renderización del tablero*/}
              {square} {/* Renderización de lo que se juega */}
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
