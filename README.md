FORMATTING IN .MD NOT WORKING PROPERLY, CLONE REPO TO DISPLAY README FILE CORRECTLY

NOTES:

- tests in App.js (with console logged output)

- used 'moment' (for date), and 'uuidv4' (for randomly generated project id's)

- 'npm install' inside project directory should install all dependencies

- firebase config must be input

- google maps API must be input

- darksky API must be input


FUNCTION LIST (with parameters, and explanation):

initializeUserIfNeeded()  
    // login user, returns user object

displayUser(userId)
    // not needed, user data already available as object upon initialization
    // returns on object with only basic user data, not including projects (see notes inside function / can be included if required)

createProject(userId, startDate, endDate, address, description, name)
    // adds a new project to firebase
    // coordinates are automatically calculated based on address input
    // returns an object, which includes the project id

export function getTaskGroup(project, group)
    // example: returns only/all 'demo' related tasks
    //   console.log(getTaskGroup(project, 'demo'))

getProjectInfo(userId, projectId) 
    // returns a single project as an object, which includes project id, current weather, and progress status

getCurrentProjects(userId)
    // returns an array of all 'current' projects, as objects, with progress status

getCancelledProjects(userId)
    // returns an array of all 'cancelled' projects, as objects, with progress status

getCompletedProjects()
    // returns an array of all 'completed' projects, as objects, with progress status

searchProject(userId, searchText)
    // returns an array of objects with all projects that match the search criteria
    // search criteria checks name, description, and address for anything that includes the searchTerm

cancelProject(userId, projectId)
    // cancels a project by setting 'current' status to false, and 'cancelled' status to true

updateProject(userId, projectId, task)
    // toggles a project.completionStatus.task to true/false depending on it's current value
    // to be used with task checklists

checkCompletionStatus(userId, project)
    // tests if a project's completionStatus tasks have all been set to true (i.e. project is complete)
    // will not be exported, only used within backend, only exported for testing
    // called within:
        // getCompletedProjects
        // updateProject

calculateProgressStatus(project)
    // returns an object with two keys {isOnTIme: true/false, progress: %}
    // will not be exported, only used within backend, only exported for testing
    // called within:
        // getProjectInfo
        // getCurrentProjects
        // getCancelledProjects
        // getCompletedProjects

getCoords(address)
    // used within createProject function to set coordinates object
    // will not be exported, only used within backend, only exported for testing

weatherApp(coords)
    // used within getProjectInfo function to get weather object, adds it as a key within the return project object
    // will not be exported, only used within backend, only exported for testing

populateMap() INCOMPLETE
    // populate map based on each project's coords 

export async function editProjectNotes(userId, projectId, inputText)
  // edit notes section of project, if we add this functionality
  // function is complete and can be used if needed, see notes in backend.js createProject() function


DATABASE STRUCTURE:

new firebase data structure
    user
        name
        id
        email
        picture
        projects
            completionStatus
                demoStepOne
                demoStepTwo
                demoStepThree
                foundationStepOne
                foundationStepTwo
                foundationStepThree
                wallsStepOne
                wallsStepTwo
                wallsStepThree
                roofingStepOne
                roofingStepTwo
                roofingStepThree
                finishingStepOne
                finishingStepTwo
                finishingStepThree
          startDate
          endDate
          address
          coords
                lat
                lng
          description
          name
          current
          cancelled
          notes

 
REMOVED:

// Maps over an array and returns a promise containing an object {Address, status, geo{lat, lng} }for each array element
            //    >>>>>> replaced by logic inside searchProject function and getProjectInfo function <<<<<<
// export async function getProjectInfoThumbnail(userId) {
//   const newArr = array.map((e)=> ({ 
//     address: user[e].location,
//     status: calculateProgressStatus(user[e].completionStatus),
//     coords: user[e].coords
//   }))
//   return newArr
// }



export async function getIsometricImage(image) {
  const isometricImage = await storageRef.child(`isometric/${image}`).getDownloadURL()
  console.log('isometricImage >>>>>>>>>>', isometricImage)
  //const imageURL = image.downloadURL
  //return imageURL
  return { isometricImage }
}

 // return image url in calculateProgressStatus function depending on percentage returned                          <<<<<<<<<<<<<<<<<<
      // need to know how many tasks there will be in total
      // need to know what percent complete returns what image

// const pic = await getIsometricImage(user.id, '1-01.png')
    // console.log('getIsometricImage >>>', pic)




//  indent the functions into each other depending on which rely on which                                          <<<<<<<<<<<<<<<<<<<<
