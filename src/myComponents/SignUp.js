import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "../firebase";
import { Button, Typography, TextField, Container } from "@material-ui/core";
import "../App.css";

const SignUp = ({ history }) => {
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
      alert(error);
    }
    
  }, [history]);

  return (
    <Container className="sign-up" >
      <Typography variant="h3" >Sign up</Typography>
      <form onSubmit={handleSignUp}>
        <TextField required name="email" maxWidth="true" margin="dense" type="email" placeholder="Email" label="Email" variant="outlined" />
        <br />
        <TextField required name="password" type="password"  placeholder="Password" label="Password" variant="outlined"  margin="dense" />
        <br />
        <TextField name="name" variant="outlined" label="Name" placeholder="Name" margin="dense" required type="text"/> 
        <Button variant="contained" color="primary" type="submit">Sign Up</Button>
      </form>
    </Container>
  );
};

export default withRouter(SignUp);
