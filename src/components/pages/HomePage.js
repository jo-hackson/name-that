import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import './../../styles/HomePage.css';

const HomePage = () => (
	<div>
		<h2>Welcome to</h2>
		<h1>Name That Book!</h1>
		<Link to="/game" className='link'><i className="video play icon teal" /></Link>
	</div>
);

export default HomePage;