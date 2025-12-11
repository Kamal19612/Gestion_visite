import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function AgentSecuriteDashboard() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de Bord Agent de Sécurité
        </Typography>
        <Typography paragraph>
          Bienvenue sur votre tableau de bord. Votre rôle est de valider l'arrivée et le départ des visiteurs.
        </Typography>
        <Button variant="contained" component={RouterLink} to="/visites/scanner">
          Scanner un QR Code
        </Button>
      </Box>
    </Container>
  );
}
