import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Routes from './routes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faTimesCircle);


import 'normalize.css';
import './styles/styles.scss';

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
