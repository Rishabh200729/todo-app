import React from "react";
import CompletedTodo from "./CompletedTodoItem";
import {Typography,  } from "@material-ui/core";
import "../App.css";

const CompletedTodos = (props) =>{
    return ( 
        <>
            <Typography variant="h2">Your Completed Todos</Typography>
            <div className="completed-todos">
            {props.completedTodos.length ? props.completedTodos.map((todo)=>{
                return <CompletedTodo key={todo.sno} title={todo.title} desc={todo.desc} timestamp={todo.timestamp} />
            }):<Typography variant="h2">No Completed Todos</Typography>}
            </div>
        </>
    ) 
}
export default CompletedTodos;
