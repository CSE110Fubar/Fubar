import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import PetitionCard from '~/pages/PetitionsPage/components/PetitionCard';

export default class PetitionsPage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      petitions: {}
    };
  }

  componentWillMount() {
    // Load data from API here, store in state
    let petitions = Api.getPetitionsRef();
    petitions.once('value').then((snapshot) =>
      this.setState({petitions: snapshot.val()})
    );
  }

	render() {
    let {petitions} = this.state;

		return (<div className="search-result-page">
      <Hero />
      <div className="container">
        <div className="row">
          <div className="col-sm-10">
            <h1 className="petition-page__header">Active Petitions</h1>
          </div>
          <button type="button" className="btn btn-info">
              Add Petition
          </button>
        </div>
        <div className="row">
          {Object.keys(petitions).map((petitionId) => 
            <PetitionCard petition={petitions[petitionId]} petitionId={petitionId} key={petitionId} />
          )}
        </div>
      </div>
    </div>);
	}
}