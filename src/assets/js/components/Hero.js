import React from 'react';
import {Link} from 'react-router-dom';

import Login from '~/components/Login';

export default class Hero extends React.Component {
	render() {
		return (<div className="container hero">
      <div className="row">
        <div className="col-md-3 text-center text-md-left">
          <div className="hero__header">
            <h2><Link to="/">Fubar</Link></h2>
          </div>
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
    </div>);
	}
}
