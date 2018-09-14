import React, { Component } from 'react';
import { compose } from 'redux'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddCollectionModal from './AddCollectionModal'
import NavBar from '../components/NavBar';
import StoreList from '../components/StoreList';
import StoreFilter from './StoreFilter';
import Loading from '../components/Loading';
import WithSocket from '../HOC/WithSocket';
import WithConnectedSocket from '../HOC/WithConnectedSocket';

import { startSetStores, setStoresLoading } from '../redux/action/storeAction';
import getVisibleStores from '../redux/selectors/storeSelector';
import { startAddToCollection, startCreateCollection, startGetCollection } from '../redux/action/userAction';

class DashboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      storeId: ''
    }


    this.toggleModal = this.toggleModal.bind(this);
    this.setStoreId = this.setStoreId.bind(this);
    this.onCreateCollection = this.onCreateCollection.bind(this);
    this.onAddToCollection = this.onAddToCollection.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Wait for collection to be loaded in WithConnectedSocket before fetching stores
    // To prevent creation of two sessions from two concurrent fetches
    if (prevProps.loadingCollection && !this.props.loadingCollection && this.props.stores.length === 0) {
      this.props.fetchStore();
    }
  }

  toggleModal() {
    this.setState(state => ({
      showModal: !this.state.showModal
    }))
  }

  setStoreId(storeId) {
    this.setState({ storeId });
  }

  onCreateCollection(name) {
    this.props.createCollection(name, this.state.storeId);
  }

  onAddToCollection(collectionId) {
    this.props.addToCollection(collectionId, this.state.storeId);
  }

  render() {
    return (
      <div>
        <NavBar />
        <StoreFilter />
        <StoreList
          stores={this.props.stores}
          isLoading={this.props.isLoadingStore}
          errors={this.props.storeErrors || []}
          toggleModal={this.toggleModal}
          setStoreId={this.setStoreId}
        />
        <AddCollectionModal
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
          onCreateCollection={this.onCreateCollection}
          onAddToCollection={this.onAddToCollection}
          collections={this.props.collections}
          updatingCollection={this.props.updatingCollection}
          fetchCollection={this.props.fetchCollection}
          socket={this.props.socket}
        /> 
      </div>
    )
  }
}

DashboardPage.propTypes = {
  createCollection: PropTypes.func.isRequired,
  fetchCollection: PropTypes.func.isRequired,
  isLoadingStore: PropTypes.bool.isRequired,
  updatingCollection: PropTypes.bool.isRequired,
  errors: PropTypes.array
}

const mapStateToProps = (state) => ({
  // stores
  stores: getVisibleStores(state.storeState.stores, state.filterState.date),
  isLoadingStore: state.storeState.isLoading,
  storeErrors: state.storeState.errors,
  // users
  loadingCollection: state.userState.isLoading,
  updatingCollection: state.userState.updatingCollection,
  collections: state.userState.collections,
  userErrors: state.userState.errors,
  userId: state.userState.id
})

const mapDispatchToProps = (dispatch) => ({
  fetchStore: () => dispatch(startSetStores()),
  createCollection: (name, storeId) => dispatch(startCreateCollection(name, storeId)),
  addToCollection: (id, storeId) => dispatch(startAddToCollection(id, storeId)),
  fetchCollection: () => dispatch(startGetCollection())
})

// export default connect(mapStateToProps, mapDispatchToProps)(WithSocket(DashboardPage));
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithSocket,
  WithConnectedSocket,
)(DashboardPage);