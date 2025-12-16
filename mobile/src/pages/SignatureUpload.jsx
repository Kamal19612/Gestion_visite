import React, { useRef, useState } from 'react';
import { Container, Typography, Button, Box, Input } from '@mui/material';
import { uploadSignature } from '../api';
import { useAuth } from '../AuthContext';
import SignaturePad from 'signature_pad';

export default function SignatureUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('draw'); // 'draw' or 'upload'
  const canvasRef = useRef(null);
  const sigPadRef = useRef(null);
  const { user } = useAuth();

  const initPad = () => {
    if (!canvasRef.current) return;
    if (!sigPadRef.current) {
      sigPadRef.current = new SignaturePad(canvasRef.current, { backgroundColor: 'rgba(255,255,255,0)', penColor: 'black' });
    }
  };

  const clearPad = () => {
    sigPadRef.current?.clear();
  };

  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const visiteId = user?.id || prompt("Entrez l'ID de la visite associée:");
      let uploadFile = file;
      if (mode === 'draw') {
        if (!sigPadRef.current || sigPadRef.current.isEmpty()) {
          setMessage('Veuillez dessiner votre signature.');
          return;
        }
        const dataURL = sigPadRef.current.toDataURL('image/png');
        uploadFile = dataURLToBlob(dataURL);
        // give it a filename property for backend handling
        uploadFile.name = `signature_visite_${visiteId}.png`;
      } else {
        if (!uploadFile) {
          setMessage('Sélectionnez un fichier.');
          return;
        }
      }

      await uploadSignature(visiteId, uploadFile);
      setMessage('Signature uploadée avec succès.');
    } catch (e) {
      console.error(e);
      setMessage('Erreur lors de l\'upload: ' + (e?.response?.data || e.message));
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5">Uploader une signature</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant={mode === 'draw' ? 'contained' : 'outlined'} onClick={() => { setMode('draw'); setTimeout(initPad, 100); }} sx={{ mr: 1 }}>Dessiner</Button>
          <Button variant={mode === 'upload' ? 'contained' : 'outlined'} onClick={() => setMode('upload')}>Uploader fichier</Button>
        </Box>

        {mode === 'draw' && (
          <Box sx={{ mt: 2 }}>
            <canvas ref={canvasRef} width={600} height={200} style={{ border: '1px solid #ccc', touchAction: 'none' }} />
            <Box sx={{ mt: 1 }}>
              <Button onClick={clearPad} sx={{ mr: 1 }}>Effacer</Button>
              <Button variant="contained" onClick={handleUpload}>Enregistrer</Button>
            </Box>
          </Box>
        )}

        {mode === 'upload' && (
          <Box sx={{ mt: 2 }}>
            <Input type="file" onChange={handleFileChange} inputProps={{ accept: 'image/*' }} />
            <Box sx={{ mt: 1 }}>
              <Button variant="contained" onClick={handleUpload}>Uploader</Button>
            </Box>
          </Box>
        )}

        {message && (
          <Typography sx={{ mt: 2 }}>{message}</Typography>
        )}
      </Box>
    </Container>
  );
}
