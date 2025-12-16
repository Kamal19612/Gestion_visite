import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { register } from '../api';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);
    try {
      await register({ ...formData, role: 'VISITEUR' });
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, borderRadius: 2, px: 4, py: 3 }}>
        <Typography component="h1" variant="h5">Inscription</Typography>
        {success ? (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Alert severity="success">Inscription réussie ! Vous pouvez maintenant vous connecter.</Alert>
            <Button component={RouterLink} to="/login" variant="contained" sx={{ mt: 2 }}>Aller à la page de connexion</Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="name" label="Nom complet" name="name" autoComplete="name" autoFocus value={formData.name} onChange={handleChange} disabled={loading} />
            <TextField margin="normal" required fullWidth id="email" label="Adresse Email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} disabled={loading} />
            <TextField margin="normal" required fullWidth name="password" label="Mot de passe" type="password" id="password" autoComplete="new-password" value={formData.password} onChange={handleChange} disabled={loading} />
            {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
            <Box sx={{ position: 'relative', mt: 3, mb: 2 }}>
              <Button type="submit" fullWidth variant="contained" disabled={loading}>S'inscrire</Button>
              {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />}
            </Box>
            <Box textAlign="center"><RouterLink to="/login">Déjà un compte ? Connectez-vous</RouterLink></Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}
