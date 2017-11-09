import React from 'react';

import Hero from './components/Hero';
import CauseCard from './components/CauseCard';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder, replace with empty causes object
    this.state = {
      causes: {
        1: {
          name: "Net Neutrality",
          description: "Making sure the ISPs don't get control over internet traffic"
        },
        2: {
          name: "Free Earl",
          description: "Free my friend Earl, I don't really ask for much"
        },
      }
    };
  }

  componentWillMount() {
    // Load data from API here, store in state
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
