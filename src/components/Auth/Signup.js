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
import "./Signup.css";

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
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
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
      ? fetch("http://localhost:3000/user/signup", {
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

  const loginChecker = () => {
    if (
      props.sessionToken !== undefined &&
      props.sessionToken !== "" &&
      props.location.pathname === "/signup"
    ) {
      props.history.push("/user/gamelist");
    }
  };

  useEffect(() => {
    loginChecker();
  }, [props.sessionToken]);

  return (
    <div id="componentWrapper">
      <Container component="main" maxWidth="xs" id="signupContainer">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" id="signup">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={e => handleSubmit(e)}>
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            <a
              color="inherit"
              href="https://justin-nt.github.io/"
              target="blank"
            >
              Portfolio
            </a>
            {"  "}
            <a
              href="https://www.linkedin.com/in/justin-terry-743939194/"
              target="blank"
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
// import React, { useState } from "react";
// import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import { Link } from "react-router-dom";
// import "./Signin.css";
// import { formatMs } from "@material-ui/core";

// const Signup = props => {
//   const [fullName, setFullName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   let handleSubmit = () => {
//     fetch("http://localhost:3000/user/signup", {
//       method: "POST",
//       body: JSON.stringify({
//         fullName: fullName,
//         userName: userName,
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

//   const invalidPass = e => {
//     e.preventDefault();
//     let passwordValue = document.getElementById("password");
//     passwordValue.value.length >= 5
//       ? handleSubmit()
//       : alert("password needs to be at least 5 characters");
//     passwordValue.focus();
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <Form onSubmit={e => invalidPass(e)}>
//         <FormGroup>
//           <Label htmlFor="fullName">Full Name</Label>
//           <Input
//             name="fullName"
//             value={fullName}
//             onChange={e => setFullName(e.target.value)}
//           ></Input>
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="userName">Username</Label>
//           <Input
//             name="userName"
//             value={userName}
//             onChange={e => setUserName(e.target.value)}
//           ></Input>
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             name="email"
//             type="email"
//             id="email"
//             required
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           ></Input>
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="password">Password</Label>
//           <Input
//             name="password"
//             id="password"
//             required
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//           ></Input>
//         </FormGroup>
//         <Button type="submit">Sign Up</Button>
//       </Form>
//       <Link to="/signin">
//         <span className="fakeAnchor">Already have an account?</span>
//       </Link>
//     </div>
//   );
// };

// export default Signup;
