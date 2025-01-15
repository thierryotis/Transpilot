import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Select, MenuItem, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';
import { getProprios } from '../proprios/proprio.js';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

const AddCamion = () => {
  const [immatTracteur, setImmatTracteur] = useState('');
  const [immatBenne, setImmatBenne] = useState('');
  const [PVTracteur, setPVTracteur] = useState('');
  const [PVBenne, setPVBenne] = useState('');
  const [etatTracteur, setEtatTracteur] = useState('');
  const [etatBenne, setEtatBenne] = useState('');
  const [proprioId, setProprioId] = useState('');
  const [proprioOptions, setProprioOptions] = useState([]);

  useEffect(() => {
    // Fetch proprio data from the server
    
    getProprios()
      .then((proprios) => {
        setProprioOptions(proprios);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  }, []);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form validation
    if (!immatTracteur || !immatBenne || !PVTracteur || !PVBenne || !etatTracteur || !etatBenne || !proprioId) {
      toast.error('Tous les champs sont obligatoires');
      return;
    }
    const data = {
      immatTracteur: immatTracteur,
      immatBenne : immatBenne,
      PVTracteur: PVTracteur,
      PVBenne: PVBenne,
      etatTracteur: etatTracteur,
      etatBenne : etatBenne,
      proprioId: proprioId,
    };
    const token = Cookies.get('jwt')
    axios
      .post(`${serverUrl}/api/camion/addcamion`, data,{
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
        }
      })
      .then((response) => {
        console.log(response.data); // Server response
        toast.success('Camion added successfully');
        setImmatTracteur('');
        setPVTracteur('');
        setImmatBenne('');
        setPVBenne('');
        setEtatTracteur('');
        setEtatBenne('');
        setProprioId('');
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
          Ajout d'un camion
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="immatTracteur"
            label="Immatriculation Tracteur"
            name="immatTracteur"
            autoFocus
            value={immatTracteur}
            onChange={(e) => setImmatTracteur(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="immatBenne"
            label="Immatriculation Benne"
            name="immatBenne"
            value={immatBenne}
            onChange={(e) => setImmatBenne(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="PVTracteur"
            label="Poids Vide Tracteur"
            name="PVTracteur"
            value={PVTracteur}
            onChange={(e) => setPVTracteur(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="PVBenne"
            label="Poids Vide Benne"
            name="PVBenne"
            value={PVBenne}
            onChange={(e) => setPVBenne(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="etatTracteur"
            label="Etat Tracteur"
            name="etatTracteur"
            value={etatTracteur}
            onChange={(e) => setEtatTracteur(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="etatBenne"
            label="Etat Benne"
            name="etatBenne"
            value={etatBenne}
            onChange={(e) => setEtatBenne(e.target.value)}
          />
          <InputLabel id="proprioId-label">Propriétaire</InputLabel>
          <Select
            labelId="proprioId-label"
            id="proprioId"
            value={proprioId}
            onChange={(e) => setProprioId(e.target.value)}
            fullWidth
          >
            {proprioOptions.map((proprio) => (
              <MenuItem key={proprio.id} value={proprio.id}>
                {proprio.nom}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Ajouter
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );  
};

export default AddCamion;
