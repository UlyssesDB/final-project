import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCurrentProjects,
  getCancelledProjects,
  getCompletedProjects,
  searchProject
} from '../backend';
import ProjectFragment from './ProjectFragment';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  async componentDidMount() {
    const projects = await getCurrentProjects(this.props.user.id)
    console.log('sidebar >>>', projects)
    this.setState({
      projects: projects || [],
      searchBar: ''
    })
  }

  async grabCancelled() {
    const cprojects = await getCancelledProjects(this.props.user.id)
    this.setState({
      projects: cprojects
    })
  }

  async grabCompleted() {
    const projects = await getCompletedProjects(this.props.user.id)
    this.setState({
      projects
    })
  }

  async grabCurrent() {
    const projects = await getCurrentProjects(this.props.user.id)
    this.setState({
      projects
    })
  }

  async grabSearch() {
    const projects = await searchProject(this.props.user.id, this.state.searchBar)
    this.setState({
      projects,
      searchBar: ''
    })
  }

  render() {
    return (
      <div className="sidebar">
        <button onClick={() => this.grabCancelled()}>Cancelled Projects</button>
        <button onClick={() => this.grabCurrent()}>Current Projects</button>
        <button onClick={() => this.grabCompleted()}>Completed Projects</button>
        <br />
        <input type="text" value={this.state.searchBar} onChange={(e) => this.setState({ searchBar: e.target.value })} />
        <button onClick={() => this.grabSearch()}>Search</button>
        {this.state.projects.map((p) => (<ProjectFragment key={p.id} data={p} address={p.address} status={p.status} />))}
      </div>
    );
  }
}

export default Sidebar;
