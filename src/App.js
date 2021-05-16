// check the errors in the console
import React, { useState, useEffect } from "react";
import './App.css';
import Todos from "./myComponents/Todos";
import Header from "./myComponents/Header";
import Footer from "./myComponents/Footer";
import AddTodo from "./myComponents/AddTodo";
import About from "./myComponents/About";
import Edit from "./myComponents/Edit";
import CompletedTodos from "./myComponents/CompletedTodos";
import{ 
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import firebase from "./firebase";

function App() {
    const [todos, setTodos] = useState([]);
    //show edit component using booleans
    const [showEdit , setShowEdit] = useState(false);
    const [editTitle, setEditTitle]= useState("");
    const [editDesc, setEditDesc]= useState("");
    const [deadline, setDeadline] = useState("");
    const [isCompleted , setCompleted]  = useState(false);
    const [completedTodos , setCompletedTodos] = useState([]);
    
    const ref = firebase.firestore().collection("todos");
    const completedTodosref = firebase.firestore().collection("completedTodos"); 
    useEffect(()=>{
        ref.onSnapshot((querySnapshot)=>{
            const items = [];
            querySnapshot.forEach((doc)=>{
                items.push({...doc.data(),id : doc.id});
            });
            console.table(items);
            setTodos(items);
        })
        // do the same for completedTodos array
        completedTodosref.onSnapshot((querySnapshot)=>{
            const items = [];
            querySnapshot.forEach((doc)=>{
                items.push({...doc.data(),id:doc.id});
            });
            console.table(items);
            setCompletedTodos(items);
        })
    },[])

    
    //add a todo
	const addTodo = (title,desc, deadline) =>{
        const createdAt = firebase.firestore.Timestamp.fromDate(new Date());
        const date = createdAt.toDate();
		const newTodo = {
            timestamp:date,
			title,
            desc,
            deadline,
            completed : false
		}
        ref.add(newTodo);
	}
    //this is going to run when edit button is clicked on the todo compoenent
    const onEdit = (todo)=>{
        setEditTitle(todo.title);
        setEditDesc(todo.desc);
        setDeadline(todo.deadline);
        setShowEdit(!showEdit); 
    }
    
    //this is going to run when edit todo button is clicked in the edit component
    const editTask = (title, desc ,deadline , previousTitle, previousDesc, previousDeadline) =>{
        //get the todo which  user is currently editing
        const previousTodoArray = todos.filter((todo) =>{
          return todo.title === previousTitle
        })
        const [previousTodo] = previousTodoArray;
        ref
            .doc(previousTodo.id)
            .update({title,desc,deadline});
        setShowEdit(false);
    }
    const todoComplete = (todoItem)=>{
        //delete the todo from the todos array
        const updatedTodos = todos.filter((todo)=>{
            return todo.timestamp !== todoItem.timestamp
        });
        setTodos(updatedTodos);
        todoItem.completed = true;
        setCompletedTodos([...completedTodos,todoItem]);
        ref.doc(todoItem.id).delete();
        completedTodosref.add(todoItem);
        //create a new collection inside firestore for completed todos
        //delete the completedtodo from the todos array
        //add the completedtodo to this new collection
        //render them at /completed
    }
  	return (
  		<Container>
  		    <Router>
  			<Header  
  				title = "Todo List"
  			/>
  			<Switch>
              <Route exact path="/" render={()=>{
                   return (
                        <div>
                            <AddTodo addTodo={addTodo} />
                            { showEdit && <Edit 
                                title = {editTitle}
                                desc =  {editDesc}
                                deadline = {deadline}
                                setTitle = {(e)=>setEditTitle(e.target.value)}
                                setDesc = {(e)=>setEditDesc(e.target.value)}
                                setDeadline = {(e)=>setDeadline(e.target.value)}
                                editTask = {editTask}
                            /> }
  			               <Todos todos={todos} onEdit={onEdit} onComplete={todoComplete} />
                       </div>
                   )     
                }}></Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/completed">
                <CompletedTodos completedTodos={completedTodos} />
              </Route>
            </Switch>
            <Footer />
            </Router>
  		</Container>
  	)
}

export default App;
