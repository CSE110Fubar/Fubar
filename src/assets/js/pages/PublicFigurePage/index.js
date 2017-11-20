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
          <div className="col-md-3">
            <img src={figure.image} className="figure-page__image" />
            
          </div>
          <div className="col-md-5">
            <h1 className="figure-page__name">{figure.name}</h1>
            <h2 className="figure-page__title">{figure.title}</h2>
          </div>
          <div className="col-md-4">
            <div className="figure-page__contacts">
            <i class="fa fa-phone" aria-hidden="true"></i> {figure.phoneNo}<br/>
            <i class="fa fa-globe" aria-hidden="true"></i> <a href={figure.website}
              className="figure-page__website">Personal Website</a>
            </div>
          </div>
        </div>

        <div className="row figure-page__cause-row">
          <div className="col-md-6">
            <h2 className="cause-page__section-header">Supporting</h2>
            <div className="row">
              {Object.keys(supportedCauses).map((causeId) => 
                <div className="col-md-6">
                  <CauseCard large cause={supportedCauses[causeId]}
                    causeId={causeId} key={causeId} />
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="cause-page__section-header">Opposing</h2>
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
