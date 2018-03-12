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

		if (this.state.data.userGuess === "skip") {
			setTimeout(this.props.questionAnswered, 1000, false)
		} else {
			const formattedAnswer = this.formatData(this.state.data.userGuess);
			const realAnswer = this.formatData(this.props.correctAnswer);

			if ((formattedAnswer === realAnswer || (realAnswer.match(new RegExp(formattedAnswer)) != null)) && formattedAnswer.length > 3) {
				this.setState({ isCorrect: true }, () => {
					setTimeout(this.props.questionAnswered, 1000, true)
				});
			} else {
				setTimeout(this.props.questionAnswered, 1000, false)
			}
		}
	};

	// strip whitespace, lowercase everything
	formatData = userInput => { return userInput.trim().toLowerCase().replace(/ +/g, "") };

	render() {

		const { submittedAnswer, isCorrect } = this.state;
		const { bonus, correctAnswer, type } = this.props;

		let answerFeedback;

		if (submittedAnswer && (type === "tune")) {
			if (!isCorrect) {
				answerFeedback = (
					<h1 className="blue-font">whatabust! the lyric is from  <span className="correctAnswer">{bonus}</span>  by  <span className="correctAnswer">{correctAnswer}</span></h1>
				);
			} else {
				answerFeedback = (
					<h1 className="blue-font">yap! the lyric is from  <span className="correctAnswer">{bonus}</span>  by  <span className="correctAnswer">{correctAnswer}</span></h1>
				);
			};
		} else if (submittedAnswer && !isCorrect) {
			answerFeedback = (
				<h1 className="blue-font">whatabust, the correct answer is  <span className="correctAnswer">{correctAnswer}</span></h1>
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
				{isCorrect && <h1 className="blue-font">woot woot! you got it correct!</h1>}
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

AnswerFeedback.defaultProps = {
	bonus: ""
}

export default AnswerFeedback;


