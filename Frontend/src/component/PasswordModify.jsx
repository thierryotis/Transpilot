import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { serverUrl } from '../server';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import {  useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

export default function PasswordModify() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #f28122; // Adjust the color as needed
  `;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmNewPassword) {
      console.log("Passwords don't match!");
      toast.error("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }
    const token = Cookies.get('jwt')
    try {
      const response = await axios.post(`${serverUrl}/api/user/changepassword`, {
        currentPassword,
        newPassword,
      }, {headers: {
        Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
      }});

      const { success } = response.data;

      if (success) {
        console.log('Password successfully changed');
        toast.success("Mot de passe modifié avec success");
        const token = Cookies.get('jwt');
        Cookies.remove('jwt')
        Cookies.remove('nom')
        Cookies.remove('role')
        Cookies.remove('userid')
        navigate("/login");
        window.location.reload(true); 
        // You can navigate the user to a success page or show a success message here
      } else {
        // Handle password change failure
        console.log("Failed to change password");
        toast.error("Modification du mot de passe pas effectuée");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la modification du mot de passe");
    }

    setIsLoading(false); // Hide the spinner
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
            Modifier le mot de passe
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="currentPassword"
              label="Mot de passe actuel"
              type="password"
              id="currentPassword"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Nouveau mot de passe"
              type="password"
              id="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmNewPassword"
              label="Confirmer le nouveau mot de passe"
              type="password"
              id="confirmNewPassword"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {isLoading ? (
              <BeatLoader color="#521452" loading={isLoading} css={override} size={8} />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Modifier
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
