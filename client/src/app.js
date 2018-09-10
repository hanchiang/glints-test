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

socket.on('connect', () => {
  console.log(socket.id);
  console.log('conected to socket!');

  socket.emit('test', 'some data', (data) => {
    console.log('Received from server: ' + data);
  })
})

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SocketContext.Provider value={socket}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </SocketContext.Provider>
    )
  }
}
