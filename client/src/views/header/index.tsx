import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand>
        <Link to="/">Michele Ker</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/add-patients/" className="nav-link" role="button">
            Add patient
          </Link>
          <Link to="/patients/" className="nav-link" role="button">
            Patients
          </Link>
          <Link to="/calendar/" className="nav-link" role="button">
            Calendar
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
