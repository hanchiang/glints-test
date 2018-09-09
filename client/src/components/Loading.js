import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

function Loading(props) {
  return (
    <div className="content-wrapper loader">
      <ReactLoading {...props} />
    </div>
  );
}

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  delay: PropTypes.number
}

Loading.defaultProps = {
  type: 'bubbles',
  color: '#333',
  width: 80,
  height: 80,
  delay: 0
}

export default Loading;