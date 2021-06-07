import React,{ useState, useContext } from "react";
import { Typography, Snackbar, Button } from "@material-ui/core";
import AddTodo from "./AddTodo";
import Edit from "./Edit";
import Todos from "./Todos";
import firebase from "../firebase";
import {  AuthContext } from "../Auth";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const Home = ({todos, setTodos, completedTodos, setCompletedTodos}) =>{
    //the logged in user
    const { currentUser } = useContext(AuthContext);
    //show edit component using booleans
    const [showEdit , setShowEdit] = useState(false);
    const [editTitle, setEditTitle]= useState("");
    const [editDesc, setEditDesc]= useState("");
    const [deadline, setDeadline] = useState("");
    const [ isCompleted, setIsCompleted ] = useState(false);

    const ref = firebase.firestore().collection("users");
    //add a todo
	const addTodo = (title,desc, deadline) =>{
        const createdAt = firebase.firestore.Timestamp.fromDate(new Date());
        const date = createdAt.toDate();
        //giev todos their unique serial number
        let sno = 0;
        if(todos.length){
            const lastTodoSno = todos[todos.length -1].sno;
            sno = lastTodoSno + 1
        }else{
            sno = 1;
        }
		const newTodo = {
            sno,
            timestamp:date,
			      title,
            desc,
            deadline,
            completed : false,
		}
        ref.doc(currentUser.uid).update(
            { todos: firebase.firestore.FieldValue.arrayUnion(newTodo)} //arrayUnion is just like push in js
        );
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
        if(title && desc && deadline){
            //get the todo which  user is currently editing
            const previousTodoArray = todos.filter((todo) =>{
              return todo.title === previousTitle
            })
            const [previousTodo] = previousTodoArray;
            //update the todo
            ref.doc(currentUser.uid).get().then((doc)=>{
                //get the present user Todos
                let userTodos = doc.data().todos;
                //the object the user wants to update
                let objectToUpdate = userTodos.filter((todoItem)=>{
                    return todoItem.sno === previousTodo.sno
                });
                //set all the fields which need to be updated
                    objectToUpdate[0].title = title;
                    objectToUpdate[0].desc= desc;
                    objectToUpdate[0].deadline = deadline;
                //update the entire todos array and set it to the updated Array
                ref.doc(currentUser.uid).update({
                    todos : userTodos
                });
                //after that set the showEdit to false
                setShowEdit(false);
            })
        }
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
        ref.doc(currentUser.uid).get().then((doc)=>{
            //get the present user Todos
            let userTodos = doc.data().todos;
            //the object the user wants to update
            let updatedTodos = userTodos.filter((todo)=>{
                return todo.sno !== todoItem.sno
            });
            userTodos = updatedTodos;
            //update the entire todos array and set it to the updated Array
            ref.doc(currentUser.uid).update({
                todos : userTodos
            });
            ref.doc(currentUser.uid).update(
                { completedTodos: firebase.firestore.FieldValue.arrayUnion(todoItem)}
            );
        })
        setIsCompleted(true);
    }

    return (
        <>
        {isCompleted === true && <Snackbar open={isCompleted} anchorOrigin={{vertical : "center",horizontal:"right"}} autoHideDuration={6000} onClose={()=> setIsCompleted(false)}>
            <Alert severity="success">
              <span>Todo completed </span>
              <Link to="/completed" style={{"textDecoration":"none"}}><Button color="secondary" size="small">View</Button></Link>
            </Alert>
          </Snackbar>
        }
        {todos.length > 0 && <Typography variant="h4" color="primary" style={{ "marginBottom" : "1em" }}>Todos : {todos.length} C'mon Hurry Up !! You can Do it </Typography>}
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
