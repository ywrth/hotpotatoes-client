import React from "react";
import { Navbar, Container, Form, FormControl, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLogout, onSearch, searchQuery }) => {
  return (
    <Navbar expand="lg" className="navbar-main">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <span className="logo-text">Hot Potatoes: </span>Where Movies Sizzle!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          {user && (
            <Form className="my-inline-form">
              <FormControl
                type="text"
                placeholder="Search"
                className="search-input"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </Form>
          )}
          <Nav className="navbar-nav">
            {user ? (
              <>
                <Nav.Link as={Link} to="/" className="nav-link">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-link">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLogout} className="nav-link">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link">
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
