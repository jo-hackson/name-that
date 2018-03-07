import React from 'react';
import PropTypes from 'prop-types';

class Instructions extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			instructions: "",
			index: 0,
			instructionsHTML: []
		};
	};


	componentDidMount = () => {
		switch (this.props.category) {
			case 'verse': 
				//
				break;
			case 'tune':
				this.setState({ instructions: ["lyrics from a song will show", "type the artist of the song", "try to hurry! you will only have 20 seconds"] });
				break;
			case 'capital':
				//
				break;
			default:
				break;
		};

		this.timeId = setInterval(
		() => this.tick(),
		1000);
	}

	// remove hidden class every second from i = 0
	tick = () => {
		const { instructionsHTML, instructions, index } = this.state;
		instructionsHTML.push(<h1 className="instructions" key={index}>{instructions[index]}</h1>)
		this.setState({ index: index + 1 });
	};



	render() {

		const { instructions, index, instructionsHTML } = this.state;

		var array = [];
		for (var i = 0; i < instructionsHTML.length; i++) {
			array.push(instructionsHTML[i]);
		}

		return(
			<div>
				<h1>instructions</h1>
				{array}
			</div>
		);
	};
};

Instructions.propTypes = {
	category: PropTypes.string.isRequired
};

export default Instructions;