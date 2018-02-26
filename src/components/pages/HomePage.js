import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import './../../styles/HomePage.css';


class HomePage extends React.Component {

	render() {

		return(
			<div>
				<h1 id="headline"><span className="gray-element">let's play</span> name that<span className="gray-element"> ...</span></h1>

				<div id="categories">
					<div className="individual-category" >
						<h1 id="book-bible">book of the Bible</h1>
						<Link to={{ pathname: '/games', state: { category: "Verses" } }} ><i className="video play icon"/></Link>
					</div>
					<div className="individual-category">
						<h1 id="tune">tune</h1>
						<Link to={{ pathname: '/games', state: {category: "tune" } }}><i className="video play icon"/></Link>
					</div>
				</div>
				
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