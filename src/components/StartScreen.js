import React from "react";
import logo from "./image/logo.png";
import vaderPic from "./image/vader.jpg";
import yodaPic from "./image/yoda.jpg";
import c3poPic from "./image/c3po.jpg";

const StartScreen = ({ startGame }) => {
  return (
    <div className="startScreen">
      <img src={logo} alt="logo" className="startScreen--logo" />
      <div className="gameDetails">
        <h2>Game Rules:</h2>
        <p>
          When the game begins, you'll have a large image and you need to find
          the below characters.<br></br> You're being timed so try to be as fast
          as possible!{" "}
        </p>
        <div className="startScreen--characters">
          <div>
            <img
              src={vaderPic}
              className={`startScreen--charimg`}
              alt="darth vader"
            />
            <h3>Darth Vader</h3>
          </div>
          <div>
            <img src={yodaPic} className={`startScreen--charimg`} alt="yoda" />
            <h3>Yoda</h3>
          </div>
          <div>
            <img src={c3poPic} className={`startScreen--charimg`} alt="c-3po" />
            <h3>C-3PO</h3>
          </div>
        </div>
        <button onClick={startGame}>Start!</button>
      </div>
    </div>
  );
};

export default StartScreen;
