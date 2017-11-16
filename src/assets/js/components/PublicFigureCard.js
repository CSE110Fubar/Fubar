import React from 'react';
import {Link} from 'react-router-dom';

export default class PublicFigureCard extends React.Component {
	render() {
    let {publicFigure, publicFigureId, large} = this.props;

    let size = "col-sm-3";
    if (large) {
      size = "col-sm-6";
    }

		return (<div className={size}>
      <div className="card">
        <img src={publicFigure.image} className="card-img-top"/>
        <div className="card-block">
          <Link to={`/publicFigure/${publicFigureId}`} className="card-text card__header">
            {publicFigure.name}
          </Link>
          <p>{publicFigure.title}</p>
        </div>
      </div>
    </div>);
	}
}