import React,{ useState, useContext } from "react";
import AddTodo from "./AddTodo";
import Edit from "./Edit";
import Todos from "./Todos";
import firebase from "../firebase";
import {  AuthContext } from "../Auth";

const Home = ({todos, setTodos, completedTodos, setCompletedTodos}) =>{  
    //the logged in user 
    const { currentUser } = useContext(AuthContext);
    //show edit component using booleans
    const [showEdit , setShowEdit] = useState(false);
    const [editTitle, setEditTitle]= useState("");
    const [editDesc, setEditDesc]= useState("");
    const [deadline, setDeadline] = useState("");

    const ref = firebase.firestore().collection("users");
    const completedTodosref = firebase.firestore().collection("completedTodos");
    
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
        ref.doc(currentUser.uid).update(
            { todos: firebase.firestore.FieldValue.arrayUnion(newTodo)} //arrayUnion is just like push in js
        )
    } 
    //this is going to run when edit button is clicked on the todo compoenent
    const onEdit = (todo)=>{
        setEditTitle(todo.title);
        setEditDesc(todo.desc);
        setDeadline(todo.deadline);
        setShowEdit(!showEdit); 
    }
    
    //update the task in the toodos state and the todos collection
    const editTask = (title, desc ,deadline , previousTitle) =>{
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
    
    //when completed button on todoItem is clicked.
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
    }
    
    return (
        <>
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
        </>
    )    
}
export default Home
