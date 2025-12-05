import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router"; // Note: usually it's 'react-router-dom'

const MyNavbar = () => {
  const token = localStorage.getItem("token");

  return (
    <div>
      <Navbar variant="dark" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand>
            <Link className="brand-text text-decoration-none" to="/">
              Meditations
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center">
              <Link className="navLink" to="/Everyday Life">
                Everyday Life
              </Link>

              <Link className="navLink" to="/Philosophy">
                Philosophy
              </Link>

              <Link className="navLink" to="/Movies-TV Shows">
                Movies / TV Shows
              </Link>

              <Link className="navLink" to="/Video Games">
                Video Games
              </Link>

              <Link className="navLink" to="/Books-Comics">
                Books / Comics
              </Link>
            </Nav>

            <Link className="about-btn ms-auto align-items-center" to="/about">
              About
            </Link>

            {token && (
              <div className="ms-3">
                <Button variant="warning" className="d-flex align-items-center p-0">
                  <Link 
                    to="/create" 
                    className="text-dark d-flex align-items-center justify-content-center" 
                    style={{ textDecoration: 'none', width: '100%', height: '100%', padding: '6px 12px' }}
                  >
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
                  </Link>
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