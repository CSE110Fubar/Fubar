import React from 'react';
import {Link} from 'react-router-dom';

import * as Api from '~/data/Api';
import CauseCard from '~/components/CauseCard';
import checkAuth from '~/data/Auth';

import Featurette from './components/Featurette';
import Footer from '~/components/Footer';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      causes: {},
      user: {},
      supportingCauses: {},
      opposingCauses: {},
      followedCauses: []
    };
  }

  componentWillMount() {
    checkAuth((user) => {
      this.setState({user: user})
      if(user) {
        this.loadMyCauses(user.uid);
        this.loadFollowedCauses();
      }
    });

    // Load data from API here, store in state
    Api.getCausesRef()
    .once('value')
    .then((snapshot) => this.setState({causes: snapshot.val()}));
  }

  followCause = (causeId) => {
    return Api.userFollowCause(this.state.user.uid, causeId)
    .then(this.loadFollowedCauses);
  }

  unfollowCause = (causeId) => {
    return Api.userUnfollowCause(this.state.user.uid, causeId)
    .then(this.loadFollowedCauses);
  };

  loadMyCauses = (userId) => {
    Api.getUserSupportingCauses(userId)
    .then((supportingCauses) => this.setState({supportingCauses}));
    Api.getUserOpposingCauses(userId)
    .then((opposingCauses) => this.setState({opposingCauses}));
  }

  loadFollowedCauses = () => {
    let {user} = this.state;

    return Api.getUserSettings(user.uid)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(settings => {
      if(!settings) return;
      if(!settings.followedCauses) {
        return this.setState({followedCauses: []});
      }
      return this.setState({followedCauses: Object.values(settings.followedCauses)});
    })
  }

  render() {
    let {causes, user, supportingCauses, opposingCauses,
      followedCauses} = this.state;

    return (<div className="home-page">
      <Featurette />
      <div className="container">
        {user && <div className="column">
          <h3>Causes You Follow</h3>
          <div className="hline"></div>
        </div>}
        {user && followedCauses && <div className="row">
          {followedCauses.map((causeId) =>
            <div className="col-md-3" key={causeId}>
              <CauseCard cause={causes[causeId]} causeId={causeId}
                showFollow={!!user} follow={() => this.followCause(causeId)}
                unfollow={() => this.unfollowCause(causeId)}
                following={true} />
            </div>
          )}
        </div>}

        <section className="home-page__section">
          <div className="column">
            <h3>Up and Coming Causes</h3>
            <div className="hline"></div>
          </div>
          <div className="row">
            {Object.keys(causes)
            .filter((causeId) => {
              if (!Object.keys(supportingCauses)) return true;
              return Object.keys(supportingCauses).indexOf(causeId) === -1;
            })
            .filter((causeId) => {
              if (!Object.keys(opposingCauses)) return true;
              return Object.keys(opposingCauses).indexOf(causeId) === -1;
            })
            .map((causeId) =>
              <div className="col-md-3" key={causeId}>
                <CauseCard cause={causes[causeId]} causeId={causeId}
                  showFollow={!!user} follow={() => this.followCause(causeId)}
                  unfollow = {() => this.unfollowCause(causeId)}
                  following={followedCauses.indexOf(causeId) !== -1} />
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer/>
    </div>);
  }
}
