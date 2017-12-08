import React from 'react';
import {Link} from 'react-router-dom';

import Login from '~/components/Login';
import SearchBox from '~/components/SearchBox';

export default class Hero extends React.Component {
  render() {
    let {background, white} = this.props;
    let heroStyle = {};
    let heroClass = "hero";
    let headerClass = "hero__header";
    let loginClass = "hero__login";

    if (background) {
      heroStyle['backgroundImage'] = `url(${background})`;
      heroClass += " hero--expanded";
      headerClass += " hero__header--expanded";
      loginClass += " hero__login--inverse";
    }

    if (white) {
      heroClass += " hero--white";
      headerClass += " hero__header--expanded";
      loginClass += " hero__login--trasparent";
    }

    return (<div className={heroClass} style={heroStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-3 text-center text-md-left d-flex justify-content-start align-items-center">
            <div className="hero__logo-container">
              <img src="/img/face.png" className="hero__logo" />
            </div>
            <h2 className="d-inline">
              <Link to="/" className={headerClass}>
                Fubar
              </Link>
            </h2>
          </div>

          <div className="col-md-6 text-center">
            <SearchBox />
          </div>
          <div className={`col-md-3 text-center text-md-right ${loginClass}`}>
            <Login transparent={white} />
          </div>
        </div>
      </div>
    </div>);
  }
};