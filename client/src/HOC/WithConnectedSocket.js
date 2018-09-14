import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startGetCollection } from '../redux/action/userAction';

import SocketContext from '../socket/socketContext';

export default function WithConnectedSocket(MyComponent) {
  class MyClass extends Component {
    constructor(props) {
      super(props)

      this.state = {
        joinedRoom: false
      }
    }

    componentDidMount() {
      // Send id over to let server know that a user is invited by an existing user
      // To be consumed by application middleware only, not for route handler itself
      const { id } = this.props.match.params;
      this.props.fetchCollection(id);

      this.props.socket.on('collection_updated', () => {
        this.props.fetchCollection();
      })
    }

    componentDidUpdate(prevProps) {
      // join room only after fetching user info
      if (!prevProps.userId && this.props.userId) {
        let roomToJoin = this.props.referrer ? this.props.referrer : this.props.userId
        this.props.socket.emit('join_room', roomToJoin, () => {
        })
      }
    }

    render() {
      return (
        <MyComponent {...this.props} />
      )
    }
  }

  const mapStateToProps = (state) => ({
    userId: state.userState.id,
    collections: state.userState.collections,
    referrer: state.userState.referrer
  })

  const mapDispatchToProps = (dispatch) => ({
    fetchCollection: (referrer) => dispatch(startGetCollection(referrer))
  });

  return connect(mapStateToProps, mapDispatchToProps)(MyClass);

}