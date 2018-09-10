import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="wrapper navbar">
      <div className="content-wrapper navbar-content">
        <NavLink to='/' className="navbar-item link" activeClassName='active-link'>
          <h3 className="logo">Is It Open</h3>
        </NavLink>

        <NavLink to='/collections' className="navbar-item link" activeClassName='active-link'>
          <span className="collection">Collections</span>
        </NavLink>

      </div>
    </nav>
  );
}
