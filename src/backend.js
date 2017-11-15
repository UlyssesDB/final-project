import firebase from 'firebase';
import moment from 'moment';
const uuidv4 = require('uuid/v4');

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);
const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();
const storageRef = firebase.storage().ref();

const GOOGLE_MAPS_API_KEY = '';
const GOOGLE_MAPS_API_URL = '';

const DARKSKY_API_URL = '';
const DARKSKY_API_KEY = '';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

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

export async function displayUser() {
  // not needed
}

export async function createProject(userId, startDate, endDate, address, description, name) {
  const projectId = uuidv4();
  console.log(userId, startDate, endDate, address, description, name)
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
      // use .inludes() to render the different tyoes of tasks
    },
    startDate: moment(startDate).format(),
    endDate: moment(endDate).format(),
    address,
    coords: await getCoords(address), // contains {lat: '', lng: ''}
    description,
    name,
    current: true,
    cancelled: false
  })
  return {...newProject, id: projectId}                                                     // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
}


// returns a promise containing an full object info for 1 id
export async function getProjectInfo(userId, projectId) {
  const projectRaw = await database.ref(`users/${userId}/projects`).child(projectId).once('value')
  const project = projectRaw.val()
  const weather = await weatherApp(project.coords)
  return {...project, projectId, weather}
}

export async function getCurrentProjects(userId) {
  const currentProjects = await database.ref(`users/${userId}/projects`).once('value')
  const projects = currentProjects.val()
  const filteredProjects = Object.keys(projects).map(p => ({
    ...projects[p],
    id: p
  })).filter(p => p.current).map(p =>({...p, status: calculateProgressStatus(p)}))
  return filteredProjects
}

// Maps over an array and returns a promise containing an object {Address, status, geo{lat, lng} }for each array element
            //    >>>>>> replaced by logic inside searchProject function <<<<<<
// export async function getProjectInfoThumbnail(userId) {
//   const newArr = array.map((e)=> ({ 
//     address: user[e].location,
//     status: calculateProgressStatus(user[e].completionStatus),
//     coords: user[e].coords
//   }))
//   return newArr
// }

// returns a promise containing an array of IDs
export async function searchProject(user, searchText) { 
  // get all projects
  // then if there is a search term argument passed to it, use search term to filter over projects
  // if not, give back all projects
  //return an array of projectIds populated by checking user.projectId.name for the searchText
}

// //  Same as above but cancelled
export async function cancelProject(user, projectId) {
  const projectRaw = await database.ref(`users/${userId}/projects`).child(projectId).once('value')
  const project = projectRaw.val()
  if(project.cancelled) return
  const updatedProject = await database.ref(`users/${userId}/projects`).child(projectId).set({
    ...project,
    current: false,
    cancelled: true
  })
  return { ...updatedProject, id: projectId }  
}

export async function updateProject(userId, projectId, task) {
  const projectRaw = await database.ref(`users/${userId}/projects`).child(projectId).once('value')
  const project = projectRaw.val()
  const updatedProject = await database.ref(`users/${userId}/projects`).child(projectId).set({
    ...project,
    completionStatus: {
      ...project.completionStatus,
      [task]: !project.completionStatus[task]
    }
  })
  return { ...updatedProject, id: projectId }  
}

// export async function editProjectNotes(user, projectId) {
//   // edit notes section of project, if we add this functionality
// }

export async function calculateProgressStatus(project) {
  const progress = Object.keys(project.completionStatus).map(p => project.completionStatus[p])
  const comparedLengths = progress.filter(p => p).length / progress.length
  const start = moment(project.startDate).unix()
  const current = moment().unix()
  const end = moment(project.endDate).unix()
  const comparedTimes = (end - current) / (end - start)
  
  console.log(comparedLengths)
  console.log(comparedTimes)

  return {isOnTime: comparedLengths > comparedTimes, progress: comparedLengths}
  // 			compare start/end dates to completionStatus (number of tasks completed) and generate flags
  //         (behind schedule, on-time, ahead of schedule)
  // also get picture
  // start date, end date, current date
    // (end date - current date) / (end date - start date) = percentage
    // num boxes checked / total checkboxes = percentage
    // if progress > time = good
    // if progress < time = bad
    //return percent done, and on-time: true/false
}

export async function populateMap() {

}

async function getCoords(address) {
  const url = `${GOOGLE_MAPS_API_URL}?address=${address}&key=${GOOGLE_MAPS_API_KEY}`;
  const fetchCoords = await fetch(url)
  const data = await fetchCoords.json()
  console.log(data)
  const coords = data.results[0].geometry.location
  return coords
  // return lat, lng
}

export async function weatherApp(coords) {
  const url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;
  const fetchWeather = await fetch(url)
  const data = await fetchWeather.json()
  console.log(data)
  const weather = data.currently
  return weather
}






// general contractor project management software

// data structure (firebase)
// user (only one user, software is custom built for each company <<< not hard to create different users, very little change <<<<<
// name
//  id
//  email
//  picture
//  projects
  //  project1
  // 		completion status
  // 			isometric image displayed is dependant on completion status
  // 			progress bar displayed is dependant on completion status (and also on-time status?)
  // 		start date - end date
  // 		location
  // 			used by weather widget
  // 		description
  // 		name
  // 	project2
  // 		completion status
  // 		start date - end date
  // 		location
  // 		description
  // 		name
  // 	project3
  // 		completion status
  // 		start date - end date
  // 		location
  // 		description
  // 		name
//

// functionality
// 	progress status
// 			compare start/end dates to completion status and generate flags
//         (behind schedule, on-time, ahead of schedule)

// add notes section to each project?                                   <<<<<<<<<<<<<<<<