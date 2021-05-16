import React from 'react';
import { Typography, Button, Container} from "@material-ui/core";
import Divider from "./Divider";
import firebase from "../firebase";

const Todo = (props) => {
    const deleteTodo = () =>{
		//this code will delete the todo from the firestore
    	const ref = firebase.firestore().collection("todos");
		ref.doc(props.todo.id).delete();
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
