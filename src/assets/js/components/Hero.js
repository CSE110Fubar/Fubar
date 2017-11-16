import React from 'react';
import {Link} from 'react-router-dom';

import Login from '~/components/Login';

export default class Hero extends React.Component {
	render() {
    let {background} = this.props;
    let heroStyle = {};
    let heroClass = "hero";
    let headerClass = "hero__header";
    if (background) {
      heroStyle['backgroundImage'] = `url(${background})`;
      heroClass += " hero--expanded";
      headerClass += " hero__header--expanded";
    }

		return (<div className={heroClass} style={heroStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-3 text-center text-md-left">
            <h2><Link to="/" className={headerClass}>Fubar</Link></h2>
          </div>
          <div className="col-md-6 text-center">
            <div className="form-group">
              <input type="text" placeholder="Search" className="form-control"/>
            </div>
          </div>
          <div className="col-md-3 text-center text-md-right hero__login">
            <Login />
          </div>
        </div>
      </div>
    </div>);
	}
}
