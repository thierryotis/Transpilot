import  React, {useState} from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {serverUrl} from '../../server';
import { toast } from "react-toastify";
import axios from 'axios';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

export default function AddProprio() {
    const [nom, setNom] = useState('');
    const [cni, setCNI] = useState('');
    const [phone, setPhone] = useState('');
  //creating the proprio 
  const handleSubmit = (event) => {
    const data = {
        nom: nom,
        cni: cni,
        phone: phone,
        type : 'prestataire'
      };
    event.preventDefault();
    const token = Cookies.get('jwt')
    axios.post(`${serverUrl}/api/proprio/addproprio`, data, {
      headers: {
        Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
      }
    })
      .then((response) => {
        
        console.log(response.data); // Réponse du serveur
        // Réinitialiser les champs du formulaire
        toast.success('Prestataire ajouté avec succès')
        setNom('');
        setCNI('');
        setPhone('');
      })
      .catch((error) => {
        console.error(error);
        toast.error(error)
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Ajouter un prestataire
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nom"
              label="Nom"
              name={nom}
              onChange={(e) => setNom(e.target.value)} // update state on change
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cni"
              onChange={(e) => setCNI(e.target.value)} // update state on change
              autoFocus
              label="Registre de Commerce"
              id="cni"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              onChange={(e) => setPhone(e.target.value)} // update state on change
              autoFocus
              label="Téléphone"
              id="phone"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
