import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import CauseCard from '~/components/CauseCard';
import PublicFigureCard from '~/components/PublicFigureCard';

export default class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      results: {}
    };
  }

  componentWillMount() {
    // Load data from API here, store in state
    let results = Api.getPublicFigureResults();
    results.once('value').then((snapshot) =>
      this.setState({results: snapshot.val()})
    );
  }

	render() {
    let {results} = this.state;

		return (<div className="results-page">
      <Hero />
      <div className="container">
        <h1 className="results-page__header">Results</h1>
        <div className="row">
          {Object.keys(results).map((publicFigureId) => 
            <PublicFigureCard publicFigure={results[publicFigureId]} publicFigureId={publicFigureId} key={publicFigureId} />
          )}
        </div>
      </div>
    </div>);
	}
}
