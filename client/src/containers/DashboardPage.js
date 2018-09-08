import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import StoreList from './StoreList';
import { startSetStores } from '../redux/action/storeAction';

class DashboardPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.setExpense();
  }

  render() {
    return (
      <div>
        <NavBar />
        <StoreList />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setExpense: () => dispatch(startSetStores())
})

export default connect(null, mapDispatchToProps)(DashboardPage);