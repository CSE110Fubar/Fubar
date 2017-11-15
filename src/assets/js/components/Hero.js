import React from 'react';
import {Link} from 'react-router-dom';

import Login from '~/components/Login';

export default class Hero extends React.Component {
	render() {
		return (<div className="jumbotron">
      <div className="row">
        <div className="col text-center">
          <div className="page-header">
            <h2><Link to="/">Fubar</Link></h2>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <input type="text" placeholder="Search" className="form-control"/>
          </div>
        </div>
        <div className="col text-center">
          <Login />
        </div>
      </div>
    </div>);
	}
}