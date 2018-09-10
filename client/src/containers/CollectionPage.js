import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavBar from '../components/NavBar';
import { startGetCollection, startDeleteFromCollection } from '../redux/action/userAction';

class CollectionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editName: false,
      value: ''
    }

    this.deleteFromCollection = this.deleteFromCollection.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    if (!this.props.collection) {
      this.props.fetchCollection();
    }
  }

  deleteFromCollection(storeId) {
    this.props.deleteFromCollection(this.props.collection._id, storeId);
  }

  onChangeValue(e) {
    this.setState({ value: e.target.value });
  }

  onKeyPress(e) {
    if (e.charCode === 13) {
      this.setState({ editName: false, value: this.props.collection.name });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <NavBar />
        <div className="wrapper">
          <div className="content-wraper">
            <div className="collection-stores">
              { this.state.editName ? <input 
                  className="title-edit"
                  type="text"
                  value={this.state.value}
                  onChange={this.onChangeValue}
                  onKeyPress={this.onKeyPress}
                />
                : 
                <div className="title-content">
                  <h1>{this.props.collection && this.props.collection.name}</h1>
                  <FontAwesomeIcon
                    className='cancel-icon'
                    icon='pencil-alt'
                    onClick={() => this.setState({ editName: true, value: this.props.collection.name })}
                  />
                </div>
                
              }
              
              {
                this.props.stores && this.props.stores.map((store, i) =>
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
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const collections = state.userState.collections;
  const collection = collections && collections.find(col => col._id === props.match.params.id);
  const stores = collection && collection.stores;
  return { collection, stores };
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollection: () => dispatch(startGetCollection()),
  deleteFromCollection: (id, storeId) => dispatch(startDeleteFromCollection(id, storeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);