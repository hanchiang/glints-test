import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import 'normalize.css';
import './styles/styles.scss';

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();