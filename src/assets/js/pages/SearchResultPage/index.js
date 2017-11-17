import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import CauseCard from '~/components/CauseCard';
import PublicFigureCard from '~/components/PublicFigureCard';
import PetitionCard from '~/components/PetitionCard';

export default class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      causes: {},
      publicFigures: {},
      petitions: {}
    };
  }

  componentWillMount() {

    let causes = Api.getCausesRef();
    causes.once('value').then((snapshot) =>
      this.setState({causes: snapshot.val()})
    );

    // Load data from API here, store in state
    let publicFigures = Api.getPublicFigureResults();
    publicFigures.once('value').then((snapshot) =>
      this.setState({publicFigures: snapshot.val()})
    );

    let petitions = Api.getPetitionsRef();
    petitions.once('value').then((snapshot) =>
      this.setState({petitions: snapshot.val()})
    );
  }

	render() {
    let {causes, publicFigures, petitions} = this.state;

		return (<div className="search-results-page">
      <Hero />
      <div className="container">
        <h1 className="search-results-page__header">Results</h1>
        <h2>Causes</h2>
        <div className="row">
          {Object.keys(causes).map((causeId) =>
            <CauseCard cause={causes[causeId]} causeId={causeId} key={causeId} />
          )}
        </div>
        <h2>Public Figures</h2>
        <div className="row">
          {Object.keys(publicFigures).map((publicFigureId) => 
            <PublicFigureCard publicFigure={publicFigures[publicFigureId]} publicFigureId={publicFigureId} key={publicFigureId} />
          )}
        </div>
        <h2>Petitions</h2>
        <div className="row">
          {Object.keys(petitions).map((petitionId) => 
            <PetitionCard petition={petitions[petitionId]} petitionId={petitionId} key={petitionId} />
          )}
        </div>
      </div>
    </div>);
	}
}
