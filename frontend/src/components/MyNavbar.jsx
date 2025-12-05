import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const MyNavbar = () => {
  const token = localStorage.getItem("token"); 

  return (
    <div>
      <Navbar variant="dark" expand="lg" className="py-3">
        <Container>
    
          <Navbar.Brand className="brand-text" href="/">
            Meditations
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav variant="underline" className="ms-auto align-items-center">
              <Nav.Link href="/Everyday Life">Everyday Life</Nav.Link>
              <Nav.Link href="/Philosophy">Philosophy</Nav.Link>
              <Nav.Link href="/Movies-TV Shows">Movies / TV Shows</Nav.Link>
              <Nav.Link href="/Video Games">Video Games</Nav.Link>
              <Nav.Link href="/Books-Comics">Books / Comics</Nav.Link>
              
              <Nav.Link href="/about" className="about-btn">
                About
              </Nav.Link>
            </Nav>

            {token && (
              <div className="ms-3">
                <Button variant="warning" href="/create" className="d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                    />
                  </svg>
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;