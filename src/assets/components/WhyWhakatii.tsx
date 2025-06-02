import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import './WhyWakatii.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const WhyWakatii = () => (
  <section className="why-wakatii py-5">
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <h2 className="mb-4">Pourquoi choisir Wakatii ?</h2>
            <p className="lead">
              Wakatii aide les artisans et indépendants à gérer facilement leurs rendez-vous clients, 
              grâce à une interface intuitive, des rappels automatiques et une organisation sans stress. 
              Gagnez du temps, concentrez-vous sur votre savoir-faire !
            </p>
          </motion.div>
        </Col>
        <Col md={6} className="text-center">
          <motion.img 
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80" 
            alt="Organisation artisan" 
            className="img-fluid rounded shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          />
        </Col>
      </Row>
    </Container>
  </section>
);

export default WhyWakatii;
