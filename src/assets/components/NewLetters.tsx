import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Newsletter.css';

const Newsletter = () => (
  <section className="newsletter text-center py-5">
    <Container>
      <motion.h2
        className="mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        Restez informé avec Wakatii
      </motion.h2>
      <motion.p
        className="mb-4 lead"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Inscrivez-vous à notre newsletter pour recevoir conseils, astuces et nouveautés.
      </motion.p>
      <Form>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={5}>
            <Form.Control
              type="email"
              placeholder="Entrez votre email"
              required
              className="mb-3 mb-md-0"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="warning" size="lg">
              S'inscrire
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  </section>
);

export default Newsletter;
