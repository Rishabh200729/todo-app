import React,{ useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import Edit from "./Edit";
import Todos from "./Todos";
import firebase from "../firebase";

const Home = (props) =>{  
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
    //add a todo
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
    })
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
