import React from 'react';
import PropTypes from 'prop-types';
import AnswerFeedback from './AnswerFeedback';

class Verse extends React.Component {




	render() {

		return(
			<div>
				<h1><span id="quotes">&#8220;</span>{this.props.verse.verse}<span id="quotes">&#8221;</span></h1>
				<AnswerFeedback 
					key={this.props.key}
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
	}).isRequired
};


export default Verse;