import React from 'react';
import PropTypes from 'prop-types';

class EndGame extends React.Component {

	render() {
		return (
			<div>
				<h1>game over!</h1>
				<h2>your score is {this.props.score}</h2>
			</div>
		);
	}
}

EndGame.propTypes = {
	score: PropTypes.number.isRequired
};

export default EndGame;