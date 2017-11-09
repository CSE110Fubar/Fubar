import React from 'react';

import * as Api from '~/data/Api';

import Hero from './components/Hero';
import CauseCard from './components/CauseCard';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      causes: {}
    };
  }

  componentWillMount() {
    // Load data from API here, store in state
    Api.loadAllCauses()
    .then((res) => {
      this.setState({
        causes: res
      });
    })
    .catch(console.error);
  }

	render() {
    let {causes} = this.state;

		return (<div className="container">
      <Hero />
      <div className="row">
        {Object.keys(causes).map((causeId) => 
          <CauseCard cause={causes[causeId]} causeId={causeId} key={causeId} />
        )}
      </div>
    </div>);
	}
}
