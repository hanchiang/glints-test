import React, { Component } from 'react';

import NavBar from '../components/NavBar';
import StoreList from './StoreList';

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
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