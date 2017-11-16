import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import CauseCard from '~/components/CauseCard';

export default class SettingsPage extends React.Component {
  constructor(props) {
    super(props);

    // TODO: user specific authentication
    this.state = {
      causes: {}
    };
  }

  componentWillMount() {
    // Load data from API here, store in state
    let causes = Api.getCausesRef();
    causes.once('value').then((snapshot) =>
      this.setState({causes: snapshot.val()})
    );
  }

	render() {
    let {causes} = this.state;

		return (<div className="home-page">
      <Hero />
      <div className="container">
        <div className="row">
        <div className="col-md-8">
            <h1>Settings</h1>
          </div>
        </div>
      </div>
    </div>);
	}
}
