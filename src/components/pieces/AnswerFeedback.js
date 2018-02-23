import React from 'react';
import { Form } from 'semantic-ui-react';

class AnswerFeedback extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: {
				userGuess: ""
			},
			correctAnswer: false,
			submittedAnswer: false
		}
	};



	onChange = event => this.setState({ data: { userGuess: event.target.value } });

	submit = data => {
		this.setState({ submittedAnswer: true });
		const formattedData = this.formatData(this.state.data.userGuess);
		const correctBook = this.formatData(this.props.correctAnswer);
		if (formattedData === correctBook) {
			// event to bubble up to update score
			this.setState({ correctAnswer: true });
		}

	};

	// strip of whitespace
	// lowercase everything
	formatData = userInput => {return userInput.trim().toLowerCase()};


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
						/>
						<button type="submit" />
					</Form.Field>
				</Form>

				{submittedAnswer && !correctAnswer ? <h1>the correct answer is: {this.formatData(this.props.correctAnswer)}</h1> : null }
				{correctAnswer && <h1>right answer!</h1>}
			</div>
		);
	}
}

export default AnswerFeedback;