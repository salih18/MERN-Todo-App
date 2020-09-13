import React from 'react';

import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useAuth } from './../../redux/hooks';
import Spinner from './../../atoms/Spinner';

const NavLinks = () => {
  const { isAuthenticated, logoutUser, user, loading } = useAuth();

  return loading ? (
    <div className="position-absolute" style={{ top: '50%', left: '50%' }}>
      <Spinner animation="grow" />
    </div>
  ) : (
    <Navbar.Collapse id="responsive-navbar-nav">
      {isAuthenticated && (
        <>
          <Nav className="ml-5"></Nav>
          <Nav>
            <NavDropdown title={'Signed in: ' + user?.name} id="navbar-nav-dropdown">
              <NavDropdown.Item as={Link} to="/" onClick={() => {

                logoutUser()
                }}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </>
      )}
      {!isAuthenticated && (
        <Nav>
          <Nav.Link className='ml-5' as={Link} to="/login">
            Login
          </Nav.Link>
        </Nav>
      )}
    </Navbar.Collapse>
  );
};
export default NavLinks;
