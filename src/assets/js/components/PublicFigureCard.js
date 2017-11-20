import React from 'react';
import {Link} from 'react-router-dom';

export default class PublicFigureCard extends React.Component {
	render() {
    let {publicFigure, publicFigureId, large} = this.props;

    let cardClass = "card";
    if (!large) {
      cardClass += " card--small";
    }

		return (
      <Link to={`/figures/${publicFigureId}`} className={cardClass}>
        <img src={publicFigure.image} className="card-img-top"/>
        <div className="card-block">
          <div className="card-text card__header">
            {publicFigure.name}
          </div>
          <p>{publicFigure.title}</p>
        </div>
      </Link>);
	}
}