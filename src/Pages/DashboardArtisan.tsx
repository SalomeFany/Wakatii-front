import React, { useState, useMemo } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Table,
  Form,
  InputGroup,
  Pagination,
  Modal,
  Badge,
} from "react-bootstrap";
import {  FaCalendarAlt, FaUsers, FaCog } from "react-icons/fa";

// Données clients mock
const MOCK_CLIENTS = Array.from({ length: 125 }, (_, i) => ({
  id: i + 1,
  nom: `Client ${i + 1}`,
  email: `client${i + 1}@exemple.com`,
  telephone: "+229 9000 000" + ((i % 10) + 1),
}));

type RendezVous = {
  id: number;
  client: string;
  date: string;
  heure: string;
  statut: "Confirmé" | "Annulé" | "En attente";
};

// Données RDV mock
const MOCK_RDVS = [
  {
    id: 1,
    client: "Client 1",
    date: "2025-06-05",
    heure: "10:30",
    statut: "Confirmé",
  },
  {
    id: 2,
    client: "Client 7",
    date: "2025-06-06",
    heure: "14:00",
    statut: "Annulé",
  },
  {
    id: 3,
    client: "Client 13",
    date: "2025-06-07",
    heure: "09:00",
    statut: "Confirmé",
  },
];

// Composant sidebar
const Sidebar = ({ activePage, setActivePage }: { activePage: string; setActivePage: (p: string) => void }) => (
  <Nav className="flex-column bg-light vh-100 p-3" style={{ width: 240, borderRight: "1px solid #ddd" }}>
    <h3 className="mb-4">Wakatii</h3>
    <Nav.Link
      active={activePage === "dashboard"}
      onClick={() => setActivePage("dashboard")}
      style={{ cursor: "pointer" }}
    >
      <FaCalendarAlt className="me-2" /> Tableau de bord
    </Nav.Link>
    <Nav.Link
      active={activePage === "rdvs"}
      onClick={() => setActivePage("rdvs")}
      style={{ cursor: "pointer" }}
    >
      <FaCalendarAlt className="me-2" /> Rendez-vous
    </Nav.Link>
    <Nav.Link
      active={activePage === "clients"}
      onClick={() => setActivePage("clients")}
      style={{ cursor: "pointer" }}
    >
      <FaUsers className="me-2" /> Clients
    </Nav.Link>
    <Nav.Link
      active={activePage === "settings"}
      onClick={() => setActivePage("settings")}
      style={{ cursor: "pointer" }}
    >
      <FaCog className="me-2" /> Paramètres
    </Nav.Link>
  </Nav>
);

// Header
const Header = ({ username }: { username: string }) => (
  <Navbar bg="white" className="shadow-sm px-4" style={{ height: 56 }}>
    <Navbar.Brand href="#" className="fw-bold">
      Bonjour, {username}
    </Navbar.Brand>
    <Nav className="ms-auto align-items-center">
      <Button variant="outline-primary" size="sm" className="me-2">
        Notifications <Badge bg="danger">3</Badge>
      </Button>
      <Button variant="outline-secondary" size="sm">
        Déconnexion
      </Button>
    </Nav>
  </Navbar>
);

// Pagination simple
const PaginationComponent = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
        {i}
      </Pagination.Item>
    );
  }
  return <Pagination>{pages}</Pagination>;
};

