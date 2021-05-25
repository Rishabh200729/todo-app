import React, { useState, useEffect, useContext } from "react";
import './App.css';
import Header from "./myComponents/Header";
import Footer from "./myComponents/Footer";
import About from "./myComponents/About";
import CompletedTodos from "./myComponents/CompletedTodos";
import Login from "./myComponents/Login";
import SignUp from "./myComponents/SignUp";
import Home from "./myComponents/Home";
import { AuthContext ,AuthProvider  } from "./Auth";
import  PrivateRoute from "./PrivateRoute";
import{ 
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import firebase from "./firebase";

function App() {
  //get the logged in user
  const { currentUser } = React.useContext(AuthContext); 
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const ref = firebase.firestore().collection("users");
  //get the todos and completed Todos from firestore.  
  useEffect(()=>{
    if(currentUser){
      ref.doc(currentUser.uid).onSnapshot((doc) => {
          setTodos(doc.data().todos);
          setCompletedTodos(doc.data().completedTodos);
      }); 
    }
  },[]);

  return (
      <Container>
        <Router>
          <Header  
              title = "Todo List"
          />
          <Switch>
            <PrivateRoute exact path="/" component={ Home } 
              completedTodos={completedTodos}
              todos={todos}   
              setTodos ={setTodos}
              setCompletedTodos={setCompletedTodos}
            />
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
  	)
}

export default App;
