import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

class Verse extends React.Component {

	constructor() {
		super();

		this.state = {
			data: {
				bookGuess: ""
			},
			score: 0,
			answerSubmitted: false,
			incorrectAnswer: false,
			showCongrats: false
		}
	}

	submit = (data) => {
		this.setState({ answerSubmitted: true });
		if (this.state.data.bookGuess !== this.props.verse.book) {
			this.setState({ incorrectAnswer: true })
		} else {
			this.setState({ showCongrats: true, score: this.state.score + 1 })
		}
	}

	onChange = event => this.setState({ data: { bookGuess: event.target.value } });

	render() {

		return(
			<div>
				<h1><span id="quotes">&#8220;</span>{this.props.verse.verse}<span id="quotes">&#8221;</span></h1>

				<Form onSubmit={this.submit}>
					<Form.Field >
						<input 
							type="text"
							name="bookGuess"
							placeholder="type your guess here and press enter"
							className="inputField"
							onChange={this.onChange}
						/>
						<button type="submit" />
					</Form.Field>
				</Form>

				{this.state.incorrectAnswer ? <h1>the correct answer is: {this.state.answerSubmitted && this.props.verse.book}</h1> : null }
				{this.state.showCongrats && <h1>right answer!</h1>}
			</div>
		);
	}
}


Verse.propTypes = {
	verse: PropTypes.shape({
		verse: PropTypes.string.isRequired,
		book: PropTypes.string.isRequired
	}).isRequired
};


export default Verse;