import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="hero-text"
            >
              <h1>Gérez vos rendez-vous clients sans stress</h1>
              <p>
                Wakatii est l'application web intuitive conçue pour les artisans et indépendants
                qui veulent optimiser leur planning et ne plus jamais manquer un rendez-vous.
              </p>
              <div className="hero-buttons">
                <Button href="/inscription" variant="primary" size="lg" className="me-3">
                  Commencer maintenant
                </Button>
                <Button href="/connexion" variant="outline-primary" size="lg">
                  Se connecter
                </Button>
              </div>
            </motion.div>
          </Col>

          <Col md={6} className="hero-image text-center">
            <motion.img
              src="https://www.comundi.fr/mag-des-competences/wp-content/uploads/2021/07/Le-controle-de-gestion.jpg"
              alt="Artisan utilisant une tablette"
              className="img-fluid rounded shadow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
