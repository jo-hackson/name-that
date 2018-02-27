import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './styles/App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



require('dotenv').config(process);

ReactDOM.render(
	<BrowserRouter>
		<div id="body">
			<App />
		</div>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
