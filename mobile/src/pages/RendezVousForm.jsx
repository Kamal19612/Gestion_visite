import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRendezVous, getRendezVousById, updateRendezVous } from '../api';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

export default function RendezVousForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ titre: '', date: '', heure: '', description: '' });
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (isEdit) {
      setLoading(true);
      getRendezVousById(id)
        .then((data) => {
          if (!mounted) return;
          setForm({
            titre: data.titre || data.subject || '',
            // Format date for input type="date"
            date: (data.date || data.scheduledAt || '').split('T')[0],
            heure: (data.date || data.scheduledAt || '').split('T')[1]?.substring(0, 5) || '',
            description: data.description || data.note || '',
          });
        })
        .catch((err) => setError(err?.response?.data?.message || err.message || 'Erreur'))
        .finally(() => {
            if (mounted) setLoading(false)
        });
    } else {
        setLoading(false);
    }
    return () => (mounted = false);
  }, [id, isEdit]);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (isEdit) {
        await updateRendezVous(id, form);
        navigate(`/rendezvous/${id}`);
      } else {
        const created = await createRendezVous(form);
        const newId = created.id || created._id;
        navigate(`/rendezvous/${newId}`);
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {isEdit ? 'Modifier le rendez-vous' : 'Créer un rendez-vous'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Titre"
          name="titre"
          value={form.titre}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          disabled={submitting}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
          disabled={submitting}
        />
        <TextField
          label="Heure"
          name="heure"
          type="time"
          value={form.heure}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
          disabled={submitting}
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          disabled={submitting}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Box sx={{ mt: 3, position: 'relative' }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<SaveIcon />}
            disabled={submitting}
          >
            {isEdit ? 'Enregistrer' : 'Créer'}
          </Button>
          {submitting && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
}
