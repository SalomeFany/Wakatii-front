import { Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './CallToAction.css';

const CallToAction = () => (
  <section className="call-to-action text-center py-5">
    <Container>
      <motion.h2
        className="mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        Prêt à organiser vos rendez-vous sans stress ?
      </motion.h2>
      <motion.p
        className="mb-4 lead"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Inscrivez-vous maintenant et profitez d'une gestion simplifiée, rapide et gratuite.
      </motion.p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button variant="primary" size="lg" href="/signup">
          Commencer gratuitement
        </Button>
      </motion.div>
    </Container>
  </section>
);

export default CallToAction;
