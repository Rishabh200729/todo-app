import React, { useCallback, useContext, useState  } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { AuthContext } from "../Auth";
import { Button, TextField, Typography, Container } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import "../App.css";

const Login = ({ history }) => {
  const [ errors, setErrors ] = useState([]);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        setErrors(error.message);
      }
    },
    [history]
  );
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }
  const formStyle = {
   "-webkit-box-shadow": "0 0 10px 2px gray",
    "box-shadow": "0 0 5px 2px black",
  }
  return (
    <Container className="login-form" style={formStyle}>
      <Typography variant="h3">Log in</Typography>
      <Container maxWidth="sm">
        { errors.length > 0 && <Alert severity="error" ><AlertTitle>Error Loging In</AlertTitle><strong>{ errors }</strong></Alert> }
      </Container>
      <form onSubmit={handleLogin}>
        <TextField className="login-email" fullWidth="true" margin="normal" label="Email" required name="email" variant="outlined" type="email" placeholder="Email" />
        <TextField required fullWidth="true" margin="normal" label="Password" variant="outlined" name="password" type="password" placeholder="Password" />
        <Button type="submit" color="primary" variant="contained" style={{"padding":"0.7em 20em 0.7em"}} >Log in</Button>
      </form>
      <Button style={{"marginTop":"0.5rem"}} color="secondary"  size="large" ><Link to="/signup" style={{"color":"black"}}>Dont have an account ? Sign Up</Link></Button>
    </Container>
  );
};

export default withRouter(Login);
