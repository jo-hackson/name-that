import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import Papa from 'papaparse';
import './../../styles/GamePage.css';
// import Copyright from '../pieces/Copyright';
import Question from '../pieces/Question';
import Timer from '../pieces/Timer';
import EndGame from '../pieces/EndGame';
import Instructions from '../pieces/Instructions';
import { getVerseNames } from '../modules/RandomVerses';

class GamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			score: 0,
			list: [],
			counter: 0,
			isGameOver: false,
			category: this.props.location.state.category,
			show: false
		}
	};


	// how can I make this dynamic?
	componentWillMount() {
		switch (this.state.category) {
			case 'verse': 
				var verses = getVerseNames();
				this.getVerses(verses);
				break;
			case 'tune':
				this.getTunes();
				break;
			case 'capital':
				this.getCapitals();
				break;
			default:
				break;
		};
		setTimeout(this.tick, 5000);
	};


	tick = () => {
		this.setState({ show: true });
	};


	getVerses = verses => {
		console.log("getting verses...");

		let verseObjectArray = [];

		for (var i = 0; i < verses.length - 1; i++) {
			axios.get(`https://api.biblia.com/v1/bible/content/ASV.txt.js?passage=${verses[i]}&style=fullyFormatted&key=${process.env.REACT_APP_BIBLIA_API_KEY}`)
					  .then(response => {
					  	let bookResponse = response.data.text.split('\n')[0];
					  	if (response.data.text.split('\n')[1].match(/\r/) != null) {
					  		var verseResponse = response.data.text.split('\n')[2]
					  	} else {
					  		var verseResponse = response.data.text.split('\n')[1];
					  	}

					  	let book = this.whichBook(bookResponse);
					  	let verse = this.whichVerse(verseResponse);
					   
					  	verseObjectArray.push({ "question": verse, "answer": book });
					  	this.setState({ list: verseObjectArray });
					  })
					  .catch(errors => {
					  	console.log("fail")
					  	console.log(errors)
					  });
		};
		this.setState({ list: verseObjectArray });					
	};


	whichVerse = verseResponse => {
		// remove leading numbers in verse
		return verseResponse.replace(/^\d+\s*/, '');
	};


	whichBook = bookResponse => {
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


	getTunes = () => {
		console.log("getting tunes...")
		// this.setState({ list: [{"question": "Take a sad song and make it better", "answer": "The Beatles", "bonus": "some song"}, 
		// 											{"question": "Friday night and the lights are low", "answer": "ABBA", "bonus": "some song"},
		// 											{"question": "아름다워사랑스러워 그래 너 hey 그래 바로 너 hey", "answer": "PSY", "bonus": "some song"},
		// 											{"question": "I'm bulletproof nothing to lose", "answer": "David Guetta", "bonus": "some song"}, 
		// 											{"question": "Become so tired, so much more aware", "answer": "Linkin Park", "bonus": "some song"},
		// 											{"question": "While he's having a smoke", "answer": "The Killers"}, "bonus": "some song"] 
		// 				  })

		// CHECK IF THIS WILL WORK
		// axios(`https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=12&f_has_lyrics=1&apikey=${process.env.REACT_APP_MUSIX_API_KEY}`)
		// 	.then(results => {
		// 		console.log("blah")
		// 		console.log(results.headers)
		// 	});

		const proxyurl = "https://name-that-book.herokuapp.com/";
		const url = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=12&f_has_lyrics=1&apikey=${process.env.REACT_APP_MUSIX_API_KEY}`
		fetch(proxyurl + url)
			.then(response => {
				console.log("blah")
				console.log(response)
			})
			.catch(() => {
				console.log("errors with CORS")
			})

		// axios(`https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=12&f_has_lyrics=1&apikey=${process.env.REACT_APP_MUSIX_API_KEY}`, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
		// .then(results => {
		// 	console.log("blah")
		// 	console.log(results.headers)
		// });

		// axios.get(`https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=12&f_has_lyrics=1&apikey=${process.env.REACT_APP_MUSIX_API_KEY}`, { crossdomain: true })
		// 	.then(response => {
		// 		console.log(response);
		// 	});

		// // var lyricObjectArray = [];
		// // var allTracks = response.message.body.track_list;

		// // for (var i = 0; i < allTracks.length - 1; i++) {
		// // 	let trackId = allTracks[i].track.track_id;
		// // 	// URL http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${process.env.REACT_APP_MUSIX_API_KEY}
		// // 	let lyric = response.message.body.lyrics.lyrics_body.split('\n')[0]
		// // 	let artistName = allTracks[i].track.artist_name;
		// // 	let trackName = allTracks[i].track.track_name;
		// // 	// ADD BACK TO FOLLOWING LINE: "question": lyric
		// // 	lyricObjectArray.push({ "answer": artistName, "bonus": trackName });	
		// // }

		// // this.setState({ list: lyricObjectArray });

	};

	getCapitals = () => {
		// response.data.[0..250]
		var randomNumberArray = this.randomizedNumbers();
		// console.log(randomNumberArray)
		
		axios.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				let countryInformation = response.data;
				let countryArray = [];

				for (var i = 0; i < 10; i++) {
					let randomNumber = Math.floor(Math.random() * 20);
					let capital = countryInformation[randomNumberArray[i]].capital;
					let country = countryInformation[randomNumberArray[i]].name;
					countryArray.push({ question: capital, answer: country});
				}
				this.setState({ list: countryArray });
			});


	};


	randomizedNumbers = () => {
		var array = [];
		while (array.length < 10) {
			var randomNumber = Math.floor(Math.random() * 250) + 1;
			if (array.indexOf(randomNumber) > -1) continue;
			array[array.length] = randomNumber;
		}
		return array;
	};


	nextQuestion = () => {
		this.setState({ counter: this.state.counter + 1 });
		this.setState({ isGameOver: this.state.counter === this.state.list.length });
	};


	endGame = () => {
		this.setState({ isGameOver: true });
	};


	shuffle = array => {
		var currentIndex = array.length, temporaryValue, randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	};


	updateScore = (newScore) => {
		this.setState({ score: this.state.score + newScore })
	};


	capitalize = string => {
		string.charAt(0).toUpperCase() + string.slice(1);
	};	



	render() {
		const { counter, list, score, isGameOver, show } = this.state;

		return (
			<div id="body-blah">

				<div style={{ display: !show ? "" : "none" }}>
					<Instructions />
				</div>

				<div style={{ display: show ? "" : "none" }}>
					{counter <= (list.length - 1) && !isGameOver ? (
							<div>
								<h1><Question 
											questionAnswered={this.nextQuestion} 
											key={counter} 
											category={this.state.list[`${counter}`]} 
											addToScore={this.updateScore} 
											type={this.state.category} 
										/>
								</h1>
								<h1>your score is {score.toFixed(2)}</h1>
								{ !isGameOver && show ? <Timer onEnd={this.endGame} /> : null }
							</div>
						) : (
							null
						)}

					{ isGameOver && <EndGame score={score} /> }
				</div>
				{/* <Copyright /> */}
				<div className="bottomBorder">
				</div>
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
