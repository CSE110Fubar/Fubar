import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import HomePage from './pages/HomePage';
import CausePage from './pages/CausePage';
import PublicFigurePage from './pages/PublicFigurePage';
import SettingsPage from './pages/SettingsPage';
import SearchResultPage from './pages/SearchResultPage';
export default class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/causes/:causeId" component={CausePage} />
					<Route path="/figures/:figureId" component={PublicFigurePage} />
					<Route path="/settings/" component={SettingsPage}/>
					<Route path="/results/" component={SearchResultPage} />
				</Switch>
			</Router>
		);
	}
}
