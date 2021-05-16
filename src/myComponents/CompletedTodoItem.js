import React from "react";
import { Container, Typography} from "@material-ui/core";
import Divider from "./Divider";
import "../App.css";

const CompletedTodo = (props)=>{
    const createdAt =  new Date(props.timestamp.seconds * 1000).toLocaleString();
    return(
        <div raised="true" className="completed-todo">
           <div>
                <Typography variant="h6">Title:{props.title}</Typography>
                <Typography variant="h6">Description:{props.desc}</Typography> 
                <Typography variant="h6">Created ON:{createdAt}</Typography> 
            </div>
        </div>
    )
}
export default CompletedTodo;
