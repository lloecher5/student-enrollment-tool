import React from "react";

import { Navbar, Container, Nav } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/"> Student Enrollment Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/add-student">Enroll New Student</Nav.Link>
            <Nav.Link href="/students">Current Students</Nav.Link>
            <Nav.Link href="/classes">Classes Offered</Nav.Link>
            <Nav.Link href="/class-rosters">Class Rosters</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
