import React, { Component } from 'react';

export default class StoreList extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="content-wrapper">
          <div className="list-head">
            <span>Store</span>
            <span>Opening time</span>
          </div>
          <div className="list-body">
            <span className="store-name">BBQ!</span>
            <span className="store-open-time">monday</span>
          </div>
        </div>
      </div>
    )
  }
}