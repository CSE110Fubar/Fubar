import React from 'react';
import FontAwesome from 'react-fontawesome'

import * as Api from '~/data/Api';
import CauseCard from '~/components/CauseCard';
import checkAuth from '~/data/Auth';
import Firebase from '~/Firebase';
import Hero from '~/components/Hero';
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
      settings: {}
    };
  }

  componentWillMount() {
    checkAuth((user) => {
      this.setState({user: user});
      console.log('user', this.state.user);
      if (user) {
        console.log('componentwillmount', user);
        console.log('componentwillmount', this.state.user);
        this.loadData();
      }
    });
  };

  loadData = () => {
    let userId = this.state.user.uid;

    Api.getUserSettings(userId)
      .once('value')
      .then((snapshot) => this.setState({ settings: snapshot.val() }));

    // Load data from API here, store in state
    Api.getCausesRef()
      .once('value')
      .then((snapshot) => this.setState({ causes: snapshot.val() }));

  };

  toggleFbVisibility = () => {
    let settings = this.state.settings;
    let userId = this.state.user.uid;

    settings.fbVisibility = !settings.fbVisibility;
    db.ref('userSettings/' + userId).set(settings);
    this.setState({settings: settings})
    console.log(settings.fbVisibility);
    console.log(this.state.settings);
  };


  render() {
    let {user, causes, figures, settings} = this.state;
    let fbVisibility = settings.fbVisibility;
    let fbVisibilityButton = null;

    console.log('rendered', fbVisibility);
    if (fbVisibility) {
      fbVisibilityButton = <FontAwesome
        name='eye' onClick={this.toggleFbVisibility} />
    } else {
      fbVisibilityButton = <FontAwesome
        name='circle-o' onClick={this.toggleFbVisibility} />
    }
    return (<div className="settings-page">
      <Hero />
      <div className="container">
        <h1>Settings</h1>
        <section className="row settings-page__section">
          <div className="col-3">
            <h3 className="cause-page__section-header">Facebook Visibility</h3>
          </div>
          <div className="col-9">
            {fbVisibilityButton}
          </div>
        </section>
        <section className="row cause-page__section">
          <div className="col-12">
            <h3 className="cause-page__section-header">Causes You Follow</h3>
          </div>
          {Object.keys(causes).map((causeId) =>
            <div className="col-md-3" key={causeId}>
              <CauseCard cause={causes[causeId]} causeId={causeId} />
            </div>
          )}
        </section>
      </div>
    </div>);
  }
}
