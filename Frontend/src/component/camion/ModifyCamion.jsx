import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Select, MenuItem, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

const ModifyCamion = () => {
  const initialCamion = Cookies.get('camion') ? JSON.parse(Cookies.get('camion')) : {};
  const [camionId, setCamionId] = useState(initialCamion.id);
  const [immatTracteur, setImmatTracteur] = useState(initialCamion.immatTracteur);
  const [immatBenne, setImmatBenne] = useState(initialCamion.immatBenne);
  const [PVTracteur, setPVTracteur] = useState(initialCamion.PVTracteur);
  const [PVBenne, setPVBenne] = useState(initialCamion.PVBenne);
  const [etatTracteur, setEtatTracteur] = useState(initialCamion.etatTracteur);
  const [etatBenne, setEtatBenne] = useState(initialCamion.etatBenne);
  const [proprioId, setProprioId] = useState(initialCamion.proprio_id);
  const [proprioOptions, setProprioOptions] = useState([]);
  const token = Cookies.get('jwt'); 

  useEffect(() => {
    axios
      .get(`${serverUrl}/api/proprio/getproprios`)
      .then((response) => {
        setProprioOptions(response.data.proprios);
      })
      .catch((error) => {
        console.error(error);
        // Gérer l'erreur si nécessaire
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      immatTracteur: immatTracteur,
      immatBenne: immatBenne,
      PVTracteur: PVTracteur,
      PVBenne: PVBenne,
      etatTracteur: etatTracteur,
      etatBenne: etatBenne,
      proprioId: proprioId,
    };

    axios
      .post(`${serverUrl}/api/camion/updatecamion/${camionId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success('Camion mis à jour avec succès');
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
        toast.error('Erreur lors de la mise à jour du camion. Vérifiez vos droits d\'accès');
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Modifier Camion
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
            Mettre à jour
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default ModifyCamion;
