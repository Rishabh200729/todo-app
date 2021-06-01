import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import firebase from "../firebase";
import SignInWithGoogle from "../GoogleSignIn"
import { Button, Typography, TextField, Container } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import "../App.css";

const SignUp = ({ history }) => {
  const [ errors, setErrors ] = useState([]);
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, name } = event.target.elements;
    const usersRef = firebase.firestore().collection("users");
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value).then(userCredential=>{
          usersRef.doc(userCredential.user.uid).set({
            name: name.value,
            email: email.value,
            todos:[],
            completedTodos:[]
          })
        })
      history.push("/");
    } catch (error) {
      setErrors(error.message);
    }

  }, [history]);

  const SocialMediaSignUp = useCallback(async e => {
      SignInWithGoogle();
      history.push("/");
  }, [history]);

  const formStyle = {
   "-webkit-box-shadow": "0 0 10px 2px gray",
    "box-shadow": "0 0 5px 2px black",
  }

  return (
    <Container className="login-form" style={formStyle}>
      <Typography variant="h3">Sign Up</Typography>
      { errors.length > 0 && <Alert severity="error">
        <AlertTitle>Error Signing In</AlertTitle>
        <strong> { errors } </strong>
      </Alert>
    }
      <form onSubmit={handleSignUp}>
        <TextField className="login-email" fullWidth="true" margin="normal" label="Email" required name="email" variant="outlined" type="email" placeholder="Email" />
        <TextField required fullWidth="true" margin="normal" label="Password" variant="outlined" name="password" type="password" placeholder="Password" />
        <TextField required fullWidth="true" margin="normal" label="Name" variant="outlined" name="name" type="text" placeholder="Name" />
        <Button type="submit" color="primary" variant="contained" style={{"padding":"0.7em 20em 0.7em"}} >Sign Up</Button>
      </form>
      <div style={{"marginTop":"1rem"}}>
        <Button type="submit" color="secondary" variant="outlined" onClick={SocialMediaSignUp}>Sign In WITH Google</Button>
      </div>
    </Container>
  );
};

export default withRouter(SignUp);
