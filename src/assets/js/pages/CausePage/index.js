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

		return (<div className="cause-page">
      <Hero background={cause.image} />
      <div className="container cause-page__content">
        <div className="row">
          <div className="col-12">
            <h1 className="cause-page__header">{cause.name}</h1>
          </div>
          <div className="col-12">
            <h2 className="cause-page__description">{cause.description}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-6 column">
            <h2>Support</h2>
            <hr />
            <button className="btn btn-outline-primary column__cta">Support this Cause</button>
            <p className="column__info"></p>
          </div>
          <div className="col-6 column column--secondary">
            <h2>Oppose</h2>
            <hr />
            <button className="btn btn-outline-primary column__cta">Oppose this Cause</button>
          </div>
        </div>
      </div>
    </div>);
	}
}
