import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import './../../styles/HomePage.css';


class HomePage extends React.Component {

	render() {

		return(
			<div>
				<h1 id="headline">name that...</h1>

				<div id="categories">
					<div className="individual-category" >
						<h1 className="category">book of the Bible</h1>
						<Link to={{ pathname: '/games', state: { category: "verse" } }} ><i className="video play icon"/></Link>
					</div>

					{/*<div className="individual-category">
						<h1 className="category">artist</h1>
						<Link to={{ pathname: '/games', state: {category: "tune" } }}><i className="video play icon"/></Link>
					</div> */}

					<div className="individual-category">
						<h1 className="category">country's capital</h1>
						<Link to={{ pathname: '/games', state: {category: "capital" } }}><i className="video play icon"/></Link>
					</div>

					<div className="bottomBorder">
					</div>

				</div>
			</div>
			
		);
	}
}



export default HomePage;