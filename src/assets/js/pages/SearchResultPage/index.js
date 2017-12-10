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
    this.getResults = this.getResults.bind(this)
    this.state = {
      causes: {},
      publicFigures: {},
      petitions: {}
    };
  }

  componentDidMount() {
    let {params} = this.props.match;
    this.getResults(params.query);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.query != this.props.match.params.query) {
      this.getResults(newProps.match.params.query);
    }
  }

  getResults(query) {
    var causes = {};
    var publicFigures = {};
    var petitions = {};

    //clear previous results
    this.setState({causes, publicFigures, petitions});

    Api.getCausesSearchResults(query)
    .then(causes => this.setState({causes}));

    Api.getPublicFiguresSearchResults(query)
    .then(publicFigures => this.setState({publicFigures}));

    Api.getPetitionsSearchResults(query)
    .then(petitions => this.setState({petitions}));
  }

	render() {
    let {causes, publicFigures, petitions} = this.state;
    
		return (<div className="results-page">
      <Hero />
      <div className="container">
        <h1 className="results-page__header">Results</h1>
        <h2 className="results-page__section-header">Causes</h2>
        <div className="hline"></div>
        <div className="row">
          {Object.keys(causes).map((causeId) =>
            <div className="col-md-3" key={causeId}>
              <CauseCard cause={causes[causeId]} causeId={causeId} />
            </div>
          )}
        </div>
        <br/>
        <h2 className="results-page__section-header">Public Figures</h2>
        <div className="hline"></div>
        <div className="row">
          {Object.keys(publicFigures).map((publicFigureId) => 
            <div className="col-md-2" key={publicFigureId}>
              <PublicFigureCard publicFigure={publicFigures[publicFigureId]}
                publicFigureId={publicFigureId} />
            </div>
          )}
          </div>
        <br/>
        <h2 className="results-page__section-header">Petitions</h2>
        <div className="hline"></div>
          {Object.keys(petitions).map((petitionId) => 
            <PetitionCard petition={petitions[petitionId]}
            petitionId={petitionId} key={petitionId} />
        )}
      </div>
      <Footer/>
    </div>);
	}
}
