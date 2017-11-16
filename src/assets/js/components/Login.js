import React from 'react';
import firebase from 'firebase';

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
    checkAuth((user) => this.setState({user}));
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

	render() {
    let {user} = this.state;
    if (user) {
      return <div>{user.displayName}</div>
    }
    return (<button onClick={this.login} type="button" className="btn btn-info">
      Login with Facebook
    </button>);
	}
}