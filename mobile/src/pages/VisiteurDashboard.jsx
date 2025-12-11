import { Container, Typography, Box } from '@mui/material';
import { useAuth } from '../AuthContext';

export default function VisiteurDashboard() {
  const { user } = useAuth();

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de Bord Visiteur
        </Typography>
        <Typography variant="h6">
          Bienvenue, {user?.name || 'Visiteur'} !
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          Ceci est votre espace personnel. Bientôt, vous pourrez voir ici la liste de vos rendez-vous passés et à venir,
          et gérer vos informations.
        </Typography>
      </Box>
    </Container>
  );
}
