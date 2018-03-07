import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class EndGame extends React.Component {

	// check the score and see if it is one of the top ten

	render() {
		return (
			<div>
				<h1 className="blue-font">game over!</h1>
				<h2 className="blue-font">your score is {this.props.score.toFixed(2)}</h2>
				<Link to='/'><i className="home icon"/></Link>
			</div>
		);
	}
}

EndGame.propTypes = {
	score: PropTypes.number.isRequired
};

export default EndGame;