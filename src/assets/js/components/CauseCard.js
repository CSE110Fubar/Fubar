import React from 'react';
import {Link} from 'react-router-dom';

export default class CauseCard extends React.Component {
	render() {
    let {cause, causeId, large} = this.props;

    let size = "col-sm-3";
    if (large) {
      size = "col-sm-6";
    }

		return (<div className={size}>
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
