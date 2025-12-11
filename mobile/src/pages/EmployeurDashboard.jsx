import { Container, Typography, Box } from '@mui/material';
import { useAuth } from '../AuthContext';

export default function EmployeurDashboard() {
  const { user } = useAuth();

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de Bord Employé
        </Typography>
        <Typography variant="h6" gutterBottom>
          Bienvenue, {user?.name || 'Employé'}.
        </Typography>
        <Typography paragraph>
          Consultez ici les demandes de rendez-vous qui vous sont adressées et gérez votre emploi du temps.
        </Typography>
        {/* Des boutons ou des liens vers les rendez-vous de l'employé pourraient être ajoutés ici */}
      </Box>
    </Container>
  );
}
