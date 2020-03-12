import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { HeaderProps } from './container';

export default function Header({ isAuthenticated }: HeaderProps) {
  return (
    <Navbar variant="light" bg="light" expand="lg" className="mb-3">
      <Navbar.Brand>
        {isAuthenticated ? (
          <Link to="/">Michele Ker</Link>
        ) : (
          <Link to="/login/">Login</Link>
        )}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isAuthenticated && (
            <>
              <Link to="/add-patients/" className="nav-link" role="button">
                Add patient
              </Link>
              <Link to="/patients/" className="nav-link" role="button">
                Patients
              </Link>
            </>
          )}
          <Link to="/calendar/" className="nav-link" role="button">
            Calendar
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
