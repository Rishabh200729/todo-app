import React, { useState } from 'react'
import { Typography } from "@material-ui/core";
//compare 2 dates

const Status = ({ deadline }) => {
  const [ status, setStatus ] = useState(compareDate(new Date(deadline), new Date()) ? "Active" : "Deadline Crossed");
  function compareDate(first, second){
    if(first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate()){
      return true;
    }else {
      if(first.getTime() > second.getTime()){
        return true;
      }else{
        return false;
      }
    }
  }
  return (
    <Typography variant="h5">Status : { status === "Active" ?
      <span style={{ "color" : "#00af91" }}> {status} </span> : <span style={{ "color" : "#f54748" }}>  {status}</span> }
    </Typography>
  )
}

export default Status
