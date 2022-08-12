import React from "react";
import vaderPic from "./image/vader.jpg";
import yodaPic from "./image/yoda.jpg";
import c3poPic from "./image/c3po.jpg";

const Header = ({ vader, yoda, c3po }) => {
  return (
    <div className="header">
      <h1>Find these characters: </h1>
      <div className="header--characters">
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
    </div>
  );
};

export default Header;
