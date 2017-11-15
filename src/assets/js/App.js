import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import HomePage from './pages/HomePage';
import CausePage from './pages/CausePage';

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/causes/:causeId" component={CausePage} />
				</Switch>
			</Router>
		);
	}
}
