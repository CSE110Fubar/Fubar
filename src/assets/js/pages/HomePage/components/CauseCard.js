import React from 'react';
import {Link} from 'react-router-dom';

export default class CauseCard extends React.Component {
	render() {
    let {cause, causeId} = this.props;

		return (<div className="col-sm-3">
      <div className="card">
        <img src={cause.image} className="card-img-top"/>
        <div className="card-block">
          <Link to={`/causes/${causeId}`} className="card-text card__header">
            {cause.name}
          </Link>
          <p>{cause.description}</p>
        </div>
      </div>
    </div>);
	}
}
