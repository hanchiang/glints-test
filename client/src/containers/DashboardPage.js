import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import StoreList from './StoreList';
import StoreFilter from './StoreFilter';
import { startSetStores, setStoresLoading } from '../redux/action/storeAction';

class DashboardPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.setStoresLoading();
    this.props.setStores();
  }

  render() {
    return (
      <div>
        <NavBar />
        <StoreFilter />
        <StoreList />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStores: () => dispatch(startSetStores()),
  setStoresLoading: () => dispatch(setStoresLoading(true))
})

export default connect(null, mapDispatchToProps)(DashboardPage);