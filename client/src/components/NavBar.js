import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="wrapper navbar">
      <div className="content-wrapper navbar-content">
        <Link to='/' className="navbar-item">
          <h3 className="logo">Is It Open</h3>
        </Link>

        <Link to='/collections' className="navbar-item">
          <span>Collections</span>
        </Link>

      </div>
    </nav>
  );
}
