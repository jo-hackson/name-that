import React from 'react';
import Verse from './../pieces/verse';
import './../../styles/GamePage.css';
import Copyright from '../pieces/Copyright';

class GamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			score: 0,
			verseList: [],
			counter: 0
		}
	};


	componentWillMount() {
		this.setState({ verseList: [{"verse": "in the beginning was God", "book": "genesis"}, 
																{"verse": "second verse", "book": "exodus"},
																{"verse": "third verse", "book": "numbers"}] 
								 })									
	};



	render() {

		return (
			<div>
				<h1><Verse verse={this.state.verseList[`${this.state.counter}`]}/></h1>
				<Copyright />
			</div>
		);
	}
};


export default GamePage;

// need to grab 5 verses in the form of JSON
// will have a) verse and b) book
// need to show a new verse every 10 seconds
// add counter if book guess === bible book
// end game and print score
