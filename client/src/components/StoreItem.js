import React from 'react';
import PropTypes from 'prop-types';

export default function StoreItem(props) {
  const toggleModal = () => {
    props.setStoreId(props.store._id);
    props.toggleModal();
  }

  return (
    <div>
      <div className="store-item">
        <div>{props.store.name}</div>
        <div className="store-timings">
          {
            props.store.timings.map((timing, i) =>
              <div className="store-timing" key={i}>{timing}</div>
            )
          }
        </div>
        <div className="add-to-collection button" onClick={toggleModal}>
          Add to collection
        </div>
      </div>
    </div>
  )
}

StoreItem.propTypes = {
  store: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setStoreId: PropTypes.func.isRequired
}