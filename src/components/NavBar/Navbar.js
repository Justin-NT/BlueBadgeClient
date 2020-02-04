import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Tab from "@material-ui/core/Tab";
import { Link, withRouter } from "react-router-dom";
import "./Navbar.css";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    "& .MuiAppBar-root": {
      backgroundColor: "#060D14"
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
    marginLeft: "33%",
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
      marginLeft: "37%"
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
      width: 200
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [userTitle, setUserTitle] = useState("");
  // const [newPage, setNewPage] = useState(props.pageNumber);

  let baseurl = "https://api.rawg.io/api/games?search=";

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const doBoth = () => {
    props.clearToken();
    handleMenuClose();
  };

  useEffect(() => {
    console.log();
    return userTitle !== "" || userTitle !== null
      ? fetchGames
      : console.log("No! >:}");
  }, [props.pageNumber]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link
        to="/user/gamelist"
        style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
      >
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Link>
      <MenuItem onClick={doBoth}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const fetchGames = () => {
    // e.preventDefault();
    console.log("fetchGames", userTitle);
    let url = userTitle
      ? (baseurl += userTitle + `&page=${props.pageNumber}`)
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
        props.setResults(data.results);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              style={{ color: "white", marginLeft: 45 }}
            >
              GameLog
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
              onChange={e => setUserTitle(e.target.value)}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  if (props.location.pathname !== "/home") {
                    props.history.push("/home");
                  }
                  fetchGames(e);
                }
              }}
            />
          </div>
          <Link
            to="/signin"
            style={{ textDecoration: "none", marginLeft: "30%" }}
          >
            <Tab label="Sign in" style={{ color: "white", opacity: 1 }} />
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default withRouter(Navbar);
