import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
// import { connect } from 'react-redux';
import './../../styles/HomePage.css';


class HomePage extends React.Component {

	render() {

		return(
			<div>
				<h2>Welcome to</h2>
				<h1>Name That Book!</h1>
				<button className='button' onClick={() => this.props.history.push('/game')}><i className="video play icon teal" /></button>
			</div>
		);
	}
}


HomePage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	})
}

export default HomePage;