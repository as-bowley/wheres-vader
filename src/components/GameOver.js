import React from "react";
import Scoreboard from "./Scoreboard";

const GameOver = ({ score, startGame }) => {
  return (
    <div className="gameOverScreen">
      <button onClick={startGame}>Try again!</button>
      <Scoreboard score={score} />
    </div>
  );
};

export default GameOver;
