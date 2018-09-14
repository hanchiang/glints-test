import React from 'react';
import PropTypes from 'prop-types';

MyError.propTypes = {
  errors: PropTypes.array.isRequired
}

export default function MyError(props) {
  return (
    <div>
      {props.errors.length > 0 && props.errors.map(err =>
        <p className="error-active">{err.message}</p>
      )}
    </div>
  );
}