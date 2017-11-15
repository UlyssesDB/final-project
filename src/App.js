import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import { initializeUserIfNeeded, addToCurrentProjects, createProject, getProjectInfo, updateProject, cancelProject, getCurrentProjects, getCancelledProjects, searchProject } from './backend';

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
    console.log('user >>>', user)
    const project = await createProject(user.id, moment().add(7, 'd').format(), moment().add(20, 'd').format(), '18 fairlawn, beaconsfield, QC, canada', 'testing crap', 'test 1')
    console.log('createProject >>>', project)
    const getProject = await getProjectInfo(user.id, project.id)
    console.log('getProject >>>', getProject)
    const updateProj = await updateProject(user.id, project.id, 'demoStepOne')
    console.log('verify project update in database >>>')
    const cancelThisProject = await cancelProject(user.id, '0ba18954-7500-417d-a9e2-fb33293c3690')
    const cancelThisProject2 = await cancelProject(user.id, 'a052c7d4-7734-414c-bd46-d9b0fc13e6a7')
    const cancel3 = await cancelProject(user.id, "7b93eb63-6132-4218-a2b3-331922f3fae4")
    const currentprojects = await getCurrentProjects(user.id)
    console.log('currentProjects >>>', currentprojects)
    const cancelledProjects = await getCancelledProjects(user.id)
    console.log('cancelledProjects >>>', cancelledProjects)
    const search = await searchProject(user.id, 'fairlawn')
    console.log('searchProject >>>', search)
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