import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import Loading from '../components/Loading';

ReactModal.setAppElement('#app');

export default class AddCollectionModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createCollection: false,
      input: '',
    }

    this.onModalClose = this.onModalClose.bind(this);
    this.onCreateCollection = this.onCreateCollection.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onAddToCollection = this.onAddToCollection.bind(this);
  }

  componentDidUpdate(prevProps) {
    // TODO: LOADING SPINNER
    if (!prevProps.showModal && this.props.showModal && this.props.collections.length === 0) {
      this.props.fetchCollection();
    }
  }

  onModalClose() {
    this.props.toggleModal();
    this.setState({ createCollection: false, input: '' });
  }

  onChangeInput(e) {
    this.setState({ input: e.target.value });
  }

  onCreateCollection() {
    this.setState({ input: '' });
    this.props.onCreateCollection(this.state.input);
  }

  onAddToCollection(collectionId) {
    this.props.onAddToCollection(collectionId);
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.showModal}
        onRequestClose={this.onModalClose}
        closeTimeoutMS={100}
        contentLabel='Add to collection modal'
        className='modal'
      >
      <div className="modal-scroll">
          <div className="modal-collections">
            <h3>Save to</h3>
            {
              this.props.collections.map(collection =>
                <div key={collection._id} onClick={() => this.onAddToCollection(collection._id)}>
                  <div className="button add-collection-button">
                    {collection.name}
                  </div>
                </div>
              )
            }
          </div>
          {
            this.state.createCollection ? (
              <div>
                <input type="text"
                  className="input add-collection-input"
                  placeholder="Collection name"
                  value={this.state.input}
                  onChange={this.onChangeInput}
                />
                <div className="modal-actions">
                  <button onClick={this.onModalClose} className="button cancel-button">Cancel</button>
                  <button onClick={this.onCreateCollection} className="button">Create</button>
                </div>
              </div>
            ) : (
                <div className="modal-actions">
                  <button className="button create-collection-button" onClick={() => this.setState({ createCollection: true })}>Create New</button>
                </div>
              )
          }
      </div>
      </ReactModal>
    )
  }
}

AddCollectionModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onCreateCollection: PropTypes.func.isRequired,
  collections: PropTypes.array.isRequired,
  updatingCollection: PropTypes.bool.isRequired,
  onAddToCollection: PropTypes.func.isRequired,
  fetchCollection: PropTypes.func.isRequired
}