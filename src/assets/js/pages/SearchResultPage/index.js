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
    this.setState({causes: causes, publicFigures: publicFigures, petitions: petitions});

    Api.getCausesSearchResults(query).on("child_added", function(snapshot) {                  
      Api.getCause(snapshot.key).once('value').then(function(data) {
        causes[snapshot.key] = data.val();
        this.setState({causes});
      }.bind(this));
    }.bind(this));   

    Api.getPublicFiguresSearchResults(query).on("child_added", function(snapshot) {                        
      Api.getPublicFigure(snapshot.key).once('value').then(function(data) {
        publicFigures[snapshot.key] = data.val();
        this.setState({publicFigures});
      }.bind(this));
    }.bind(this));   

    Api.getPetitionsSearchResults(query).on("child_added", function(snapshot) {                        
      Api.getPetition(snapshot.key).once('value').then(function(data) {
        petitions[snapshot.key] = data.val();
        this.setState({petitions});
      }.bind(this));
    }.bind(this));   

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
