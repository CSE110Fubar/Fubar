import React from 'react';
import {Link} from 'react-router-dom';

export default class PetitionCard extends React.Component {
	render() {
    let {petition, petitionId} = this.props;

		return (<div className="col-sm-12">
      <div className="card">
        <div className="row">
          <div className="col-sm-4">
            <img src={petition.image} className="card-img-top"/>
          </div>
          <div className="col-sm-5">
            <h3 className="card-text card__header">
              {petition.name}
            </h3>
            <p>{petition.description}</p>
          </div>
          <div className="col-sm-2">
            <p>{petition.supportingUsers.length} Supporting</p>
            <button type="button" className="btn btn-info">
              Add Support
            </button>
          </div>
        </div>
      </div>
    </div>);
	}
}
