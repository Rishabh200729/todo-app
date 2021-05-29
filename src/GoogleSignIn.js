import React, {
    useCallback
} from "react";
import firebase from "./firebase";
const SignInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log("result",result);
        let user = result.user;
        const {
            displayName,
            email,
            photoURL
        } = user;
        //ref of users collection
        const ref = firebase.firestore().collection("users");
        //create a new user
        ref.doc(user.uid).set({
            name: displayName,
            email,
            photoURL,
            todos: [],
            completedTodos: []
        })
    }).catch((error) => {
        console.log("error signing in",error);
    });
}
export default SignInWithGoogle
