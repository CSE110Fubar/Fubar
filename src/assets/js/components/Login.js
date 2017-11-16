import React from 'react';
import firebase from 'firebase';

import FirebaseApp from '~/Firebase';

const provider = new firebase.auth.FacebookAuthProvider();
const auth = FirebaseApp.auth();

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  login = () => {
    auth.signInWithPopup(provider) 
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

	render() {
    return (<button onClick={this.login} type="button" className="btn btn-info">
      Login with Facebook
    </button>);
	}
}