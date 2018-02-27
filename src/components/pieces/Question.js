import React from 'react';
import PropTypes from 'prop-types';
import AnswerFeedback from './AnswerFeedback';

class Question extends React.Component {

	render() {

		return(
			<div>
				<h1 id="question"><span id="quotes">&#8220;</span>{this.props.category.question}<span id="quotes">&#8221;</span></h1>
				<AnswerFeedback 
					correctAnswer={this.props.category.answer}
					bonus={this.props.category.bonus} 
					updateScore={this.props.updateScore} 
					questionAnswered={this.props.questionAnswered}
					type={this.props.type}
				/>
			</div>
		);
	}
}


Question.propTypes = {
	category: PropTypes.shape({
		question: PropTypes.string.isRequired,
		answer: PropTypes.string.isRequired
	}).isRequired,
	updateScore: PropTypes.func.isRequired,
	questionAnswered: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired
};


export default Question;