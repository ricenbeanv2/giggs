import React from 'react';
import { Link } from 'react-router';
import Cookies from 'js-cookie';

import LogOut from './account/logout';

const NavBar = () => {
  if (Cookies.getJSON('token')) {
    return (
      <nav className="navbar navbar-default">
        <ul className="nav navbar-nav">
          <li><Link to="/">Giggs </Link></li>
          <li><Link to="/joblistings">Job Listings </Link></li>
          <li><Link to="/map">Map</Link></li>
          <li><Link to="/createjob">Create Job </Link></li>
          <li><Link to="/selectedjob">Job Selected</Link></li>
          <li><Link to="/jobadmin">Job Admin</Link></li>
          <li><Link to="/userprofile">User Profile </Link></li>
          <li><Link to="/profile">PROFILE </Link></li>
          <li><LogOut /></li>
        </ul>
      </nav>
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
        <li><Link to="/userprofile">Update User Profile </Link></li>
        <li><Link to="/profile">PROFILE </Link></li>
        <li><Link to="/selectedjob">Job Selected</Link></li>
        <li><Link to="/jobadmin">Job Admin</Link></li>
        <li><LogOut /></li>
      </ul>
    </nav>
  );
};

export default NavBar;
