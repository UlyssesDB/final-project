import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  initializeUserIfNeeded,
  addToCurrentProjects,
  createProject,
  getProjectInfo,
  updateProject,
  cancelProject,
  getCurrentProjects,
  getCancelledProjects,
  searchProject,
  checkCompletionStatus,
  getCompletedProjects,
  displayUser,
  editProjectNotes,
  getTaskGroup, 
  auth
} from './backend';
import Tests from './Tests';
import LandingPage from './components/LandingPage';
import MainPage from './components/MainPage';
import CreateProject from './components/CreateProject';
import ProjectProfile from './components/ProjectProfile';

const uuidv4 = require('uuid/v4');

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loggedIn: false
    }
    this.loginUser = this.loginUser.bind(this);    
  }

  async loginUser() {
    //console.log("Login state is being passed from up from child(LandingPage) to parent(App)")
    const user = await initializeUserIfNeeded()
    // console.log('USER >>', user)
    this.setState({
      user,
      loggedIn: true
    })
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      let u = user.providerData[0];
      const newUser = {
        name: u.displayName,
        id: u.uid,
        email: u.email,
        img: u.photoURL,
      }
      if (user) {
        console.log('updated user', newUser)
        this.setState({ ...this.State, user: newUser });
      } 
    });
  }
  
  // plan
  //   LandingPage
  //     login
  //   MainPage
  //       logout
  //     SearchBar
  //     Sidebar
  //     MapDisplay
  //     CreateProject
  //       submit button (returns to main page)
  //     ProjectProfile
  //       return to mainpage button

  render() {
    console.log('rereding')
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Tests /> */}
          <Route exact={true} path="/" render={() => <LandingPage loginUser={this.loginUser} loggedIn={this.state.loggedIn} />} />
          <Route path="/mainpage" render={() => <MainPage user={this.state.user} loggedIn={this.state.loggedIn} />} />
          <Route path="/createproject" render={() => <CreateProject user={this.state.user} loggedIn={this.state.loggedIn} />} />
          <Route path="/projectprofile/:id" render={(props) => <ProjectProfile user={this.state.user} location={props.location.pathname} loggedIn={this.state.loggedIn} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
