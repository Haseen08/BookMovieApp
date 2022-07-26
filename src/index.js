import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
//import Controller from './screens/Controller';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
