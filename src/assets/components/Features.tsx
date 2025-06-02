import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import './Features.css';

const featureData = [
  {
    title: 'Planification facile',
    description: 'Organisez vos rendez-vous en quelques clics, avec un calendrier clair et intuitif.',
    icon: (
      <svg width="48" height="48" fill="none" stroke="#0d6efd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="42" height="36" rx="4" ry="4" />
        <line x1="16" y1="2" x2="16" y2="14" />
        <line x1="32" y1="2" x2="32" y2="14" />
        <line x1="3" y1="22" x2="45" y2="22" />
      </svg>
    ),
  },
  {
    title: 'Notifications automatiques',
    description: 'Recevez des rappels par email et SMS pour ne plus jamais manquer un rendez-vous important.',
    icon: (
      <svg width="48" height="48" fill="none" stroke="#0d6efd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 44c8 0 14-6 14-14v-8a6 6 0 0 0-12 0v8" />
        <circle cx="24" cy="44" r="2" />
      </svg>
    ),
  },
  {
    title: 'Interface conviviale',
    description: 'Une interface simple, claire et facile à prendre en main dès la première utilisation.',
    icon: (
      <svg width="48" height="48" fill="none" stroke="#0d6efd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="20" />
        <path d="M16 24l4 4 8-8" />
      </svg>
    ),
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <section className="features py-5" ref={ref} style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <h2 className="text-center mb-5">Fonctionnalités</h2>
        <Row className="gy-4">
          {featureData.map((feature, i) => (
            <Col md={4} key={feature.title}>
              <motion.div
                className="feature-item p-4 h-100 border rounded bg-white shadow-sm"
                custom={i}
                initial="hidden"
                animate={controls}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(13, 110, 253, 0.3)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="mb-3" style={{ color: '#0d6efd' }}>
                  {feature.icon}
                </div>
                <h3 >{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
