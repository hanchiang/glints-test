import React, { Component } from 'react';
import { connect } from 'react-redux';

import StoreItem from './StoreItem';

class StoreList extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="content-wrapper">
          <div className="list-head">
            <span>Store</span>
            <span>Opening time</span>
          </div>
          <div className="list-body">
            {
              this.props.stores.map(store => <StoreItem store={store} key={store._id} />)
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stores: state.storeState.stores
});

export default connect(mapStateToProps)(StoreList);