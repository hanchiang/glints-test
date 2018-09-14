import React, { Component } from 'react';

import SocketContext from '../socket/socketContext';

export default function WithSocket(MyComponent) {
  return class extends Component {
    render() {
      return (
        <SocketContext.Consumer>
          {
            socket => {
              socket.on('connect', () => {
                console.log('conected to socket!');
              })

              return <MyComponent socket={socket} {...this.props} />
            }
          }
        </SocketContext.Consumer>
      )
    }
  }
}