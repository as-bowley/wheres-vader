import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

import Image from "./components/Image";
import Header from "./components/Header";
import CharSelector from "./components/CharSelector";

function App() {
  const [locations, setLocations] = useState([]);
  const [vaderIsFound, setVaderIsFound] = useState(false);
  const [yodaIsFound, setYodaIsFound] = useState(false);
  const [c3poIsFound, setC3poIsFound] = useState(false);
  const [selectMenuIsShown, setSelectMenuIsShown] = useState(false);
  const [selectMenuLocation, setSelectMenuLocation] = useState({ x: 0, y: 0 });
  const [clickLocation, setClickLocation] = useState({ x: 0, y: 0 });

  const locationCollectionRef = collection(db, "locations");

  useEffect(() => {
    const getLocation = async () => {
      const data = await getDocs(locationCollectionRef);
      setLocations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLocation();
  }, []);

  const between = (coordinate, min, max) => {
    return coordinate >= min && coordinate <= max;
  };

  const showMenu = (event) => {
    const { pageX, pageY } = event;

    setSelectMenuLocation({ x: pageX, y: pageY });
    setSelectMenuIsShown(true);
  };

  const handleClick = (event) => {
    const { width, height } = event.target.getBoundingClientRect();
    const { offsetX, offsetY } = event.nativeEvent;

    const x = Math.round((offsetX / width) * 100);
    const y = Math.round((offsetY / height) * 100);

    setClickLocation({ x: x, y: y });
    showMenu(event);
  };

  const handleGuess = (character) => {
    const { x, y } = clickLocation;
    const arrayLocation = locations[0];

    const { minX, maxX, minY, maxY } = arrayLocation[character];

    if (between(x, minX, maxX) && between(y, minY, maxY)) {
      switch (character) {
        case "vader":
          setVaderIsFound(true);
          break;
        case "yoda":
          setYodaIsFound(true);
          break;
        case "c3po":
          setC3poIsFound(true);
          break;
        default:
          break;
      }
    }
    setSelectMenuIsShown(false);
  };

  return (
    <div className="App">
      <Header vader={vaderIsFound} yoda={yodaIsFound} c3po={c3poIsFound} />
      {selectMenuIsShown && (
        <CharSelector handleGuess={handleGuess} location={selectMenuLocation} />
      )}
      <Image click={handleClick} />
    </div>
  );
}

export default App;
