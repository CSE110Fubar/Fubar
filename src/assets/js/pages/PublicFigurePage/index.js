import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import CauseCard from '~/components/CauseCard';

export default class PublicFigurePage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      figure: {},
      supportedCauses: {},
      opposedCauses: {}
    };
  }

  componentWillMount() {
    let {params} = this.props.match;

    // Load data from API here, store in state
    Api.getPublicFigure(params.figureId)
    .once('value')
    .then((snapshot) => {
      this.setState({
        figure: snapshot.val()
      });

      snapshot.val().supportedCauses.map((causeId) => {
        Api.getCause(causeId)
        .once('value')
        .then((snapshot) => {
          this.setState({
            supportedCauses: {...this.state.supportedCauses, 
              [causeId]: snapshot.val()}
          });
        });
      })

      snapshot.val().opposedCauses.map((causeId) => {
        Api.getCause(causeId)
        .once('value')
        .then((snapshot) => {
          this.setState({
            opposedCauses: {...this.state.opposedCauses, 
              [causeId]: snapshot.val()}
          });
        });
      })
    })
    .catch(console.error);
  }

	render() {
    let {figure, supportedCauses, opposedCauses} = this.state;

    if (!figure) {
      return <div>Loading...</div>;
    }

		return (<div className="figure-page">
      <Hero/>
      <div className="container">
        <div className="row">
          <div className="col-md-8 figure-page__figure">
          <img src={figure.image} className="figure-page__image" />
            <h1>{figure.name}</h1>
            <h2>{figure.title}</h2>
          </div>
          <div className="col-md-4 figure-page__contacts">
            Contact Information<br/>
            {figure.phoneNo}<br/>
            {figure.website}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 figure-page__supporting">
            <h2>Supporting</h2>
            {Object.keys(supportedCauses).map((causeId) => 
              <CauseCard large cause={supportedCauses[causeId]}
                causeId={causeId} key={causeId} />
            )}
          </div>
          <div className="col-md-6 figure-page__opposing">
            <h2>Opposing</h2>
            {Object.keys(opposedCauses).map((causeId) => 
              <CauseCard large cause={opposedCauses[causeId]} causeId={causeId}
                key={causeId} />
            )}
          </div>
        </div>
      </div>
    </div>);
	}
}
