import React from "react";
import GameNotifs from "./GameNotifs";
import vaderPic from "./image/vader.jpg";
import yodaPic from "./image/yoda.jpg";
import c3poPic from "./image/c3po.jpg";

const Header = ({
  vader,
  yoda,
  c3po,
  gameNotification,
  gameNotificationIsShown,
  timer,
}) => {
  return (
    <div className="header">
      <div className="header--characters">
        <h1>Find these characters: </h1>
        <img
          src={vaderPic}
          className={`header--vader ${vader ? "found" : ""}`}
          alt="darth vader"
        />
        <img
          src={yodaPic}
          className={`header--vader ${yoda ? "found" : ""}`}
          alt="yoda"
        />
        <img
          src={c3poPic}
          className={`header--vader ${c3po ? "found" : ""}`}
          alt="c-3po"
        />
      </div>
      <h1 className="header--timer">Time: {timer}</h1>
      {gameNotificationIsShown && (
        <GameNotifs gameNotification={gameNotification} />
      )}
    </div>
  );
};

export default Header;
