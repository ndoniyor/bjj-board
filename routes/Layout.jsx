import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from 'react-router-dom';
import {AiOutlineHome} from 'react-icons/ai'

export default function Layout() {
  return (
    <div>
      <Navbar className="px-3 py-2" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand as={Link} to="/">
          <AiOutlineHome />
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/gallery">View Posts</Nav.Link>
          <Nav.Link as={Link} to="/create">Create</Nav.Link>
        </Nav>
      </Navbar>
      <Outlet />
      <small className="credit">Created by Doniyor Nimatullo</small>
    </div>
  );
}
