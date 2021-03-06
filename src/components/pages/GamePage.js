import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './../../styles/GamePage.css';
import Question from '../pieces/Question';
import Timer from '../pieces/Timer';
import EndGame from '../pieces/EndGame';
import Instructions from '../pieces/Instructions';
import { getVerseNames } from '../modules/RandomVerses';
import { randomizedNumbers } from '../modules/Random';


class GamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			score: 0,
			list: [],
			counter: 0,
			isGameOver: false,
			category: this.props.location.state.category,
			show: false,
			scoreBoard: { 
				verse: [], 
				tune: [], 
				capital: []
			}
		}
	};


	// how can I make this dynamic?
	componentWillMount() {
		switch (this.state.category) {
			case 'verse': 
				let verses = getVerseNames();
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

		{ let verseObjectArray 
	
			verseObjectArray = [];

			for (let i = 0; i < verses.length - 1; i += 1) {
				axios.get(`https://api.biblia.com/v1/bible/content/ASV.txt.js?passage=${verses[i]}&style=fullyFormatted&key=${process.env.REACT_APP_BIBLIA_API_KEY}`)
						  .then(response => {
						  	{ let bookName, 
						  				formattedBook, 
						  				verse, 
						  				formattedVerse;

							  	bookName = verses[i].split(".")[0]; // take book name from verses
							  	formattedBook = this.whichBook(bookName);

							  	verse = response.data.text.split('\n');
							  	formattedVerse = this.formatVerse(verse[verse.length-1]);
							   
							  	verseObjectArray.push({ "question": formattedVerse, "answer": formattedBook });
						  	};
						  })
						  .catch(errors => console.log(errors));
			};
			this.setState({ list: verseObjectArray });			
		};		
	};


	formatVerse = verse => {
		return verse.replace(/^\d+\s*/, ''); // remove leading numbers in verse
	};

	whichBook = bookResponse => {
		if (/\d/.test(bookResponse)) return bookResponse[0] + " " + bookResponse.slice(1); // if the book starts with a number, then add a space between
		return bookResponse;
	};


	getTunes = () => {
		console.log("getting tunes...")

		var lyricObjectArray = [];

		const proxyUrl = 'https://safe-earth-71035.herokuapp.com/';
		const apiUrl = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=100&f_has_lyrics=1&apikey=${process.env.REACT_APP_MUSIX_API_KEY}`;
		fetch(proxyUrl + apiUrl)
			.then(response => response.json())
			.then(trackContent => {
				var allTracks = trackContent.message.body.track_list;
				var randomNumberArray = randomizedNumbers(100, 12); // get 12 random numbers from 1-100
				var randomizedTracks = []

				// get the 12 random track ids
				for (let j = 0; j < randomNumberArray.length; j++) {
					{ let thisTrack;

						thisTrack = trackContent.message.body.track_list[randomNumberArray[j]].track
						randomizedTracks.push({"trackId": thisTrack.track_id, "artistName": thisTrack.artist_name, "trackName": thisTrack.track_name})
					};
					
				}

				for (let i = 0; i < randomizedTracks.length; i++) {
					var trackId = randomizedTracks[i].trackId;
					var artistName = randomizedTracks[i].artistName;
					var trackName = randomizedTracks[i].trackName;

					let trackApiUrl = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${process.env.REACT_APP_MUSIX_API_KEY}`
					fetch(proxyUrl + trackApiUrl)
						.then(response => response.json())
						.then(lyricContent => {
							let splitLyrics = lyricContent.message.body.lyrics.lyrics_body.split('\n');
							let lyricsLength = splitLyrics.length - 4;
							let randomNumber = Math.floor(Math.random() * lyricsLength);

							if (splitLyrics[randomNumber] === "") randomNumber += 1;

							let firstLyric = splitLyrics[randomNumber];
							let secondLyric = splitLyrics[randomNumber + 1] !== "" ? splitLyrics[randomNumber + 1] : splitLyrics[randomNumber + 2];

							let lyric = firstLyric + " / " + secondLyric;

							lyricObjectArray.push({ "answer": artistName, "question": lyric, "bonus": trackName });
						})
						.catch(errors => console.log(errors))
				}
				this.setState({ list: lyricObjectArray });
			})
			.catch(errors => console.log(errors))
	};

	getCapitals = () => {
		var randomNumberArray = randomizedNumbers(250, 20);
		
		axios.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				{ let countryInformation,
							countryArray,
							capitals;

					countryInformation = response.data;
					countryArray = [];
					capitals = [];

					for (let i = 0; i < 20; i++) {
						{ let capital,
									country

							capital = countryInformation[randomNumberArray[i]].capital;
							capitals.push(capital);
							country = countryInformation[randomNumberArray[i]].name;
							if (capital !== "" || !capitals.includes(capital)) countryArray.push({ question: capital, answer: country});
						};
					}
					this.setState({ list: countryArray });
				};
			})
			.catch(errors => console.log(errors))
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


	updateScore = newScore => {
		this.setState({ score: this.state.score + newScore })
	};


	capitalize = string => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};	


	render() {
		const { counter, list, score, isGameOver, show, category, scoreboard } = this.state;

		return (
			<div id="body-blah">

				<div style={{ display: !show ? "" : "none" }}>
					<Instructions category={category}/>
				</div>

				<div style={{ display: show ? "" : "none" }}>
					{counter <= (list.length - 1) && !isGameOver ? (
							<div>
								{ !isGameOver && show ? <Timer onEnd={this.endGame} /> : null }
								<h1><Question 
											questionAnswered={this.nextQuestion} 
											key={counter} 
											category={this.state.list[`${counter}`]} 
											addToScore={this.updateScore} 
											type={category} 
										/>
								</h1>
								<h1 className="blue-font">score {score.toFixed(2)}</h1>
							</div>
						) : (
							null
						)}

					{ isGameOver && <EndGame score={score} scoreboard={scoreboard}/> }
				</div>
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
