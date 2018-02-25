import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './../../styles/GamePage.css';
// import Copyright from '../pieces/Copyright';
import Verse from '../pieces/Verse';
import Timer from '../pieces/Timer';
import EndGame from '../pieces/EndGame';


class GamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			score: 0,
			verseList: [],
			counter: 0,
			isGameOver: false,
			category: this.props.location.state.category
		}
	};


	// here just call getVerses()
	componentWillMount() {
		console.log(this.state.category)
		// console.log(this.props.match.location.state.category)
		// this.getVerses();
	};


	// setState in here with result
	getVerses = () => {
		console.log("getting verses...");

		// do 5 API calls	
		var verseArray = ["Romans8:1", "Romans8:2", "Romans8:3", "Romans8:4", "Romans8:5", "Romans8:6"];

		var versesToApi = this.shuffle(verseArray);
		var verseObjectArray = [];

		for (var i = 0; i < versesToApi.length - 1; i++) {

			// this.setState({ verseList: [{"verse": "in the beginning was God", "book": "genesis"}, 
			// 													{"verse": "second verse", "book": "exodus"},
			// 													{"verse": "third verse", "book": "numbers"}] 
			// 						  })

			axios.get(`https://api.biblia.com/v1/bible/content/ASV.txt.js?passage=${versesToApi[i]}&style=fullyFormatted&key=${process.env.REACT_APP_BIBLIA_API_KEY}`)
					  .then(response => {
					  	// console.log(response.data.text);
					  	let bookResponse = response.data.text.split('\n')[0];
					  	if (response.data.text.split('\n')[1].match(/\r/) != null) {
					  		var verseResponse = response.data.text.split('\n')[2]
					  	} else {
					  		var verseResponse = response.data.text.split('\n')[1];
					  	}
					  	// console.log("verse response is " + verseResponse);

					  	// find book
					  	let book = this.whichBook(bookResponse);
					  	// console.log("final book is " + book);

					  	// find verse
					  	let verse = this.whichVerse(verseResponse);
					  	// console.log("final verse is " + verse);
					   
					  	verseObjectArray.push({ "verse": verse, "book": book });
					  	this.setState({ verseList: verseObjectArray });
					  })
					  .catch(errors => {
					  	console.log("fail")
					  	console.log(errors)
					  });
		}							
	};


	whichVerse = verseResponse => {
			// remove leading numbers in verse
			return verseResponse.replace(/^\d+\s*/, '');
	};


	nextVerse = () => {
		this.setState({ counter: this.state.counter + 1 });
		this.setState({ isGameOver: this.state.counter === this.state.verseList.length });
	};

	shuffle = array => {
		var currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	};


	whichBook = bookResponse => {
	// bookResponse = 1 John 3:16 (ASV 1901)
	let book = "";
// if first character is a number then need to take it out and then do the normal expression
	if (bookResponse.match(/\D/) != null) {
		book += bookResponse[0]; // add the number to the book
		bookResponse = bookResponse.slice(1); // remove number
	}

	// extract the name
	book += bookResponse.match(/^\D+/)[0]
	return book.trim();
};


	updateScore = () => {
		this.setState({ score: this.state.score + 1 })
	};
	

	render() {
		const { counter, verseList, score, isGameOver } = this.state;

		return (
			<div>
				{counter <= (verseList.length - 1) ? (
						<div>
							{ !isGameOver ? <Timer onEnd={this.nextVerse} countdown={10}/> : null }
							<h1><Verse key={counter} verse={this.state.verseList[`${counter}`]} updateScore={this.updateScore}/></h1>
						</div>
					) : (
						null
					)}

				{ isGameOver && <EndGame score={score} /> }

				{/* <Copyright /> */}
			</div>
		);
	}
};


GamePage.propTypes = {
	category: PropTypes.string.isRequired
};


export default GamePage;
