import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="md" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
            Wakatii
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/">
                Accueil
              </Nav.Link>
              <Nav.Link as={Link} to="/connexion">
                Connexion/inscription
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero section */}
      <header className="header-v d-flex align-items-center">
        <Container className="text-center text-white">
          <h1 className="header-title">Organisez facilement vos rendez-vous clients</h1>
          <p className="header-subtitle">
            Wakatii vous aide à gérer votre planning simplement et efficacement.
          </p>
        </Container>
      </header>
    </>
  );
};

export default Header;
