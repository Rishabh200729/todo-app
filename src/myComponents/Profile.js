import React,{ useContext, useEffect, useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { AuthContext } from "../Auth";
import firebase from "../firebase";

const Profile = (props) =>{
  //reference to the logged in user from firestore
  const ref = firebase.firestore().collection("users");
  //state to store user data in db
  const [ userData, setUserData ] = useState([]);
  const [ percent, setPercent ] = useState(0);

    useEffect(()=>{
      if(props.currentUser){
        ref.doc(props.currentUser.uid).onSnapshot((doc) => {
           setUserData(doc.data());
           if(doc.data().todos.length > 0 && doc.data().completedTodos.length > 0){
             setPercent((((doc.data().todos.length) / (doc.data().todos.length + doc.data().completedTodos.length)) *100).toFixed(2) + " %");
           }
      });
    }
    },[]);
    return (
        <div className="profile">
            <Typography variant="h3">{props.currentUser &&
                props.currentUser.displayName ?
                  props.currentUser.displayName : props.user.name
            }</Typography>
            <Typography variant="h4">All Active Todos : {userData.todos &&  userData.todos.length}</Typography>
            <Typography variant="h4">All Completed Todos : {userData.completedTodos && userData.completedTodos.length}</Typography>
            <Typography variant="h4" className="todo-percent">Todos Completion Percentage : {percent}</Typography>
        </div>
    )
}
export default Profile
