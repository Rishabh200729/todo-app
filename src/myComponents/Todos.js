import React from 'react'
import TodoItem from "./TodoItem";
import {Typography} from "@material-ui/core";
import "../App.css";

const Todos = (props) => {
	return (
		<div className="todos">
			<Typography variant="h3">Your Todos</Typography>
			{ props.todos.length   ?  props.todos.map(todo=>{ 
		    	return <TodoItem 
		    		key={todo.id} 
		    		todo={ todo } 
					onEdit = {props.onEdit}
		    		onComplete={props.onComplete} /> 
			}):<h1>Add todo to get started</h1> } 
		</div>
        
	)
}

export default Todos
