import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { getRendezVousById, deleteRendezVous } from '../api';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

export default function RendezVousDetail() {
  const { id } = useParams();
  const [rv, setRv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getRendezVousById(id)
      .then((data) => {
        if (!mounted) return;
        setRv(data);
      })
      .catch((err) => setError(err?.response?.data?.message || err.message || 'Erreur'))
      .finally(() => {
          if (mounted) setLoading(false);
      });
      
    return () => (mounted = false);
  }, [id]);

  const handleDelete = async () => {
    setDeleteConfirmOpen(false);
    try {
      await deleteRendezVous(id);
      navigate('/rendezvous');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!rv) return <Alert severity="warning">Aucun rendez-vous trouvé.</Alert>;

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {rv.titre || rv.subject || `Rendez-vous ${rv.id || rv._id}`}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              component={RouterLink}
              to="/rendezvous"
              sx={{ mr: 1 }}
            >
              Retour
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              component={RouterLink}
              to={`/rendezvous/${id}/edit`}
              sx={{ mr: 1 }}
            >
              Modifier
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteConfirmOpen(true)}
            >
              Supprimer
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">Date</Typography>
                <Typography variant="body1">{new Date(rv.date || rv.scheduledAt).toLocaleString() || '—'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">Visiteur</Typography>
                <Typography variant="body1">{rv.visitorName || rv.nom || '—'}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">Description</Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{rv.description || rv.note || '—'}</Typography>
            </Grid>
        </Grid>
      </Paper>

      <Dialog open={isDeleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce rendez-vous ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Annuler</Button>
          <Button onClick={handleDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
