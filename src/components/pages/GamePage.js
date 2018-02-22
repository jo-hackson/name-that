import React from 'react';
// import PropTypes from 'prop-types';
import './../../styles/GamePage.css';
import Verse from '../pieces/Verse';
import Copyright from '../pieces/Copyright';
import Timer from '../pieces/Timer';


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

	nextVerse = () => {
		this.setState({ counter: this.state.counter + 1})
	};



	render() {
		return (
			<div>
			
				{this.state.counter <= 2 ? (
					<div>
						<Timer onEnd={this.nextVerse} countdown={3}/>
						<h1><Verse verse={this.state.verseList[`${this.state.counter}`]}/></h1>
					</div>
					) : (
					<h1>game over</h1>)
				}

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
