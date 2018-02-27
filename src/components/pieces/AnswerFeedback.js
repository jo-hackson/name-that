// it is in "songname" by "artist"
// (this.props.type === "tune") ? <h1>whatabust, the lyric is from {this.props.bonus} by {this.props.correctAnswer}</h1>
// {submittedAnswer && !correctAnswer ? <h1>whatabust, the correct answer is: {this.props.correctAnswer}</h1> : null}


import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class AnswerFeedback extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: {
				userGuess: ""
			},
			isCorrect: false,
			submittedAnswer: false,
		}
	};

	componentDidMount = () => {
		this.nameInput.focus();
	};

	onChange = event => this.setState({ data: { userGuess: event.target.value } });

	submit = () => {
		this.setState({ submittedAnswer: true });
		if (this.state.data.userGuess !== "skip") {
			const formattedAnswer = this.formatData(this.state.data.userGuess);
			const realAnswer = this.formatData(this.props.correctAnswer);
			if (formattedAnswer === realAnswer || (realAnswer.match(new RegExp(formattedAnswer)) != null)) {
				this.setState({ isCorrect: true }, () => {
					setTimeout(this.props.questionAnswered, 1000, this.state.isCorrect)
				});
			}
		}
		// here need to wait 1 second before going to next question
		// how do I send this.state.isCorrect
		// setTimeout(this.props.questionAnswered, 1000);
		// console.log("isCorrect is: " + this.state.isCorrect) // why  is this false, why is state not being upated
		// console.log("submitted" + this.state.submittedAnswer); // why is this false
		setTimeout(this.props.questionAnswered, 1000, this.state.isCorrect)
	};

	// strip of whitespace
	// lowercase everything
	formatData = userInput => { return userInput.trim().toLowerCase() };

	render() {

		const { submittedAnswer, isCorrect } = this.state;
		const { bonus, correctAnswer, type } = this.props;

		let answerFeedback;

		if (submittedAnswer && !isCorrect && (type === "tune")) {
			answerFeedback = (
				<h1>whatabust, the lyric is from {bonus} by {correctAnswer}</h1>
			);
		} else if (submittedAnswer && !isCorrect) {
			answerFeedback = (
				<h1>whatabust, the correct answer is: {correctAnswer}</h1>
			);
		}

		return (
			<div>
				<Form onSubmit={this.submit}>
					<Form.Field >
						<input 
							type="text"
							name="bookGuess"
							placeholder="type your guess here and press enter"
							className="inputField"
							onChange={this.onChange}
							autoComplete="off"
							ref={(input) => { this.nameInput = input; }}
						/>
						<button type="submit" />
					</Form.Field>
				</Form>
				{answerFeedback}
				{isCorrect && <h1>woot woot</h1>}
			</div>
		);
	}
}


AnswerFeedback.propTypes = {
	correctAnswer: PropTypes.string.isRequired,
	questionAnswered: PropTypes.func.isRequired,
	bonus: PropTypes.string,
	type: PropTypes.string.isRequired
};

export default AnswerFeedback;


