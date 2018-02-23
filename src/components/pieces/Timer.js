import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {

	constructor(props) {
		super(props);
		this.state = { countdown: 3 };
	}

	componentDidMount() {
		this.timeId = setInterval(
		() => this.tick(),
		1000 );
	}

	// if the timer has not yet hit 0, then count down
	// else send a bubble up event to gamePage to go to the next verse
	// also reset the timer
	tick() {
		if (this.state.countdown > 0) {
			this.setState({ countdown: this.state.countdown - 1 });
		} else {
			this.props.onEnd();
			this.setState({ countdown: this.props.countdown})
		}
	}

	render() {
		return (
			<div>
				<h2>{this.state.countdown}</h2>
			</div>
		);
	}
}


Timer.propTypes = {
	countdown: PropTypes.number.isRequired,
	onEnd: PropTypes.func.isRequired
}


export default Timer;