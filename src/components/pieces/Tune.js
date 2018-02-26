import React from 'react';
// import PropTypes from 'prop-types';
import AnswerFeedback from './AnswerFeedback';

class Tune extends React.Component {

	render() {

		return(
			<div>
				<h1 id="tune"><span id="quotes">&#8220;</span>{this.props.tune.tune}<span id="quotes">&#8221;</span></h1>
				<AnswerFeedback 
					correctAnswer={this.props.tune.artist} 
					updateScore={this.props.updateScore} 
				/>
			</div>
		);
	}
}





export default Tune;