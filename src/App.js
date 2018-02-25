import React from 'react';
import { Route } from 'react-router-dom';
import './styles/App.css';
import HomePage from './components/pages/HomePage';
import GamePage from './components/pages/GamePage';
// import TunePage from './components/pages/GamePage';

const App = () => {
	return(
		<div id="container">
			<Route path='/' exact component={HomePage} />
			<Route path='/game' exact component={GamePage} />
		</div>
	);
}


export default App;
