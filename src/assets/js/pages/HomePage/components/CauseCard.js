import React from 'react';
import {Link} from 'react-router-dom';

export default class CauseCard extends React.Component {
	render() {
    let {cause, causeId} = this.props;

		return (<div className="col-sm-3">
      <div className="card">
        <img src="img/stock.jpg" className="card-img-top"/>
        <div className="card-block">
          <h4 className="card-text">{cause.name}</h4>
          <p>{cause.description}</p>
          <Link to={`/causes/${causeId}`} className="btn btn-info">Take me to article</Link>
        </div>
      </div>
    </div>);
	}
}
