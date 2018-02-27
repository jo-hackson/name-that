import React from 'react';
import PropTypes from 'prop-types';
import AnswerFeedback from './AnswerFeedback';

class Question extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			timeId: 0,
			startTime: new Date()
		}
	}

	answerReceived = (isCorrect) => {
		if (isCorrect) {
			const endTime = new Date();
			const score = 20 - (endTime - this.state.startTime) * 0.0001;
			this.props.addToScore(score);
		}
		this.props.questionAnswered();
	};

	render() {

		return(
			<div>
				<h1 id="question"><span id="quotes">&#8220;</span>{this.props.category.question}<span id="quotes">&#8221;</span></h1>
				<AnswerFeedback 
					correctAnswer={this.props.category.answer}
					bonus={this.props.category.bonus}
					questionAnswered={this.answerReceived}
					type={this.props.type}
				/>
			</div>
		);
	}
}


Question.propTypes = {
	category: PropTypes.shape({
		question: PropTypes.string.isRequired,
		answer: PropTypes.string.isRequired,
		bonus: PropTypes.string
	}).isRequired,
	questionAnswered: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	addToScore: PropTypes.func.isRequired,
	score: PropTypes.number.isRequired
};


export default Question;