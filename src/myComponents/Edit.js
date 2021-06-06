import React, { useState } from "react";
import "../App.css";
import firebase from "../firebase";
import { TextField, Button, Container } from "@material-ui/core";

const Edit = (props) => {
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.desc);
  const [deadline, setDeadline] = useState(props.deadline);

  const submit = (e) => {
    e.preventDefault();
    props.editTask(props.title,props.desc,props.deadline,title);
  }
  return (
    <Container>
      <form className="edit-form"  autoComplete="off">
        <TextField
          fullWidth="true"
          color="secondary"
          margin="normal"
          variant="outlined"
          label="Edit Todo Title"
          value={props.title}
          onChange={props.setTitle}
        ></TextField>
        <TextField
          fullWidth="true"
          color="primary"
          margin="normal"
          variant="outlined"
          label="Edit Todo Desc"
          value={props.desc}
          onChange={props.setDesc}
        ></TextField>
        <TextField
          type="date"
          fullWidth="true"
          color="primary"
          margin="normal"
          variant="outlined"
          label="Edit Todo Deadline"
          value={props.deadline}
          onChange={props.setDeadline}
        ></TextField>
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={submit}
          type="submit"
        >
          Edit Todo
        </Button>
      </form>
    </Container>
  );
};
export default Edit;
