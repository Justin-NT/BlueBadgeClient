import React, { useState } from "react";
import GameDisplay from "./GameDisplay";

const GameDB = props => {
  const gameMapper = () => {
    return props.results.map(game => {
      return (
        <div
          key={game.id}
          className="games"
          style={{ margin: "10px 0 10px 0" }}
        >
          <GameDisplay game={game} sessionToken={props.sessionToken} />
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
      {gameMapper()}
    </div>
  );
};

export default GameDB;
