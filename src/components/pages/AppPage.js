import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from 'semantic-ui-react'
import './../../styles/HomePage.css';
import GamePage from './GamePage';
import HomePage from './HomePage';

class AppPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			verses: "",
			showGame: false,
			showMain: true
		}
	}

	startPlay = () => {
		console.log('start play');
		this.setState({ showGame: true, showMain: false });
		this.setState({ verses: {1: { verse: "in the beginning was God", book: "genesis" },
														 2: { verse: "this is the second verse", book: "james"}
									}});

	};

	render() {

		return(
			<div>
				{this.state.showMain ? (
					<div>
						<HomePage onClick={this.startPlay}/> 
						
					</div>	
				) : (
					null
				)}
				{this.state.showGame ? <GamePage verses={this.state.verses}/> : null}
			</div>
		);
	}
}

export default AppPage;

// when icon is clicked
// then can do API call to get bible verses and send to GamePage
// later -- will need to update CSS