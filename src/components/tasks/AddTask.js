import React, { Component } from 'react';
import axios from 'axios';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", isShowing: false };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const projectID = this.props.theProject._id; 
    axios.post(process.env.REACT_APP_API_URL + "/tasks", { title, description, projectID })
      .then(() => {
        this.props.getTheProject();
        this.setState({ title: "", description: "" });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  toggleForm = () => {
    this.setState({
      isShowing: !this.state.isShowing
    });

    // if (!this.state.isShowing) {
    //   this.setState({ isShowing: true });
    // } else {
    //   this.setState({ isShowing: false });
    // }
  }

  showAddTaskForm = () => {
    if (this.state.isShowing) {
      return (
        <div>
          <h3>Add Task</h3>
          <form onSubmit={this.handleFormSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)} />
            <label>Description:</label>
            <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)} />

            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <hr />
        <button onClick={() => this.toggleForm()}> Add task </button>
        {this.showAddTaskForm()}
      </div>
    )
  }
}

export default AddTask;