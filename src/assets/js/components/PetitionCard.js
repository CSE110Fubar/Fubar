import React from 'react';
import {Link} from 'react-router-dom';

export default class PetitionCard extends React.Component {
  addSupport = () => {

  };

  removeSupport = () => {

  };

	render() {
    let {petition, petitionId} = this.props;

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
          <p>{Object.keys(petition.supportingUsers).length} Supporting</p>
          <button type="button" className="btn btn-primary" onClick={this.addSupport}>
            Add Support
          </button>
        </div>
      </div>
    </div>);
	}
}
