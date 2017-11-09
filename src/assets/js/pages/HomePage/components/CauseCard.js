import React from 'react';

export default class CauseCard extends React.Component {
	render() {
    let {cause, causeId} = this.props;

		return (<div className="col-sm-3">
      <div className="card">
        <img src="img/stock.jpg" className="card-img-top"/>
        <div className="card-block">
          <h4 className="card-text">{cause.name}</h4>
          <p>{cause.description}</p>
          <a href={`#${causeId}`} className="btn btn-info">Take me to article</a>
        </div>
      </div>
    </div>);
	}
}
