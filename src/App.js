import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
// import AddProject from './components/projects/AddProject';
import ProjectList from './components/projects/ProjectList';
import ProjectDetails from './components/projects/ProjectDetails';
import Navbar from './components/navbar/Navbar';
import TaskDetails from './components/tasks/TaskDetails';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    }
    this.service = new AuthService();
    // this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} exact path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute user={this.state.loggedInUser} exact path='/projects' component={ProjectList} />
            <ProtectedRoute user={this.state.loggedInUser} exact path="/projects/:id/tasks/:taskId" component={TaskDetails} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path='/' render={() => <Login getUser={this.getTheUser} />} />
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
            <ProtectedRoute user={this.state.loggedInUser} exact path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute user={this.state.loggedInUser} exact path='/projects' component={ProjectList} />
            <ProtectedRoute user={this.state.loggedInUser} exact path="/projects/:id/tasks/:taskId" component={TaskDetails} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
