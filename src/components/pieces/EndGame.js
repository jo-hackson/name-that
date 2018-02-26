import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class EndGame extends React.Component {

	render() {
		return (
			<div>
				<h1>game over!</h1>
				<h2>your score is {this.props.score}</h2>
				<Link to='/'><i className="home icon"/></Link>
			</div>
		);
	}
}

EndGame.propTypes = {
	score: PropTypes.number.isRequired
};

export default EndGame;