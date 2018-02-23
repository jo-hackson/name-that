import React from 'react';
// import axios from 'axios';
import './../../styles/GamePage.css';
import Copyright from '../pieces/Copyright';
import Verse from '../pieces/Verse';
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

		// axios.get("https://api.esv.org/v3/passage/html/?q=Jn11.35", { 
		// 	headers: { 
		// 		Authorization: `Token ${process.env.REACT_APP_BIBLE_API_KEY}`, 
		// 	}})
		//   .then(response => {
		//   	console.log(response)
		//   	console.log("success")
		//   })
		//   .catch(errors => {
		//   	console.log("fail")
		//   	console.log(errors)
		//   });



		this.setState({ verseList: [{"verse": "in the beginning was God", "book": "genesis"}, 
																{"verse": "second verse", "book": "exodus"},
																{"verse": "third verse", "book": "numbers"}] 
								 })									
	};


	nextVerse = () => this.setState({ counter: this.state.counter + 1 });


	updateScore = () => {
		this.setState({ score: this.state.score + 1 })
		console.log(this.state.score);
	};
	



	render() {
		const { verseList } = this.state;

		return (
			<div>
			
				{this.state.counter <= (verseList.length - 1) ? (
					<div>
						<h1>{process.env.BIBLE_API_KEY}</h1>
						<Timer onEnd={this.nextVerse} countdown={3}/>
						<h1><Verse key={this.state.counter} verse={this.state.verseList[`${this.state.counter}`]} updateScore={this.updateScore}/></h1>
					</div>
					) : (
					<div>
					<h1>game over</h1>
					<h2>your score is {this.state.score}</h2>
					</div>
				)}


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
