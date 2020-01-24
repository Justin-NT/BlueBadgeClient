import React, { useState } from "react";
import GameDisplay from "./GameDisplay";

const GameDB = () => {
  const [results, setResults] = useState([]);
  const [userTitle, setUserTitle] = useState("");
  let baseurl = "https://api.rawg.io/api/games?search=";

  const fetchGames = e => {
    e.preventDefault();
    let url = userTitle
      ? (baseurl += userTitle)
      : alert("please enter a value in the search bar");

    console.log(url);

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "User-Agent": "gameBoard"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.results);
        setResults(data.results);
      })
      .catch(err => console.log(err));
  };

  const gameMapper = () => {
    return results.map(game => {
      return (
        <div key={game.id}>
          <GameDisplay game={game} />
        </div>
      );
    });
  };

  return (
    <div>
      <form onSubmit={e => fetchGames(e)}>
        <input
          type="text"
          name="userTitle"
          onChange={e => setUserTitle(e.target.value)}
        ></input>
        <button>Search</button>
      </form>
      {gameMapper()}
    </div>
  );
};

export default GameDB;
