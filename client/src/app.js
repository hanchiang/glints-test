import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faTimesCircle, faPencilAlt);

import io from "socket.io-client";

import SocketContext from './socket/socketContext';
import store from './redux/store';
import Routes from './routes';

import 'normalize.css';
import './styles/styles.scss';

const socket = io('localhost:3000');

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
          <Routes />
        </SocketContext.Provider>
      </Provider>
    )
  }
}
