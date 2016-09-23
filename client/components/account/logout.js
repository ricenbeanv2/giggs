import React from 'react';
import { Link } from 'react-router';

const LogOut = () => {
  const unAuth = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
  };

  return (
    <Link onClick={unAuth} to="/">Log Out</Link>
  );
};

export default LogOut;
