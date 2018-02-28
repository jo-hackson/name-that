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
						<Link to={{ pathname: '/games', state: { category: "verse" } }} ><i className="video play icon"/></Link>
					</div>

					<div className="individual-category">
						<h1 id="tune">artist</h1>
						<Link to={{ pathname: '/games', state: {category: "tune" } }}><i className="video play icon"/></Link>
					</div>

					<div className="individual-category">
						<h1 id="currency">capitals (of countries)</h1>
						<Link to={{ pathname: '/games', state: {category: "capital" } }}><i className="video play icon"/></Link>
					</div>

					<div className="individual-category">
						<h1 id="currency">languages</h1>
						<Link to={{ pathname: '/games', state: {category: "foreignLanguage" } }}><i className="video play icon"/></Link>
					</div>

					<div className="bottomBorder">
					</div>

				</div>
			</div>
			
		);
	}
}



export default HomePage;