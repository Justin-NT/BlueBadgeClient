import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./Signin.css";

const Signup = props => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3000/user/signup", {
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
      .then(data => props.updateToken(data.sessionToken));
  };

  const invalidUser = () => {
    return !email || !password ? "Email and password are required" : null;
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            name="fullName"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="userName">Username</Label>
          <Input
            name="userName"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Input>
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
      <Link to="/signin">
        <span className="fakeAnchor">Already have an account?</span>
      </Link>
    </div>
  );
};

export default Signup;
