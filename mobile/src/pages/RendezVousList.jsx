import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fetchRendezVous } from '../api';
import {
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import { Add as AddIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const SAMPLE_RVS = [
    { id: 1, type: 'SUPPORT', date: '2025-12-15', description: 'Visite technique' },
    { id: 2, type: 'ENTRETIEN', date: '2025-12-20', description: 'Entretien RH' },
];

export default function RendezVousList() {
    const [rvs, setRvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        fetchRendezVous()
        .then((data) => {
            if (!mounted) return;
            setRvs(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
            const message = err?.response?.data?.message || err.message || 'Erreur lors du chargement';
            if (err?.message && (err.message.includes('Network Error') || err.code === 'ERR_NETWORK')) {
                setRvs(SAMPLE_RVS);
                setError('Mode mock activé — backend indisponible');
            } else {
                setError(message);
            }
        })
        .finally(() => {
            if (mounted) {
                setLoading(false)
            }
        });

        return () => (mounted = false);
    }, []);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Liste des Rendez-vous
                </Typography>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to="/rendezvous/new"
                    startIcon={<AddIcon />}
                >
                    Nouveau rendez-vous
                </Button>
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            {error && <Alert severity={error.includes('mock') ? 'warning' : 'error'} sx={{ mt: 2 }}>{error}</Alert>}

            {!loading && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rvs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        Aucun rendez-vous trouvé
                                    </TableCell>
                                </TableRow>
                            )}
                            {rvs.map((rv) => (
                                <TableRow key={rv.id}>
                                    <TableCell component="th" scope="row">
                                        {rv.type || `Rendez-vous #${rv.id}`}
                                    </TableCell>
                                    <TableCell>{new Date(rv.date).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton component={RouterLink} to={`/rendezvous/${rv.id}`} color="primary">
                                            <ArrowForwardIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

