export const TURNS = {
  X: "❌",
  O: "⭕",
};

export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5], //Combos horizontales
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7], //Combos verticales
  [2, 5, 8],

  [0, 4, 8], //Combos diagonales
  [2, 4, 6],
];
