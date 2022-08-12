import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import { db } from "./firebase-config";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";

import Image from "./components/Image";
import Header from "./components/Header";

function App() {
  const [locations, setLocations] = useState([]);
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

  const handleClick = (event) => {
    const { width, height } = event.target.getBoundingClientRect();
    const { offsetX, offsetY } = event.nativeEvent;

    const x = Math.round((offsetX / width) * 100);
    const y = Math.round((offsetY / height) * 100);

    const { minX, maxX, minY, maxY } = locations[0].vader;

    if (between(x, minX, maxX) && between(y, minY, maxY)) {
      console.log("success!");
    }
  };

  return (
    <div className="App">
      <div>{console.log(locations[0])}</div>
      <Header />
      <Image click={handleClick} />
    </div>
  );
}

export default App;
