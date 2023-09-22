import React from 'react';
import { Navbar, Container, Form, FormControl, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLogout, onSearch, searchQuery }) => {
  return (
    <Navbar style={{ backgroundColor: 'transparent' }} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          HotPotatoes 🥔 your fav movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          {user && (
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                style={{ textAlign: 'center' }}
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </Form>
          )}
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
