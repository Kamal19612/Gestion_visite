import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { exportReports } from '../api';

export default function Reports() {
  const download = async (format) => {
    try {
      const blob = await exportReports(format);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `visites.${format === 'excel' ? 'xlsx' : 'pdf'}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (e) {
      console.error(e);
      alert('Erreur lors de l\'export du rapport');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5">Exporter les visites</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => download('pdf')} sx={{ mr: 2 }}>Exporter PDF</Button>
          <Button variant="contained" onClick={() => download('excel')}>Exporter Excel</Button>
        </Box>
      </Box>
    </Container>
  );
}
