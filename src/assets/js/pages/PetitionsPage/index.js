import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import PetitionCard from '~/components/PetitionCard';
import checkAuth from '~/data/Auth';

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
    // Load data from API here, store in state
    let petitions = Api.getPetitionsRef();
    petitions.once('value').then((snapshot) =>
      this.setState({
        petitions: snapshot.val()
      })
    );
    checkAuth((user) => this.setState({user: user}));
  }

  setValue = function (field, event) {
    //If the input fields were directly within this
    //this component, we could use this.refs.[FIELD].value
    //Instead, we want to save the data for when the form is submitted
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  };

  newPetition = () => {
    var petitions_db = Api.getPetitionsRef();;

    console.log(this.state);

    var description = this.state.description;

    var petition = petitions_db.push({
      "description": this.state.description,
      "image": this.state.image, 
      "name": this.state.name,
      "supportingUsers": {
      }
    });

    var support_db = Api.getSupportForPetition(petition.key);
    support_db.push().set(this.state.user.uid);

    window.location.reload()
  };

	render() {
    let {petitions} = this.state;

		return (<div className="search-result-page">
      <Hero />
      <div className="container">
        <div className="row">
          <div className="col-sm-10">
            <h1 className="petition-page__header">Active Petitions</h1>
          </div>
          <button type="button" data-toggle="modal" data-target="#petition_form" className="btn btn-info">
              Add Petition
          </button>
          <div className="modal fade" id="petition_form">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4><span className="glyphicon glyphicon-lock"></span>Add Petition</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="CauseTitle">Title</label>
                      <input type="title" className="form-control" id="CauseTitle" placeholder="Enter Cause Title" value={this.state.name} onChange={this.setValue.bind(this, 'name')}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="CauseDescription">Description</label>
                      <textarea className="form-control" id="CauseDescription" placeholder="Enter Cause Description" rows="3" value={this.state.description} onChange={this.setValue.bind(this, 'description')}></textarea>
                    </div>
                    <div className="form-group">
                      <div className="form-group">
                        <label htmlFor="ImageInput">Image URL</label>
                        <input type="url" className="form-control" id="ImageInput" value={this.state.image} onChange={this.setValue.bind(this, 'image')}/>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary pull-right" data-toggle="modal" data-target="#petition_form" onClick={this.newPetition}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {Object.keys(petitions).map((petitionId) => 
            <PetitionCard petition={petitions[petitionId]} petitionId={petitionId} key={petitionId} />
          )}
        </div>
      </div>
    </div>);
	}
}