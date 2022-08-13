import React from "react";

const CharSelector = ({ handleGuess, location }) => {
  return (
    <div
      className="charselector"
      style={{ top: location.y - 2, left: location.x - 15 }}
    >
      <button onClick={() => handleGuess("vader")}>Vader</button>
      <button onClick={() => handleGuess("yoda")}>Yoda</button>
      <button onClick={() => handleGuess("c3po")}>C-3PO</button>
    </div>
  );
};

export default CharSelector;
