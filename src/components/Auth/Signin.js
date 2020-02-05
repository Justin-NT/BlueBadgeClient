import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "@material-ui/lab";
import "./Signin.css";
import APIURL from "../../helpers/environment";

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#BF2C74"
  },
  formBackground: {
    color: "black",
    backgroundColor: "white",
    border: "1px solid black"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    "& .MuiButton-contained": {
      backgroundColor: "#FF009A",
      border: "1px solid black",
      color: "white",
      textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    "& .MuiFormLabel-root": {
      color: "black"
    }
  }
}));

const SignIn = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failureSwitch, setFailureSwitch] = useState(false);
  const classes = useStyles();

  let handleSubmit = event => {
    event.preventDefault();
    password.length >= 5
      ? fetch(`${APIURL}/user/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password
          }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        })
          .then(response => response.json())
          .then(data => {
            if ("error" in data) {
              failureAlert();
            } else {
              props.updateToken(data.sessionToken);
            }
          })
      : alert("Your password must be 5 characters or longer!");
  };

  useEffect(() => {
    if (
      props.sessionToken !== undefined &&
      props.sessionToken !== "" &&
      props.location.pathname === "/signin" &&
      props.sessionToken !== null
    ) {
      props.history.push("/home");
    }
  }, [props.sessionToken]);

  const failureAlert = () => {
    setFailureSwitch(true);
    setTimeout(() => {
      setFailureSwitch(false);
    }, 2000);
  };

  const displayFailure = () => {
    return failureSwitch ? (
      <Grid item xs={12}>
        <Alert color="error" severity="error">
          Failed to Signup! Make sure your email and password are valid!
        </Alert>
      </Grid>
    ) : null;
  };

  return (
    <div id="componentWrapper">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{
              color: "white",
              marginBottom: 8,
              textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
            }}
          >
            Sign in
          </Typography>
          <form className={classes.root} onSubmit={e => handleSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              onChange={e => setEmail(e.target.value)}
              InputProps={{ className: classes.formBackground }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              InputProps={{ className: classes.formBackground }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="center">
              {displayFailure()}
              <Grid item>
                <Link
                  to="/signup"
                  variant="body2"
                  style={{
                    color: "white",
                    textShadow:
                      "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(SignIn);
