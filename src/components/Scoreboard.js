import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import uniqid from "uniqid";

const Scoreboard = ({ score }) => {
  const [newName, setNewName] = useState("");
  const [scores, setScores] = useState([]);
  const [orderedScores, setOrderedScores] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const leaderboardCollectionRef = collection(db, "leaderboard");

  useEffect(() => {
    const getScores = async () => {
      const data = await getDocs(leaderboardCollectionRef);
      setScores(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getScores();
  }, [hasSubmitted]);

  useEffect(() => {
    setOrderedScores(
      scores.sort((a, b) => {
        return a.score - b.score;
      })
    );
  }, [scores]);

  const addScore = async () => {
    await addDoc(leaderboardCollectionRef, {
      name: newName === "" ? "anonymous" : newName,
      score: score,
    });
    setHasSubmitted(true);
  };

  return (
    <div className="scoreboard">
      <h2>You finished in {score} seconds!</h2>
      {!hasSubmitted ? (
        <>
          <p>Add your score to the leaderboard</p>
          <input
            placeholder="Enter your name.."
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
          <button onClick={addScore}>Submit</button>
        </>
      ) : (
        <p>Your score has been added!</p>
      )}

      <h1>Leaderboard</h1>
      <div className="leaderboard">
        {orderedScores.map((score) => {
          return (
            <div className="scoreboard--entry" key={uniqid()}>
              <p>{score.name}</p>
              <strong>{score.score} seconds</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scoreboard;
