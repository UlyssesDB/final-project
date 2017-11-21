import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  getTaskGroup
} from '../backend';
import Sidebar from './Sidebar';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="mainpage">
        {this.props.loggedIn
          ?
          <div>
            <h3>Welcome to the MainPage</h3>
            <button>Logout</button>
            <Link to="/createproject">
              <button>CreateProject</button>
            </Link>
            <Sidebar user={this.props.user}/>
            <h5>MapDisplay</h5>
            
          </div>
          :
          (
            <div>
              <h4>Please Authenticate to continue...</h4>
              <Link to={"/"}>
                <button>Return to LandingPage</button>
              </Link>
            </div>
          )
        }
      </div>
    );
  }
}

export default MainPage;
