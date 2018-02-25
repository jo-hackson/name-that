import React from 'react';
import PropTypes from 'prop-types';
import AnswerFeedback from './AnswerFeedback';

class Verse extends React.Component {

	render() {

		return(
			<div>
				<h1 id="verse"><span id="quotes">&#8220;</span>{this.props.verse.verse}<span id="quotes">&#8221;</span></h1>
				<AnswerFeedback 
					correctAnswer={this.props.verse.book} 
					updateScore={this.props.updateScore} 
				/>
			</div>
		);
	}
}


Verse.propTypes = {
	verse: PropTypes.shape({
		verse: PropTypes.string.isRequired,
		book: PropTypes.string.isRequired
	}).isRequired,
	updateScore: PropTypes.func.isRequired
};


export default Verse;