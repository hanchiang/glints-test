import React from 'react';
import PropTypes from 'prop-types';

MyError.propTypes = {
  errors: PropTypes.array.isRequired
}

export default function MyError(props) {
  return (
    <p className='error-active'>{props.errors.length > 0 && props.errors[0].message}</p>
  );
}