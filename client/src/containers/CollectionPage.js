import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash'

import NavBar from '../components/NavBar';
import WithSocket from '../HOC/WithSocket';
import WithConnectedSocket from '../HOC/WithConnectedSocket';
import { startGetCollection, startDeleteFromCollection, startUpdateCollection } from '../redux/action/userAction';

class CollectionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editName: false,
      value: ''
    }

    this.inputElement = React.createRef();

    this.deleteFromCollection = this.deleteFromCollection.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Update collection name is completed
    if (prevProps.updatingCollection && !this.props.updatingCollection) {
      this.setState({ editName: false })
      this.props.socket.emit('update_collection');
    }
    if (_.isEmpty(this.props.collection) || (_.isEmpty(this.props.collection.stores))) {
      this.props.history.push('/collections');
    }
  }
  

  deleteFromCollection(storeId) {
    this.props.deleteFromCollection(this.props.collection._id, storeId);
  }

  onChangeValue(e) {
    this.setState({ value: e.target.value });
  }

  onEdit() {
    this.setState({ editName: true, value: this.props.collection.name }, () => {
      this.inputElement.current.focus();
    });
  }

  onKeyPress(e) {
    // enter key
    if (e.charCode === 13) {
      this.props.updateCollection(this.props.collection._id, this.state.value);
    }
  }

  onKeyUp(e) {
    // escape key
    if (e.keyCode === 27) {
      this.setState({ editName: false });
    }
  }

  onBlur(e) {
    this.setState({ editName: false });
  }

  render() {
    const stores = this.props.collection && this.props.collection.stores
    return (
      <div>
        <NavBar />
        <div className="wrapper">
          <div className="content-wraper">
          {
            !_.isEmpty(this.props.collection) && (
                <div className="collection-stores">
                  {this.state.editName ? <input
                    className="title-edit"
                    type="text"
                    value={this.state.value}
                    onChange={this.onChangeValue}
                    onKeyPress={this.onKeyPress}
                    onKeyUp={this.onKeyUp}
                    onBlur={this.onBlur}
                    ref={this.inputElement}
                  />
                    :
                    <div className="title-content">
                      <h1>{this.props.collection && this.props.collection.name}</h1>
                      <FontAwesomeIcon
                        className='cancel-icon'
                        icon='pencil-alt'
                        onClick={this.onEdit}
                      />
                    </div>

                  }

                  {
                    stores && stores.map((store, i) =>
                      <div className="collection-store" key={i}>
                        <div>{store.name}</div>
                        <div>
                          <FontAwesomeIcon
                            className='cancel-icon'
                            icon='times-circle'
                            onClick={() => this.deleteFromCollection(store._id)}
                          />
                        </div>
                      </div>
                    )
                  }
                </div>
            )
          }
          </div>
        </div>
      </div>
    )
  }
}

CollectionPage.propTypes = {
  collection: PropTypes.object,
  name: PropTypes.string,
  updatingCollection: PropTypes.bool.isRequired,
  updateCollection: PropTypes.func.isRequired,
  deleteFromCollection: PropTypes.func.isRequired
}

CollectionPage.defaultProps = {
  collection: {},
  name: ''
}

const mapStateToProps = (state, props) => {
  const collections = state.userState.collections;
  const collection = collections && collections.find(col => col._id === props.match.params.id);
  return {
    collections,
    collection,
    name: collection && collection.name,
    updatingCollection: state.userState.updatingCollection
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateCollection: (id, name) => dispatch(startUpdateCollection(id, name)),
  deleteFromCollection: (id, storeId) => dispatch(startDeleteFromCollection(id, storeId))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithSocket,
  WithConnectedSocket
)(CollectionPage);