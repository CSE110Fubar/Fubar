import React from 'react';
import {Link} from 'react-router-dom';

//import SearchBox from '~/components/SearchBox';

export default class Footer extends React.Component {
  render() {

      {console.log("footer!")};
    return (<div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="row">
              <div className="col-md-3 text-center text-md-left">
                <Link to="/" className="footer__link">Home</Link>
                  </div>
                  <div className="col-md-6 text-center">
                    Fubar
                  </div>
                  <div className="col-md-3 text-center text-md-right">
                    <Link to="/about" className="footer__link">About</Link>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
};