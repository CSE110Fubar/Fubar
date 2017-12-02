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
      settings: {},
      supportingCauses: {}
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

  loadData = () => {
    let userId = this.state.user.uid;

    Api.getUserSettings(userId)
      .once('value')
      .then((snapshot) => this.setState({ settings: snapshot.val() }));

    Api.getUserSupportingCauses(userId)
      .then((supportingCauses) => this.setState({supportingCauses}));
  }

  toggleFbVisibility = () => {
    let settings = this.state.settings;
    let userId = this.state.user.uid;

    settings.fbVisibility = !settings.fbVisibility;
    db.ref('userSettings/' + userId).set(settings);
    this.setState({ settings: settings });
  }


  render() {
    let {user, causes, figures, settings, supportingCauses} = this.state;
    let fbVisibility = settings.fbVisibility;
    let fbVisibilityButton = null;

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
          {Object.keys(supportingCauses).map((causeId) =>
            <div className="col-md-3" key={causeId}>
              <CauseCard cause={supportingCauses[causeId]} causeId={causeId} />
            </div>
          )}
        </section>
      </div>
    </div>);
  }
}
