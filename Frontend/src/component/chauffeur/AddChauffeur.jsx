import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Select, MenuItem, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie'; // Import js-cookie library

const defaultTheme = createTheme();

const AddChauffeur = () => {
  const [nom, setNom] = useState('');
  const [cni, setCNI] = useState('');
  const [phone, setPhone] = useState('');
  const [proprioId, setProprioId] = useState(''); // State for selected proprietor ID
  const [proprioOptions, setProprioOptions] = useState([]); // State for proprietor options
  const token = Cookies.get('jwt'); 
  // Fetch proprio data from the server
  useEffect(() => {
    axios
      .get(`${serverUrl}/api/proprio/getproprios`)
      .then((response) => {
        setProprioOptions(response.data.proprios);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nom: nom,
      cni: cni,
      phone: phone,
      proprioId: proprioId, // Add selected proprietor ID to the data
    };

    axios
      .post(`${serverUrl}/api/chauffeur/addchauffeur`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header with the token
        },
      })
      .then((response) => {
        console.log(response.data); // Server response
        toast.success('Chauffeur added successfully');
        setNom('');
        setCNI('');
        setPhone('');
        setProprioId(''); // Clear the selected proprietor after submission
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
          Add Chauffeur
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
          <InputLabel id="proprioId-label">Prestataire</InputLabel>
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

export default AddChauffeur;
