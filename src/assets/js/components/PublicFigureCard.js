import React from 'react';
import {Link} from 'react-router-dom';

export default class PublicFigureCard extends React.Component {
	render() {
    let {publicFigure, publicFigureId, large} = this.props;

    let size = "col-sm-3";
    let cardClass = "card";
    if (large) {
      size = "col-sm-6";
    } else {
      cardClass += " card--small";
    }

		return (<div className={size}>
      <Link to={`/publicFigure/${publicFigureId}`} className={cardClass}>
        <img src={publicFigure.image} className="card-img-top"/>
        <div className="card-block">
          <div className="card-text card__header">
            {publicFigure.name}
          </div>
          <p>{publicFigure.title}</p>
        </div>
      </Link>
    </div>);
	}
}