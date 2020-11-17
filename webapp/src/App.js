import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./App.css";
import Footer from "./components/Footer/Footer";
import * as api from "./utils/ApiManager";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignee: "",
      description: "",
      todoItems: [],
    };
  }

  async componentDidMount() {
    // request to get the todo items if any
    await this.getTodoItems();
  }

  handleAssigneeChange = (event) => {
    this.setState({ assignee: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  getTodoItems = async () => {
    try {
      const fetchedItems = await api.getTodoItems();
      this.setState({
        todoItems: fetchedItems,
      });
    } catch (error) {
      console.log("Some issue occured !!", error.message);
    }
  };

  // Function to handle add Task
  addTodo = async (event) => {
    try {
      // prevent default Submit
      event.preventDefault();

      // Build a new TODO object
      const todoObj = {
        assignee: this.state.assignee,
        description: this.state.description,
      };

      // call the add todo end point
      const newTodoItem = await api.addTodoItem(todoObj);

      let currentTodo = this.state.todoItems;
      currentTodo.push(newTodoItem);

      this.setState({
        todoItems: currentTodo,
        assignee: "",
        description: "",
      });
    } catch (error) {
      console.log("Some issue occured !!", error.message);
    }
  };

  // Function to handle complete task
  updateTodo = async (id) => {
    try {
      const response = await api.updateTodoItem(id);
      if (response.status === 200) {
        let currentTodo = this.state.todoItems;
        currentTodo.find((todo) => todo._id === id).completed = true;
        this.setState({ todoItems: currentTodo });
      } else {
        alert("Some issue occurred in updating the todo item");
      }
    } catch (error) {
      console.log("Some issue occured !!", error.message);
    }
  };

  // Function to handle clearing tasks
  clearTodos = async () => {
    try {
      const response = await api.clearTodoItems();
      if (response.status === 200) {
        this.setState({ todoItems: [] });
      } else {
        alert("Some issue occurred in clearing the todo items");
      }
    } catch (error) {
      console.log("Some issue occured !!", error.message);
    }
  };

  renderTodoItems() {
    return (
      <ul className="todoListContainer">
        {this.state.todoItems
          ? this.state.todoItems.map((element) => {
              return (
                <li key={element._id}>
                  <div className="listItem">
                    <i
                      style={{
                        color: element.completed ? "green" : "black",
                        paddingTop: "22px",
                      }}
                      className="fa fa-check-circle fa-2x"
                    ></i>
                    <label>
                      {element.assignee.length > 20
                        ? element.assignee.substring(0, 20).concat("...")
                        : element.assignee}
                    </label>
                    <label>
                      {element.description.length > 25
                        ? element.description.substring(0, 25).concat("...")
                        : element.description}
                    </label>
                    <Button
                      disabled={element.completed}
                      onClick={() => this.updateTodo(element._id)}
                      className="btnCompleteTask"
                      variant="outlined"
                      color="primary"
                    >
                      Complete Task
                    </Button>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div style={{ height: "100vh" }}>
          <div className="headerContainer">
            <h1>Chore App</h1>
          </div>
          <form
            className="formContainer"
            autoComplete="off"
            onSubmit={this.addTodo}
          >
            <TextField
              id="assigneeText"
              label="Assignee"
              value={this.state.assignee}
              onChange={this.handleAssigneeChange}
              helperText="Please enter assignee name"
              variant="outlined"
              required
            />
            <TextField
              id="descriptionText"
              label="Description"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              helperText="Please enter task description"
              variant="outlined"
              required
            />
            <Button
              className="btnAddTask"
              type="submit"
              variant="outlined"
              color="primary"
            >
              Add Task
            </Button>
          </form>
          {this.state.todoItems ? (
            <Button
              className="btnClearTask"
              onClick={() => this.clearTodos()}
              type="submit"
              variant="outlined"
              color="secondary"
            >
              Clear Tasks
            </Button>
          ) : null}
          <div>{this.renderTodoItems()}</div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
