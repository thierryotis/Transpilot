import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';

const defaultTheme = createTheme();

const AddOperateur = () => {
  const [nom, setNom] = useState('');
  const [cni, setCNI] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nom: nom,
      cni: cni,
      phone: phone,
    };

    axios
      .post(`${serverUrl}/api/operateur/addoperateur`, data)
      .then((response) => {
        console.log(response.data); // Server response
        toast.success('Operateur added successfully');
        setNom('');
        setCNI('');
        setPhone('');
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Add Operateur
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nom"
            label="Nom"
            name="nom"
            autoFocus
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cni"
            label="CNI"
            id="cni"
            value={cni}
            onChange={(e) => setCNI(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Téléphone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Ajouter
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddOperateur;