// Table clients avec recherche, pagination, suppression
const ClientsPage = () => {
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const filteredClients = useMemo(() => {
    return clients.filter(
      (c) =>
        c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.telephone.includes(searchTerm)
    );
  }, [clients, searchTerm]);

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredClients.slice(start, start + perPage);
  }, [filteredClients, currentPage]);

  const handleDelete = (id: number) => {
    if (window.confirm("Supprimer ce client ?")) {
      setClients((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <>
      <h3>Clients</h3>
      <InputGroup className="mb-3" style={{ maxWidth: 400 }}>
        <Form.Control
          placeholder="Rechercher client par nom, email ou téléphone"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.length ? (
            paginatedClients.map((client) => (
              <tr key={client.id}>
                <td>{client.nom}</td>
                <td>{client.email}</td>
                <td>{client.telephone}</td>
                <td>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(client.id)}
                    title="Supprimer client"
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                Aucun client trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <PaginationComponent
        total={filteredClients.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

// Page rendez-vous
const RdvsPage = () => {
  const [rdvs, setRdvs] = useState(MOCK_RDVS);

  // Modal ajout / modification rendez-vous
  const [showModal, setShowModal] = useState(false);
const [editingRdv, setEditingRdv] = useState<RendezVous | null>(null);


  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [statut, setStatut] = useState("Confirmé");

  const resetForm = () => {
    setClient("");
    setDate("");
    setHeure("");
    setStatut("Confirmé");
    setEditingRdv(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

const openEditModal = (rdv: RendezVous) => {
  setEditingRdv(rdv);
  setClient(rdv.client);
  setDate(rdv.date);
  setHeure(rdv.heure);
  setStatut(rdv.statut);
  setShowModal(true);
};

  const handleSave = () => {
    if (!client || !date || !heure) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    if (editingRdv) {
      // Modifier
      setRdvs((prev) =>
        prev.map((r) => (r.id === editingRdv.id ? { ...r, client, date, heure, statut } : r))
      );
    } else {
      // Ajouter
      const newRdv = {
        id: rdvs.length ? rdvs[rdvs.length - 1].id + 1 : 1,
        client,
        date,
        heure,
        statut,
      };
      setRdvs((prev) => [...prev, newRdv]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Supprimer ce rendez-vous ?")) {
      setRdvs((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <>
       <div className="d-flex justify-content-between align-items-center mb-3">
    <h4 className="mb-0">📅 Mes Rendez-vous</h4>
    <Button variant="success" onClick={openAddModal}>
      ➕ Ajouter un rendez-vous
    </Button>
  </div>

      <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Client</th>
        <th>Date</th>
        <th>Heure</th>
        <th>Statut</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {rdvs.map((rdv) => (
        <tr key={rdv.id}>
          <td>{rdv.client}</td>
          <td>{rdv.date}</td>
          <td>{rdv.heure}</td>
          <td>{rdv.statut}</td>
          <td>
            <div className="d-flex">
              <Button
                size="sm"
                variant="primary"
                className="me-2"
                onClick={() => openEditModal(rdv)}
              >
                Modifier
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => deleteRdv(rdv.id)}
              >
                Supprimer
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>

      {/* Modal ajout/modif */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingRdv ? "Modifier le rendez-vous" : "Ajouter un rendez-vous"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formClient">
              <Form.Label>Client</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom du client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHeure">
              <Form.Label>Heure</Form.Label>
              <Form.Control type="time" value={heure} onChange={(e) => setHeure(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatut">
              <Form.Label>Statut</Form.Label>
              <Form.Select value={statut} onChange={(e) => setStatut(e.target.value)}>
                <option>Confirmé</option>
                <option>Annulé</option>
                <option>En attente</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Page paramètres
const SettingsPage = () => (
  <>
    <h3>Paramètres</h3>
    <p>
      Cette page contient les réglages globaux de l'application. Vous pouvez y ajouter la gestion des clients, des
      rendez-vous, et autres paramètres.
    </p>
    <ul>
      <li>Gestion des utilisateurs</li>
      <li>Gestion des rôles et permissions</li>
      <li>Paramètres de notifications</li>
      <li>Personnalisation de la charte graphique</li>
      <li>
        <Button variant="outline-primary" size="sm" className="mt-2">
          Gérer les clients (redirection vers page dédiée)
        </Button>
      </li>
    </ul>
  </>
);

// Page tableau de bord résumé
const DashboardPage = () => {
  // Simples statistiques mock
  const totalClients = MOCK_CLIENTS.length;
  const totalRdvs = MOCK_RDVS.length;
  const rdvsConfirms = MOCK_RDVS.filter((r) => r.statut === "Confirmé").length;

  return (
    <>
      <h3>Tableau de bord</h3>
      <Row className="g-4">
        <Col md={4}>
          <div className="p-3 border rounded shadow-sm bg-white">
            <h5>Total Clients</h5>
            <p className="display-6 fw-bold">{totalClients}</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-3 border rounded shadow-sm bg-white">
            <h5>Total Rendez-vous</h5>
            <p className="display-6 fw-bold">{totalRdvs}</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-3 border rounded shadow-sm bg-white">
            <h5>Rendez-vous confirmés</h5>
            <p className="display-6 fw-bold">{rdvsConfirms}</p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const username = "Oscar";

  let content;
  switch (activePage) {
    case "clients":
      content = <ClientsPage />;
      break;
    case "rdvs":
      content = <RdvsPage />;
      break;
    case "settings":
      content = <SettingsPage />;
      break;
    default:
      content = <DashboardPage />;
  }

  return (
    <div className="d-flex" style={{ height: "100vh", background: "#f5f7fa" }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-grow-1 d-flex flex-column">
        <Header username={username} />
        <Container fluid className="p-4 overflow-auto" style={{ flexGrow: 1 }}>
          {content}
        </Container>
      </div>
    </div>
  );
}
