import React , { useState } from 'react'
import "../App.css";
import { TextField, Button } from '@material-ui/core';

const AddTodo = (props) => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
    const [deadLine , setDeadLine] = useState(0);
 	const [showTodo, setShowTodo] = useState(false);

	const handleClick = () =>{
		setShowTodo(!showTodo);
	}
	const submit = (event) =>{
		event.preventDefault();
		if(!title || !desc || !deadLine){
			alert("PLease type in title and desc and deadLine and try again");
		}else{
            props.addTodo(title, desc, deadLine);
		    setTitle("");
            setDesc("");  
            setDeadLine("");
        	setShowTodo(false);
        }
	}

	return (
		<div className="add-todo">
			<Button color={showTodo ? "secondary": "primary"} variant="contained" className="show-todo-btn" onClick={handleClick}>{showTodo ? "Close" : "Add Todo"}</Button>
			{showTodo && 
			<div className="add-todo-form">
				<form>
					<TextField margin="normal" variant="outlined" fullWidth="true" type="text" label="Todo TITLE" className="to-do-input" value={title} onChange={(e)=> setTitle(e.target.value)} />
					<TextField margin="normal" variant="outlined" fullWidth="true"  type="text" label="Todo DESCRIPTION" className="to-do-input" value={desc} onChange={(e)=> setDesc(e.target.value)} />
					<TextField 
                   		type="date"
				    	margin="normal" 
				    	variant="outlined" 
				    	fullWidth="true" 
				    	label="Todo DeadLine"
				    	value={deadLine} 
				    	onChange={(e) => setDeadLine(e.target.value)} />
					<br /> 
					<br />
					<Button className="add-btn" variant="contained" color="primary" type="submit"  onClick={submit}>Add Todo</Button>
            	</form>
			</div>}
		</div>
	)
}

export default AddTodo ;
