import React from 'react';
import {Link} from 'react-router-dom';

import * as Api from '~/data/Api';

export default class PetitionCard extends React.Component {

  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      petition: "",
      supporting: false,
      count: 0
    };
  }

  componentWillMount = () => {
    this.loadPetition();
  }

  addSupport = () => {
    var supportRef = Api.getSupportForPetition(this.props.petitionId);
    supportRef.push().set(this.props.currentUser, this.loadPetition);
  };

  removeSupport = () => {
    var supportRef = Api.getSupportForPetition(this.props.petitionId);
    
    var key = 0;
    for (var userKey in this.state.petition.supportingUsers) {
      if(this.state.petition.supportingUsers[userKey] == this.props.currentUser){
        key = userKey;
      }
    }

    supportRef.child(key).remove(this.loadPetition);
    
  }

  loadPetition = () => {
    let petition = Api.getPetitionRef(this.props.petitionId);
    petition.once('value').then((snapshot) => {
      if(!snapshot.val().supportingUsers) {
        this.props.deletePetition(this.props.petitionId);
        return;
      }

      var found = false;
      for (var userId in snapshot.val().supportingUsers ) {
        if(snapshot.val().supportingUsers[userId] == this.props.currentUser){
          found = true;
        }
      }
      
      this.setState({
        petition: snapshot.val(),
        supporting: found, 
        count: Object.keys(snapshot.val().supportingUsers).length
      });
    });
  }

	render() {
    let {petition, petitionId, currentUser, deletePetition} = this.props;

		return (<div className="card petition-card">
      <div className="row card-body">
        <div className="col-sm-4">
          <img src={petition.image}
            className="card-img-top"/>
        </div>
        <div className="col-sm-5">
          <h3 className="card-text card__header">
            {petition.name}
          </h3>
          <p>{petition.description}</p>
        </div>
        <div className="col-sm-3">
          <p>{this.state.count} Supporting</p>
          {!this.state.supporting && <button type="button" className="btn btn-primary" onClick={this.addSupport}>
            Add Support
          </button>}
          {this.state.supporting && <button type="button" className="btn btn-primary" onClick={this.removeSupport}>
            Remove Support
          </button>}
        </div>
      </div>
    </div>);
	}
}
