import { useAuth } from '../AuthContext';
import VisiteurDashboard from './VisiteurDashboard';
import AdminDashboard from './AdminDashboard';
import AgentSecuriteDashboard from './AgentSecuriteDashboard';
import SecretaireDashboard from './SecretaireDashboard';
import EmployeurDashboard from './EmployeurDashboard';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

// This component is defined outside of the rendering component
const DefaultDashboard = ({ user }) => (
    <Box>
        <Typography variant="h4">Tableau de Bord</Typography>
        <Typography>Bienvenue, {user?.name || 'utilisateur'}.</Typography>
    </Box>
);

const RoleBasedDashboard = () => {
    const { user, token } = useAuth();

    // if there's a token but no user yet, show a loader while profile is fetched
    if (token && !user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    switch (user?.role) {
    case 'VISITEUR':
      return <VisiteurDashboard />;
    case 'ADMIN':
      return <AdminDashboard />;
    case 'AGENT_SECURITE':
        return <AgentSecuriteDashboard />;
    case 'SECRETAIRE':
        return <SecretaireDashboard />;
    case 'EMPLOYEUR':
        return <EmployeurDashboard />;
    default:
      // Render a default dashboard or a loading state while user data is being fetched
      return <DefaultDashboard user={user} />;
  }
};

export default function Dashboard() {
    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <RoleBasedDashboard />
            </Box>
        </Container>
    );
};
