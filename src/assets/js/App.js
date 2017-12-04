import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import HomePage from './pages/HomePage';
import CausePage from './pages/CausePage';
import PetitionsPage from './pages/PetitionsPage';
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
					<Route path="/search/:query" component={SearchResultPage} />
					<Route path="/petitions/" component={PetitionsPage} />
				</Switch>
			</Router>
		);
	}
}
