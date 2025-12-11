import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function SecretaireDashboard() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de Bord Secrétaire
        </Typography>
        <Typography paragraph>
          Bienvenue sur votre tableau de bord. Vous pouvez gérer les rendez-vous pour les employés.
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" component={RouterLink} to="/rendezvous">
              Voir tous les rendez-vous
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" component={RouterLink} to="/rendezvous/new">
              Créer un nouveau rendez-vous
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
