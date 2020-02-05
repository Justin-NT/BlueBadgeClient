import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Tab from "@material-ui/core/Tab";
import { Link, withRouter } from "react-router-dom";
import "./Navbar.css";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    "& .MuiAppBar-root": {
      backgroundColor: "#080F19"
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    justifyContent: "center",
    // marginLeft: "15%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      cursor: "pointer"
    },
    marginRight: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    },
    "@media (min-width: 600px)": {
      minWidth: 200
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 400
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

function Navbar(props) {
  const classes = useStyles();

  let baseurl = "https://api.rawg.io/api/games?search=";
  let currentTitle;

  useEffect(() => {
    return props.userTitle !== "" &&
      props.userTitle != null &&
      props.userTitle !== undefined
      ? fetchGames()
      : console.log("No! >:}");
  }, [props.pageNumber]);

  const fetchGames = () => {
    let url = props.userTitle
      ? (baseurl += props.userTitle + `&page=${props.pageNumber}`)
      : alert("please enter a value in the search bar");

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "User-Agent": "gameBoard"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.results);
        props.setResults(data.results);
        props.setCount(data.count);
        currentTitle = props.userTitle;
      })
      .catch(err => console.log(err));
  };

  const authSwap = () => {
    return props.sessionToken ? (
      <Link
        to="/signin"
        onClick={props.clearToken}
        style={{ textDecoration: "none", marginLeft: "25%" }}
      >
        <Tab label="Sign Out" style={{ color: "white", opacity: 1 }} />
      </Link>
    ) : (
      <Link to="/signin" style={{ textDecoration: "none", marginLeft: "25%" }}>
        <Tab label="Sign in" style={{ color: "white", opacity: 1 }} />
      </Link>
    );
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              style={{ color: "white", marginLeft: 45 }}
            >
              Home
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              className="searchField"
              placeholder="Search for a game title..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={e => props.setUserTitle(e.target.value)}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  if (props.location.pathname !== "/home") {
                    props.history.push("/home");
                  }
                  if (props.userTitle !== currentTitle) {
                    console.log(currentTitle);
                    if (props.pageNumber > 1) {
                      props.setPageNumber(1);
                    } else {
                      fetchGames();
                    }
                    currentTitle = props.userTitle;
                  }
                }
              }}
            />
          </div>
          <div id="testing123">
            {authSwap()}
            {props.sessionToken ? (
              <Link to="/user/gamelist" style={{ textDecoration: "none" }}>
                <Tab
                  label="My List"
                  style={{ color: "white", opacity: 1 }}
                ></Tab>
              </Link>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default withRouter(Navbar);
