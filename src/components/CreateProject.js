import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createProject } from '../backend';

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      startDate: '',
      endDate: '',
      address: '',
      description: '',
      name: '',
      notes: ''
    }
  }

  async _createProject() {
    await createProject(this.props.user.id, this.state.startDate, this.state.endDate, this.state.address, this.state.description, this.state.name, this.state.notes)
    // this.setState({
    //   startDate: '',
    //   endDate: '',
    //   address: '',
    //   description: '',
    //   name: ''
    // })
  }

  render() {
    return (
      <div className="createproject">
        <div><br />
          <label>name:</label>
          <input type='text' value={this.state.name} onChange={(e) => this.setState({ ...this.state, name: e.target.value })} />
          <br />
          <label>start date:</label>
          <input type='text' value={this.state.startDate} onChange={(e) => this.setState({ ...this.state, startDate: e.target.value })} />
          <br />
          <label>end date:</label>
          <input type='text' value={this.state.endDate} onChange={(e) => this.setState({ ...this.state, endDate: e.target.value })} />
          <br />
          <label>address:</label>
          <input type='text' value={this.state.address} onChange={(e) => this.setState({ ...this.state, address: e.target.value })} />
          <br />
          <label>description:</label>
          <input type='text' value={this.state.description} onChange={(e) => this.setState({ ...this.state, description: e.target.value })} />
          <label>notes:</label>
          <input type='text' value={this.state.notes} onChange={(e) => this.setState({ ...this.state, notes: e.target.value })} />
          <Link to="/mainpage">
            <button onClick={() => this._createProject()}>Submit Project</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CreateProject;
