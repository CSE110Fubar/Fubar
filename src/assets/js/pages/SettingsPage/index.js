import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import CauseCard from '~/components/CauseCard';
import PublicFigureCard from '~/components/PublicFigureCard';

export default class SettingsPage extends React.Component {
  constructor(props) {
    super(props);

    // TODO: user specific authentication
    this.state = {
      causes: {},
      figures: {}
    };
  }

  componentWillMount() {
    // Load data from API here, store in state
    Api.getCausesRef()
    .once('value')
    .then((snapshot) => this.setState({causes: snapshot.val()}));

    Api.getPublicFigureResults()
    .once('value')
    .then((snapshot) => this.setState({figures: snapshot.val()}));
  }

  render() {
    let { causes } = this.state;
    let { figures } = this.state;

    return (<div class="home-page">
      <Hero />
      <div class="container">
        <h1>Settings</h1>
        <section className="row cause-page__section">
          <div className="col-12">
            <h3 className="cause-page__section-header">Causes You Follow</h3>
          </div>
          {Object.keys(causes).map((causeId) => 
            <CauseCard cause={causes[causeId]} causeId={causeId} key={causeId} />
          )}
        </section>
        <section className="row cause-page__section">
          <div className="col-12">
            <h3 className="cause-page__section-header">People You Follow</h3>
          </div>
          {Object.keys(figures).map((figureId) =>
            <PublicFigureCard publicFigure={figures[figureId]} publicFigureId={figureId} />
          )}
        </section>
      </div>
    </div>);
  }
}
