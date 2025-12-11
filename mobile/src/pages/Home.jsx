import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography component="h1" variant="h2" gutterBottom>
          Bienvenue sur GestionVisite
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Ceci est la page d'accueil de votre application. Vous pouvez la personnaliser
          avec des informations sur votre projet, ses fonctionnalités et comment
          l'utiliser.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mx: 1 }}
          >
            Se connecter
          </Button>
          <Button
            component={RouterLink}
            to="/register"
            variant="outlined"
            color="primary"
            size="large"
            sx={{ mx: 1 }}
          >
            S'inscrire
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
