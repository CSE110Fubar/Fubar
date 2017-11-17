import React from 'react';
import { Link } from 'react-router-dom';

export default class CauseCard extends React.Component {
  render() {
    let { cause, causeId, large } = this.props;

    let size = "col-sm-3";
    if (large) {
      size = "col-sm-6";
    }

    return (<div className={size}>
      <Link to={`/causes/${causeId}`} className="card">
        <img src={cause.image} className="card-img-top" />
        <div className="card-block">
          <div className="card-text card__header">
            {cause.name}
          </div>
          <p className="card__description">{cause.description}</p>
        </div>
      </Link>
    </div>);
  }
}
