// tests in App.js

// used 'moment' (for date), and 'uuidv4' (to randomly generate project id's)
// npm install inside project directory should install all these dependencies
import firebase from 'firebase';
import moment from 'moment';
const uuidv4 = require('uuid/v4');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBHS4i9jcJ-1wFXr616e1pUJL6S36hOUkg",
  authDomain: "project-50595.firebaseapp.com",
  databaseURL: "https://project-50595.firebaseio.com",
  projectId: "project-50595",
  storageBucket: "project-50595.appspot.com",
  messagingSenderId: "717431088466"
};
firebase.initializeApp(config);
const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();
const storageRef = firebase.storage().ref();

const GOOGLE_MAPS_API_KEY = 'AIzaSyAFvMwd8d-YI-3x-wS64O6XzHL62fqysI4';
const GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

const DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
const DARKSKY_API_KEY = 'baa65f32ef962af56f5ca63c60bd8d1d';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const auth = firebase.auth();

// login user, returns user object
export async function initializeUserIfNeeded() {
  const googleUser = await firebase.auth().signInWithPopup(provider)
  const existingUser = await database.ref('users/').child(googleUser.additionalUserInfo.profile.id).once('value')
  if (existingUser.val()) {
    return existingUser.val()
  } else {
    const newUser = {
      name: googleUser.additionalUserInfo.profile.name,
      id: googleUser.additionalUserInfo.profile.id,
      email: googleUser.additionalUserInfo.profile.email,
      img: googleUser.additionalUserInfo.profile.picture,
    }
    database.ref('users/').child(googleUser.additionalUserInfo.profile.id).set(newUser)
    return newUser
  }
}

// not needed, user data already available as object upon initialization
// returns on object with only basic user data, not including projects
export async function displayUser(userId) {
  const userRaw = await database.ref(`users/`).child(userId).once('value')
  const userData = userRaw.val()
  const requiredInfo = {
    email: userData.email,
    id: userData.id,
    img: userData.img,
    name: userData.name,
    // projects: userData.projects                          // comment in if projects data is required
                  // Object.keys(userData.projects) ???
  }
  return requiredInfo
}

// adds a new project to firebase
// coordinates are automatically calculated based on address input
// returns an object, which includes the project id
export async function createProject(userId, startDate, endDate, address, description, name) {
  const projectId = uuidv4();
  const newProject = await database.ref(`users/${userId}/projects`).child(projectId).set({
    completionStatus: {
      demoStepOne: false,
      demoStepTwo: false,
      demoStepThree: false,
      foundationStepOne: false,
      foundationStepTwo: false,
      foundationStepThree: false,
      wallsStepOne: false,
      wallsStepTwo: false,
      wallsStepThree: false,
      roofingStepOne: false,
      roofingStepTwo: false,
      roofingStepThree: false,
      finishingStepOne: false,
      finishingStepTwo: false,
      finishingStepThree: false
      // use Object.keys(project.completionStatus).filter(a => a.includes('demo').map(a=>({[a]: project.completedStatus[a]}))) to render the different types of tasks
      // or use getTaskGroup() function
    },
    startDate: moment(startDate).format(),
    endDate: moment(endDate).format(),
    address,
    coords: await getCoords(address), // contain this object {lat: '', lng: ''}
    description,
    name,
    current: true,
    cancelled: false
                // modified with editProjectNotes() function
                // input directly at project creation can be added by adding 'notes' to the parameters, and the notes: value
  })
  console.log(newProject, projectId)
  return { ...newProject, id: projectId }
}

// example: returns only/all 'demo' related tasks
export async function getTaskGroup(userId, projectId, group) {
  const projectRaw = await database.ref(`users/${userId}/projects`).child(projectId).once('value')
  const project = projectRaw.val()  
  const taskGroup = Object.keys(project.completionStatus).filter(a => a.includes(group)).map(a=>({[a]: project.completionStatus[a]}))
  return taskGroup
}

// returns a project as an object, which includes project id, and current weather
export async function getProjectInfo(userId, projectId) {
  const projectRaw = await database.ref(`users/${userId}/projects`).child(projectId).once('value')
  const project = projectRaw.val()
  console.log(' backend getinfo>>>', project, userId, projectId)
  const weather = await weatherApp(project.coords)
  const status = calculateProgressStatus(project)
  return { ...project, id: projectId, weather, status }
}

// returns an array of all 'current' projects, as objects, with progress status
export async function getCurrentProjects(userId) {
  console.log('call working')
  const currentProjects = await database.ref(`users/${userId}/projects`).once('value')
  const projects = currentProjects.val()
  const filteredProjects = Object.keys(projects).map(p => ({
    ...projects[p],
    id: p
  })).filter(p => p.current && !p.cancelled).map(p => ({ ...p, status: calculateProgressStatus(p) }))
  return filteredProjects
}

// returns an array of all 'cancelled' projects, as objects, with progress status
export async function getCancelledProjects(userId) {
  const currentProjects = await database.ref(`users/${userId}/projects`).once('value')
  const projects = currentProjects.val()
  const filteredProjects = Object.keys(projects).map(p => ({
    ...projects[p],
    id: p
  })).filter(p => p.cancelled).map(p => ({ ...p, status: calculateProgressStatus(p) }))
  return filteredProjects
}

