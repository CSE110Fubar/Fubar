import React from 'react';
import FontAwesome from 'react-fontawesome'

import * as Api from '~/data/Api';
import CauseCard from '~/components/CauseCard';
import checkAuth from '~/data/Auth';
import Firebase from '~/Firebase';
import Hero from '~/components/Hero';
import Footer from '~/components/Footer';
import PublicFigureCard from '~/components/PublicFigureCard';

const db = Firebase.database();

export default class SettingsPage extends React.Component {
  constructor(props) {
    super(props);

    // TODO: user specific authentication
    this.state = {
      user: {},
      causes: {},
      figures: {},
      settings: {},
      followedCauses: {}
    };
  }

  componentWillMount() {
    checkAuth((user) => {
      this.setState({ user: user });
      if (user) {
        this.loadData();
      }
    });
  };

  loadFollowedCauses = () => {
    let { user } = this.state;

    return Api.getUserSettings(user.uid)
      .once('value')
      .then(snapshot => snapshot.val())
      .then(settings => {
        if (!settings) return;
        if (!settings.followedCauses) {
          return this.setState({ followedCauses: [] });
        }
        return this.setState({ followedCauses: Object.values(settings.followedCauses) });
      });
  }

  loadData = () => {
    let userId = this.state.user.uid;

    Api.getUserSettings(userId)
      .once('value')
      .then((snapshot) => this.setState({ settings: snapshot.val() }));

    this.loadFollowedCauses();

    Api.getCausesRef()
    .once('value')
    .then((snapshot) => this.setState({causes: snapshot.val()}));
  }

  toggleFacebookVisibility = () => {
    let settings = this.state.settings;
    let userId = this.state.user.uid;

    settings.facebookVisibility = !settings.facebookVisibility;
    db.ref('userSettings/' + userId).set(settings);
    this.setState({ settings: settings });
  }

  followCause = (causeId) => {
    return Api.userFollowCause(this.state.user.uid, causeId)
      .then(this.loadFollowedCauses);
  }

  unfollowCause = (causeId) => {
    return Api.userUnfollowCause(this.state.user.uid, causeId)
      .then(this.loadFollowedCauses);
  };

  render() {
    let { user, causes, figures, settings, followedCauses } = this.state;
    let facebookVisibility = settings.facebookVisibility;


    return (<div className="settings-page">
      <Hero />
      <div className="container">
        <h1>Settings</h1>
        <section className="row settings-page__section">
          <div className="col-3">
            <h3 className="cause-page__section-header">Facebook Visibility</h3>
          </div>
          <div className="col-9">
            <button className="btn btn-primary"
              onClick={this.toggleFacebookVisibility}>
              <FontAwesome name={facebookVisibility ? 'eye' : 'circle-o'} />{' '}
              {facebookVisibility ? 'Visible' : 'Hidden'}
            </button>
          </div>
        </section>
        <section className="row cause-page__section">
          <div className="col-12">
            <h3 className="cause-page__section-header">Causes You Follow</h3>
          </div>
          {user && followedCauses && causes && <div className="row">
            {Object.values(followedCauses)
              .map((causeId) =>
                <div className="col-md-3" key={causeId}>
                  <CauseCard cause={causes[causeId]} causeId={causeId}
                    showFollow={!!user} follow={() => this.followCause(causeId)}
                    unfollow={() => this.unfollowCause(causeId)}
                    following={true} />
                </div>
            )}
            </div>}
        </section>
      </div>
      <Footer />
    </div>);
  }
}
