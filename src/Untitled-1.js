const projectRaw = await database.ref(`users/${userId}/projects`).child(projectId).once('value')
const project = projectRaw.val()