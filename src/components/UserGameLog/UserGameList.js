import React, { useState, useEffect } from "react";
import GameListDisplay from "./GameListDisplay";
import { withRouter } from "react-router-dom";

const UserGameList = props => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    showListing();
  }, []);

  const showListing = () => {
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
  };

  const personalDisplay = () => {
    return results.map(game => {
      return (
        <div
          key={game.id}
          className="games"
          style={{ margin: "10px 0 10px 0" }}
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

export default withRouter(UserGameList);