// returns an array of all 'completed' projects, as objects, with progress status
export async function getCompletedProjects(userId) {
  const currentProjects = await database.ref(`users/${userId}/projects`).once('value')
  const projects = currentProjects.val()
  const filteredProjects = Object.keys(projects).map(p => ({
    ...projects[p],
    id: p,
  })).filter(p => checkCompletionStatus(p)).map(p => ({...p, status: calculateProgressStatus(p) }))
  return filteredProjects
  // function to get completed projects
  //if true  then set current: false (not in this function)
  // calls the checkalltakscompleted function in a filter over all the projects
  //calculateProgressStatus
}

// returns an array of objects with all projects that match the search criteria
// search criteria checks name, description, and address for anything that includes the searchTerm
export async function searchProject(userId, searchText) {
  const allProjects = await database.ref(`users/${userId}/projects`).once('value')
  const projects = allProjects.val()
  const filteredProjects = Object.keys(projects).map(p => ({
    ...projects[p],
    id: p
  })).filter(p => p.name.includes(searchText) || p.description.includes(searchText) || p.address.includes(searchText)).map(p => ({ ...p, status: calculateProgressStatus(p) }))
  return filteredProjects
  // get all projects
  // then if there is a search term argument passed to it, use search term to filter over projects
  // if not, give back all projects
  // return an array of projectIds populated by checking user.projectId.name for the searchText
}

// cancels a project by setting 'current' status to false, and 'cancelled' status to true
export async function cancelProject(userId, projectId) {
  const projectRaw = await database.ref(`users/${userId}/projects`).child(projectId).once('value')
  const project = projectRaw.val()
  if (project.cancelled) return
  const updatedProject = await database.ref(`users/${userId}/projects`).child(projectId).set({
    ...project,
    current: false,
    cancelled: true
  })
  return { ...updatedProject, id: projectId }
}

// toggles a project.completionStatus.task to true/false depending on it's current value
// to be used with task checklists
export async function updateProject(userId, projectId, task) {
  const projectRaw = await database.ref(`users/${userId}/projects`).child(projectId).once('value')
  const project = projectRaw.val()
  const updatedProjectRaw = {
    ...project,
    completionStatus: {
      ...project.completionStatus,
      [task]: !project.completionStatus[task]
    }
  }
  const updatedProject = {
    ...updatedProjectRaw,
    current: project.current ?
      !checkCompletionStatus(updatedProjectRaw)
      : false
  }
  const weather = await weatherApp(updatedProject.coords)
  const status = calculateProgressStatus(updatedProject)
  database.ref(`users/${userId}/projects`).child(projectId).set(updatedProject)
  return { ...updatedProject, id: projectId, weather, status }
}

// tests if a project's completionStatus tasks have all been set to true (i.e. project is complete)
// called within:
   // getCompletedProjects
   // updateProject
function checkCompletionStatus(p) {
  const arr = Object.keys(p.completionStatus).map(k => p.completionStatus[k])
  const complete = arr.filter(a => a).length
  return arr.length === complete
}

// returns an object with two keys {isOnTIme: true/false, progress: %}
// called within:
    // getProjectInfo
    // getCurrentProjects
    // getCancelledProjects
    // getCompletedProjects
function calculateProgressStatus(project) {
  const progress = Object.keys(project.completionStatus).map(p => project.completionStatus[p])
  const comparedLengths = progress.filter(p => p).length / progress.length
  const start = moment(project.startDate).unix()
  const current = moment().unix()
  const end = moment(project.endDate).unix()
  const comparedTimes = (end - current) / (end - start)
  //console.log('calculateProgressStatus >>>', { isOnTime: comparedLengths > comparedTimes, progress: comparedLengths })
  return { isOnTime: comparedLengths > comparedTimes, progress: comparedLengths }
          //  isOnTime: returns true/false, progress: returns percentage as decimal value

  // start date, end date, current date
  // (end date - current date) / (end date - start date) = percentage
  // num boxes checked / total checkboxes = percentage
  // if progress > time = good
  // if progress < time = bad
  //return percent done, and on-time: true/false
}

// used within createProject function to set coordinates object
async function getCoords(address) {
  const url = `${GOOGLE_MAPS_API_URL}?address=${address}&key=${GOOGLE_MAPS_API_KEY}`;
  const fetchCoords = await fetch(url)
  const data = await fetchCoords.json()
  const coords = data.results[0].geometry.location
  return coords // return {lat: '', lng: ''}
}

// used within getProjectInfo function to get weather object, adds it as a key within the return project object
async function weatherApp(coords) {
  const url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;
  const fetchWeather = await fetch(url)
  const data = await fetchWeather.json()
  const weather = data.currently
  return weather
}

// populate map based on each project's coords  WILL BE IN FRONT END .map(a=>({coords: a.coords, status: a.status}))
export async function populateMap() {

}

// added functionality/stretch goal, edits notes section of a project
export async function editProjectNotes(userId, projectId, inputText) {
  const projectRaw = await database.ref(`users/${userId}/projects`).child(projectId).once('value')
  const project = projectRaw.val()
  const updatedProject = await database.ref(`users/${userId}/projects`).child(projectId).set({
    ...project,
    notes: inputText
  })
  return { ...updatedProject, id: projectId }
  // edit notes section of project, if we add this functionality
}




// add assert tests


// underscore / double-underscore <<<<<<<<<<<<<<<<<<<

// check-uncheck list <<<<<<<<<<<<<<<