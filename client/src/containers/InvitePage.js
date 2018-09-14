import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import MyError from '../components/MyError'

import { startInviteUser, startGetCollection } from '../redux/action/userAction';

class InvitePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    this.onInvite = this.onInvite.bind(this);
  }

  componentDidMount() {
    if (this.props.userId === '') {
      this.props.getCollection();
    }
  }

  onInvite() {
    this.props.inviteUser(this.props.userId, this.state.value)
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="wrapper">
          <div className="content-wrapper">
            <h2>Invite a friend</h2>
            <MyError errors={this.props.errors} />

            {
              this.props.success.length > 0 && <p className="success-message">
                {this.props.success[0].message}
              </p>
            }
            <input
              type="text" placeholder="email"
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
            <button onClick={this.onInvite}>Invite</button>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.userState.id,
  updatingCollection: state.userState.updatingCollection,
  errors: state.userState.errors,
  success: state.userState.success
})

const mapDispatchToProps = (dispatch) => ({
  inviteUser: (referrer, email) => dispatch(startInviteUser(referrer, email)),
  getCollection: () => dispatch(startGetCollection())
})

export default connect(mapStateToProps, mapDispatchToProps)(InvitePage);
