import React from 'react';
import {Link} from 'react-router-dom';

//import SearchBox from '~/components/SearchBox';

export default class Footer extends React.Component {
  render() {

    return (<div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="row">
              <div className="col-md-2 text-center text-md-left">
                <Link to="/" className="footer__link">Home</Link>
              </div>
              <div className="col-md-2 text-center text-md-right">
                <Link to="/search/Fubar" className="footer__link">Search</Link>
              </div>
                  <div className="col-md-4 text-center">
                    <img src="/img/face.png" className="hero__logo" />
                  </div>
              <div className="col-md-2 text-center text-md-left">
                <Link to="/petitions" className="footer__link">Petitions</Link>
              </div>
              <div className="col-md-2 text-center text-md-right">
                <Link to="/settings" className="footer__link">Settings</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
};