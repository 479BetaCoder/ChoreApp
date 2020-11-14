import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
      <div className="headerContainer">
        <h1>Chore App</h1>
      </div>
      <form className="formContainer" autoComplete="off">
        <TextField
          id="assigneeText"
          label="Assignee"
          helperText="Please enter assignee name"
          variant="outlined" required  />
         <TextField
          id="descriptionText"
          label="Description"
          helperText="Please enter task description"
          variant="outlined" required  />
          <Button className="btnAddTask" type="submit" variant="outlined" color="primary">Add Task</Button>
      </form>
      <div className="todoListContainer">
      </div>
      </div>
    );
  }
}

export default App;
