import React, { useState, useEffect } from "react";
import GameListDisplay from "./GameListDisplay";

const UserGameList = props => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/gamelog/showlistings", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.sessionToken
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setResults(res);
      });
  }, []);

  const personalDisplay = () => {
    return results.map(game => {
      return (
        <div
          key={game.id}
          className="games"
          style={{ margin: "10px 0 10px 0" }}
        >
          <GameListDisplay game={game} />
        </div>
      );
    });
  };

  return (
    <div
      className="gameContainer"
      style={{
        display: "flex",
        flexFlow: "wrap column",
        alignContent: "center"
      }}
    >
      {personalDisplay()}
    </div>
  );
};

export default UserGameList;
