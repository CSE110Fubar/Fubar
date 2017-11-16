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
      this.setState({causes: snapshot.val()})
    );
    let figures = Api.getPublicFigureResults();
    figures.once('value').then((snapshot) =>
      this.setState({figures: snapshot.val()})
    );
  }

	render() {
    let {causes} = this.state;
    let {figures} = this.state;

		return (<div className="home-page">
      <Hero />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1>Settings</h1>
          </div>
          <div className="col-md-8">
            <h3>Facebook Visibility</h3>

            <h3>Causes I'm Following</h3>
            <CauseCard cause={causes["cause_1"]} causeId={"cause_1"} key={"c1"} />

            <h3>People I'm Following</h3>
            <PublicFigureCard publicFigure={figures["publicFigure_1"]} publicFigureId={"publicFigure_1"} key={"daddy"}  />

          </div>
        </div>
      </div>
    </div>);
	}
}
