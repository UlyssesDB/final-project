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
  displayUser,
  editProjectNotes,
  getTaskGroup
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
    console.log('user >>>', user)
    // const project01 = await createProject(user.id, moment().add(1, 'd').format(), moment().add(25, 'd').format(), '20 lakeshore, beaconsfield, QC, canada', 'testing description', 'test 1')
    // const project02 = await createProject(user.id, moment().add(2, 'd').format(), moment().add(19, 'd').format(), '50 fairlawn, beaconsfield, QC, canada', 'testing testing', 'test 2')
    // const project03 = await createProject(user.id, moment().add(3, 'd').format(), moment().add(50, 'd').format(), '26 jasper, beaconsfield, QC, canada', 'testing blablabla', 'test 3')
    // const project04 = await createProject(user.id, moment().add(4, 'd').format(), moment().add(5, 'd').format(), '40 christophe-colomb, montreal, QC, canada', 'testing', 'test 4')
    // const project05 = await createProject(user.id, moment().add(5, 'd').format(), moment().add(20, 'd').format(), '60 fairlawn, beaconsfield, QC, canada', 'testing fairlawn', 'test 5')
    // const project06 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '5 fairlawn, beaconsfield, QC, canada', 'testing beaconsfield', 'test 6')
    // const project07 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '10 fairlawn, beaconsfield, QC, canada', 'testing this description', 'test 7')
    // const project08 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '11 fairlawn, beaconsfield, QC, canada', 'testing dsfsdsdfsdf', 'test 8')
    // const project09 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '12 fairlawn, beaconsfield, QC, canada', 'testing fdkjdsipvsckjfsdlkf', 'test 9')
    // const project10 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '13 fairlawn, beaconsfield, QC, canada', 'testing sdlkfsdlkfjsdklfj', 'test 91')
    // const project11 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '14 fairlawn, beaconsfield, QC, canada', 'testing obpviponmaf', 'test 92')
    // const project12 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '15 fairlawn, beaconsfield, QC, canada', 'testing dsfiueiotdsmnfklds ijfdsklfjslkdjflksdjf lksdfjldksjfklsdjf', 'test 93')
    // const project13 = await createProject(user.id, moment().add(6, 'd').format(), moment().add(20, 'd').format(), '400 st-laurent, montreal, QC, canada', 'testing dsfiueiotdsmnfklds ijfdsklfjslkdjflksdjf lksdfjldksjfklsdjf', 'test 93')
    // console.log('createProject >>>', project01)
    const getProject = await getProjectInfo(user.id, '4d630938-edf7-4f37-ad93-97e7f5aa50f0')
    console.log('getProject >>>', getProject)
    const updateProj = await updateProject(user.id, '505acf0c-b0ca-4721-9f67-ad838d1f9d58', 'demoStepOne')
    console.log('verify project update in database >>>', updateProj)
    const cancelThisProject = await cancelProject(user.id, '54b9438f-3ca1-462a-9e3d-9b880911659b')
    console.log('cancelThisProject >>>', cancelThisProject)
    const currentprojects = await getCurrentProjects(user.id)
    console.log('currentProjects >>>', currentprojects)
    const cancelledProjects = await getCancelledProjects(user.id)
    console.log('cancelledProjects >>>', cancelledProjects)
    const search = await searchProject(user.id, 'montreal')
    console.log('searchProject >>>', search)
    const completedProjects = await getCompletedProjects(user.id)
    console.log('completedProjects >>>', completedProjects)
    const gimmeUserInfo = await displayUser(user.id)
    console.log('gimmeUserInfo >>>', gimmeUserInfo)
    const changeProjectNotes = await editProjectNotes(user.id, '562916e1-2ad2-4732-bdaa-e6cc4d8b10f7', 'HEY CHECK NOTES')
    console.log('changeProjectNotes >>>', changeProjectNotes)
    const getSomeTasks = await getTaskGroup(user.id, '562916e1-2ad2-4732-bdaa-e6cc4d8b10f7', 'foundation')
    console.log('getSomeTasks >>>', getSomeTasks)
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
