import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonialsData = [
  {
    name: "Alice Dupont",
    role: "Artisane Bijoutière",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Wakatii m'a vraiment simplifié la vie. Mes rendez-vous sont bien organisés et je ne rate plus aucune occasion.",
  },
  {
    name: "Marc Lefevre",
    role: "Indépendant en plomberie",
    photo: "https://randomuser.me/api/portraits/men/35.jpg",
    quote: "Enfin une application simple et efficace pour gérer mes clients. Je recommande vivement Wakatii !",
  },
  {
    name: "Sophie Martin",
    role: "Esthéticienne",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "Grâce à Wakatii, mes rappels automatiques m'aident à ne jamais oublier un rendez-vous important.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

const Testimonials = () => (
  <section className="testimonials py-5 bg-light">
    <Container>
      <h2 className="text-center mb-5">Ce que disent nos utilisateurs</h2>
      <Row className="justify-content-center">
        {testimonialsData.map((item, index) => (
          <Col md={4} key={index} className="mb-4">
            <motion.div
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Card className="shadow-sm h-100">
                <Card.Body className="text-center">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="rounded-circle mb-3 testimonial-photo"
                  />
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{item.role}</Card.Subtitle>
                  <Card.Text className="fst-italic">"{item.quote}"</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default Testimonials;
