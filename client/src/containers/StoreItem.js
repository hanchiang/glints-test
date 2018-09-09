import React from 'react';
import PropTypes from 'prop-types';

export default function StoreItem(props) {
  return (
    <div className="store-item">
      <div>{props.store.name}</div>
      <div className="store-timings">
        {
          props.store.timings.map((timing, i) => 
            <div className="store-timing" key={i}>{timing}</div>
          )
        }
      </div>
    </div>
  )
}

StoreItem.propTypes = {
  store: PropTypes.object.isRequired
}