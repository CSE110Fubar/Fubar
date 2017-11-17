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
    let causes = Api.getCausesRef();
    causes.once('value').then((snapshot) =>
      this.setState({ causes: snapshot.val() })
    );
    let figures = Api.getPublicFigureResults();
    figures.once('value').then((snapshot) =>
      this.setState({ figures: snapshot.val() })
    );
  }

  render() {
    let { causes } = this.state;
    let { figures } = this.state;

    return (<div class="home-page">
      <Hero />
      <div class="container">
        <h1>Settings</h1>
        <h3>Causes I'm Following</h3>
        <div class="row">
          <CauseCard cause={causes["cause_1"]} causeId={"cause_1"} key={"c1"} />
        </div>
        <h3>People I'm Following</h3>
        <div class="row">
          
          <PublicFigureCard publicFigure={figures["publicFigure_1"]} publicFigureId={"publicFigure_1"} key={"daddy"} />
        </div>
      </div>
    </div>);
  }
}
