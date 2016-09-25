import React from 'react';
import { Link } from 'react-router';
import LogOut from './account/logout';

function checkToken() {
  console.log('test');
}
const NavBar = () => {
  checkToken();
  return (
    <nav className="navbar navbar-default">
      <ul className="nav navbar-nav">
        <li><Link to="/">Giggs </Link></li>
        <li><Link to="/createjob">Create Job </Link></li>
        <li><Link to="/joblistings">Job Listings </Link></li>
        <li><Link to="/map">MAP</Link></li>
        <li><Link to="/login">Sign in </Link></li>
        <li><Link to="/signup">Sign up </Link></li>
        <li><Link to="/userprofile">User Profile </Link></li>
        <li><LogOut /></li>
      </ul>
    </nav>
  );
};

export default NavBar;
