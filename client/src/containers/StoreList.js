import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StoreItem from './StoreItem';
import Loading from '../components/Loading';
import MyError from '../components/MyError';
import getVisibleStores from '../redux/selectors/storeSelector';

class StoreList extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="content-wrapper">
          <MyError errors={this.props.errors} />
          
          <div className="list-head">
            <span>Store</span>
            <span>Opening time</span>
          </div>
          {
            this.props.isLoading ? <Loading /> :
              <div className="list-body">
                {
                  this.props.stores.map(store => <StoreItem store={store} key={store._id} />)
                }
              </div>
          }
          
        </div>
      </div>
    )
  }
}

StoreList.propTypes = {
  stores: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  stores: getVisibleStores(state.storeState.stores, state.filterState.date),
  isLoading: state.storeState.isLoading,
  errors: state.errorState
});

export default connect(mapStateToProps)(StoreList);