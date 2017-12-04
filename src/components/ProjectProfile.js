import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getProjectInfo,
  cancelProject,
  updateProject,
  editProjectNotes
} from '../backend';

class ProjectProfile extends Component {
  constructor() {
    super();
    this.state = {

    }
    // console.log('projectprofile state >>>', this.state.project)
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.user != this.props.user) {
  //     const projId = this.props.location.slice(16);

  //     console.log('get project data', this.props)
  //     getProjectInfo(this.props.user.id, projId).then(async (response) => {
  //       this.setState({
  //         project: await getProjectInfo(this.props.user.id, projId)
  //       });
  //       console.log('getinfo >>>>>', response)
  //     });
  //   }
  // }

  componentDidMount() {
    // console.log('props >>>', this.props)
    // console.log('componentDidMount Project', this.props)

    //   console.log('getinfo >>>>>', response)
    // )
    const projId = this.props.location.slice(16);
    
          console.log('get project data', this.props)
          getProjectInfo(this.props.user.id, projId).then(async (response) => {
            this.setState({
              project: await getProjectInfo(this.props.user.id, projId)
            });
            console.log('getinfo >>>>>', response)
          });
    // console.log('projectprofile componentDidMount >>>', this.state.project)
  }

  async cancelMe() {
    const projId = this.props.location.slice(16);
    cancelProject(this.props.user.id, projId)
  }

  async editNotes() {
    editProjectNotes(this.props.user.id, this.state.project.id, this.state.notes)
  }

  render() {
    return (
      <div className="projectfragment">
        {!this.state.project
          ?
          (<p>Loading...</p>)
          :
          <div>
            <hr />
            <Link to={'/mainpage'}>
              <button>Back to mainpage</button>
            </Link>
            <h4>Project data:</h4>
            <p>{'name: ' + this.state.project.name}</p>
            <p>{'Project started: ' + this.state.project.startDate.slice(0, 10) + ' Projected enddate: ' + this.state.project.endDate.slice(0, 10)}</p>
            <p>{'address: ' + this.state.project.address}</p>
            <p>{this.state.project.status.isOnTime ? 'isOnTime: true' : 'isOnTime: false'}</p>
            <p>{Math.floor(this.state.project.status.progress * 100) + '% complete'}</p>
            <p>{'description: ' + this.state.project.description}</p>
            <p>{this.state.project.notes ? 'notes: ' + this.state.project.notes : ' '}</p>
            <p>{'coords: lat: ' + this.state.project.coords.lat + ' lng: ' + this.state.project.coords.lng}</p>
            <p>{this.state.project.current ? 'current: in progress' : 'current: shelved'}</p>
            <p>{this.state.project.cancelled ? 'cancelled: project has been cancelled' : 'cancelled: in progress'}</p>
            <div>
              <h4>Current weather at this location:</h4>
              <p>{'Current temperature: ' + this.state.project.weather.temperature}</p>
              <p>{'Feels like: ' + this.state.project.weather.apparentTemperature}</p>
              <p>{'Summary: ' + this.state.project.weather.summary}</p>
              <p>{'Chance of rain: ' + (this.state.project.weather.precipProbability * 100) + '%'}</p>
            </div>
            <input type='text' value={this.state.notes} onChange={(e) => this.setState({ ...this.state, notes: e.target.value })} />
            <button onClick={()=> this.editNotes()}>Update Notes</button>
            {console.log('weather: >>>', this.state.project.weather)}
            {this.state.project.cancelled || !this.state.project.current ? '' :
              <Link to={'/mainpage'} >
                <button type='submit' onClick={() => this.cancelMe()} >Cancel Project</button>
              </Link>
            }
            <hr />
          </div>
        }
      </div>
    );
  }
}

export default ProjectProfile;
