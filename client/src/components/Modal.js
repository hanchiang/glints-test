import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

export default function Modal(props) {
  return (
    <ReactModal {...props} className='modal'>
      {props.children}
    </ReactModal>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  closeTimeoutMS: PropTypes.number,
  contentLabel: PropTypes.string.isRequired
}

Modal.defaultProps = {
  closeTimeoutMS: 100
}