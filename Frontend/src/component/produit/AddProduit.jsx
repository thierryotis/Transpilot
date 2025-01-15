import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';

const defaultTheme = createTheme();

const AddProduit = () => {
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nom: nom,
      type: type,
    };

    axios
      .post(`${serverUrl}/api/produit/addproduit`, data)
      .then((response) => {
        console.log(response.data); // Server response
        toast.success('Produit ajouté avec succès');
        setNom('');
        setType('');
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
          Ajouter un produit
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
            name="type"
            label="Type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Ajouter
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddProduit;
