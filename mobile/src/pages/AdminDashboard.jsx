import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de Bord Administrateur
        </Typography>
        <Typography paragraph>
          Bienvenue sur le panneau d'administration. D'ici, vous pouvez gérer les utilisateurs,
          visualiser les statistiques et superviser l'ensemble de l'application.
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="contained" component={RouterLink} to="/admin/users">
              Gérer les utilisateurs
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" component={RouterLink} to="/admin/stats">
              Voir les statistiques
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
