import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Accueil from '../../Pages/Accueil';
import Connexion from '../../Pages/Connexion';
import Inscription from '../../Pages/Inscription';
import DashboardArtisan from '../../Pages/DashboardArtisan';

const PublicRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<Accueil />} />
    <Route path="/connexion" element={<Connexion />} />
    <Route path="/inscription" element={<Inscription />} />
    <Route path="/artisan" element={<DashboardArtisan />} />

  </Routes>
);

export default PublicRouter;
