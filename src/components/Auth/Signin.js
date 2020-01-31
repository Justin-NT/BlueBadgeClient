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
import { Alert, AlertTitle } from "@material-ui/lab/";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  let handleSubmit = event => {
    event.preventDefault();
    password.length >= 5
      ? fetch("http://localhost:3000/user/signin", {
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
          .then(data => props.updateToken(data.sessionToken))
      : alert("Your password must be 5 characters or longer!");
  };

  const loginChecker = () => {
    if (
      props.sessionToken !== undefined &&
      props.sessionToken !== "" &&
      props.location.pathname === "/signin" &&
      props.sessionToken !== null
    ) {
      props.history.push("/user/gamelist");
    } else {
      return;
    }
  };

  useEffect(() => {
    loginChecker();
  }, [props.sessionToken]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={e => handleSubmit(e)}>
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
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(SignIn);

// import React, { useState } from "react";
// import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import "./Signin.css";

// const Signin = props => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   let handleSubmit = event => {
//     event.preventDefault();
//     fetch("http://localhost:3000/user/signin", {
//       method: "POST",
//       body: JSON.stringify({
//         email: email,
//         password: password
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json"
//       })
//     })
//       .then(response => response.json())
//       .then(data => props.updateToken(data.sessionToken));
//   };

//   return (
//     <div>
//       <h1>Sign In</h1>
//       <Form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             name="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           ></Input>
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="password">Password</Label>
//           <Input
//             name="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//           ></Input>
//         </FormGroup>
//         <Button type="submit">Login</Button>
//       </Form>
//       <Link to="/signup">
//         <span className="fakeAnchor">Don't have an account?</span>
//       </Link>
//     </div>
//   );
// };

// export default Signin;