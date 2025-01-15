import React, {useState} from 'react';
import {  useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import Cookie from 'js-cookie';
import { serverUrl } from '../server';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://nomothierry.com/">
        Project Partners
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Define the CSS override for the spinner
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #f28122; // Adjust the color as needed
  `;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 

    try {
      const response = await axios.post(`${serverUrl}/api/user/login`, {
        telephone,
        password,
      });
      const { success, token, role, nom, userid } = response.data;
      if (success) {
        console.log('saving token')
        // Save the token as a cookie
        Cookie.set('jwt', token, { expires: 7 }); // Expires after 7 days
        Cookie.set('role', role, { expires: 7 }); // Expires after 7 days
        Cookie.set('nom', nom, { expires: 7 }); // Expires after 7 days
        Cookie.set('userid', userid, { expires: 7 }); 
        //navigate to dashboard
        if(role === 'chargeur'){
          navigate("/dashboard/chargement");
        }else if(role === 'secretaire'){
          navigate("/dashboard/camion");
        }
        else if(role === 'admin'){
          navigate("/dashboard/app");
        }
        else if(role === 'dechargeur'){
          navigate("/dashboard/dechargement");
        }
        
        window.location.reload(true); 
      } else {
        // Handle login failure
        console.log("Can't connect")
      }
    }
    catch (error) {
      console.error(error);
    }
    setIsLoading(false); // Masque le spinner
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
            Se connecter
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              sx={{ input: { color: 'black', borderBlockColor:'#f28122' } }}
              margin="normal"
              required
              fullWidth
              id="telephone"
              label="Telephone ou email"
              name="telephone"
              autoComplete="email"
              onChange={(e) => setTelephone(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
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
                Connexion
              </Button>
            )}

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe oublié
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Paper
          component={Grid}
          item
          xs={12}
          sx={{
            backgroundColor: '#f28122',
            color: 'black',
            padding: 2,
            textAlign: 'center',
          }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        Copyright ©{' '}
        <a href="https://nomothierry.com/" style={{ color: 'black' }}>
          Project Partners
        </a>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Paper>
      </Container>
    </ThemeProvider>
  );
}