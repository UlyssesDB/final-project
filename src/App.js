import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
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
  getCompletedProjects
} from './backend';

const uuidv4 = require('uuid/v4');

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      newThing: {}
    }
  }

  // EXAMPLE FUNCTION CALLS (with console logged output)
  async componentDidMount() {
    const user = await initializeUserIfNeeded()
    // console.log('user >>>', user)
    const project = await createProject(user.id, moment().add(7, 'd').format(), moment().add(20, 'd').format(), '18 fairlawn, beaconsfield, QC, canada', 'testing crap', 'test 1')
    // console.log('createProject >>>', project)
    const getProject = await getProjectInfo(user.id, project.id)
    // console.log('getProject >>>', getProject)
    const updateProj = await updateProject(user.id, project.id, 'demoStepOne')
    // console.log('verify project update in database >>>', updateProj)
    const cancelThisProject = await cancelProject(user.id, project.id)
    // const cancel3 = await cancelProject(user.id, "7b93eb63-6132-4218-a2b3-331922f3fae4")
    const currentprojects = await getCurrentProjects(user.id)
    // console.log('currentProjects length >>>', currentprojects.length)
    const cancelledProjects = await getCancelledProjects(user.id)
    // console.log('cancelledProjects >>>', cancelledProjects)
    const search = await searchProject(user.id, '6')
    // console.log('searchProject >>>', search)
    const completedProjects = await getCompletedProjects(user.id)
    // console.log('completedProjects >>>', completedProjects)
  }
  populate
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
