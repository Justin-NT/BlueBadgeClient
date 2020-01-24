import React from "react";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import GameDB from "./components/GameDatabase/GameDB";

function App() {
  return (
    <div className="App">
      <Navbar />
      <GameDB />
    </div>
  );
}

export default App;
