import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import moment from 'moment';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setFilter } from '../redux/action/filterAction';

class StoreFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }

    this.onChange = this.onChange.bind(this);
    this.isValidDate = this.isValidDate.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  onChange(date) {
    if (typeof date === 'string') return;
    this.props.setFilter(date);
  }

  isValidDate(date) {
    return date.isAfter(moment());
  }

  removeFilter() {
    this.props.setFilter(null);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="content-wrapper datepicker">
          <DateTime
            value={this.props.date}
            onChange={this.onChange}
            isValidDate={this.isValidDate}
            timeConstraints={{
              minutes: { step: 15 }
            }}
            dateFormat='ddd, DD/MM/YYYY'
          />
          <FontAwesomeIcon
            className='cancel-icon'
            icon='times-circle'
            onClick={this.removeFilter}
          />
        </div>
      </div>
    )
  }
}

StoreFilter.propTypes = {
  date: PropTypes.object,
  setFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  date: state.filterState.date,
})

const mapDispatchToProps = (dispatch) => ({
  setFilter: (date) => dispatch(setFilter(date))
})


export default connect(mapStateToProps, mapDispatchToProps)(StoreFilter);