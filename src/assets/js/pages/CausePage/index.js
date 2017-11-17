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
    Api.getCause(params.causeId)
    .once('value')
    .then((snapshot) => {
      this.setState({
        cause: snapshot.val()
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
            <button className="btn btn-outline-primary column__cta">Follow</button>
          </div>
          <div className="col-12">
            <h4 className="cause-page__description">{cause.description}</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <h2>Related News Articles</h2>
          </div>
          <div className="col-2">
            <p>{cause.supportingUsers.length} Supporters</p>
            <hr />
            <button className="btn btn-outline-primary column__cta">Support Cause</button>
          </div>
          <div className="col-2">
            <p>{cause.supportingUsers.length} Opposers</p>
            <hr />
            <button className="btn btn-outline-primary column__cta">Oppose Cause</button>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h2>Facebook Events</h2>

          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h2>Related Public Figures</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-6 column">
            <h3>Supporters</h3>
            <hr />
            <p></p>
          </div>
          <div className="col-6 column column--secondary">
            <h3>Opposers</h3>
            <hr />

          </div>
        </div>
      </div>
    </div>);
	}
}
