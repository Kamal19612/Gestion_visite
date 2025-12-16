import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { getStatsByPeriode } from '../api';

export default function StatsByPeriod() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [results, setResults] = useState([]);

  const fetch = async () => {
    try {
      const data = await getStatsByPeriode(from, to);
      setResults(data);
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la récupération des statistiques');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5">Statistiques par période</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField label="From (YYYY-MM-DD)" value={from} onChange={(e) => setFrom(e.target.value)} />
          <TextField label="To (YYYY-MM-DD)" value={to} onChange={(e) => setTo(e.target.value)} />
          <Button variant="contained" onClick={fetch}>Chercher</Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          {results.length === 0 ? (
            <Typography>Aucune donnée</Typography>
          ) : (
            results.map((r) => (
              <Box key={r.id} sx={{ mb: 2, p: 2, border: '1px solid #eee' }}>
                <Typography><strong>Période:</strong> {r.periode}</Typography>
                <Typography><strong>Visites:</strong> {r.nombreVisites}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
}
