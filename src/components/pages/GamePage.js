import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './../../styles/GamePage.css';
// import Copyright from '../pieces/Copyright';
import Question from '../pieces/Question';
import Timer from '../pieces/Timer';
import EndGame from '../pieces/EndGame';


class GamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			score: 0,
			list: [],
			counter: 0,
			isGameOver: false,
			category: this.props.location.state.category,
			isVerse: false,
			isTune: false
		}
	};


	// how can I make this dynamic?
	componentWillMount() {
		switch (this.state.category) {
			case 'verse': 
				this.getVerses();
				this.setState({ isVerse: true });
				break;
			case 'tune':
				this.getTunes();
				this.setState({ isTune: true });
				break;
			default:
				break;
		}
	};


	// setState in here with result
	getVerses = () => {
		console.log("getting verses...");

		this.setState({ list: [{"question": "Blessed are the poor in spirit, for theirs is the kingdom of heaven.", "answer": "Matthew"}, 
													{"question": "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go.", "answer": "James"},
													{"question": "Have this mind among yourselves, which is yours in Christ Jesus,who, though he was in the form of God, did not count equality with God a thing to be grasped, but emptied himself, by taking the form of a servant, being born in the likeness of men.", "answer": "Philippians"},
													{"question": "If this be so, our God whom we serve is able to deliver us from the burning fiery furnace, and he will deliver us out of your hand, O king.", "answer": "Daniel"}, 
													{"question": "Do not look on his appearance or on the height of his stature, because I have rejected him. For the LORD sees not as man sees: man looks on the outward appearance, cbut the LORD looks on the heart.", "answer": "1 Samuel"},
													{"question": "And in Antioch the disciples were first called vChristians.", "answer": "Acts"}] 
						  })

		// do 5 API calls	
		// var verseArray = ["Romans8:1", "Romans8:2", "Romans8:3", "Romans8:4", "Romans8:5", "Romans8:6"];
		// var versesToApi = this.shuffle(verseArray);
		// var verseObjectArray = [];

		// for (var i = 0; i < versesToApi.length - 1; i++) {
			// axios.get(`https://api.biblia.com/v1/bible/content/ASV.txt.js?passage=${versesToApi[i]}&style=fullyFormatted&key=${process.env.REACT_APP_BIBLIA_API_KEY}`)
			// 		  .then(response => {
			// 		  	// console.log(response.data.text);
			// 		  	let bookResponse = response.data.text.split('\n')[0];
			// 		  	if (response.data.text.split('\n')[1].match(/\r/) != null) {
			// 		  		var verseResponse = response.data.text.split('\n')[2]
			// 		  	} else {
			// 		  		var verseResponse = response.data.text.split('\n')[1];
			// 		  	}
			// 		  	// console.log("verse response is " + verseResponse);

			// 		  	// find book
			// 		  	let book = this.whichBook(bookResponse);

			// 		  	// find verse
			// 		  	let verse = this.whichVerse(verseResponse);
					   
			// 		  	verseObjectArray.push({ "question": verse, "answer": book });
			// 		  	this.setState({ list: verseObjectArray });
			// 		  })
			// 		  .catch(errors => {
			// 		  	console.log("fail")
			// 		  	console.log(errors)
			// 		  });
		// }

							
	};


	whichVerse = verseResponse => {
			// remove leading numbers in verse
			return verseResponse.replace(/^\d+\s*/, '');
	};


	nextQuestion = () => {
		this.setState({ counter: this.state.counter + 1 });
		this.setState({ isGameOver: this.state.counter === this.state.list.length });
	};

	endGame = () => {
		this.setState({ isGameOver: true });
	};

	getTunes = () => {
		console.log("getting tunes...")
		this.setState({ list: [{"question": "Take a sad song and make it better", "answer": "The Beatles"}, 
													{"question": "Friday night and the lights are low", "answer": "ABBA"},
													{"question": "아름다워사랑스러워 그래 너 hey 그래 바로 너 hey", "answer": "PSY"},
													{"question": "I'm bulletproof nothing to lose", "answer": "David Guetta"}, 
													{"question": "Become so tired, so much more aware", "answer": "Linkin Park"},
													{"question": "While he's having a smoke", "answer": "The Killers"}] 
						  })

		// axios.get(`https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=12&f_has_lyrics=1&apikey=${process.env.REACT_APP_MUSIX_API_KEY}`, config)
		// 	.then(response => {
		// 		console.log(response);
		// 	});

		// var lyricObjectArray = [];
		// var allTracks = response.message.body.track_list;

		// for (var i = 0; i < allTracks.length - 1; i++) {
		// 	let trackId = allTracks[i].track.track_id;
		// 	// URL http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${process.env.REACT_APP_MUSIX_API_KEY}
		// 	let lyric = response.message.body.lyrics.lyrics_body.split('\n')[0]
		// 	let artistName = allTracks[i].track.artist_name;
		// 	let trackName = allTracks[i].track.track_name;
		// 	// ADD BACK TO FOLLOWING LINE: "question": lyric
		// 	lyricObjectArray.push({ "answer": artistName, "bonus": trackName });	
		// }

		// this.setState({ list: lyricObjectArray });

	}

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

	capitalize = string => {
		string.charAt(0).toUpperCase() + string.slice(1);
	};	

	render() {
		const { counter, list, score, isGameOver } = this.state;

		return (
			<div>
				{counter <= (list.length - 1) && !isGameOver ? (
						<div>
							<div id="instructionsText">
								<p className="instructions">start typing and hit enter to submit your question</p>
								<p className="instructions">if you don't know, then type <span className="alert">skip</span></p>
							</div>
								<h1><Question questionAnswered={this.nextQuestion} key={counter} category={this.state.list[`${counter}`]} updateScore={this.updateScore}/></h1>
							{ !isGameOver ? <Timer onEnd={this.endGame} /> : null }
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
	location: PropTypes.shape({
		state: PropTypes.shape({
			category: PropTypes.string.isRequired 
		}).isRequired
	}).isRequired
};


export default GamePage;
