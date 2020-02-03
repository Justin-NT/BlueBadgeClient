import React from "react";
import GameDisplay from "./GameDisplay";
import "./GameDB.css";

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

  const pageUp = () => {
    props.setPageNumber(x => props.pageNumber + 1);
    console.log(props.pageNumber);
  };

  console.log("gamedb.js", props.pageNumber);

  const pageDown = () => {
    props.pageNumber > 1
      ? props.setPageNumber(x => props.pageNumber - 1)
      : console.log("cant go below page 0!");
  };

  return (
    <div id="gameWrapper">
      <div className="titleText">
        <h1 style={{ fontSize: 45 }}>Game Results</h1>
        <button onClick={pageUp}>Next Page</button>
      </div>
      <div id="gameContainer">{gameMapper()}</div>
    </div>
  );
};

export default GameDB;
