import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import { initializeUserIfNeeded, addToCurrentProjects, createProject, getProjectInfo, updateProject, getCurrentProjects } from './backend';

const uuidv4 = require('uuid/v4');

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      newThing: {}
    }
  }

  async componentDidMount() {
    const user = await initializeUserIfNeeded()
    const project = await createProject(user.id, moment().add(7, 'd').format(), moment().add(20, 'd').format(), '6 jasper rd, beaconsfield, QC, canada', 'project crap', 'project 1')
    const getProject = await getProjectInfo(user.id, project.id)
    console.log('getProject >>>', getProject)
    const updateProj = await updateProject(user.id, project.id, 'demoStepOne')
    const currentprojects = await getCurrentProjects(user.id)
    console.log(currentprojects)
  }

  render() {
    return (
      <div className="App">
        <p>Hello World</p>
        <p>{uuidv4()}</p>
      </div>
    );
  }
}

export default App;

// write test calls for backend functions here instead of through the backend itelf, this will eliminate need for unecessary backend testing