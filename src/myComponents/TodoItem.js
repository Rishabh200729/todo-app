import React from 'react';
import { Typography, Button, Container} from "@material-ui/core";
import Divider from "./Divider";
import firebase from "../firebase";
import { AuthContext } from "../Auth";

const Todo = (props) => {
	const { currentUser } = React.useContext(AuthContext);

    const deleteTodo = () =>{
		//delete the todo from the firestore
    	const ref = firebase.firestore().collection("users");
		ref.doc(currentUser.uid).get().then((doc)=>{
            //get the present user Todos
            let userTodos = doc.data().todos;
            //the object the user wants to update
            let updatedTodos = userTodos.filter((todoItem)=>{
            	return todoItem.sno !== props.todo.sno
            });
            console.log(updatedTodos)
            userTodos = updatedTodos;
            //update the entire todos array and set it to the updated Array
            ref.doc(currentUser.uid).update({
                todos : userTodos
            });
        })    
	}
	return (
		<div className="todo">
			<br />
			<Typography variant="h4">Title: {props.todo.title}</Typography>
			<Typography variant="h5">Description: {props.todo.desc}</Typography>
			<Typography variant="h6">DeadLine : {props.todo.deadline}</Typography>
			<Container maxWidth="sm">
				<Button fullWidth="true" size="large" variant="outlined" color="secondary" className="add-btn" onClick={deleteTodo}>Delete</Button>   
				<br />
				<br />
				<Button fullWidth="true" size="large"  variant="outlined" color="secondary" className="edit-btn" onClick={()=>props.onEdit(props.todo)} >Edit</Button>
				<br />
				<br />
				<Button fullWidth="true" size="large"  variant="outlined" color="secondary" className="edit-btn" onClick={() => props.onComplete(props.todo)}>Completed</Button>
			    <Divider />
			</Container>
		</div>
	)
}

export default Todo;
