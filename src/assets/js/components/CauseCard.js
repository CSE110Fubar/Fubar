import React from 'react';
import { Link } from 'react-router-dom';

export default class CauseCard extends React.Component {
  render() {
    let { cause, causeId} = this.props;

    return (
      <Link to={`/causes/${causeId}`} className="card card--cause">
        <img src={cause.image} className="card-img-top" />
        <div className="card-block">
          <div className="card-text card__header">
            {cause.name}
          </div>
          <p className="card__description">{cause.description}</p>
        </div>
      </Link>);
  }
}
