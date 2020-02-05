import React, { useState } from "react";
import GameDisplay from "./GameDisplay";
import "./GameDB.css";
import Grid from "@material-ui/core/Grid";

const GameDB = props => {
  const [trackerValue, setTrackerValue] = useState(20);

  const gameMapper = () => {
    return props.results.map(game => {
      return (
        <div
          key={game.id}
          className="games"
          style={{ margin: "25px 20px 25px 20px" }}
        >
          <GameDisplay game={game} sessionToken={props.sessionToken} />
        </div>
      );
    });
  };

  const pageUp = () => {
    // Using results.length to determine how much info is shown on the page. 20 results are shown per page by default, but not every search returns 20 results, so can't hardcode the #
    console.log(trackerValue);
    if (props.count - trackerValue <= 0) {
      return;
    } else {
      props.setPageNumber(props.pageNumber + 1);
      setTrackerValue(trackerValue + 20);
    }

    console.log(props.pageNumber);
  };

  console.log("gamedb.js", props.pageNumber);

  const pageDown = () => {
    console.log(trackerValue);
    if (props.pageNumber <= 1) {
      console.log("cant go below page 0!");
    } else {
      props.setPageNumber(props.pageNumber - 1);
      setTrackerValue(trackerValue - 20);
    }
  };

  return (
    <div id="gameWrapper">
      <div className="titleText">
        <h1 style={{ fontSize: 45 }}>Searched Game Results</h1>
        <p>Enter any game title into the search bar above!</p>
      </div>
      <div id="btnsContainer">
        <Grid container spacing={6} id="btns">
          <Grid item xs={6}>
            {props.pageNumber === 1 ? null : (
              <button onClick={pageDown}>Prev Page</button>
            )}
          </Grid>
          <Grid item xs={6}>
            {props.count - trackerValue >= 0 ? (
              <button onClick={pageUp}>Next Page</button>
            ) : null}
          </Grid>
        </Grid>
      </div>
      <div id="gameContainer">{gameMapper()}</div>
    </div>
  );
};

export default GameDB;
