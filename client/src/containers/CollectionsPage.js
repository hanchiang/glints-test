import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NavBar from '../components/NavBar';
import MyError from '../components/MyError';
import WithSocket from '../HOC/WithSocket'
import WithConnectedSocket from '../HOC/WithConnectedSocket';

import { startCreateCollection } from '../redux/action/userAction';

class CollectionsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="wrapper">
          <div className="content-wrapper">
            <h1>Collections</h1>

            { this.props.errors &&
                this.props.errors.length > 0 && <MyError errors={this.props.errors} />
            }
            <div className="collections">
              {
                this.props.collections.map(col =>
                  <Link
                    className="collection"
                    key={col._id}
                    to={`/collections/${col._id}`}
                  >
                    {col.name}
                  </Link>
                )
              }
            </div>

          </div>

        </div>
      </div>
    )
  }
}

CollectionsPage.propTypes = {
  createCollection: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  updatingCollection: PropTypes.bool.isRequired,
  errors: PropTypes.array
}

const mapStateToProps = (state) => ({
  isLoading: state.userState.isLoading,
  updatingCollection: state.userState.updatingCollection,
  collections: state.userState.collections,
  errors: state.userState.errors
})

const mapDispatchToProps = (dispatch) => ({
  createCollection: (name, storeId) => dispatch(startCreateCollection(name, storeId))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithSocket,
  WithConnectedSocket
)(CollectionsPage);