import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Inscription: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [nom, setNom] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Typage de l'erreur catch : on peut utiliser unknown et faire un check
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (password.length < 8) {
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nom, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Une erreur est survenue lors de l'inscription.");
      } else {
        setSuccessMessage(data.message || "Inscription réussie !");
        setEmail('');
        setNom('');
        setPassword('');
        setTimeout(() => {
          navigate('/connexion');
        }, 2000);
      }
    } catch (error: unknown) {
      // Gestion prudente de l'erreur
      if (error instanceof Error) {
        setErrorMessage('Erreur réseau ou serveur. Veuillez réessayer plus tard.');
        console.error('Erreur lors de l\'inscription :', error.message);
      } else {
        setErrorMessage('Erreur inconnue.');
        console.error('Erreur lors de l\'inscription :', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0d6efd',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '2.5rem',
          marginBottom: '2rem',
          userSelect: 'none',
        }}
      >
        Wakatii
      </div>

      <Container
        fluid
        style={{
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          padding: '2.5rem 2rem',
          color: '#333',
          maxWidth: '420px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        }}
      >
        <h2 className="mb-4 text-center" style={{ fontWeight: '700' }}>
          Créer un compte
        </h2>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="formNom" className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez votre mot de passe (8 caractères min.)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3"
            style={{ fontWeight: '600', fontSize: '1.1rem' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Inscription en cours...
              </>
            ) : (
              "S'inscrire"
            )}
          </Button>
        </Form>

        <Row className="mt-2">
          <Col>
            <Button
              variant="outline-primary"
              className="w-100 d-flex align-items-center justify-content-center"
              onClick={() => navigate('/')}
              style={{ fontWeight: '600' }}
            >
              <FaArrowLeft className="me-2" />
              Accueil
            </Button>
          </Col>
          <Col>
            <Button
              variant="outline-success"
              className="w-100"
              onClick={() => navigate('/connexion')}
              style={{ fontWeight: '600' }}
            >
              Connexion
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Inscription;
