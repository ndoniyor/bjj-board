import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Navbar className="px-3 py-2" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav>
          <Nav.Link href="/gallery">View Posts</Nav.Link>
          <Nav.Link href="/create">Create</Nav.Link>
        </Nav>
      </Navbar>
      <Outlet />
    </div>
  );
}
