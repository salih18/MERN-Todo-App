/** @format */

import React from 'react';
import NavLinks from './NavLinks';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from './../../atoms/Button';
import './Navbar.css';

const Header = () => {
  return (
    <Navbar className="todo-app-navbar" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            className="tv2z-logo"
            alt="TV2Z"
            src="https://www.tv2z.com/wp-content/uploads/2017/11/TV2Z_logo_web_dark.svg"
            data-src="https://www.tv2z.com/wp-content/uploads/2017/11/TV2Z_logo_web_dark.svg"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <NavLinks />
      </Container>
    </Navbar>
  );
};

export default Header;
