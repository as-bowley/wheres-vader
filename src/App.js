import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

import StartScreen from "./components/StartScreen";
import Image from "./components/Image";
import Header from "./components/Header";
import CharSelector from "./components/CharSelector";
import GameOver from "./components/GameOver";

function App() {
  const [locations, setLocations] = useState([]);
  const [vaderIsFound, setVaderIsFound] = useState(false);
  const [yodaIsFound, setYodaIsFound] = useState(false);
  const [c3poIsFound, setC3poIsFound] = useState(false);
  const [selectMenuIsShown, setSelectMenuIsShown] = useState(false);
  const [selectMenuLocation, setSelectMenuLocation] = useState({ x: 0, y: 0 });
  const [clickLocation, setClickLocation] = useState({ x: 0, y: 0 });
  const [gameNotification, setGameNotification] = useState("");
  const [notifIsShown, setNotifIsShown] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const locationCollectionRef = collection(db, "locations");

  useEffect(() => {
    const getLocation = async () => {
      const data = await getDocs(locationCollectionRef);
      setLocations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (isGameRunning) {
      const timer = setTimeout(() => {
        setGameTime((time) => time + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    if (notifIsShown) {
      const notificationTimer = setTimeout(() => setNotifIsShown(false), 3000);
      return () => clearTimeout(notificationTimer);
    }
  }, [gameNotification]);

  useEffect(() => {
    checkGameOver();
  }, [yodaIsFound, c3poIsFound, vaderIsFound]);

  const between = (coordinate, min, max) => {
    return coordinate >= min && coordinate <= max;
  };

  const showMenu = (clickEvent) => {
    const { pageX, pageY } = clickEvent;

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
          setGameNotification("You found Vader!");
          break;
        case "yoda":
          setYodaIsFound(true);
          setGameNotification("You found Yoda!");
          break;
        case "c3po":
          setC3poIsFound(true);
          setGameNotification("You found C-3PO!");
          break;
        default:
          break;
      }
    } else {
      switch (character) {
        case "vader":
          setGameNotification("That's not Vader! Try again.");
          break;
        case "yoda":
          setGameNotification("That's not Yoda! Try again.");
          break;
        case "c3po":
          setGameNotification("That's not C-3PO! Try again.");
          break;
        default:
          break;
      }
    }
    setSelectMenuIsShown(false);
  };

  const startGame = () => {
    setIsGameRunning(true);
    setGameTime(0);
    setC3poIsFound(false);
    setYodaIsFound(false);
    setVaderIsFound(false);
    setIsGameOver(false);
    setGameNotification("");
    setNotifIsShown(false);
  };

  const checkGameOver = () => {
    if (yodaIsFound && c3poIsFound && vaderIsFound) {
      setScore(gameTime);
      setIsGameRunning(false);
      setIsGameOver(true);
    }
    setNotifIsShown(true);
  };

  const startScreenRender = () => {
    if (!isGameRunning && !isGameOver) {
      return <StartScreen startGame={startGame} />;
    }
  };

  return (
    <div className="App">
      {startScreenRender()}
      {isGameRunning && (
        <Header
          vader={vaderIsFound}
          yoda={yodaIsFound}
          c3po={c3poIsFound}
          gameNotification={gameNotification}
          gameNotificationIsShown={notifIsShown}
          timer={gameTime}
        />
      )}
      {selectMenuIsShown && (
        <CharSelector handleGuess={handleGuess} location={selectMenuLocation} />
      )}
      {isGameRunning && <Image click={handleClick} />}
      {isGameOver && <GameOver score={score} startGame={startGame} />}
    </div>
  );
}

export default App;
