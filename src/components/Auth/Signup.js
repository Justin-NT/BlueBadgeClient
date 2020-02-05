import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import APIURL from "../../helpers/environment";
import "./Signup.css";
import { InputLabel } from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#BF2C74"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formBackground: {
    color: "black",
    backgroundColor: "white",
    border: "1px solid black"
  },
  root: {
    "& .MuiFormLabel-root": {
      color: "black"
    },
    "& .MuiFormLabel-root.selected": {
      textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    "& .MuiButton-contained": {
      backgroundColor: "#FF009A",
      border: "1px solid black",
      color: "white",
      textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
    }
  }
}));

const SignUp = props => {
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let handleSubmit = e => {
    e.preventDefault();
    password.length >= 5
      ? fetch(`${APIURL}/user/signup`, {
          method: "POST",
          body: JSON.stringify({
            fullName: fullName,
            userName: userName,
            email: email,
            password: password
          }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        })
          .then(response => response.json())
          .then(data => props.updateToken(data.sessionToken))
      : alert("Your password must be 5 characters or longer!");
  };

  useEffect(() => {
    if (
      props.sessionToken !== undefined &&
      props.sessionToken !== "" &&
      props.location.pathname === "/signup"
    ) {
      props.history.push("/home");
    }
  }, [props.sessionToken]);

  return (
    <div id="componentWrapper" InputProps={{ className: classes.root }}>
      <Container component="main" maxWidth="xs" id="signupContainer">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            id="signup"
            style={{
              color: "white",
              marginBottom: 25,
              textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
            }}
          >
            Sign up
          </Typography>
          <form className={classes.root} onSubmit={e => handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="Full Name"
                  label="Full Name"
                  name="fullName"
                  autoComplete="fname"
                  autoFocus
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  InputProps={{ className: classes.formBackground }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  InputProps={{ className: classes.formBackground }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  InputProps={{ className: classes.formBackground }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  InputProps={{ className: classes.formBackground }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link
                  to="/signin"
                  variant="body2"
                  style={{
                    color: "white",
                    textShadow:
                      "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            <a
              href="https://justin-nt.github.io/"
              target="blank"
              style={{
                color: "white",
                textShadow:
                  "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
              }}
            >
              Portfolio
            </a>
            {"  "}
            <a
              href="https://www.linkedin.com/in/justin-terry-743939194/"
              target="blank"
              style={{
                color: "white",
                textShadow:
                  "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
              }}
            >
              <span>LinkedIn</span>
            </a>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default withRouter(SignUp);
