import React from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

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

  login = () => {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => auth.signInWithPopup(provider))
      .then((result) => {
        const user = result.user;
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

    if (user) {
      return (<div>
        {user.displayName}&nbsp;
        <div className="dropdown d-inline">
          <button className="btn btn-outline-secondary" type="button"
            id="settingsDropdown" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i className="fa fa-gear"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="settingsDropdown">
            <Link to="/settings" className="dropdown-item" href="#">
              Settings
            </Link>
            <a className="dropdown-item" href="#" onClick={this.logout}>Logout</a>
          </div>
        </div>
      </div>);
    }
    return (<button onClick={this.login} type="button" className="btn btn-info">
      Login with Facebook
    </button>);
  }
}