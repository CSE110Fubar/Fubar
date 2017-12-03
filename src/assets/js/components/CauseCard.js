import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

export default class CauseCard extends React.Component {
  render() {
    let {cause, causeId, following, follow, unfollow, showFollow}
      = this.props;

    return (
      <div className="card card--cause">
        <img src={cause.image} className="card-img-top" />
        {showFollow && <button className="btn btn-primary card__follow" href="#"
          onClick={following ? unfollow : follow}>
          {following && <FontAwesome name="eye-slash" />}
          {!following && <FontAwesome name="eye" />}
        </button>}
        <div className="card-block">
          <Link to={`/causes/${causeId}`} className="card-text card__header">
            {cause.name}
          </Link>
          <p className="card__description">{cause.description}</p>
        </div>
      </div>);
  }
}
