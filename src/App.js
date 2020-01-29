import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import GameDB from "./components/GameDatabase/GameDB";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import GameLog from "./components/UserGameLog/UserGameList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const [results, setResults] = useState([]);
  const [userTitle, setUserTitle] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = newToken => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  return (
    <div>
      <Router>
        <Navbar
          userTitle={userTitle}
          setUserTitle={setUserTitle}
          results={results}
          setResults={setResults}
          clearToken={clearToken}
        />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/signin">
            <Signin updateToken={updateToken} />
          </Route>
          <Route exact path="/signup">
            <Signup updateToken={updateToken} />
          </Route>
          <Route exact path="/home">
            <GameDB results={results} sessionToken={sessionToken} />
          </Route>
          <Route exact path="/user/gamelist">
            <GameLog sessionToken={sessionToken} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
