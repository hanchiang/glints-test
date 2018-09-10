import React from 'react';
import PropTypes from 'prop-types';

import StoreItem from './StoreItem';
import MyError from './MyError';

export default function StoreList(props) {
  return (
    <div className="wrapper">
      <div className="content-wrapper">
        { props.errors.length > 0 && <MyError errors={props.errors} /> }
        
        <div className="list-head">
          <span>Store</span>
          <span>Opening time</span>
        </div>

        <div className="list-body">
          {
            props.stores.map(store =>
              <StoreItem
                key={store._id}
                store={store}
                toggleModal={props.toggleModal}
                onModalClose={props.onModalClose}
                setStoreId={props.setStoreId}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}


StoreList.propTypes = {
  stores: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setStoreId: PropTypes.func.isRequired
}