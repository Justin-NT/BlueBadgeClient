import React from "react";
import GameDisplay from "./GameDisplay";
import "./GameDB.css";
import { Alert, AlertTitle } from "@material-ui/lab";

const GameDB = props => {
  const gameMapper = () => {
    return props.results.map(game => {
      return (
        <div
          key={game.id}
          className="games"
          style={{ margin: "40px 20px 5px 20px" }}
        >
          <GameDisplay game={game} sessionToken={props.sessionToken} />
        </div>
      );
    });
  };

  return (
    <div id="gameWrapper">
      <div className="titleText">
        <h1 style={{ fontSize: 45 }}>Game Results</h1>
      </div>
      <div id="gameContainer">{gameMapper()}</div>
    </div>
  );
};

export default GameDB;
