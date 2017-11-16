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
  getCompletedProjects,
  displayUser
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
    // const project1 = await createProject(user.id, moment().add(1, 'd').format(), moment().add(25, 'd').format(), '20 lakeshore, beaconsfield, QC, canada', 'testing description', 'test 1')
    // const project2 = await createProject(user.id, moment().add(2, 'd').format(), moment().add(19, 'd').format(), '50 fairlawn, beaconsfield, QC, canada', 'testing testing', 'test 2')
    // const project3 = await createProject(user.id, moment().add(3, 'd').format(), moment().add(50, 'd').format(), '26 jasper, beaconsfield, QC, canada', 'testing blablabla', 'test 3')
    // const project4 = await createProject(user.id, moment().add(4, 'd').format(), moment().add(5, 'd').format(), '40 christophe-colomb, montreal, QC, canada', 'testing', 'test 4')
    // const project5 = await createProject(user.id, moment().add(5, 'd').format(), moment().add(20, 'd').format(), '60 fairlawn, beaconsfield, QC, canada', 'testing fairlawn', 'test 5')
    // const project6 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '5 fairlawn, beaconsfield, QC, canada', 'testing beaconsfield', 'test 6')
    // const project7 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '10 fairlawn, beaconsfield, QC, canada', 'testing this description', 'test 7')
    // const project8 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '11 fairlawn, beaconsfield, QC, canada', 'testing dsfsdsdfsdf', 'test 8')
    // const project9 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '12 fairlawn, beaconsfield, QC, canada', 'testing fdkjdsipvsckjfsdlkf', 'test 9')
    // const project91 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '13 fairlawn, beaconsfield, QC, canada', 'testing sdlkfsdlkfjsdklfj', 'test 91')
    // const project92 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '14 fairlawn, beaconsfield, QC, canada', 'testing obpviponmaf', 'test 92')
    // const project93 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '15 fairlawn, beaconsfield, QC, canada', 'testing dsfiueiotdsmnfklds ijfdsklfjslkdjflksdjf lksdfjldksjfklsdjf', 'test 93')
    // console.log('createProject >>>', project1)
    const getProject = await getProjectInfo(user.id, '186ed3f2-167f-49fe-9e7f-4da6e61d1751')
    console.log('getProject >>>', getProject)
    const updateProj = await updateProject(user.id, '326f95b6-a725-42f4-80c5-e4f6bb506828', 'demoStepOne')
    // console.log('verify project update in database >>>', updateProj)
    const cancelThisProject = await cancelProject(user.id, '3dfc4179-5c9d-41e5-88dd-e22af56d2344')
    console.log('cancelThisProject >>>', cancelThisProject)
    const currentprojects = await getCurrentProjects(user.id)
    console.log('currentProjects length >>>', currentprojects)
    const cancelledProjects = await getCancelledProjects(user.id)
    console.log('cancelledProjects >>>', cancelledProjects)
    const search = await searchProject(user.id, '6')
    console.log('searchProject >>>', search)
    const completedProjects = await getCompletedProjects(user.id)
    console.log('completedProjects >>>', completedProjects)
    const gimmeUserInfo = await displayUser(user.id)
    console.log('gimmeUserInfo >>>', gimmeUserInfo)
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
