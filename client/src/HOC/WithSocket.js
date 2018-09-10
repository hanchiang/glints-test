import React, { Component } from 'react';
import SocketContext from '../socket/socketContext';

export default function WithSocket(MyComponent) {
  return class extends Component {
    render() {
      return (
        <SocketContext.Consumer>
          {
            socket => <MyComponent socket={socket} {...this.props} />
          }
        </SocketContext.Consumer>
      )
    }
  }
}