import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import PetitionCard from '~/components/PetitionCard';
import checkAuth from '~/data/Auth';

import PetitionModal from './components/PetitionModal';
import Footer from '~/components/Footer';

export default class PetitionsPage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      petitions: {}, 
      description: "", 
      name: "", 
      image: "",
      user: {}
    };
  }

  componentWillMount() {
    checkAuth((user) => this.setState({user: user}));
    this.loadPetitions();
  }

  loadPetitions = () => {
    // Load data from API here, store in state
    let petitions = Api.getPetitionsRef();
    petitions.once('value').then((snapshot) =>
      this.setState({
        petitions: snapshot.val()
      })
    );
  }

  setValue = (field) => (event) => {
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  };

  newPetition = () => {
    var petitions = Api.getPetitionsRef();
    let {description, image, name} = this.state;

    var petition = petitions.push({
      "description": description,
      "image": image, 
      "name": name,
      "supportingUsers": {}
    });

    var supportRef = Api.getSupportForPetition(petition.key);
    supportRef.push().set(this.state.user.uid);
    this.loadPetitions();
  };

  deletePetition = (petitionId) => {
    var petitionsRef = Api.getPetitionsRef();
    petitionsRef.child(petitionId).remove(this.loadPetitions);
  };

	render() {
    let {petitions} = this.state;
    let {name, description, image} = this.state

		return (<div className="search-result-page">
      <Hero />
      <PetitionModal newPetition={this.newPetition} setValue={this.setValue}
        name={name} description={description} image={image} />
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h1 className="petition-page__header">Active Petitions</h1>
          </div>
          <div className="col-md-2 text-right">
            <button type="button" data-toggle="modal" data-target="#petition_form" className="btn btn-outline-primary">
              Add Petition
            </button>
          </div>
        </div>
        <div>
          {Object.keys(petitions).map((petitionId) => 
            <PetitionCard petition={petitions[petitionId]} petitionId={petitionId} currentUser={this.state.user.uid} deletePetition={this.deletePetition} key={petitionId} />
          )}
        </div>
      </div>
      <Footer/>
    </div>);
	}
}