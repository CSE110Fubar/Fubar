import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import Footer from '~/components/Footer';
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

		return (<div className="results-page">
      <Hero />
      <div className="container">
        <h1 className="results-page__header">Results</h1>
        <h2 className="results-page__section-header">Causes</h2>
        <div className="row">
          {Object.keys(causes).map((causeId) =>
            <div className="col-md-3" key={causeId}>
              <CauseCard cause={causes[causeId]} causeId={causeId} />
            </div>
          )}
        </div>
        <h2 className="results-page__section-header">Public Figures</h2>
        <div className="row">
          {Object.keys(publicFigures).map((publicFigureId) => 
            <div className="col-md-2" key={publicFigureId}>
              <PublicFigureCard publicFigure={publicFigures[publicFigureId]}
                publicFigureId={publicFigureId} />
            </div>
          )}
        </div>
        <h2 className="results-page__section-header">Petitions</h2>
        {Object.keys(petitions).map((petitionId) => 
          <PetitionCard petition={petitions[petitionId]}
            petitionId={petitionId} key={petitionId} />
        )}
      </div>
      <Footer/>
    </div>);
	}
}
