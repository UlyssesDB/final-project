import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getProjectInfo,
  getCurrentProjects,
  getCancelledProjects,
  searchProject,
  checkCompletionStatus,
  getCompletedProjects,
} from '../backend';

class ProjectFragment extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="projectfragment">
        <hr />
        <p>{'address: ' + this.props.data.address}</p>
        <p>{this.props.data.status.isOnTime ? 'isOnTime: true' : 'isOnTime: false'}</p>
        <p>{Math.floor(this.props.data.status.progress * 100) + '% complete'}</p>
        <Link to={`/projectprofile/${this.props.data.id}`}>
          <button type='submit' >View Project</button>
        </Link>
        <hr />
      </div>
    );
  }
}

export default ProjectFragment;
