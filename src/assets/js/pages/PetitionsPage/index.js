import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import PetitionCard from '~/components/PetitionCard';

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
                      <input type="title" className="form-control" id="CauseTitle" placeholder="Enter Cause Name"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="CauseDescription">Description</label>
                      <input type="description" className="form-control" id="CauseDescription" placeholder="Enter Cause Dscription"/>
                    </div>
                    <div className="form-group">
                      <div className="form-group">
                        <label htmlFor="ImageInput">Image</label>
                        <input type="file" className="form-control-file" id="ImageInput"/>
                      </div>

                      <button type="submit" className="btn btn-primary pull-right">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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