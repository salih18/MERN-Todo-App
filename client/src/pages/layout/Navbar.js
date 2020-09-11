/** @format */

import React from 'react';
import NavLinks from './NavLinks';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar
      style={{ width: '100vw', marginBottom:'4rem' }}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      
    >
      <Navbar.Brand as={Link} to="/">
        Todo App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <NavLinks />
    </Navbar>
  );
};

export default Header;
