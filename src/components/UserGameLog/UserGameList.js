import React, { useState, useEffect } from "react";
import GameListDisplay from "./GameListDisplay";
import { withRouter } from "react-router-dom";
import APIURL from "../../helpers/environment";

const UserGameList = props => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    showListing();
  }, []);

  const showListing = () => {
    fetch(`${APIURL}/gamelog/showlistings`, {
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
  };

  const personalDisplay = () => {
    return results.map(game => {
      return (
        <div
          key={game.id}
          className="games"
          style={{ margin: "25px 20px 25px 20px" }}
        >
          <GameListDisplay
            game={game}
            sessionToken={props.sessionToken}
            showListing={showListing}
          />
        </div>
      );
    });
  };

  // const loginChecker = () => {
  //   if (
  //     props.sessionToken !== undefined &&
  //     props.sessionToken !== "" &&
  //     props.location.pathname === "/user/gamelist" &&
  //     props.sessionToken !== null
  //   ) {
  // props.history.push("/signin");
  //   }
  // };

  // useEffect(() => {
  //   loginChecker();
  // }, [props.sessionToken]);

  return (
    <div id="gameWrapper">
      <div className="titleText">
        <h1>Personal Game Log</h1>
      </div>
      <div id="gameContainer">{personalDisplay()}</div>
    </div>
  );
};

export default withRouter(UserGameList);
