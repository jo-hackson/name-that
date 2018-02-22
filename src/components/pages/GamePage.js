import React from 'react';
import axios from 'axios';
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

	// here just call getVerses()
	componentWillMount() {
		this.getVerses();
	};
		
	// setState in here with result
	getVerses = () => {
		console.log("getting verses...");
		console.log(process.env.REACT_APP_BIBLE_API_KEY)

		axios.get("https://api.esv.org/v3/passage/html/?q=Jn11.35", { 
			headers: { 
				Authorization: 'Token ${process.env.REACT_APP_BIBLE_API_KEY}', 
			}})
		  .then(response => {
		  	console.log(response)
		  	console.log("success")
		  })
		  .catch( errors => console.log(errors))



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
						<h1>{process.env.BIBLE_API_KEY}</h1>
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
