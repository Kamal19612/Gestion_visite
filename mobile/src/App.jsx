import './App.css';
import { BrowserRouter, Routes, Route, Link as RouterLink, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './pages/Login';
import RendezVousList from './pages/RendezVousList';
import RendezVousDetail from './pages/RendezVousDetail';
import RendezVousForm from './pages/RendezVousForm';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignatureUpload from './pages/SignatureUpload';
import Reports from './pages/Reports';
import StatsByPeriod from './pages/StatsByPeriod';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
} from '@mui/material';

function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/rendezvous"
        element={
          <Protected>
            <RendezVousList />
          </Protected>
        }
      />
      <Route
        path="/rendezvous/new"
        element={
          <Protected>
            <RendezVousForm />
          </Protected>
        }
      />
      <Route
        path="/rendezvous/:id"
        element={
          <Protected>
            <RendezVousDetail />
          </Protected>
        }
      />
      <Route
        path="/rendezvous/:id/edit"
        element={
          <Protected>
            <RendezVousForm />
          </Protected>
        }
      />
      <Route
        path="/signatures"
        element={
          <Protected>
            <SignatureUpload />
          </Protected>
        }
      />
      <Route
        path="/reports"
        element={
          <Protected>
            <Reports />
          </Protected>
        }
      />
      <Route
        path="/stats"
        element={
          <Protected>
            <StatsByPeriod />
          </Protected>
        }
      />
    </Routes>
  );
}

function Navigation() {
  const { token, logout, user } = useAuth();
  const role = user?.role || null;
  const hasRole = (r) => {
    if (!role) return false;
    // role might be string or object; handle both
    const roleStr = typeof role === 'string' ? role : role.name || role.toString();
    return roleStr.toUpperCase() === r.toUpperCase();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/" sx={{ textTransform: 'none', fontSize: '1.25rem' }}>
            Gestion des Visites
          </Button>
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Accueil
        </Button>
        {token ? (
          <>
            <Button color="inherit" component={RouterLink} to="/dashboard">
              Tableau de bord
            </Button>
            {/* Rendez-vous: visible to visiteurs, secrétaires, employeurs, admin */}
            {(hasRole('VISITEUR') || hasRole('SECRETAIRE') || hasRole('EMPLOYEUR') || hasRole('ADMIN')) && (
              <Button color="inherit" component={RouterLink} to="/rendezvous">Rendez-vous</Button>
            )}

            {/* Signatures: visible to visiteurs and agents */}
            {(hasRole('VISITEUR') || hasRole('AGENT_SECURITE') || hasRole('ADMIN')) && (
              <Button color="inherit" component={RouterLink} to="/signatures">Signatures</Button>
            )}

            {/* Reports & Stats: visible to secrétaires and admins */}
            {(hasRole('SECRETAIRE') || hasRole('ADMIN')) && (
              <>
                <Button color="inherit" component={RouterLink} to="/reports">Rapports</Button>
                <Button color="inherit" component={RouterLink} to="/stats">Statistiques</Button>
              </>
            )}

            <Button color="inherit" onClick={logout}>
              Déconnexion
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Connexion
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Inscription
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CssBaseline />
        <Navigation />
        <Box component="main" sx={{ p: 3 }}>
          <AppRoutes />
        </Box>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
