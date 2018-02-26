import React from 'react';
import PropTypes from 'prop-types';
import './../../styles/Pieces.css';

class Timer extends React.Component {


	constructor(props) {
		super(props);
		this.state = { 
			countdown: 20 
		};
	};

	componentDidMount() {
		this.timeId = setInterval(
		() => this.tick(),
		1000 );
	};

	componentWillUnmount() {
		clearInterval(this.timeId);
	};


	// if the timer has not yet hit 0, then count down
	// else send a bubble up event to gamePage to go to the next verse
	// also reset the timer
	tick = () => {
		if (this.state.countdown > 0) {
			this.setState({ countdown: this.state.countdown - 1 });
		} else {
			this.props.onEnd();
		}
	}

	render() {
		return (
			<div>
				<h2 className="timer">{this.state.countdown}</h2>
			</div>
		);
	}
}


Timer.propTypes = {
	onEnd: PropTypes.func.isRequired
}


export default Timer;