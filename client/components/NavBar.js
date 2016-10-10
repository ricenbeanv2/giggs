import React, { Component } from 'react';
import { Link } from 'react-router';
import Cookies from 'js-cookie';
import { Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

import LogOut from './account/logout';

class NavDropdownBar extends Component {
  render() {
    return (
      <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
        <NavDropdown eventKey="4" title={Cookies.getJSON('user').username[0].toUpperCase() + Cookies.getJSON('user').username.slice(1)}>
          <MenuItem eventKey="4.1"><Link to="/userprofile">User Profile </Link></MenuItem>
          <MenuItem eventKey="4.2"><Link to="/chat">Chat</Link></MenuItem>
          <MenuItem eventKey="4.3"><LogOut /></MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
}

const NavBar = () => {
  if (Cookies.getJSON('token')) {
    return (
      <header className="header">
        <div className="container">
          <div className="row">
            <nav className="desktop-navigation-wrap">
              <ul className="desktop-navigation">
                <li><Link to="/">Giggs</Link></li>
                <li><Link to="/joblistings">Job Listings </Link></li>
                <li><Link to="/map">Map</Link></li>
                <li><Link to="/createjob">Create Job </Link></li>
                <li><Link to="/payment">Payment</Link></li>
                <li><NavDropdownBar />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <nav className="desktop-navigation-wrap">
            <ul className="desktop-navigation">
              <li><Link to="/">Giggs</Link></li>
              <li><Link to="/joblistings">Job Listings </Link></li>
              <li><Link to="/map">Map</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
