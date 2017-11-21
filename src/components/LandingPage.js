import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { initializeUserIfNeeded } from '../backend';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = { 
      
    }
  }

  render() {
    return (
        <div className="login">
          <h4>Please Authenticate:</h4>
          <Link to={"/mainpage"}>
            <button onClick={() => this.props.loginUser()}>Authenticate</button>
          </Link>
        </div>
    );
  }
}

export default LandingPage;
