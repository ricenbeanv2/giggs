import React, { Component } from 'react';
import { Link } from 'react-router';
import Cookies from 'js-cookie';
import { Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

import LogOut from './account/logout';

// class NavDropdownBar extends Component {
//   handleSelect(eventKey) {
//     // eventKey.preventDefault();
//     // alert(`selected ${eventKey}`);
//   }
//
//   render() {
//     return (
//       <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
//         <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
//           <MenuItem eventKey="4.1">Action</MenuItem>
//           <MenuItem eventKey="4.2">Another action</MenuItem>
//           <MenuItem eventKey="4.3">Something else here</MenuItem>
//           <MenuItem divider />
//           <MenuItem eventKey="4.4">Separated link</MenuItem>
//         </NavDropdown>
//       </Nav>
//     );
//   }
// }

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
                <li><Link to="/userprofile">User Profile </Link></li>
                <li><Link to="/profile">Public Profile</Link></li>
                <li><Link to="/payment">Payment</Link></li>
                <li><Link to="/chat">Chat </Link></li>
                <li><LogOut /></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {/* <NavDropdownBar /> */}
                {/* <ul className="nav navbar-nav navbar-right">
                  <li><Link><i className="fa fa-user fa-1x" aria-hidden="true"></i> { Cookies.getJSON('user').username[0].toUpperCase() + Cookies.getJSON('user').username.slice(1)}</Link>
                  </li>

                </ul> */}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
  return (
    <nav className="navbar navbar-default">
      <ul className="nav navbar-nav">
        <li><Link to="/">Giggs </Link></li>
        <li><Link to="/joblistings">Job Listings </Link></li>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/login">Sign in </Link></li>
        <li><Link to="/signup">Sign up </Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
