import React from 'react';
import { Link } from 'react-router';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Giggs </Link>
      <Link to="/signin">Sign in </Link>
      <Link to="/signup">Sign up </Link>
      <Link to="/userprofile">User Profile </Link>
      <Link to="/createjob">Create Job </Link>
    </nav>
  );
};

export default NavBar;
