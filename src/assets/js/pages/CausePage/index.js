import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';

export default class CausePage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      cause: {}
    };
  }

  componentWillMount() {
    let {params} = this.props.match;

    // Load data from API here, store in state
    Api.loadCause(params.causeId)
    .then((res) => {
      this.setState({
        cause: res
      });
    })
    .catch(console.error);
  }

	render() {
    let {cause} = this.state;

    if (!cause) {
      return <div>Loading...</div>;
    }

		return (<div className="container">
      <Hero />
      <h1>{cause.name}</h1>
      <h2>{cause.description}</h2>
    </div>);
	}
}
