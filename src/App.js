import { useEffect, useState } from "react";
import React from "react";
import "./App.css";

import Image from "./components/Image";
import Header from "./components/Header";

function App() {
  const [vader, setVader] = useState({
    minX: 91,
    minY: 34,
    maxX: 94,
    maxY: 37,
  });

  const between = (coordinate, min, max) => {
    return coordinate >= min && coordinate <= max;
  };

  const handleClick = (event) => {
    const { width, height } = event.target.getBoundingClientRect();
    const { offsetX, offsetY } = event.nativeEvent;

    const x = Math.round((offsetX / width) * 100);
    const y = Math.round((offsetY / height) * 100);

    const { minX, maxX, minY, maxY } = vader;

    if (between(x, minX, maxX) && between(y, minY, maxY)) {
      console.log("success!");
    }
  };

  return (
    <div className="App">
      <Header />
      <Image click={handleClick} />
    </div>
  );
}

export default App;
