import React, { useState, useEffect } from "react";
import './App.css';
import Header from "./myComponents/Header";
import Footer from "./myComponents/Footer";
import About from "./myComponents/About";
import CompletedTodos from "./myComponents/CompletedTodos";
import Login from "./myComponents/Login";
import SignUp from "./myComponents/SignUp";
import Home from "./myComponents/Home";
import { AuthProvider } from "./Auth";
import  PrivateRoute from "./PrivateRoute";
import{ 
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import firebase from "./firebase";

function App() {	
  const [completedTodos , setCompletedTodos] = useState([]);
  //reference of completedTodos collection in firestore
  const completedTodosref = firebase.firestore().collection("completedTodos"); 
  //get the completedTodos
  useEffect(()=>{ 
    completedTodosref.onSnapshot((querySnapshot)=>{
      const items = [];
      querySnapshot.forEach((doc)=>{
          items.push({...doc.data(),id:doc.id});
      });
      console.table(items);
      setCompletedTodos(items);
    })
  });
  
  return (
    <AuthProvider>
      <Container>
        <Router>
          <Header  
              title = "Todo List"
          />
          <Switch>
            <PrivateRoute exact path="/" component={ Home } />
            <Route exact path="/about">
              <About />
            </Route>
            <PrivateRoute exact path="/completed">
              <CompletedTodos completedTodos={completedTodos} />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </Container>
    </AuthProvider>
  	)
}

export default App;
