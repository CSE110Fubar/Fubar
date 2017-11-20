import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import CauseCard from '~/components/CauseCard';
import checkAuth from '~/data/Auth';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      causes: {},
      user: {}
    };
  }

  componentWillMount() {
    checkAuth((user) => this.setState({user: user}));

    // Load data from API here, store in state
    let causes = Api.getCausesRef();
    causes.once('value').then((snapshot) =>
      this.setState({causes: snapshot.val()})
    );
  }

	render() {
    let {causes, user} = this.state;

		return (<div className="home-page">
      <Hero />
      <div className="container">
        {user && <div className="column">
          <h3>My Causes</h3>
        </div>}
        {user && <div className="row">
          {Object.keys(causes).map((causeId) =>
              <CauseCard cause={causes[causeId]} causeId={causeId} key={causeId} />
          )}
        </div>}

        <div className="column">
          <h3>Up and Coming Causes</h3>
        </div>
        <div className="row">
          {Object.keys(causes).map((causeId) =>
              <CauseCard cause={causes[causeId]} causeId={causeId} key={causeId} />
          )}
        </div>

        <div className="col-12 text-center">
          <button>View Petitions</button>
        </div>
      </div>
    </div>);
	}
}
