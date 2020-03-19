import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { AuthState } from '../../state/auth/';

export default function Header({ isAuthenticated, userName }: AuthState) {
  return (
    <Navbar variant="light" bg="light" expand="lg" className="mb-3">
      <Navbar.Brand>
        {isAuthenticated ? (
          <Link to="/">{userName ?? 'User'}</Link>
        ) : (
          <Link to="/login/">Login</Link>
        )}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isAuthenticated && (
            <>
              <Link to="/patient-form/" className="nav-link" role="button">
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
