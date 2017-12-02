import React from 'react';
import {Link} from 'react-router-dom';

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
      user: {},
      supportingCauses: {}
    };
  }

  componentWillMount() {
    checkAuth((user) => {
      this.setState({user: user})
      if(user) this.loadMyCauses(user.uid);
    });

    // Load data from API here, store in state
    Api.getCausesRef()
    .once('value')
    .then((snapshot) => this.setState({causes: snapshot.val()}));
  }

  loadMyCauses = (userId) => {
    Api.getUserSupportingCauses(userId)
    .then((supportingCauses) => this.setState({supportingCauses}));
  }

  render() {
    let {causes, user, supportingCauses} = this.state;

    return (<div className="home-page">
      <Hero />
      <div className="container">
        {user && <div className="column">
          <h3>My Causes</h3>
        </div>}
        {user && supportingCauses && <div className="row">
          {Object.keys(supportingCauses).map((causeId) =>
            <div className="col-md-3" key={causeId}>
              <CauseCard cause={supportingCauses[causeId]} causeId={causeId} />
            </div>
          )}
        </div>}

        <section className="home-page__section">
          <div className="column">
            <h3>Up and Coming Causes</h3>
          </div>
          <div className="row">
            {Object.keys(causes)
            .filter((causeId) => {
              if (!Object.keys(supportingCauses)) return true;
              return Object.keys(supportingCauses).indexOf(causeId) === -1;
            })
            .map((causeId) =>
              <div className="col-md-3" key={causeId}>
                <CauseCard cause={causes[causeId]} causeId={causeId} />
              </div>
            )}
          </div>
        </section>

        <section className="home-page__section">
          <div className="col-6 offset-3 text-center">
            <Link to="/petitions" className="btn btn-primary btn-block">
              View Petitions
            </Link>
          </div>
        </section>
      </div>
    </div>);
  }
}
