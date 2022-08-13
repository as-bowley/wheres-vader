import React from "react";

const StartScreen = ({ startGame }) => {
  return (
    <div className="startScreen">
      <div className="gameDetails">
        <h1>Where's Vader?</h1>
        <p>Find Darth Vader, Yoda and C-3PO as fast as you can.</p>
        <button onClick={startGame}>Start!</button>
      </div>
    </div>
  );
};

export default StartScreen;
