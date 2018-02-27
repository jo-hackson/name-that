		// it is in "songname" by "artist"


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
			correctAnswer: false,
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
				this.props.updateScore();
				this.setState({ correctAnswer: true });
			}
		}
		// here need to wait 1 second before going to next question
		setTimeout(this.props.questionAnswered, 1000)
	};

	// strip of whitespace
	// lowercase everything
	formatData = userInput => { return userInput.trim().toLowerCase() };

	render() {

		const { submittedAnswer, correctAnswer } = this.state;

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

				{submittedAnswer && !correctAnswer ? <h1>whatabust, the correct answer is: {this.formatData(this.props.correctAnswer)}</h1> : null }
				{correctAnswer && <h1>woot woot</h1>}
			</div>
		);
	}
}


AnswerFeedback.propTypes = {
	updateScore: PropTypes.func.isRequired,
	correctAnswer: PropTypes.string.isRequired,
	questionAnswered: PropTypes.func.isRequired
};

export default AnswerFeedback;


