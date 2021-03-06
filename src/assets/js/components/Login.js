import React from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import * as Api from '~/data/Api';
import FirebaseApp from '~/Firebase';
import checkAuth from '~/data/Auth';

const provider = new firebase.auth.FacebookAuthProvider();
const auth = FirebaseApp.auth();

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  };

  componentWillMount() {
    checkAuth((user) => this.setState({user: user}));
  };

  addUserSettings = (user) => {
    let settings = Api.getUserSetting(user.uid);

    settings
    .once('value')
    .then((snapshot) => {
      // Check that it doesn't already exist
      if(snapshot.exists()) {
        return;
      }
      
      // Create a new settings object
      settings.set({
        admin: false,
        facebookVisibility: true,
        followedCauses: []
      });
    });
  };

  login = () => {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => auth.signInWithPopup(provider))
      .then((result) => {
        const user = result.user;

        this.addUserSettings(user);
        this.setState({user});
      })
      .catch(console.error);
  };

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({user: {}});
      })
      .catch(console.error);
  };

  render() {
    let {user} = this.state;
    let {transparent} = this.props;

    let buttonTransparent = transparent ? 'settings-button--transparent' : '';

    if (user) {
      return (<div>
        <div className="dropdown d-inline">
          <button className={`btn settings-button ${buttonTransparent}`}
            type="button" id="settingsDropdown" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            {user.displayName} <i className="fa fa-angle-down"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="settingsDropdown">
            <Link to="/settings" className="dropdown-item" href="#">
              <i className="fa fa-cogs"></i> Settings
            </Link>
            <a className="dropdown-item" href="#" onClick={this.logout}>
              <i className="fa fa-sign-out"></i> Logout
            </a>
          </div>
        </div>
      </div>);
    }
    return (<button onClick={this.login} type="button"
      className="btn btn-primary">
      <span className="fa-stack">
        <i className="fa fa-square-o fa-stack-2x fa-inverse"></i>
        <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
      </span> Login
    </button>);
  }
}