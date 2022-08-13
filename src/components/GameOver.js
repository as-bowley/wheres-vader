import React from "react";

const GameOver = ({ score, startGame }) => {
  return (
    <div className="gameOverScreen">
      <h2>Well done! Your time was {score} seconds!</h2>
      <button onClick={startGame}>Try again!</button>
    </div>
  );
};

export default GameOver;
