import React, { Component } from 'react';
import axios from 'axios';
import service from '../../api/service';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      imageUrl: ""
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { title, description, imageUrl } = this.state;

    axios.post(process.env.REACT_APP_API_URL + "/projects", { title, description, imageUrl }, { withCredentials: true })
      .then(() => {
        this.props.getData();
        this.setState({ title: "", description: "", imageUrl: "" });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service.handleUpload(uploadData)
      .then(response => {
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)} />
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
          <input
            type="file"
            onChange={(e) => this.handleFileUpload(e)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddProject;