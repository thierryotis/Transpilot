import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Select, MenuItem, InputLabel, radioClasses } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { serverUrl } from '../server';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

const AddUser = () => {
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('chargeur');
  const roles = ['secretaire', 'chargeur', 'dechargeur']

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleTelephoneChange = (e) => {
    setTelephone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('jwt')
    try {
      const response = await axios.post(`${serverUrl}/api/user/adduser`, {
        nom,
        telephone,
        password,
        role,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
        }
      });

      console.log(response.data); // The response from the server
    } catch (error) {
      console.error(error);
    }
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add User
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nom"
              label="Nom"
              name="nom"
              autoComplete="off"
              onChange={handleNomChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="telephone"
              label="Téléphone"
              name="telephone"
              autoComplete="off"
              onChange={handleTelephoneChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="off"
              onChange={handlePasswordChange}
            />
            <InputLabel id="roleId-label">Role</InputLabel>
            <Select
              labelId="roleId-label"
              id="roleId"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
            >
              {roles.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Ajouter
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/dashboard/utilisateur" variant="body2">
                  Liste des utilisateurs
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddUser;
