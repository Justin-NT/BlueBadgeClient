import React from "react";
import GameDisplay from "./GameDisplay";
import "./GameDB.css";
import Grid from "@material-ui/core/Grid";

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
      </div>
      <div id="btnsContainer">
        <Grid container spacing={6} id="btns">
          <Grid item xs={6}>
            <button onClick={pageDown}>Prev Page</button>
          </Grid>
          <Grid item xs={6}>
            <button onClick={pageUp}>Next Page</button>
          </Grid>
        </Grid>
      </div>
      <div id="gameContainer">{gameMapper()}</div>
    </div>
  );
};

export default GameDB;
